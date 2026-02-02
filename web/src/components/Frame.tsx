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
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{
                scale: 1.12,
                zIndex: 40,
                boxShadow: "0 25px 50px rgba(0,0,0,0.9)"
            }}
            viewport={{ once: true }}
            onClick={() => onClick(photo)}
            className="group relative h-full w-full cursor-pointer overflow-hidden rounded-lg bg-zinc-950 transition-all duration-700 hover:rounded-xl"
        >
            {/* Skeleton Loading State */}
            <AnimatePresence>
                {!isLoaded && !hasError && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10 bg-zinc-900 animate-pulse flex items-center justify-center"
                    >
                        <div className="w-12 h-px bg-white/20" />
                    </motion.div>
                )}
            </AnimatePresence>

            {hasError && (
                <div className="absolute inset-0 z-20 bg-zinc-900 flex flex-col items-center justify-center p-4">
                    <AlertCircle className="w-6 h-6 text-zinc-600 mb-2" />
                    <span className="text-[8px] text-zinc-500 uppercase tracking-widest text-center">Görsel Yüklenemedi</span>
                </div>
            )}

            <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                whileHover={{ scale: 1.08 }}
                src={photo.url}
                alt={photo.title}
                onLoad={() => setIsLoaded(true)}
                onError={() => {
                    setHasError(true);
                    setIsLoaded(true); // Stop loading pulse
                }}
                className="h-full w-full object-cover grayscale brightness-75 transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-100"
            />

            {/* Minimal Info on Hover */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end p-4 text-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-linear-to-t from-black/90 to-transparent">
                <h3 className="font-serif text-lg italic leading-tight text-white">
                    {photo.title}
                </h3>
                <span className="mt-1 font-sans text-[7px] font-light uppercase tracking-widest text-zinc-400">
                    {photo.category}
                </span>
            </div>

            {/* Subtle Overlay Glow */}
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 group-hover:ring-white/20 transition-all pointer-events-none" />
        </motion.div>
    );
};

export default Frame;
