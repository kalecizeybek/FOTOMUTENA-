"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

interface EliteHeroTextProps {
    text: string;
}

const EliteHeroText = ({ text }: EliteHeroTextProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 40, stiffness: 100 };
    const sx = useSpring(mouseX, springConfig);
    const sy = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Raw distance from center
            const x = (e.clientX - centerX) / (rect.width / 2);
            const y = (e.clientY - centerY) / (rect.height / 2);

            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const [hasAssembled, setHasAssembled] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setHasAssembled(true), 500);
        return () => clearTimeout(timer);
    }, []);

    // 3D Tilt Effect
    const rotateX = useTransform(sy, [-1, 1], [10, -10]);
    const rotateY = useTransform(sx, [-1, 1], [-10, 10]);

    // Proximity state for subtle reactive effects (WITHOUT constant blur)
    const proximity = useTransform([sx, sy], ([x, y]) => {
        const dist = Math.sqrt((x as number) ** 2 + (y as number) ** 2);
        return Math.max(0, 1 - dist);
    });

    // Sharp Entry Animation Logic
    const entryBlur = hasAssembled ? 0 : 20;
    const entryLetterSpacing = hasAssembled ? "-0.02em" : "0.5em";
    const entryOpacity = hasAssembled ? 1 : 0;
    const entryScale = hasAssembled ? 1 : 0.95;

    return (
        <div
            ref={containerRef}
            className="relative select-none py-32 px-6 sm:px-20 flex flex-col items-center justify-center perspective-[1000px]"
        >
            {/* Ambient Shadow Masking */}
            <motion.div
                style={{
                    x: useTransform(sx, [-1, 1], [-50, 50]),
                    y: useTransform(sy, [-1, 1], [-50, 50]),
                    opacity: useTransform(proximity, [0, 1], [0.1, 0.4])
                }}
                className="absolute inset-0 bg-radial-[at_50%_50%] from-white/10 to-transparent blur-[100px] pointer-events-none"
            />

            <motion.div
                animate={{
                    scale: entryScale,
                    opacity: entryOpacity
                }}
                transition={{
                    duration: 2.5,
                    ease: "easeOut"
                }}
                className="relative z-10"
            >
                <motion.div
                    animate={{
                        filter: `blur(${entryBlur}px)`,
                        letterSpacing: entryLetterSpacing,
                    }}
                    style={{
                        rotateX,
                        rotateY,
                    }}
                    transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative"
                >
                    <div className="relative group">
                        {/* 3D Floating Shadow (Subtle) */}
                        <motion.h2
                            style={{
                                x: useTransform(sx, [-1, 1], [15, -15]),
                                y: useTransform(sy, [-1, 1], [10, -10]),
                                opacity: 0.15
                            }}
                            className="absolute inset-0 font-syne text-[18vw] font-black leading-[0.8] tracking-tighter sm:text-[14vw] uppercase text-black/50 blur-[4px] translate-y-4 pointer-events-none"
                        >
                            {text}
                        </motion.h2>

                        {/* Initial Shine (Opening Only) */}
                        {!hasAssembled && (
                            <motion.div
                                initial={{ x: "-100%", opacity: 0 }}
                                animate={{ x: "200%", opacity: [0, 0.5, 0] }}
                                transition={{ duration: 2.5, ease: "easeInOut" }}
                                className="absolute inset-0 z-30 pointer-events-none mix-blend-overlay bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.4)_50%,transparent_75%)] bg-[length:200%_100%]"
                            />
                        )}

                        {/* Main Body - Crisp Static Chrome Effect */}
                        <h2
                            className="relative font-syne text-[18vw] font-black leading-[0.8] tracking-tighter sm:text-[14vw] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-300 to-zinc-900 drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                        >
                            {text}
                        </h2>

                        {/* Specular Highlight (Mouse Bound Only) */}
                        <motion.div
                            style={{
                                opacity: proximity,
                                x: useTransform(sx, [-1, 1], [-150, 150]),
                                y: useTransform(sy, [-1, 1], [-30, 30])
                            }}
                            className="absolute inset-0 z-20 pointer-events-none mix-blend-soft-light"
                        >
                            <h2 className="font-syne text-[18vw] font-black leading-[0.8] tracking-tighter sm:text-[14vw] uppercase text-transparent bg-clip-text bg-gradient-to-br from-transparent via-white/20 to-transparent">
                                {text}
                            </h2>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Subtext container remains interactive */}
            <motion.div
                style={{
                    letterSpacing: useTransform(proximity, [0, 1], ["1em", "0.4em"]),
                    opacity: useTransform(proximity, [0, 1], [0.1, 0.6]),
                    y: useTransform(proximity, [0, 1], [20, 0])
                }}
                className="mt-16 flex flex-col items-center gap-6"
            >
                {/* Custom Subtitle */}
                <motion.div
                    style={{
                        opacity: useTransform(proximity, [0, 1], [0.1, 0.4]),
                        letterSpacing: useTransform(proximity, [0, 1], ["1.2em", "0.8em"]),
                    }}
                    className="mt-4 text-[10px] sm:text-[12px] text-white font-syne font-medium uppercase text-center"
                >
                    Halil Topal
                </motion.div>

                <div className="hidden md:block text-[8px] text-zinc-500 font-mono font-light uppercase tracking-[0.5em] text-center mt-12">
                    ARCHIVING THE SUBLIME // STUDIO MUTENA &copy; 2026
                </div>
            </motion.div>
        </div>
    );
};

export default EliteHeroText;
