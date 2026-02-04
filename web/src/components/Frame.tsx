"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Photo } from "@/data/photos";

interface FrameProps {
    photo: Photo;
    onClick: (photo: Photo) => void;
}

const Frame = ({ photo, onClick }: FrameProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{
                scale: 1.15,
                zIndex: 50,
            }}
            transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                scale: { duration: 0.4 }
            }}
            viewport={{ once: true }}
            onClick={() => onClick(photo)}
            className="group relative w-full cursor-pointer overflow-visible bg-transparent"
        >
            {/* Skeleton Loading State - Minimal & Transparent */}
            <AnimatePresence mode="wait">
                {!isLoaded && !hasError && (
                    <motion.div
                        key="skeleton"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10 bg-white/[0.02] flex items-center justify-center"
                    >
                        <div className="w-6 h-[1px] bg-white/10 animate-pulse" />
                    </motion.div>
                )}
            </AnimatePresence>

            {hasError && (
                <div className="flex items-center justify-center p-20 bg-zinc-900/50 border border-white/5">
                    <span className="text-[8px] text-zinc-700 uppercase tracking-widest">Error // Image Load</span>
                </div>
            )}

            <motion.img
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{
                    opacity: isLoaded ? 1 : 0,
                    scale: isLoaded ? 1 : 1.05
                }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                src={photo.url}
                alt={photo.title}
                onLoad={() => setIsLoaded(true)}
                onError={() => {
                    setHasError(true);
                    setIsLoaded(true);
                }}
                className="w-full block transition-transform duration-700 ease-out group-hover:scale-115"
            />

            {/* Museum Label */}
            <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 z-50">
                <span className="bg-black/60 backdrop-blur-xl px-4 py-1.5 text-[8px] text-white/50 uppercase tracking-[0.4em] font-medium border border-white/5">
                    {photo.id} // Index
                </span>
            </div>

            {/* Subtle Inner Glow on Hover */}
            <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-white/10 transition-all duration-500 pointer-events-none" />
        </motion.div>
    );
};

export default Frame;
