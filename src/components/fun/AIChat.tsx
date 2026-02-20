// app/components/AIChat.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { FileText, FileDown, MoreVertical, Trash } from "lucide-react";
import jsPDF from "jspdf";
import Image from "next/image";
// ✅ replace these two red lines:
import experienceData from "@/components/data/experience.json";
import projectData from "@/components/data/projects.json";

type Project = {
  title: string;
  description: string;
  technologies: string[];
  web: string;
  visit?: string;
  image: string;
  workinprogress?: boolean;
};

type Experience = {
  title: string;
  organization: string;
  duration: string;
  description: string[];
  image: string;
};

type Message = { sender: "user" | "ai"; text: string };
type Option = { label: string; context: string };

// Build options from JSON
const projOptions: Option[] = (projectData as Project[]).map((p) => ({
  label: p.title,
  context: [
    p.title,
    p.workinprogress ? "Status: Work in progress" : null,
    p.description ? `Description: ${p.description}` : null,
    p.technologies?.length ? `Tech: ${p.technologies.join(", ")}` : null,
    p.web ? `Website: ${p.web}` : null,
    p.visit ? `Visit: ${p.visit}` : null,
  ]
    .filter(Boolean)
    .join("\n"),
}));

const expOptions: Option[] = (experienceData as Experience[]).map((e) => ({
  label: `${e.title} @ ${e.organization}`,
  context: [
    `${e.title} @ ${e.organization}`,
    e.duration ? `Duration: ${e.duration}` : null,
    e.description?.length
      ? `Highlights:\n- ${e.description.join("\n- ")}`
      : null,
  ]
    .filter(Boolean)
    .join("\n"),
}));

