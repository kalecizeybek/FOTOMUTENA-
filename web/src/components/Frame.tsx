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
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{
                scale: 1.25,
                zIndex: 50,
            }}
            transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                scale: { duration: 0.4 }
            }}
            viewport={{ once: true }}
            onClick={() => onClick(photo)}
            className="group relative w-full cursor-pointer overflow-visible bg-transparent rounded-sm"
        >
            {/* Minimal Skeleton */}
            {!isLoaded && !hasError && (
                <div className="absolute inset-0 bg-white/[0.02] animate-pulse" />
            )}

            {hasError && (
                <div className="flex items-center justify-center p-20 bg-zinc-900 border border-white/5">
                    <span className="text-[8px] text-zinc-700 uppercase tracking-widest">Error // Image Load</span>
                </div>
            )}

            <motion.img
                initial={{ opacity: 0 }}
                animate={{
                    opacity: isLoaded ? 1 : 0,
                }}
                transition={{ duration: 1.2 }}
                src={photo.url}
                alt={photo.title}
                onLoad={() => setIsLoaded(true)}
                onError={() => {
                    setHasError(true);
                    setIsLoaded(true);
                }}
                className="w-full h-auto block transition-transform duration-1000 ease-out group-hover:scale-150 rounded-sm"
            />

            {/* Museum Label */}
            <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 z-50">
                <span className="bg-black/80 backdrop-blur-2xl px-4 py-1.5 text-[8px] text-white/50 uppercase tracking-[0.4em] font-medium border border-white/5">
                    {photo.id} // Index
                </span>
            </div>

            {/* Hover Reveal Border */}
            <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-all duration-500 pointer-events-none rounded-sm" />

            {/* Soft Shadow on Hover */}
            <div className="absolute inset-x-0 -bottom-10 h-20 bg-black/40 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
        </motion.div>
    );
};

export default Frame;
