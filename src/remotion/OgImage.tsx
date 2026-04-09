import React from "react";
import { AbsoluteFill } from "remotion";

const skills = ["TypeScript", "Python", "React", "Next.js", "AWS", "Pentest"];
const stats = [
  { value: "6x", label: "Dean's List" },
  { value: "4x", label: "Intern" },
  { value: "20+", label: "Projects" },
  { value: "10+", label: "Hackathons" },
];
const tags = ["Full-Stack", "Security", "AI/ML", "Cloud"];

const TerminalLine = ({ command, output }: { command: string; output?: React.ReactNode }) => (
  <>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ color: "#ec4899", fontWeight: 700 }}>~</span>
      <span style={{ color: "#555" }}>$</span>
      <span style={{ color: "#e4e4e7", fontWeight: 500 }}>{command}</span>
    </div>
    {output && (
      <div style={{ paddingLeft: 28, color: "#a1a1aa", marginTop: 2 }}>{output}</div>
    )}
  </>
);

export const OgImage: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: "#0a0a0a",
        fontFamily:
          'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
        padding: 40,
        display: "flex",
        flexDirection: "row",
        gap: 32,
      }}
    >
      {/* Left - Terminal */}
      <div
        style={{
          flex: 1,
          background: "#111",
          borderRadius: 14,
          border: "1px solid #1e1e1e",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "14px 18px",
            borderBottom: "1px solid #1e1e1e",
            gap: 8,
            background: "#0d0d0d",
          }}
        >
          <div style={{ width: 13, height: 13, borderRadius: "50%", background: "#ec4899" }} />
          <div style={{ width: 13, height: 13, borderRadius: "50%", background: "#a855f7" }} />
          <div style={{ width: 13, height: 13, borderRadius: "50%", background: "#3b82f6" }} />
          <span style={{ marginLeft: 14, fontSize: 13, color: "#444", letterSpacing: 0.5 }}>
            abhinav@asu ~ portfolio
          </span>
        </div>

        {/* Terminal body */}
        <div
          style={{
            padding: "18px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            fontSize: 14.5,
            lineHeight: 1.55,
            flex: 1,
          }}
        >
          <TerminalLine command="whoami" output="Abhinav Ranish" />

          <div style={{ height: 2 }} />
          <TerminalLine
            command="cat role.txt"
            output="Software Engineer | Cybersecurity | AI/ML"
          />

          <div style={{ height: 2 }} />
          <TerminalLine command="ls skills/" />
          <div style={{ paddingLeft: 28, display: "flex", flexWrap: "wrap", gap: 6, marginTop: 2 }}>
            {skills.map((s) => (
              <span
                key={s}
                style={{
                  padding: "3px 12px",
                  borderRadius: 5,
                  background: "rgba(236, 72, 153, 0.08)",
                  border: "1px solid rgba(236, 72, 153, 0.2)",
                  color: "#f472b6",
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                {s}
              </span>
            ))}
          </div>

          <div style={{ height: 2 }} />
          <TerminalLine
            command="echo $LOCATION"
            output="Arizona State University — Fulton Engineering"
          />

          <div style={{ height: 2 }} />
          <TerminalLine command="echo $EMAIL" output="chatgpt@asu.edu" />

          <div style={{ height: 2 }} />
          <TerminalLine command="echo $STATUS" output="will debug for coffee" />

          <div style={{ height: 2 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#ec4899", fontWeight: 700 }}>~</span>
            <span style={{ color: "#555" }}>$</span>
            <span
              style={{
                display: "inline-block",
                width: 10,
                height: 20,
                background: "#ec4899",
                opacity: 0.7,
                borderRadius: 1,
              }}
            />
          </div>
        </div>
      </div>

      {/* Right - Stats */}
      <div
        style={{
          width: 320,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Name */}
        <div
          style={{
            background: "#111",
            borderRadius: 14,
            border: "1px solid #1e1e1e",
            padding: "22px 24px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: -1,
              fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
            }}
          >
            Abhinav Ranish
          </div>
          <div
            style={{
              fontSize: 14,
              color: "#555",
              marginTop: 6,
              fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
            }}
          >
            aranish.uk
          </div>
        </div>

        {/* Stats 2x2 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                background: "#111",
                borderRadius: 14,
                border: "1px solid #1e1e1e",
                padding: "18px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
              }}
            >
              <span
                style={{
                  fontSize: 30,
                  fontWeight: 800,
                  color: "#ec4899",
                  fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
                }}
              >
                {s.value}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "#555",
                  marginTop: 4,
                  fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontWeight: 600,
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Status */}
        <div
          style={{
            background: "#111",
            borderRadius: 14,
            border: "1px solid #1e1e1e",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 8px rgba(34,197,94,0.5)",
              }}
            />
            <span
              style={{
                fontSize: 13,
                color: "#999",
                fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
              }}
            >
              Open to opportunities
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#ec4899",
                boxShadow: "0 0 8px rgba(236,72,153,0.5)",
              }}
            />
            <span
              style={{
                fontSize: 13,
                color: "#999",
                fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
              }}
            >
              Building cool stuff
            </span>
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, flex: 1, alignContent: "flex-end" }}>
          {tags.map((t) => (
            <span
              key={t}
              style={{
                padding: "7px 16px",
                borderRadius: 20,
                background: "#111",
                border: "1px solid #1e1e1e",
                color: "#888",
                fontSize: 12,
                fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
                fontWeight: 500,
                letterSpacing: 0.3,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
