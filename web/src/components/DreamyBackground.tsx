"use client";

import React from "react";
import { motion } from "framer-motion";

const DreamyBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#020202] to-[#0f0f0f]">
            {/* The Moving Digital Mesh Grid */}
            <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage: `linear-gradient(to right, #666 1px, transparent 1px), linear-gradient(to bottom, #666 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                }}
            />

            {/* Elite Blurred Orbs - Teal/Cyan - ULTRA VISIBLE */}
            <motion.div
                animate={{
                    x: ["-20%", "20%", "-20%"],
                    y: ["-10%", "10%", "-10%"],
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 0.8, 0.6],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-[30%] top-[10%] h-[800px] w-[800px] rounded-full bg-gradient-to-br from-teal-500/60 to-cyan-600/50 blur-[100px]"
            />

            {/* Elite Blurred Orbs - Purple/Blue - ULTRA VISIBLE */}
            <motion.div
                animate={{
                    x: ["20%", "-20%", "20%"],
                    y: ["10%", "-10%", "10%"],
                    scale: [1.1, 1, 1.1],
                    opacity: [0.5, 0.7, 0.5],
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-[30%] top-[20%] h-[900px] w-[900px] rounded-full bg-gradient-to-br from-blue-600/50 to-indigo-700/40 blur-[100px]"
            />

            {/* Elite Blurred Orbs - Amber/Orange - ULTRA VISIBLE */}
            <motion.div
                animate={{
                    x: ["-15%", "15%", "-15%"],
                    y: ["15%", "-15%", "15%"],
                    scale: [1, 1.3, 1],
                    opacity: [0.45, 0.65, 0.45],
                }}
                transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-[20%] -bottom-[20%] h-[700px] w-[700px] rounded-full bg-gradient-to-br from-amber-600/50 to-orange-700/35 blur-[100px]"
            />

            {/* Elite Blurred Orbs - Emerald/Green - MAIS VISÍVEL */}
            <motion.div
                animate={{
                    x: ["10%", "-10%", "10%"],
                    y: ["-10%", "10%", "-10%"],
                    scale: [1.2, 1, 1.2],
                    opacity: [0.35, 0.55, 0.35],
                }}
                transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-[10%] -bottom-[30%] h-[750px] w-[750px] rounded-full bg-gradient-to-br from-emerald-600/35 to-green-700/25 blur-[140px]"
            />

            {/* Floating Geometric Shapes - MAIS VISÍVEL */}
            <motion.div
                animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute top-[30%] left-[15%] h-[300px] w-[300px] rounded-full border border-white/10 blur-sm"
            />

            <motion.div
                animate={{
                    rotate: [360, 0],
                    scale: [1.1, 1, 1.1],
                }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[20%] right-[20%] h-[400px] w-[400px] rounded-full border border-white/8 blur-md"
            />

            {/* Floating Dust Particles */}
            <div className="absolute inset-0 z-0">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -150, 0],
                            opacity: [0, 0.5, 0],
                            scale: [1, 1.8, 1],
                        }}
                        transition={{
                            duration: Math.random() * 20 + 15,
                            repeat: Infinity,
                            delay: Math.random() * 10,
                        }}
                        className="absolute h-[2px] w-[2px] bg-white rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            {/* Cinematic Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />

            {/* Film Grain Texture */}
            <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
};

export default DreamyBackground;


