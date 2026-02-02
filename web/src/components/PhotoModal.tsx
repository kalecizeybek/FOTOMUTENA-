"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Photo } from "@/data/photos";
import { X, Camera, Info, Maximize2 } from "lucide-react";

interface PhotoModalProps {
    photo: Photo | null;
    onClose: () => void;
}

const PhotoModal = ({ photo, onClose }: PhotoModalProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-10 backdrop-blur-2xl bg-black/80"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative flex h-full w-full max-w-7xl flex-col overflow-hidden rounded-[40px] border border-white/10 bg-[#0A0A0A] shadow-2xl sm:flex-row"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Image Section */}
                <div className="relative flex-1 overflow-hidden bg-zinc-950">
                    <img
                        src={photo?.url}
                        alt={photo?.title}
                        className="h-full w-full object-contain"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent pointer-events-none" />

                    <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 backdrop-blur-md border border-white/5">
                        <Maximize2 className="h-3 w-3 text-white/60" />
                        <span className="font-mono text-[9px] tracking-widest text-white/60 uppercase">High Fidelity View</span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex w-full flex-col p-8 sm:w-[400px] sm:p-12 justify-between">
                    <div className="flex flex-col gap-10">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col">
                                <span className="font-serif text-xl italic text-zinc-500 mb-1">{photo?.category}</span>
                                <h2 className="font-syne text-5xl font-extrabold uppercase tracking-tighter leading-none">
                                    {photo?.title}
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white hover:text-black"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <p className="font-sans text-xs font-light leading-relaxed tracking-wider text-zinc-400">
                            {photo?.description || "Bu eser Mutena Arşivi için özel olarak kürate edilmiş, ışık ve gölgenin rüya gibi bir yansımasıdır. Dijital sanatın en saflığını temsil eder."}
                        </p>

                        <div className="flex flex-col gap-6 pt-10 border-t border-white/5">
                            <div className="flex items-center gap-3 text-zinc-500 uppercase tracking-widest font-mono text-[10px]">
                                <Camera className="h-4 w-4" />
                                <span>Teknik Detaylar</span>
                            </div>
                            <div className="grid grid-cols-3 gap-8">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] text-zinc-600 font-mono">ISO</span>
                                    <span className="text-sm font-bold text-white tracking-widest">{photo?.specs?.iso || "N/A"}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] text-zinc-600 font-mono">SHUTTER</span>
                                    <span className="text-sm font-bold text-white tracking-widest">{photo?.specs?.shutter || "N/A"}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[9px] text-zinc-600 font-mono">APERTURE</span>
                                    <span className="text-sm font-bold text-white tracking-widest">{photo?.specs?.aperture || "N/A"}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-zinc-700">
                        <Info className="h-3 w-3" />
                        <span>ART_REF_{photo?.id?.toString().padStart(3, '0')}</span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PhotoModal;
