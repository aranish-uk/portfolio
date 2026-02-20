"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

const skills = [
  { src: "/skills/react-1.svg", alt: "React" },
  { src: "/skills/nextjs.png", alt: "Next.js" },
  { src: "/skills/Typescript_logo_2020.svg", alt: "TypeScript" },
  { src: "/skills/python.webp", alt: "Python" },
  { src: "/skills/burpsuite.png", alt: "Burp Suite" },
  { src: "/skills/Docker-svgrepo-com.svg", alt: "Docker" },
  { src: "/skills/Git-Icon-1788C.png", alt: "Git" },
  { src: "/skills/metasploit.png", alt: "Metasploit" },
  { src: "/skills/nmap.png", alt: "Nmap" },
  { src: "/skills/mongo.png", alt: "MongoDB" },
  { src: "/skills/tailwind.png", alt: "Tailwind CSS" },
  { src: "/skills/linux.png", alt: "Linux" },
  { src: "/skills/postgress.png", alt: "PostgreSQL" },
  { src: "/skills/figma.png", alt: "Figma" },
  { src: "/skills/Java_Logo.svg", alt: "Java" },
  { src: "/skills/ISO_C++_Logo.svg.png", alt: "C++" },
  { src: "/skills/angular.png", alt: "Angular" },
  { src: "/skills/HTML5_logo_and_wordmark.svg.png", alt: "HTML5" },
  { src: "/skills/js.png", alt: "JavaScript" },
  { src: "/skills/rust.png", alt: "Rust" },
  { src: "/skills/pytorch.png", alt: "PyTorch" },
  { src: "/skills/Virtualbox_logo.svg.png", alt: "VirtualBox" },
  { src: "/skills/vscode.png", alt: "VS Code" },
  { src: "/skills/raspberry-pi-logo.svg", alt: "Raspberry Pi" },
  { src: "/skills/aws-color.png", alt: "AWS" },
  { src: "/skills/Microsoft_Azure.svg.png", alt: "Azure" },
  { src: "/skills/Google-cloud-platform.svg", alt: "GCP" },
  { src: "/skills/bash.png", alt: "Bash" },
  { src: "/skills/powershell.svg", alt: "Powershell" },
  { src: "/skills/C_Programming_Language.svg", alt: "C" },
  { src: "/skills/heroku-icon.svg", alt: "Heroku" },
  { src: "/skills/supabase.jpeg", alt: "Supabase" },
  { src: "/skills/htb.jpeg", alt: "Hack The Box" },

  { src: "/skills/openvpn.svg", alt: "OpenVPN" },
  { src: "/skills/kali.png", alt: "Kali Linux" },
  { src: "/skills/Wireshark_icon.svg.png", alt: "Wireshark" },
  { src: "/skills/aircrack.png", alt: "Aircrack-ng" },
  { src: "/skills/jira.svg", alt: "Jira" },
  { src: "/skills/slack.png", alt: "Slack" },
  { src: "/skills/discord.svg", alt: "Discord" },
  { src: "/skills/postman.svg", alt: "Postman" },
  { src: "/skills/shadcn.png", alt: "ShadCN" },
  { src: "/skills/ollama.png", alt: "Ollama" },
  { src: "/skills/isightface.jpg", alt: "InsightFace" },
  { src: "/skills/openvas.png", alt: "OpenVAS" }
];

export default function SkillsTape() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.scrollWidth / 2);
        }
    }, []);

    return (
        <div className="relative w-full overflow-hidden py-6">
            {/* <h2 className="text-center text-2xl font-semibold mb-4 text-pink-300">
                Skills
            </h2> */}
            <div className="w-full overflow-hidden">
                <motion.div
                    ref={containerRef}
                    className="flex space-x-12"
                    animate={{ x: [0, -width] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 20,
                            ease: "linear",
                        },
                    }}
                    style={{ willChange: "transform" }}
                >
                    {[...skills, ...skills].map((skill, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-transparent"
                        >
                            <Image
                                src={skill.src}
                                alt={skill.alt}
                                width={64}
                                height={64}
                                className="object-contain w-16 h-16 hover:scale-110 transition-transform "
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
