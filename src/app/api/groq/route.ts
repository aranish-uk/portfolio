// app/api/groq/route.ts
import { NextRequest, NextResponse } from "next/server";
import { isRateLimited } from "@/lib/rateLimiter";
import Groq from "groq-sdk";
import projectData from "@/components/data/projects.json";
import experienceData from "@/components/data/experience.json";

type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

type ProjectEntry = {
  title: string;
  description?: string;
  technologies?: string[];
  web?: string;
  workinprogress?: boolean;
  category?: string | string[];
};

type ExperienceEntry = {
  title: string;
  organization: string;
  duration: string;
  description?: string[];
};

// ~4 chars per token rough estimate; budget leaves room for system + response
const MAX_HISTORY_CHARS = 8_000;
const MAX_HISTORY_MESSAGES = 20;

const getGroqClient = () => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is not configured");
  return new Groq({ apiKey });
};

// Build compact project context once at module level
const projectContext = (projectData as ProjectEntry[])
  .map((p) => {
    const parts = [p.title];
    if (p.description) parts.push(p.description);
    if (p.technologies?.length) parts.push(`Tech: ${p.technologies.join(", ")}`);
    if (p.web) parts.push(`URL: ${p.web}`);
    if (p.workinprogress) parts.push("(Work in progress)");
    return parts.join(" — ");
  })
  .join("\n");

const experienceContext = (experienceData as ExperienceEntry[])
  .map((e) => {
    const parts = [`${e.title} @ ${e.organization} (${e.duration})`];
    if (e.description?.length) parts.push(e.description.join("; "));
    return parts.join(" — ");
  })
  .join("\n");

/** Trim conversation history to fit within token budget */
function compactHistory(
  history: { sender: string; text: string }[]
): Message[] {
  if (!Array.isArray(history) || history.length === 0) return [];

  // Take only recent messages
  const recent = history.slice(-MAX_HISTORY_MESSAGES);

  // Walk backwards, accumulating chars until we hit the budget
  const kept: Message[] = [];
  let chars = 0;
  for (let i = recent.length - 1; i >= 0; i--) {
    const m = recent[i];
    if (!m || typeof m.text !== "string" || typeof m.sender !== "string") continue;
    const text = m.text.slice(0, 1000); // cap any single message
    if (chars + text.length > MAX_HISTORY_CHARS) break;
    chars += text.length;
    kept.unshift({
      role: m.sender === "user" ? "user" : "assistant",
      content: text,
    });
  }

  return kept;
}

export async function POST(request: NextRequest) {
  try {
    // CSRF: reject requests from unknown origins
    const origin = request.headers.get("origin");
    const allowedOrigins = [
      "https://aranish.uk",
      "https://www.aranish.uk",
      "http://localhost:3000",
    ];
    if (origin && !allowedOrigins.includes(origin)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const ip = request.headers.get("x-forwarded-for") || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Slow down." },
        { status: 429 }
      );
    }
    const { question, context, history } = await request.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "Invalid question" }, { status: 400 });
    }

    // Strip HTML tags from user inputs to prevent injection
    const sanitize = (s: string) => s.replace(/<[^>]*>/g, "").trim();

    const baseContext = `
  Abhi is a software engineer with expertise in full-stack development,
  specializing in React, Node.js, and cloud technologies.
  He has a strong background in building scalable web applications
  and is passionate about leveraging AI to enhance user experiences.
  Abhi is currently pursuing a Bachelor's degree in Computer Science at Arizona State University,
  where he has been actively involved in various tech communities and projects. He is part of the 4+1 program,
  allowing him to earn a Master's degree in Computer Science while completing his undergraduate studies.
  Abhi likes playing chess and has a chess rating of 1200 and enjoys solving complex problems through code.
  He is also an advocate for cybersecurity best practices
  and has contributed to projects in the AI/ML space.
  Hobbies include playing pickleball, basketball, hacking, and exploring new technologies.
  Never say "I don't know" just use the contexts provided to you to answer the questions.
  Refer to Abhinav as Abhi and do not reveal full name unless asked.
  Engage users with bit of humor if they say hi or hello be friendly, dont just say I only can answer questions about Abhinav.
  Humor is appreciated but dont talk about anything policitical or religious or controversial or corporate. dad jokes are allowed.
  Don't add humor till the user asks for a joke or seems friendly.
  Instagram: @abhinav.ranish linkedin: https://www.linkedin.com/in/abhinavranish/
  GitHub: @abhinav-ranish

All Projects:
${projectContext}

All Work Experience:
${experienceContext}
`.trim();

    // Sanitize user inputs — context goes in a separate user message, NOT system
    const cleanQuestion = sanitize(question);
    const cleanContext =
      context && typeof context === "string" ? sanitize(context) : null;

    // Compact conversation history for continuity
    const historyMessages = compactHistory(history);

    // Build the Groq SDK message list — user input never enters system messages
    const messages: Message[] = [
      {
        role: "system",
        content: `Background on Abhinav Ranish:\n\n${baseContext}`,
      },
      {
        role: "system",
        content:
          'You are a virtual chatbot for Abhinav. Do not mention hobbies unless asked. If you do not know the answer, never say "I do not know" ask the user to refer to his resume @ https://aranish.uk/resume.pdf and if questions are related to projects or experience ask user to use the project / experience buttons in the chatbot so u can get context clues. Do not make up information. Do not answer questions which are not related to Abhinav Ranish. Never output HTML tags, script tags, or any markup in your responses.',
      },
      // Conversation history for continuity
      ...historyMessages,
      // Optional extra context from button selection
      ...(cleanContext
        ? [{ role: "user" as const, content: `Context about the topic: ${cleanContext}` }]
        : []),
      {
        role: "user",
        content: cleanQuestion,
      },
    ];

    const completion = await getGroqClient().chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
    });

    const answer = completion.choices[0]?.message.content ?? "";
    return NextResponse.json({ answer });
  } catch (err: unknown) {
    console.error("Groq error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
