"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

interface ArchitectHeroTextProps {
    text: string;
}

const ArchitecturalLetter = ({ letter, index }: { letter: string; index: number }) => {
    const [assembled, setAssembled] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAssembled(true), 200 + index * 100);
        return () => clearTimeout(timer);
    }, [index]);

    return (
        <div className="relative inline-block overflow-hidden mx-[0.05em] sm:mx-[0.1em] px-1">
            {/* The Cinematic Slide-up */}
            <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={assembled ? {
                    y: 0,
                    opacity: 1,
                } : {}}
                transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
                className="relative block font-syne text-[18vw] sm:text-[15vw] font-black leading-none tracking-tighter uppercase text-white"
            >
                {letter}
            </motion.span>

            {/* Subtle Vertical Support Line */}
            <motion.div
                initial={{ height: 0 }}
                animate={assembled ? { height: "40%" } : {}}
                transition={{ duration: 2, delay: 0.5 }}
                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[0.5px] bg-emerald-500/20 z-0"
            />
        </div>
    );
};

const ArchitectHeroText = ({ text }: ArchitectHeroTextProps) => {
    return (
        <div className="relative flex flex-col items-center justify-center py-24 sm:py-48 bg-black select-none overflow-hidden w-full">
            {/* Viewfinder Corners (The Professional Edge) */}
            <div className="absolute inset-8 pointer-events-none z-20">
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/20" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/20" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/20" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/20" />

                {/* Center Crosshair */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-[1px] bg-white/10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-[1px] bg-white/10" />
            </div>

            {/* Reconstruction Container */}
            <div className="relative flex items-center justify-center z-10">
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
                {/* Technical Specification Grid (v2.3) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-6 w-full max-w-2xl px-8 z-10 mt-12">
                    <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
                        <span className="text-[6px] text-zinc-600 font-mono tracking-widest uppercase">Lens_Data</span>
                        <span className="text-[10px] text-white font-mono tracking-wider">35mm f/1.4 G-Master</span>
                    </div>
                    <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
                        <span className="text-[6px] text-zinc-600 font-mono tracking-widest uppercase">Coordinates</span>
                        <span className="text-[10px] text-white font-mono tracking-wider text-emerald-500/80">41.008° N, 28.978° E</span>
                    </div>
                    <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
                        <span className="text-[6px] text-zinc-600 font-mono tracking-widest uppercase">System_State</span>
                        <span className="text-[10px] text-white font-mono tracking-wider">Visual_Arch_v2.3.0</span>
                    </div>
                    <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
                        <span className="text-[6px] text-zinc-600 font-mono tracking-widest uppercase">Exposure</span>
                        <span className="text-[10px] text-white font-mono tracking-wider uppercase">ISO 100 // 1/250s</span>
                    </div>
                </div>

                {/* Desktop Pillar (Hidden on mobile) */}
                <div className="hidden md:flex flex-col items-center gap-6 mt-16 w-full">
                    <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                    <div className="text-[9px] text-zinc-700 font-mono font-light uppercase tracking-[2em] text-center w-full">
                        MUTENA ARCHITECTURAL ARCHIVE // 2026
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
