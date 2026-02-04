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
        </div>
    );
};

const ArchitectHeroText = ({ text }: ArchitectHeroTextProps) => {
    return (
        <div className="relative flex flex-col items-center justify-center py-12 sm:py-24 bg-black select-none overflow-hidden w-full">
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

            {/* Ambient Background Structure */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,#333,transparent)]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            </div>
        </div>
    );
};

export default ArchitectHeroText;
