"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

interface PremiumHeroTextProps {
    text: string;
}

const PremiumHeroText = ({ text }: PremiumHeroTextProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const sx = useSpring(mouseX, springConfig);
    const sy = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Chromatic aberration offsets
    const RedX = useTransform(sx, (v) => v * 0.05);
    const BlueX = useTransform(sx, (v) => v * -0.05);
    const ShineX = useTransform(sx, (v) => v * 0.8);

    return (
        <div ref={containerRef} className="relative select-none py-20 px-10">
            {/* Background Glow that follows mouse */}
            <motion.div
                style={{ x: sx, y: sy }}
                className="absolute inset-0 bg-white/[0.03] blur-[120px] rounded-full pointer-events-none"
            />

            <div className="relative flex items-center justify-center">
                {/* Layer 1: Red Shift */}
                <motion.h2
                    style={{ x: RedX }}
                    className="absolute font-syne text-[18vw] font-black leading-[0.8] tracking-tighter sm:text-[14vw] uppercase text-red-500/20 mix-blend-screen blur-[2px]"
                >
                    {text}
                </motion.h2>

                {/* Layer 2: Blue Shift */}
                <motion.h2
                    style={{ x: BlueX }}
                    className="absolute font-syne text-[18vw] font-black leading-[0.8] tracking-tighter sm:text-[14vw] uppercase text-blue-500/20 mix-blend-screen blur-[2px]"
                >
                    {text}
                </motion.h2>

                {/* Layer 3: Main Dynamic Gradient Text */}
                <motion.h2
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative font-syne text-[18vw] font-black leading-[0.8] tracking-tighter sm:text-[14vw] uppercase text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 via-zinc-400 to-zinc-900 z-10"
                >
                    {text}
                </motion.h2>

                {/* Layer 4: Silver Shine Overlay */}
                <motion.div
                    style={{ x: ShineX }}
                    className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
                >
                    <h2 className="font-syne text-[18vw] font-black leading-[0.8] tracking-tighter sm:text-[14vw] uppercase text-transparent bg-clip-text bg-gradient-to-r from-transparent via-white/40 to-transparent blur-[1px]">
                        {text}
                    </h2>
                </motion.div>

                {/* Secondary Masking Reflection */}
                <motion.div
                    style={{ x: useTransform(sx, (v) => v * -0.2), y: useTransform(sy, (v) => v * -0.1) }}
                    className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center opacity-30"
                >
                    <h2 className="font-syne text-[18vw] font-black leading-[0.8] tracking-tighter sm:text-[14vw] uppercase text-transparent bg-clip-text bg-gradient-to-tr from-transparent via-zinc-200/20 to-transparent italic">
                        {text}
                    </h2>
                </motion.div>
            </div>

            {/* Subtext with dynamic spacing */}
            <motion.div
                style={{ letterSpacing: useTransform(sx, (v) => `${Math.abs(v / 50) + 0.2}em`) }}
                className="mt-8 text-[10px] text-zinc-600 font-mono uppercase tracking-[0.2em] opacity-50"
            >
                Visual Intelligence & High Fidelity Archiving
            </motion.div>
        </div>
    );
};

export default PremiumHeroText;
