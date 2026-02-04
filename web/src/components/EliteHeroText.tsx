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

    // 3D Tilt Effect
    const rotateX = useTransform(sy, [-1, 1], [15, -15]);
    const rotateY = useTransform(sx, [-1, 1], [-15, 15]);

    // Focus state based on proximity to center (0,0)
    const proximity = useTransform([sx, sy], ([x, y]) => {
        const dist = Math.sqrt((x as number) ** 2 + (y as number) ** 2);
        return Math.max(0, 1 - dist);
    });

    const blurValue = useTransform(proximity, [0, 1], [15, 0]);
    const letterSpacing = useTransform(proximity, [0, 1], ["0.5em", "-0.02em"]);
    const textOpacity = useTransform(proximity, [0, 1], [0.3, 1]);
    const scale = useTransform(proximity, [0, 1], [0.95, 1.05]);

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
                    opacity: [0.7, 1, 0.7],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="relative z-10"
            >
                <motion.div
                    style={{
                        rotateX,
                        rotateY,
                        scale,
                        filter: useTransform(blurValue, (v) => `blur(${v}px)`),
                    }}
                    className="relative transition-all duration-1000 ease-out"
                >
                    <div className="relative group">
                        {/* Prismatic Aberration Layer - Red (Mouse Reactive) */}
                        <motion.h2
                            style={{
                                x: useTransform(sx, [-1, 1], [-5, 5]),
                                opacity: useTransform(proximity, [0, 1], [0.1, 0.3]),
                            }}
                            className="absolute inset-0 font-syne text-[18vw] font-black leading-[0.8] tracking-tighter sm:text-[14vw] uppercase text-[#ff0000] mix-blend-screen blur-[2px] pointer-events-none"
                        >
                            {text}
                        </motion.h2>

                        {/* Prismatic Aberration Layer - Blue (Mouse Reactive) */}
                        <motion.h2
                            style={{
                                x: useTransform(sx, [-1, 1], [5, -5]),
                                opacity: useTransform(proximity, [0, 1], [0.1, 0.3]),
                            }}
                            className="absolute inset-0 font-syne text-[18vw] font-black leading-[0.8] tracking-tighter sm:text-[14vw] uppercase text-[#0000ff] mix-blend-screen blur-[2px] pointer-events-none"
                        >
                            {text}
                        </motion.h2>

                        {/* Shadow Depth Layer */}
                        <motion.h2
                            style={{
                                x: useTransform(sx, [-1, 1], [10, -10]),
                                y: useTransform(sy, [-1, 1], [10, -10]),
                                opacity: useTransform(proximity, [0, 1], [0.1, 0.5])
                            }}
                            className="absolute inset-0 font-syne text-[18vw] font-black leading-[0.8] tracking-tighter sm:text-[14vw] uppercase text-black/80 blur-[8px] pointer-events-none"
                        >
                            {text}
                        </motion.h2>

                        {/* Main Ethereal Body - Shifting Gradients */}
                        <motion.h2
                            style={{
                                opacity: textOpacity,
                                letterSpacing
                            }}
                            animate={{
                                backgroundImage: [
                                    "linear-gradient(to bottom, #ffffff, #d4d4d8, #52525b)",
                                    "linear-gradient(to bottom, #d4d4d8, #ffffff, #a1a1aa)",
                                    "linear-gradient(to bottom, #ffffff, #d4d4d8, #52525b)"
                                ]
                            }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="relative font-syne text-[18vw] font-black leading-[0.8] tracking-tighter sm:text-[14vw] uppercase text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                        >
                            {text}
                        </motion.h2>

                        {/* Ethereal Light Leak (Slow Sweep) */}
                        <motion.div
                            animate={{
                                x: ["-150%", "150%"],
                                opacity: [0, 0.2, 0]
                            }}
                            transition={{
                                duration: 18,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute inset-0 z-40 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-30deg] pointer-events-none"
                        />
                    </div>
                </motion.div>
            </motion.div>

            {/* Dynamic Synchronized Subtext */}
            <motion.div
                style={{
                    letterSpacing: useTransform(proximity, [0, 1], ["1em", "0.4em"]),
                    opacity: useTransform(proximity, [0, 1], [0.2, 0.8]),
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

                {/* Desktop Layout - Secondary */}
                <div className="hidden md:block text-[8px] text-zinc-500 font-mono font-light uppercase tracking-[0.5em] text-center mt-12">
                    ARCHIVING THE SUBLIME // STUDIO MUTENA &copy; 2026
                </div>
            </motion.div>

            {/* Silver Dust Particles (CSS Animation handled in global if needed, here via motion) */}
            <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0, 1, 0],
                            x: [Math.random() * 100 - 50, Math.random() * 100 - 50]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                        className="absolute w-px h-px bg-white rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default EliteHeroText;
