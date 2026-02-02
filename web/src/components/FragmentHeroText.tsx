"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FragmentHeroTextProps {
    text: string;
}

const FragmentHeroText = ({ text }: FragmentHeroTextProps) => {
    const [isAssembled, setIsAssembled] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsAssembled(true), 500);
        return () => clearTimeout(timer);
    }, []);

    // Generate random shards
    const shards = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        initialX: (Math.random() - 0.5) * 1000,
        initialY: (Math.random() - 0.5) * 1000,
        rotate: Math.random() * 360,
        scale: 0.5 + Math.random(),
        delay: Math.random() * 0.8,
    }));

    return (
        <div className="relative flex flex-col items-center justify-center py-40 bg-black overflow-hidden select-none">
            {/* Shard Particles Assembly */}
            <div className="absolute inset-0 pointer-events-none">
                {shards.map((shard) => (
                    <motion.div
                        key={shard.id}
                        initial={{
                            x: shard.initialX,
                            y: shard.initialY,
                            rotate: shard.rotate,
                            opacity: 0,
                            scale: shard.scale
                        }}
                        animate={isAssembled ? {
                            x: 0,
                            y: 0,
                            rotate: 0,
                            opacity: [0, 1, 0],
                            scale: 0.2
                        } : {}}
                        transition={{
                            duration: 2.5,
                            delay: shard.delay,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        <svg width="40" height="40" viewBox="0 0 40 40">
                            <path
                                d="M20 0 L40 40 L0 40 Z"
                                fill="currentColor"
                                className="text-zinc-600/20"
                            />
                        </svg>
                    </motion.div>
                ))}
            </div>

            {/* Main Text Reveal */}
            <div className="relative z-10">
                <motion.h2
                    initial={{ opacity: 0, letterSpacing: "1.5em", filter: "blur(20px)" }}
                    animate={isAssembled ? {
                        opacity: 1,
                        letterSpacing: "-0.02em",
                        filter: "blur(0px)"
                    } : {}}
                    transition={{
                        duration: 3,
                        delay: 0.2,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    className="font-syne text-[18vw] font-black leading-[0.8] tracking-tighter sm:text-[14vw] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-400 to-zinc-900 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                >
                    {text}
                </motion.h2>

                {/* Ghost/Echo Reveal */}
                <motion.h2
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={isAssembled ? {
                        opacity: [0, 0.4, 0],
                        scale: [1.2, 1, 1.2]
                    } : {}}
                    transition={{
                        duration: 4,
                        delay: 0.5,
                        ease: "easeOut"
                    }}
                    className="absolute inset-0 font-syne text-[18vw] font-black leading-[0.8] tracking-tighter sm:text-[14vw] uppercase text-white/10 blur-[10px]"
                >
                    {text}
                </motion.h2>
            </div>

            {/* Cinematic Subtext */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isAssembled ? { opacity: 0.4, y: 0 } : {}}
                transition={{ duration: 2, delay: 2.5 }}
                className="mt-12 flex flex-col items-center gap-6"
            >
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
                <div className="text-[8px] sm:text-[10px] text-zinc-500 font-mono font-light uppercase tracking-[1em] text-center">
                    Constructing the Infinite
                </div>
            </motion.div>

            {/* Structural Grid Background (Subtle) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isAssembled ? { opacity: 0.05 } : {}}
                className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
            >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100px_100px]" />
            </motion.div>
        </div>
    );
};

export default FragmentHeroText;
