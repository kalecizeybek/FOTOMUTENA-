"use client";

import React, { useRef, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

const InteractiveHeroBg = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { damping: 50, stiffness: 200 });
    const springY = useSpring(mouseY, { damping: 50, stiffness: 200 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const moveX = (clientX - window.innerWidth / 2) / 10;
            const moveY = (clientY - window.innerHeight / 2) / 10;
            mouseX.set(moveX);
            mouseY.set(moveY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-black">
            {/* Base Tone Unification */}
            <div className="absolute inset-0 bg-black" />

            {/* Layer 1: Macro Grid (Architectural Scale) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:200px_200px]" />

            {/* Layer 2: Medium Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:50px_50px] opacity-60" />

            {/* Layer 3: Micro Tactical Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:10px_10px] opacity-30" />

            {/* Layer 4: Varied Asymmetrical Blueprint Lines */}
            <motion.div
                style={{ x: useTransform(springX, (v: number) => v * 0.1), y: useTransform(springY, (v: number) => v * 0.1) }}
                className="absolute inset-0"
            >
                {/* Asymmetrical Horizontal Accents */}
                <div className="absolute top-[12%] left-0 w-full h-[0.5px] bg-white/[0.04]" />
                <div className="absolute top-[12.5%] left-0 w-full h-[1px] bg-white/[0.02]" />
                <div className="absolute top-[38%] left-10 w-[80%] h-[0.5px] bg-white/[0.06]" />
                <div className="absolute top-[62%] left-0 w-full h-[0.5px] bg-white/[0.03]" />
                <div className="absolute top-[88%] left-[20%] w-[60%] h-[0.5px] bg-white/[0.04]" />

                {/* Asymmetrical Vertical Accents */}
                <div className="absolute left-[8%] top-0 h-full w-[0.5px] bg-white/[0.04]" />
                <div className="absolute left-[33%] top-20 h-[60%] w-[0.5px] bg-white/[0.05]" />
                <div className="absolute left-[66%] top-0 h-full w-[0.5px] bg-white/[0.03]" />
                <div className="absolute left-[92%] top-0 h-full w-[0.5px] bg-white/[0.04]" />

                {/* Tactical Corner Crosshairs & Coordinates */}
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-white/[0.08]"
                        style={{
                            top: `${15 + i * 11}%`,
                            left: `${10 + (i % 3) * 32}%`
                        }}
                    >
                        <div className="relative w-4 h-4">
                            <div className="absolute top-1/2 left-0 w-full h-[0.5px] bg-white/20" />
                            <div className="absolute left-1/2 top-0 h-full w-[0.5px] bg-white/20" />
                            <span className="absolute top-4 left-4 text-[6px] font-mono tracking-tighter whitespace-nowrap">
                                {`REF_${(2026 + i).toString().slice(-2)}`} // {`0${i + 1}`}
                            </span>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Interactive Warp Effect */}
            <motion.div
                style={{ x: springX, y: springY }}
                className="absolute inset-0 opacity-[0.02]"
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vh] border-[0.5px] border-white/5 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vh] border-[0.5px] border-white/5 rounded-full" />
            </motion.div>

            {/* Glowing Mouse Follower */}
            <motion.div
                style={{
                    x: useSpring(mouseX, { damping: 60, stiffness: 40 }),
                    y: useSpring(mouseY, { damping: 60, stiffness: 40 }),
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1500px] h-[1500px] bg-white/[0.005] rounded-full blur-[200px] mix-blend-overlay"
            />
        </div>
    );
};

export default InteractiveHeroBg;
