"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isHovering, setIsHovering] = useState(false);

    // Ultra-fluid and elastic spring config
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            const target = e.target as HTMLElement;
            if (target.closest("img") || target.closest("a") || target.closest("button")) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [cursorX, cursorY]);

    return (
        <>
            {/* The Fluid Center Core */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[10000] rounded-full bg-white mix-blend-difference"
                animate={{
                    width: isHovering ? 80 : 8,
                    height: isHovering ? 80 : 8,
                }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />

            {/* The Outer Ghost Ring */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-white/20"
                animate={{
                    width: isHovering ? 100 : 40,
                    height: isHovering ? 100 : 40,
                    opacity: isHovering ? 0.8 : 0.3,
                    scale: isHovering ? 1.2 : 1
                }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />

            {/* Subtle Trail Light */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9998] h-32 w-32 rounded-full bg-white/[0.03] blur-2xl"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
        </>
    );
};

export default CustomCursor;
