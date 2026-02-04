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

    return (
        <div className="relative inline-block mx-[0.1em] sm:mx-[0.2em]">
            {/* Background Glow Depth */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={assembled ? { opacity: [0, 0.4, 0], scale: [0.8, 1.2, 1.5] } : {}}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute inset-0 bg-white/10 blur-2xl rounded-full"
            />

            {/* The Main Letter */}
            <motion.span
                initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
                animate={assembled ? {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
                } : {}}
                className="relative z-10 font-syne text-[16vw] sm:text-[14vw] md:text-[15vw] font-black leading-[0.8] tracking-tighter sm:tracking-normal uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-800 mix-blend-difference"
            >
                {letter}
            </motion.span>

            {/* Architectural Shadow Delay (Added Depth) */}
            <motion.span
                initial={{ opacity: 0 }}
                animate={assembled ? { opacity: 0.15 } : {}}
                className="absolute top-2 left-1 z-0 font-syne text-[16vw] sm:text-[14vw] md:text-[15vw] font-black leading-[0.8] tracking-tighter uppercase text-white/10 blur-[2px]"
            >
                {letter}
            </motion.span>
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
                {/* Ultra-Minimalist Architectural Mobile Layout */}
                <div className="flex md:hidden flex-col items-center gap-12 relative w-full px-4">
                    {/* The Kinetic Frame (The "Something Extra") */}
                    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[85vw] h-[60vw] pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 2, delay: 1 }}
                            className="absolute inset-0 border-[0.5px] border-white/5 rounded-sm"
                        >
                            {/* Corner L-Shapes */}
                            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-emerald-500/30" />
                            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/10" />
                            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/10" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-emerald-500/30" />
                        </motion.div>

                        {/* Vertical Scanning Detail */}
                        <motion.div
                            animate={{ top: ["10%", "90%", "10%"] }}
                            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                            className="absolute left-[-5%] w-[110%] h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
                        />
                    </div>

                    {/* Sophisticated Text Elements */}
                    <div className="flex flex-col items-center gap-4 z-10">
                        <div className="flex items-center gap-6">
                            <span className="text-[6px] text-zinc-600 font-mono tracking-[0.4em] uppercase">Visual_Arch</span>
                            <div className="h-[0.5px] w-6 bg-white/5" />
                            <span className="text-[6px] text-zinc-600 font-mono tracking-[0.4em] uppercase">Ref_2026</span>
                        </div>

                        <div className="flex flex-col items-center gap-1">
                            <div className="flex items-center gap-2">
                                <div className="h-[1px] w-2 bg-emerald-500/40" />
                                <span className="text-[7px] text-emerald-500/60 font-mono tracking-[0.3em] uppercase">[ Global_Archive ]</span>
                                <div className="h-[1px] w-2 bg-emerald-500/40" />
                            </div>
                        </div>
                    </div>

                    {/* Architectural Pillar Line */}
                    <div className="h-16 w-px bg-gradient-to-b from-white/10 to-transparent" />
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