const STORAGE_KEY = "chatHistory";
const SPAM_TIMEOUT_MS = 5000;

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [canSend, setCanSend] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  const [showProjectOptions, setShowProjectOptions] = useState(false);
  const [showWorkOptions, setShowWorkOptions] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const hydrated = useRef(false);

  const GREETING =
    "Hi, I’m Mr. Robot (Abhi's Assistant). How can I help you today?";

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Message[] | unknown;

        // Guard against bad or empty histories
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        } else {
          setMessages([{ sender: "ai", text: GREETING }]);
        }
      } catch {
        setMessages([{ sender: "ai", text: GREETING }]);
      }
    } else {
      setMessages([{ sender: "ai", text: GREETING }]);
    }

    hydrated.current = true;
  }, []);

  // persist after hydrated
  useEffect(() => {
    if (!hydrated.current) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    chatBoxRef.current?.scrollTo({
      top: chatBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const throttle = () => {
    setCanSend(false);
    setTimeout(() => setCanSend(true), SPAM_TIMEOUT_MS);
  };

  // ⬇️ accept optional context and send with the request
  const sendMessage = async (text: string, context?: string) => {
    if (!text.trim() || !canSend) return;
    setLoading(true);
    throttle();
    setMessages((prev) => [...prev, { sender: "user", text }]);
    try {
      const res = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text, context }),
      });
      const { answer, error } = await res.json();
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: answer ?? error ?? "No response" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ Network error" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
    setInput("");
  };

  const downloadTxt = () => {
    const content = messages.map((m) => `${m.sender}: ${m.text}`).join("\n\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chat-history.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    let y = 10;
    messages.forEach((m) => {
      const sender = m.sender === "user" ? "You" : "Mr. Robot";
      const lines = doc.splitTextToSize(`${sender}: ${m.text}`, 180);
      lines.forEach((line: string) => {
        if (y > 280) {
          doc.addPage();
          y = 10;
        }
        doc.text(line, 10, y);
        y += 7;
      });
      y += 4;
    });
    doc.save("chat-history.pdf");
  };

  const handleWheelCapture: React.WheelEventHandler<HTMLDivElement> = (e) => {
    const el = chatBoxRef.current;
    if (!el) return;

    const atTop = el.scrollTop <= 0;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight;
    const goingDown = e.deltaY > 0;
    const goingUp = e.deltaY < 0;

    // If we can scroll inside the chat, prevent the event from bubbling to the page
    if ((goingDown && !atBottom) || (goingUp && !atTop)) {
      e.stopPropagation();
    }
  };

  // Suggestion actions (new UI flow)
  const suggestionActions: { label: string; action: () => void }[] = [
    { label: "Who is Abhinav?", action: () => sendMessage("Who is Abhinav?") },
    {
      label: "What are his hobbies?",
      action: () => sendMessage("What are his hobbies?"),
    },
    {
      label: "Tell me about a project",
      action: () => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "Which project would you like to know more about?",
          },
        ]);
        setShowProjectOptions(true);
        setShowWorkOptions(false);
      },
    },
    {
      label: "Tell me about an internship",
      action: () => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "Which internship would you like to know more about?",
          },
        ]);
        setShowWorkOptions(true);
        setShowProjectOptions(false);
      },
    },
  ];

  const showingOptions = showProjectOptions || showWorkOptions;

  return (
    <div className="relative rounded-2xl bg-neutral-900 shadow-lg flex flex-col h-[450px] w-full max-w-xl overflow-visible">
      {/* 👾 Robot Avatar popping out */}
      <div className="absolute -top-13 -left-17 w-22 h-22 z-0 animate-bounce-fade -rotate-45">
        <Image
          src="/mrrobot.png"
          alt="Mr. Robot"
          fill
          className="object-contain opacity-50 animate-fade drop-shadow-lg"
        />
      </div>

      {/* Messages */}
      <div
        ref={chatBoxRef}
        className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4"
        onWheelCapture={handleWheelCapture}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[80%] ${
                m.sender === "user"
                  ? "bg-pink-500 text-white rounded-br-none"
                  : "bg-gray-700 text-gray-100 rounded-bl-none"
              }`}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: 
                  m.text.replace(/\*\*(.*?)\*\*/g, "<strong class='font-bold'>$1</strong>")
                  .replace(
                    /(https?:\/\/[^\s]+)/g,
                    `<a href="$1" target="_blank" rel="noopener noreferrer" class="text-pink-400 underline hover:text-pink-300">$1</a>`
                  ),
                  
                }}
              />
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Suggestions / Dynamic option bubbles */}
      <div className="flex gap-2 px-3 pb-2 overflow-x-auto scrollbar-hide">
        {!showingOptions &&
          suggestionActions.map((s, i) => (
            <button
              key={i}
              onClick={s.action}
              disabled={!canSend || loading}
              className="px-2.5 py-1 text-xs rounded-full bg-gray-800 hover:bg-gray-700 text-gray-200 disabled:opacity-50 whitespace-nowrap"
            >
              {s.label}
            </button>
          ))}

        {showProjectOptions &&
          projOptions.map((o, i) => (
            <button
              type="button"
              key={`proj-${i}`}
              onClick={() => {
                sendMessage(`Tell me more about ${o.label}`, o.context);
                setShowProjectOptions(false);
              }}
              disabled={!canSend || loading}
              className="px-3 py-1.5 text-xs rounded-full bg-gray-800 hover:bg-gray-700 text-gray-200 disabled:opacity-50 whitespace-nowrap"
            >
              {o.label}
            </button>
          ))}

        {showWorkOptions &&
          expOptions.map((o, i) => (
            <button
              type="button"
              key={`work-${i}`}
              onClick={() => {
                sendMessage(`Tell me more about ${o.label}`, o.context);
                setShowWorkOptions(false);
              }}
              disabled={!canSend || loading}
              className="px-3 py-1.5 text-xs rounded-full bg-gray-800 hover:bg-gray-700 text-gray-200 disabled:opacity-50 whitespace-nowrap"
            >
              {o.label}
            </button>
          ))}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-neutral-800 p-3"
      >
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={canSend ? "Type your question…" : "Please wait…"}
          disabled={!canSend || loading}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (input.trim()) {
                sendMessage(input);
                setInput("");
              }
            }
          }}
          className="flex-1 p-2 rounded-lg bg-neutral-800 text-gray-100 border border-neutral-700 resize-none h-[42px]"
        />
        <button
          type="submit"
          disabled={!canSend || loading || !input.trim()}
          className="bg-pink-500 px-4 py-2 rounded-lg text-white disabled:opacity-50"
        >
          {loading ? "…" : "Send"}
        </button>

        {/* Menu button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowMenu((v) => !v)}
            className="p-2 rounded-lg hover:bg-neutral-800"
          >
            <MoreVertical size={18} />
          </button>
          {showMenu && (
            <div className="absolute right-0 bottom-12 bg-neutral-800 rounded-lg shadow-lg overflow-hidden">
              <button
                onClick={downloadTxt}
                className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-700 w-full text-sm text-gray-200"
              >
                <FileText size={16} /> TXT
              </button>
              <button
                onClick={downloadPdf}
                className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-700 w-full text-sm text-gray-200"
              >
                <FileDown size={16} /> PDF
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("chatHistory");
                  setMessages([
                    {
                      sender: "ai",
                      text: "Welcome back! How can I assist you today?",
                    },
                  ]);
                  setShowProjectOptions(false);
                  setShowWorkOptions(false);
                }}
                className="flex items-center gap-2 px-4 py-2 hover:bg-red-600 w-full text-sm "
              >
                <Trash size={16} /> Bin
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
