"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

interface ArchitectHeroTextProps {
    text: string;
}

const ArchitecturalLetter = ({ letter, index }: { letter: string; index: number }) => {
    const [assembled, setAssembled] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAssembled(true), 150 + index * 100);
        return () => clearTimeout(timer);
    }, [index]);

    return (
        <div className="relative inline-block mx-[0.2em] sm:mx-[0.4em]">
            {/* Layer 1: Vertical Entry Mask */}
            <motion.div
                initial={{ height: "0%", opacity: 0 }}
                animate={assembled ? { height: "100%", opacity: 1 } : {}}
                transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-x-0 bottom-0 bg-white/5 z-0"
            />

            {/* Layer 2: Sharp Glass Text */}
            <motion.span
                initial={{ opacity: 0, y: 100 }}
                animate={assembled ? {
                    opacity: 1,
                    y: 0,
                } : {}}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 font-syne text-[14vw] sm:text-[12vw] font-black leading-[0.8] tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-400 to-transparent"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
            >
                {letter}
            </motion.span>

            {/* Layer 3: Light Reflection Pulse */}
            <motion.div
                animate={assembled ? {
                    opacity: [0, 0.8, 0],
                    x: ["-100%", "200%"]
                } : {}}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 + index * 0.5 }}
                className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
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
                animate={{ opacity: 0.8, y: 0 }}
                transition={{ duration: 1.5, delay: 2.2 }}
                className="mt-16 sm:mt-24 flex flex-col items-center gap-8"
            >
                {/* Radar-Minimalist Architectural Mobile Layout */}
                <div className="flex md:hidden flex-col items-center gap-16 relative w-full pt-12">
                    {/* The Concentric Radar Detail */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] pointer-events-none opacity-20">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.5 }}
                            className="absolute inset-0 border border-white/10 rounded-full"
                        />
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.5 }}
                            transition={{ duration: 2, delay: 0.5 }}
                            className="absolute inset-[25%] border border-white/5 rounded-full"
                        />
                        {/* Scanning Sweep */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-transparent to-transparent rounded-full"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col items-center gap-6 z-10">
                        <div className="h-24 w-px bg-gradient-to-b from-transparent via-emerald-500/40 to-transparent" />

                        <div className="flex flex-col items-center gap-1">
                            <span className="text-[6px] text-zinc-600 font-mono tracking-[1em] uppercase">Visual_Inventory</span>
                            <div className="text-[14px] text-white font-serif italic tracking-[0.2em]">M. Archive</div>
                        </div>

                        <div className="flex items-center gap-4 mt-4">
                            <span className="text-[5px] text-zinc-800 font-mono tracking-[0.5em] uppercase">Ref. 2026</span>
                            <div className="w-2 h-2 rounded-full border border-white/20 flex items-center justify-center">
                                <div className="w-0.5 h-0.5 bg-emerald-500 rounded-full animate-ping" />
                            </div>
                            <span className="text-[5px] text-zinc-800 font-mono tracking-[0.5em] uppercase">v. 2.1.2</span>
                        </div>
                    </div>
                </div>

                {/* Desktop Layout (768px and up) */}
                <div className="hidden md:flex flex-col items-center gap-6">
                    <div className="h-px w-40 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
                    <div className="text-[12px] text-zinc-500 font-mono font-light uppercase tracking-[1.5em] text-center">
                        STRUCTURAL ARCHIVING // EST. 2026
                    </div>
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
