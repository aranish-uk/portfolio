// app/components/AIChat.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { FileText, FileDown, MoreVertical, Trash } from "lucide-react";
import DOMPurify from "dompurify";
import jsPDF from "jspdf";
import Image from "next/image";
import { motion } from "framer-motion";
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
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem(STORAGE_KEY);

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
    } else {
      setMessages([{ sender: "ai", text: GREETING }]);
    }

    hydrated.current = true;
  }, []);

  // persist after hydrated
  useEffect(() => {
    if (!hydrated.current) return;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
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

    // Capture current messages BEFORE adding the new user message
    // so we send prior conversation as history (exclude the greeting)
    const priorMessages = messages.filter(
      (m) => m.text !== GREETING
    );

    setMessages((prev) => [...prev, { sender: "user", text }]);
    try {
      const res = await fetch("/api/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text, context, history: priorMessages }),
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

  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (chatWindowRef.current && !chatWindowRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!isOpen) {
    return (
      <motion.button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setIsOpen(true)}
        animate={{
          width: hovered ? 180 : 64,
          height: 64,
          borderRadius: 32
        }}
        transition={{ duration: 0.4, ease: 'backOut' }}
        className="relative bg-neutral-900/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:bg-zinc-800/80 hover:border-pink-500/50 flex items-center justify-start overflow-hidden group"
        aria-label="Open Chat"
      >
        <div className="absolute left-1 w-14 h-14 flex items-center justify-center pointer-events-none">
          <Image
            src="/mrrobot.png"
            alt="Mr. Robot"
            width={48}
            height={48}
            className="object-contain drop-shadow-md"
          />
        </div>

        <span className="absolute left-11 top-2 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
        </span>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute left-16 whitespace-nowrap text-sm font-semibold text-zinc-200 pointer-events-none pr-4"
        >
          Ask Mr. Robot ✨
        </motion.div>
      </motion.button>
    );
  }

  return (
    <div
      ref={chatWindowRef}
      className="absolute bottom-0 left-0 origin-bottom-left rounded-2xl bg-neutral-900/60 backdrop-blur-2xl shadow-2xl shadow-pink-500/20 flex flex-col h-[450px] w-[calc(100vw-48px)] max-w-xl overflow-visible border border-white/10 transition-all duration-300 animate-in zoom-in-95 slide-in-from-bottom-6"
    >
      {/* Header / Controls */}
      <div className="absolute top-2 right-2 flex gap-2 z-50">
        <button
          onClick={() => setIsOpen(false)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white transition-colors shadow-lg"
        >
          ✕
        </button>
      </div>

      {/* 👾 Robot Avatar popping out from behind */}
      <div className="absolute -top-18 -left-12 w-28 h-28 -z-10 animate-bounce-fade pointer-events-none -rotate-12 transition-transform duration-500 hover:rotate-0">
        <Image
          src="/mrrobot.png"
          alt="Mr. Robot"
          fill
          className="object-contain drop-shadow-[0_10px_20px_rgba(236,72,153,0.3)] filter brightness-110"
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
            className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[80%] ${m.sender === "user"
                ? "bg-pink-500 text-white rounded-br-none shadow-lg shadow-pink-500/20"
                : "bg-white/5 backdrop-blur-md border border-white/10 text-gray-100 rounded-bl-none"
                }`}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    m.text
                      .replace(/\*\*(.*?)\*\*/g, "<strong class='font-bold'>$1</strong>")
                      .replace(
                        /(https?:\/\/[^\s]+)/g,
                        `<a href="$1" target="_blank" rel="noopener noreferrer" class="text-pink-400 underline hover:text-pink-300">$1</a>`
                      ),
                    {
                      ALLOWED_TAGS: ['strong', 'a'],
                      ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
                    }
                  ),
                }}
              />
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Suggestions / Dynamic option bubbles */}
      <div className="flex gap-2 px-3 pb-2 overflow-x-auto scrollbar-hide z-10">
        {!showingOptions &&
          suggestionActions.map((s, i) => (
            <button
              key={i}
              onClick={s.action}
              disabled={!canSend || loading}
              className="px-2.5 py-1 text-xs rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-gray-200 disabled:opacity-50 whitespace-nowrap transition-colors"
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
              className="px-3 py-1.5 text-xs rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-gray-200 disabled:opacity-50 whitespace-nowrap transition-colors"
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
              className="px-3 py-1.5 text-xs rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-gray-200 disabled:opacity-50 whitespace-nowrap transition-colors"
            >
              {o.label}
            </button>
          ))}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-white/10 p-3 bg-neutral-900/50 backdrop-blur-md rounded-b-2xl z-10"
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
          className="flex-1 p-2 rounded-lg bg-white/5 text-gray-100 border border-white/10 resize-none h-[42px] focus:outline-none focus:border-pink-500/50 transition-colors placeholder:text-zinc-500"
        />
        <button
          type="submit"
          disabled={!canSend || loading || !input.trim()}
          className="bg-pink-500 hover:bg-pink-400 px-4 py-2 rounded-lg text-white disabled:opacity-50 transition-colors shadow-lg shadow-pink-500/20"
        >
          {loading ? "…" : "Send"}
        </button>

        {/* Menu button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowMenu((v) => !v)}
            className="p-2 rounded-lg hover:bg-white/10 text-zinc-400 transition-colors"
          >
            <MoreVertical size={18} />
          </button>
          {showMenu && (
            <div className="absolute right-0 bottom-12 bg-neutral-800 border border-white/10 rounded-lg shadow-xl overflow-hidden min-w-[120px]">
              <button
                onClick={downloadTxt}
                className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 w-full text-sm text-gray-200 transition-colors"
              >
                <FileText size={16} /> TXT
              </button>
              <button
                onClick={downloadPdf}
                className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 w-full text-sm text-gray-200 transition-colors"
              >
                <FileDown size={16} /> PDF
              </button>
              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.localStorage.removeItem("chatHistory");
                  }
                  setMessages([
                    {
                      sender: "ai",
                      text: "Welcome back! How can I assist you today?",
                    },
                  ]);
                  setShowProjectOptions(false);
                  setShowWorkOptions(false);
                  setShowMenu(false);
                }}
                className="flex items-center gap-2 px-4 py-2 hover:bg-red-500/20 w-full text-sm text-red-400 transition-colors"
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
