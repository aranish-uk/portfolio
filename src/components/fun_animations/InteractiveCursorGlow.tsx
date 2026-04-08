"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function InteractiveCursorGlow() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    return (
        <motion.div
            className="pointer-events-none fixed top-0 left-0 z-[1] rounded-full"
            animate={{
                x: mousePosition.x - (isHovering ? 150 : 200),
                y: mousePosition.y - (isHovering ? 150 : 200),
                width: isHovering ? 300 : 400,
                height: isHovering ? 300 : 400,
                opacity: isHovering ? 0.3 : 0.15,
            }}
            transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 0.5,
            }}
            style={{
                background: 'radial-gradient(circle, rgba(236,72,153,0.8) 0%, rgba(168,85,247,0.4) 40%, rgba(59,130,246,0) 80%)',
                filter: 'blur(40px)',
            }}
        />
    );
}
