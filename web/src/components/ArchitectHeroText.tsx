"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

interface ArchitectHeroTextProps {
    text: string;
}

const ArchitecturalLetter = ({ letter, index }: { letter: string; index: number }) => {
    const [assembled, setAssembled] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAssembled(true), 400 + index * 150);
        return () => clearTimeout(timer);
    }, [index]);

    // High-tension spring for the "snap" effect
    const springConfig = { stiffness: 200, damping: 25, mass: 1 };

    return (
        <div className="relative inline-block mx-[0.05em] px-1 sm:mx-[0.2em] sm:px-4">
            {/* The Main Letter (Revealed after snap) */}
            <motion.span
                initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                animate={assembled ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 font-syne text-[12vw] sm:text-[14vw] md:text-[15vw] font-black leading-[0.8] tracking-tighter sm:tracking-normal uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-300 to-zinc-900"
            >
                {letter}
            </motion.span>

            {/* Architectural Shards (Large segments forming the letter) */}
            {!assembled && (
                <>
                    {/* Left Diagonal Shard */}
                    <motion.div
                        initial={{ x: -300, y: -200, rotate: -45, opacity: 0 }}
                        animate={{ x: 0, y: 0, rotate: 0, opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, delay: index * 0.1, ease: "circOut" }}
                        className="absolute inset-0 z-20"
                    >
                        <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent skew-x-12 blur-[1px]" />
                    </motion.div>

                    {/* Right Diagonal Shard */}
                    <motion.div
                        initial={{ x: 300, y: 200, rotate: 45, opacity: 0 }}
                        animate={{ x: 0, y: 0, rotate: 0, opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, delay: index * 0.1 + 0.1, ease: "circOut" }}
                        className="absolute inset-0 z-20"
                    >
                        <div className="w-full h-full bg-gradient-to-bl from-white/20 to-transparent -skew-x-12 blur-[1px]" />
                    </motion.div>
                </>
            )}

            {/* The Flash/Impact Effect */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={assembled ? { opacity: [0, 1, 0], scale: [0, 1.5, 2] } : {}}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0 z-30 pointer-events-none bg-white/20 mix-blend-overlay rounded-full blur-xl"
            />
        </div>
    );
};

const ArchitectHeroText = ({ text }: ArchitectHeroTextProps) => {
    return (
        <div className="relative flex flex-col items-center justify-center py-24 sm:py-40 bg-black select-none">
            {/* Reconstruction Container */}
            <div className="relative flex items-center justify-center">
                {text.split("").map((letter, i) => (
                    <ArchitecturalLetter key={i} letter={letter} index={i} />
                ))}
            </div>

            {/* High-End Subtext Reveal */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ duration: 1.5, delay: 2.2 }}
                className="mt-12 sm:mt-24 flex flex-col items-center gap-6"
            >
                <div className="h-px w-40 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
                <div className="text-[10px] sm:text-[12px] text-zinc-500 font-mono font-light uppercase tracking-[1.5em] text-center">
                    STRUCTURAL ARCHIVING // EST. 2026
                </div>
            </motion.div>

            {/* Ambient Background Structure */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,#333,transparent)]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            </div>
        </div>
    );
};

export default ArchitectHeroText;
