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

    // Static values to remove interactivity
    const rotateX = 0;
    const rotateY = 0;
    const proximity = 1;

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
            {/* Ambient Shadow Masking (Static) */}
            <motion.div
                style={{
                    opacity: 0.15
                }}
                className="absolute inset-0 bg-radial-[at_50%_50%] from-white/10 to-transparent blur-[100px] pointer-events-none"
            />

            <motion.div
                animate={{
                    scale: hasAssembled ? [1, 1.02, 1] : entryScale,
                    opacity: hasAssembled ? 1 : entryOpacity
                }}
                transition={{
                    duration: hasAssembled ? 12 : 2.5,
                    repeat: hasAssembled ? Infinity : 0,
                    ease: "easeOut"
                }}
                className="relative z-10 w-full"
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
                    className="relative w-full flex flex-col items-center"
                >
                    <div className="relative group w-full flex justify-center">
                        {/* 3D Floating Shadow (Static) */}
                        <motion.h2
                            style={{
                                x: 15,
                                y: 10,
                                opacity: 0.15
                            }}
                            className="absolute inset-0 font-syne text-[20vw] sm:text-[14vw] font-black leading-[0.8] tracking-tighter uppercase text-black/50 blur-[4px] translate-y-4 pointer-events-none text-center"
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
                            className="relative font-syne text-[20vw] sm:text-[14vw] font-black leading-[0.8] tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-300 to-zinc-900 drop-shadow-[0_0_15px_rgba(255,255,255,0.05)] text-center"
                        >
                            {text}
                        </h2>

                        {/* Specular Highlight (Static) */}
                        <div
                            style={{
                                opacity: 0.3
                            }}
                            className="absolute inset-0 z-20 pointer-events-none mix-blend-soft-light flex justify-center"
                        >
                            <h2 className="font-syne text-[20vw] sm:text-[14vw] font-black leading-[0.8] tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-br from-transparent via-white/20 to-transparent text-center">
                                {text}
                            </h2>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Subtext container - Stable & Elegant */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1.5 }}
                className="mt-12 flex flex-col items-center gap-6"
            >
                {/* Custom Subtitle */}
                <div className="text-[12px] text-white/50 font-syne font-bold uppercase tracking-[0.6em] text-center">
                    Halil Topal
                </div>
            </motion.div>
        </div>
    );
};

export default EliteHeroText;
