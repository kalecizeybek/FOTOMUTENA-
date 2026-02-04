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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1]
            }}
            viewport={{ once: true }}
            onClick={() => onClick(photo)}
            className="group relative w-full h-full cursor-pointer overflow-hidden bg-black flex items-center justify-center"
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
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{
                    opacity: isLoaded ? 1 : 0,
                    scale: isLoaded ? 1 : 1.1
                }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                src={photo.url}
                alt={photo.title}
                onLoad={() => setIsLoaded(true)}
                onError={() => {
                    setHasError(true);
                    setIsLoaded(true);
                }}
                className="w-full h-full object-cover sm:h-auto sm:object-contain transition-transform duration-[2s] ease-out group-hover:scale-110"
            />

            {/* Museum Label - Refined for both mobile/desktop */}
            <div className="absolute bottom-10 left-10 md:top-8 md:left-8 md:bottom-auto opacity-0 group-hover:opacity-100 sm:group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 z-50">
                <div className="flex flex-col gap-2">
                    <span className="text-[8px] text-white/40 uppercase tracking-[0.5em] font-medium">
                        {photo.category} // {photo.id}
                    </span>
                    <h3 className="text-sm text-white font-syne font-black uppercase tracking-tighter">{photo.title}</h3>
                </div>
            </div>

            {/* Subtle Gradient Overlay for Mobile Readability */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent opacity-40 sm:hidden pointer-events-none" />

            {/* Hover Reveal Border - Desktop Only */}
            <div className="absolute inset-0 border border-white/0 sm:group-hover:border-white/10 transition-all duration-700 pointer-events-none" />
        </motion.div>
    );
};

export default Frame;
