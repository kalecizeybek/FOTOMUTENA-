"use client";

import React from "react";
import { motion } from "framer-motion";

const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-[#080808]">
            {/* Abstract Moving Orbs */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute -left-[10%] -top-[10%] h-[60vh] w-[60vh] rounded-full bg-white/[0.02] blur-[120px]"
            />
            <motion.div
                animate={{
                    x: [0, -80, 0],
                    y: [0, 100, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute -right-[5%] top-[20%] h-[50vh] w-[50vh] rounded-full bg-white/[0.015] blur-[100px]"
            />
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="absolute bottom-[10%] left-[20%] h-[40vh] w-[40vh] rounded-full bg-white/[0.01] blur-[80px]"
            />

            {/* Dynamic Starfield / Particles */}
            <div className="absolute inset-0 z-0">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            opacity: [0.05, 0.4, 0.05],
                        }}
                        transition={{
                            duration: Math.random() * 8 + 5,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                        className="absolute h-[1px] w-[1px] bg-white rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            {/* Noise Texture Overlay for graininess */}
            <div className="absolute inset-0 opacity-[0.2] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
};

export default AnimatedBackground;
