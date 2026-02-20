"use client";
import React, { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";

const SPAM_TIMEOUT_MS = 5000;
const STORAGE_KEY = "chatHistory";

type Message = { sender: "user" | "ai"; text: string };
type Option = { label: string; context: string };
const projects: Option[] = [
  {
    label: "FaceTagger: Local Smart Photo Tagger",
    context:
      "Offline AI tool to detect, embed, and cluster faces in 1TB+ photo libraries. UI built with Streamlit allows users to label clusters, write EXIF/JSON tags, and organize collections without cloud dependency. GPU acceleration via CUDA + InsightFace. Technologies: Python, InsightFace, Streamlit, EXIFTool, ONNX, HDBSCAN. Link: https://github.com/Abhinav-ranish/FaceMatch",
  },
  {
    label: "Cyber Scripts",
    context:
      "A collection of offensive security automation scripts created during PortSwigger, JWT, and CTF training. Includes Turbo Intruder templates, LLM prompt injections, JWT brute-force, exploit server hijacking, and more. Built to speed up recon and exploitation in web targets. Technologies: Python, Turbo Intruder, Burp Suite, LLM, Bash. Link: https://github.com/Abhinav-ranish/cyberscripts",
  },
  {
    label: "Net Audit Suite",
    context:
      "Cyber audit tool integrating Nmap, Nikto, OpenVAS, and arp-scan to generate AI-powered summaries of discovered vulnerabilities using LLaMA + Ollama. Generates DOCX reports, maps infected IPs, and provides a dark-mode frontend in Next.js. Technologies: Next.js, Node.js, Ollama, OpenVAS, Nmap, Tailwind. Link: https://github.com/Abhinav-ranish/Network-Vulnerability-Audit",
  },
  {
    label: "Educational Worm + Dashboard",
    context:
      "Python worm POC that replicates across user folders, USBs, and sends host info to a Flask-based C2 dashboard. Dashboard shows infection map, kill switch, and logs. Fully safe for sandbox testing and cyber education. Technologies: Python, Flask, Geocoder, USB I/O, Self-replication. Link: https://github.com/Abhinav-ranish/Worm",
  },
  {
    label: "DIW387 STB Mod Toolkit",
    context:
      "Toolkit to de-bloat and customize Ooredoo’s locked DIW387 Android TV STB. Includes Wolf Launcher setup, splash screen mods, sideload tooling, and Dirty COW (CVE-2016-5195) root attempt. For education and warranty-voiding fun. Technologies: Bash, Android TV, ADB, Dirty COW Exploit. Link: https://github.com/Abhinav-ranish/ooreedoo-DIW387-mod",
  },
  {
    label: "VibeCode Machine",
    context:
      "Experimental AI-assisted code builder that autogenerates, tests, and fixes Python projects via Ollama + Codellama. Automatically patches failed logic and regenerates dependencies via smart retry. CLI interface for rapid prototyping. Technologies: Python, Ollama, LLM Automation, Patch Diffing. Link: https://github.com/Abhinav-ranish/The-Super-Coder",
  },
  {
    label: "BetterStreaming",
    context:
      "A media streaming platform using PirateBay+ for content, featuring a React/Next.js frontend and Rust-based WebTorrent streaming. It offers personalized browsing, advanced search, and progressive streaming. Technologies: React, Next.js, WebTorrent, Rust, Prisma, PostgreSQL. Link: https://github.com/Abhinav-ranish/BetterStreaming",
  },
  {
    label: "Stock AI Analyzer RAG",
    context:
      "AI-powered stock analysis tool leveraging Retrieval-Augmented Generation (RAG) with FAISS vector search and Ollama LLM. Technologies: Python, FAISS, Ollama, Yahoo Finance API, React. Link: https://github.com/Abhinav-ranish/AI-Stock-Algorithm",
  },
  {
    label: "Stock Predictor",
    context:
      "Stock prediction system using Backtesting.py to evaluate trade strategies and forecast stock movements. Technologies: Python, Backtesting.py, Financial Data Analysis. Link: https://github.com/Abhinav-ranish/Stock-Predictor",
  },
  {
    label: "Contract Generator RAG",
    context:
      "Extracts contract conditions from DOCX files and verifies task compliance using NLP and Ollama RAG orchestration. Technologies: Python, Ollama, RAG, Streamlit, Docx. Link: https://en.wikipedia.org/wiki/Non-disclosure_agreement",
  },
  {
    label: "Secure Team Password Manager",
    context:
      "Deployed Passbolt Community Edition on AWS EC2 to streamline password management for ACM ASU. Technologies: AWS, NGNIX, Passbolt, OpenSSL, Ubuntu, EC2. Link: https://asu-acm.org/",
  },
  {
    label: "Campus Hive",
    context:
      "JavaFX app for students to connect and collaborate on projects. Technologies: JavaFX, GitHub, Java, Eclipse, H2, Database. Link: https://github.com/Abhinav-ranish/CampusHive",
  },
  {
    label: "Spotify Wrapped Bot",
    context:
      "Boost your Spotify Wrapped stats effortlessly, intelligent playback scheduling, seamless background operation, and predictive machine learning to optimize your music experience! Technologies: Python, Scikit, Websockets, Spotify API, Machine Learning, Pandas, Matplotlib. Link: https://github.com/Abhinav-ranish/wrappedbot",
  },
  {
    label: "Keylogger",
    context:
      "Records keystrokes and sends them to a server. Technologies: C, Curl, Windows API. Link: https://github.com/Abhinav-ranish/keylogger",
  },
  {
    label: "Personal Portfolio",
    context:
      "Personal portfolio built with Next.js, Tailwind CSS, and Framer Motion. Features categorized project showcase, animated UI, and persistent audio player across routes. Technologies: Next.js, Tailwind CSS, Framer Motion, TypeScript. Link: https://github.com/Abhinav-ranish/portfolio Visit: https://aranish.uk",
  },
  {
    label: "Spotify Visualizer Website",
    context:
      "Live website using MongoDB and Three.js for dynamic visual effects. Technologies: MongoDB, Three.js, Spotify API, Express.js, AWS. Link: https://github.com/Abhinav-ranish/spotifyvisualizer Visit: https://spotify.aranish.uk",
  },
  {
    label: "Simple Music Player",
    context:
      "Music player with play, pause, and skip functionality. Technologies: HTML, CSS, JavaScript, Cloudflare Pages. Link: https://github.com/Abhinav-ranish/Music-Player Visit: https://music.aranish.uk",
  },
  {
    label: "Internship Website - QFCRA",
    context:
      "Website which I developed during my internship at QFCRA. Technologies: HTML, CSS, JavaScript, Cloudflare Pages. Link: https://github.com/Abhinav-ranish/Internship-Website Visit: https://internship.aranish.uk/",
  },
  {
    label: "Matrix Graph - DSA OOP Project",
    context:
      "Graph data structure with matrix representation. Technologies: C++, Data Structures. Link: https://github.com/Abhinav-ranish/MatrixGraph-DSA",
  },
  {
    label: "Exploiting a Vulnerable Computer",
    context:
      "Used SQL injection and Metasploit to exploit a VM. Technologies: Metasploit, SQL Injection. Link: https://bit.ly/CPT-redteam",
  },
  {
    label: "Auto Class Enroller",
    context:
      "ASU Class Scraper and Automated student enrollment using Selenium and Python. Technologies: Python, Selenium, Smtplib. Link: https://github.com/Abhinav-ranish/ASU-ClassEnroller",
  },
  {
    label: "Spotify Haptics Controller",
    context:
      "Haptic feedback for Spotify using Swift and Spotify API. Technologies: Swift, Spotify API. Link: https://github.com/Abhinav-ranish/Spotify-Haptics",
  },
  {
    label: "Google Search Cleaner",
    context:
      "Chrome extension to remove sponsored search results. Technologies: JavaScript, Chrome Extension. Link: https://github.com/Abhinav-ranish/google-cleaner",
  },
  {
    label: "Make Canvas Dark Again",
    context:
      "Chrome extension to make the Canvas LMS dark. Technologies: JavaScript, Chrome Extension. Link: https://github.com/Abhinav-ranish/Make-Canvas-Dark-Again",
  },
];

const work: Option[] = [
  {
    label: "Cyber Intern @ Ampcus Cyber",
    context: `
    Performed security assessments of web applications using tools like Burp Suite, identifying potential issues such as input handling and authentication weaknesses.
    Worked collaboratively on simulated security scenarios to strengthen both offensive and defensive cybersecurity techniques.
    Continuously developed hands-on web security skills through platforms like Hack The Box and the OWASP Web Security Testing Guide.
    `.trim(),
  },
  {
    label: "AI / SWE Intern @ TRANZYD",
    context: `
      Led AI contract automation feature development (clause extraction, RAG Retrieval-Augmented Generation comparison, UI checkbox workflows).
      Built backend modules using Python, SQLite, and python-docx.
      Also prototyped a stock analyzer using Ollama, FAISS, and sentiment models.
    `.trim(),
  },
  {
    label: "SWE Intern @ Ampcus",
    context: `
      Joined via Cyber intern role, pivoted into SWE role on a client React project.
      Built frontend UI components, connected REST APIs, and improved UX.
      Simultaneously supported cyber team with triage and testing.
    `.trim(),
  },
  {
    label: "Technology Consultant @ ASU",
    context: `
      Provided classroom tech support at Arizona State University (projectors, mics, etc).
      Assisted faculty in-person, via phone and Slack.
      Maintained tech + security post-class; ensured smooth experiences daily.
    `.trim(),
  },
  {
    label: "IT Intern @ QFCRA",
    context: `
      Configured secure work environments and deployed 150+ laptops on record pace.
      Used Trellix, Azure, and FortiClient for infra prep + policy compliance.
      Created technical documentation + supported sensitive client data operations.
    `.trim(),
  },
  {
    label: "IT Intern @ Mannai Corporation",
    context: `
      Helped build ASP.NET websites and configured switches + VLANs.
      Learned subnetting, IP setups, and gained hands-on network experience.
    `.trim(),
  },
];

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [canSend, setCanSend] = useState(true);
  const [showProjectSelector, setShowProjectSelector] = useState(false);
  const [showWorkSelector, setShowWorkSelector] = useState(false);
  const [projectOptions] = useState<Option[]>(projects);
  const [workOptions] = useState<Option[]>(work);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // load history or seed initial AI greeting
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          setMessages(JSON.parse(saved));
        } catch {
          setMessages([
            {
              sender: "ai",
              text: "Hi, I’m Mr. Robot. How can I help you today?",
            },
          ]);
        }
      } else {
        setMessages([
          { sender: "ai", text: "Hi, I’m Mr. Robot. How can I help you today?" },
        ]);
      }
    } else {
      setMessages([
        { sender: "ai", text: "Hi, I’m Mr. Robot. How can I help you today?" },
      ]);
    }
  }, []);

  // persist history
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // auto-scroll only if there are 4 or more messages
  useEffect(() => {
    if (messages.length >= 4) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // spam throttle
  const throttle = () => {
    setCanSend(false);
    setTimeout(() => setCanSend(true), SPAM_TIMEOUT_MS);
  };

  // generic send function
  const sendMessage = async (text: string, context?: string) => {
    if (!text.trim() || !canSend) return;

    setShowProjectSelector(false);
    setShowWorkSelector(false);
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
      const aiText = answer ?? error ?? "No response";
      setMessages((prev) => [...prev, { sender: "ai", text: aiText }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Network error, please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };
  const downloadPdf = () => {
    const doc = new jsPDF();
    const margin = 10;
    let y = margin;

    messages.forEach((m) => {
      const sender = m.sender === "user" ? "You" : "Mr. Robot";
      const lines = doc.splitTextToSize(`${sender}: ${m.text}`, 180);
      lines.forEach((line: string | string[]) => {
        if (y > 280) {
          doc.addPage();
          y = margin;
        }
        doc.text(line, margin, y);
        y += 7;
      });
      y += 5;
    });

    doc.save("chat-history.pdf");
  };

  const downloadTxt = () => {
    const content = messages
      .map((m) => `${m.sender === "user" ? "You" : "Mr. Robot"}: ${m.text}`)
      .join("\n\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "chat-history.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  // handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
    setInput("");
  };

  // count user messages
  const userCount = messages.filter((m) => m.sender === "user").length;

  // default suggestions
  const suggestions = [
    { label: "Who is Abhinav?", action: () => sendMessage("Who is Abhinav?") },
    {
      label: "What are his hobbies?",
      action: () => sendMessage("What are his hobbies?"),
    },
    {
      label: "Project details…",
      action: () => {
        setShowProjectSelector((v) => !v);
        setShowWorkSelector(false);
      },
    },
    {
      label: "Work details…",
      action: () => {
        setShowWorkSelector((v) => !v);
        setShowProjectSelector(false);
      },
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mt-20 mx-auto flex flex-col bg-gray-900 rounded-2xl shadow-lg w-full h-[80vh]">
        {/* Suggestions bar */}
        <div className="flex overflow-x-auto space-x-2 p-2">
          {suggestions.map((s, i) => {
            // hide "Who is Abhinav?" after first user question
            if (i === 0 && userCount > 0) return null;
            return (
              <button
                key={i}
                onClick={s.action}
                disabled={!canSend || loading}
                className="whitespace-nowrap bg-gray-700 text-gray-100 px-3 py-1 rounded-full hover:bg-gray-600 disabled:opacity-50"
              >
                {s.label}
              </button>
            );
          })}
          {messages.length > 1 && (
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.localStorage.removeItem(STORAGE_KEY);
                }
                setMessages([
                  {
                    sender: "ai",
                    text: "Hi, I’m Mr. Robot. How can I help you today?",
                  },
                ]);
              }}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
              Clear Chat
            </button>
          )}
        </div>

        {/* Dropdowns for detailed picks */}
        {showProjectSelector && (
          <div className="p-4 bg-gray-800 space-y-2">
            <label className="block text-gray-200">Select a project:</label>
            <select
              className="w-full p-2 bg-gray-700 text-white rounded max-h-60 overflow-y-auto"
              onChange={(e) => {
                const sel = projectOptions.find(
                  (o) => o.label === e.target.value
                );
                if (sel) {
                  sendMessage(
                    `Give me more details about ${sel.label}`,
                    sel.context
                  );
                  setShowProjectSelector(false);
                }
              }}
              defaultValue=""
            >
              <option value="" disabled>
                — choose —
              </option>

              {projectOptions.map((o, i) => (
                <option
                  key={`${o.label}-${i}`}
                  value={o.label}
                  className="text-sm text-gray-100 bg-gray-800"
                >
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {showWorkSelector && (
          <div className="p-4 bg-gray-800 space-y-2">
            <label className="block text-gray-200">
              Select a work experience:
            </label>
            <select
              className="w-full p-2 bg-gray-700 text-white rounded"
              onChange={(e) => {
                const sel = workOptions.find((o) => o.label === e.target.value);
                if (sel) {
                  sendMessage(
                    `Give me more details about ${sel.label}`,
                    sel.context
                  );
                  setShowWorkSelector(false);
                }
              }}
              defaultValue=""
            >
              <option value="" disabled>
                — choose —
              </option>
              {workOptions.map((o, i) => (
                <option key={`${o.label}-${i}`} value={o.label}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-hidden flex flex-col max-h-[calc(100vh-200px)]">
          {/* 💬 Scrollable chat box only */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-6 pt-4 space-y-4"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2 ${m.sender === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                {m.sender === "ai" && (
                  <img
                    src="/mrrobot.png"
                    alt="Bot Avatar"
                    className="w-8 h-8 rounded-full object-cover mt-1"
                  />
                )}
                <div
                  className={
                    m.sender === "user"
                      ? "bg-pink-400 text-white rounded-tl-lg rounded-bl-lg rounded-tr-lg px-4 py-2 max-w-[80%]"
                      : "bg-gray-700 text-gray-100 rounded-tr-lg rounded-br-lg rounded-tl-lg px-4 py-2 max-w-[80%]"
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} className="h-0" />
          </div>

          {/* Sticky input (DO NOT NEST INSIDE MESSAGE AREA) */}
          <div className="sticky bottom-0 hide-scrollbar bg-gray-900 border-t border-gray-700 p-4">
            <form
              onSubmit={handleSubmit}
              className="flex items-center space-x-2"
            >
              <textarea
                className="flex-1 p-3 rounded border border-gray-600 bg-gray-800 text-gray-100 focus:outline-none focus:ring resize-none h-[48px]"
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={canSend ? "Type your question…" : "Please wait…"}
                disabled={!canSend || loading}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e as any);
                  }
                }}
              />
              <button
                type="submit"
                disabled={!canSend || loading || !input.trim()}
                className="bg-pink-400 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                {loading ? "…" : "Send"}
              </button>
            </form>
            {!canSend && (
              <p className="mt-2 text-xs text-center text-gray-400">
                Slow down! Please wait a few seconds.
              </p>
            )}
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={downloadTxt}
              className="text-sm bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
            >
              Save as .txt
            </button>
            <button
              onClick={downloadPdf}
              className="text-sm bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
            >
              Save as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
