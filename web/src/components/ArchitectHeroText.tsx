"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

interface ArchitectHeroTextProps {
    text: string;
}

const ArchitecturalLetter = ({ letter, index }: { letter: string; index: number }) => {
    const [assembled, setAssembled] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAssembled(true), 100 + index * 60);
        return () => clearTimeout(timer);
    }, [index]);

    return (
        <div className="relative inline-block overflow-hidden mx-[0.02em] sm:mx-[0.05em]">
            <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={assembled ? {
                    y: 0,
                    opacity: 1,
                } : {}}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative block font-syne text-[18vw] sm:text-[14vw] font-black leading-none tracking-tighter uppercase text-white"
            >
                {letter}
            </motion.span>
        </div>
    );
};

const ArchitectHeroText = ({ text }: ArchitectHeroTextProps) => {
    return (
        <div className="relative flex flex-col items-start justify-center w-full min-h-[40vh] py-12 bg-black select-none overflow-hidden">
            {/* Reconstruction Container - Editorial Left Alignment */}
            <div className="relative flex items-center justify-start z-10 w-full px-2">
                {text.split("").map((letter, i) => (
                    <ArchitecturalLetter key={i} letter={letter} index={i} />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 1.5 }}
                className="mt-4 z-10"
            >
                <div className="h-px w-12 bg-white/10 mb-4" />
                <p className="font-sans text-[9px] text-zinc-700 font-bold uppercase tracking-[0.4em]">
                    Visual Archive // 2026
                </p>
            </motion.div>
        </div>
    );
};

export default ArchitectHeroText;
