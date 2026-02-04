"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Photo } from "@/data/photos";
import { AlertCircle } from "lucide-react";

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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => onClick(photo)}
            className="group relative w-full cursor-pointer overflow-hidden mb-1"
            style={{
                aspectRatio: photo.aspectRatio ? `${photo.aspectRatio}` : 'auto',
                minHeight: !photo.aspectRatio ? '300px' : 'auto'
            }}
        >
            {/* Skeleton Loading State */}
            <AnimatePresence>
                {!isLoaded && !hasError && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10 bg-zinc-900 flex items-center justify-center"
                    >
                        <div className="w-8 h-px bg-white/10" />
                    </motion.div>
                )}
            </AnimatePresence>

            {hasError && (
                <div className="absolute inset-0 z-20 bg-zinc-900 flex flex-col items-center justify-center p-4">
                    <span className="text-[7px] text-zinc-700 uppercase tracking-widest text-center underline underline-offset-4">Error // Source</span>
                </div>
            )}

            <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                src={photo.url}
                alt={photo.title}
                onLoad={() => setIsLoaded(true)}
                onError={() => {
                    setHasError(true);
                    setIsLoaded(true);
                }}
                className="w-full h-auto"
            />

            {/* Museum Label (Invisible/Subtle) */}
            <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="bg-black/40 backdrop-blur-md px-3 py-1 text-[8px] text-white/50 uppercase tracking-[0.2em] font-medium">
                    {photo.id} // Index
                </span>
            </div>
        </motion.div>
    );
};

export default Frame;
