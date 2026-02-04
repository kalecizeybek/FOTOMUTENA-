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
    const [isHiFi, setIsHiFi] = React.useState(false);

    if (!photo) return null;

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-10 backdrop-blur-3xl bg-black/95"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    className="relative flex h-full w-full max-w-7xl flex-col overflow-hidden rounded-[30px] border border-white/10 bg-[#0A0A0A] shadow-[0_0_100px_rgba(0,0,0,0.5)] sm:flex-row"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Image Section */}
                    <div className="relative flex-1 overflow-hidden bg-zinc-950 group cursor-zoom-in" onClick={() => setIsHiFi(true)}>
                        <img
                            src={photo.url}
                            alt={photo.title}
                            className="h-full w-full object-contain transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* High Fidelity Trigger Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsHiFi(true);
                            }}
                            className="absolute bottom-8 left-8 flex items-center gap-3 rounded-full bg-white/10 hover:bg-white hover:text-black px-6 py-3 backdrop-blur-xl border border-white/20 transition-all active:scale-95 group/btn"
                        >
                            <Maximize2 className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
                            <span className="font-syne text-[10px] font-bold tracking-[0.2em] uppercase">High Fidelity View</span>
                        </button>
                    </div>

                    {/* Content Section */}
                    <div className="flex w-full flex-col p-8 sm:w-[450px] sm:p-12 justify-between bg-black">
                        <div className="flex flex-col gap-12">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col gap-2">
                                    <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-[0.5em]">{photo.category} // ARCHIVE</span>
                                    <h2 className="font-syne text-5xl font-black uppercase tracking-tighter leading-[0.9] text-white">
                                        {photo.title}
                                    </h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-white hover:text-black active:scale-90"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <p className="font-sans text-[13px] font-light leading-relaxed tracking-wide text-zinc-500 max-w-md">
                                {photo.description || "Bu eser Mutena Arşivi için özel olarak kürate edilmiş, ışık ve gölgenin rüya gibi bir yansımasıdır. Dijital sanatın en saf halini temsil eder."}
                            </p>

                            <div className="flex flex-col gap-8 pt-12 border-t border-white/5">
                                <div className="flex items-center gap-3 text-zinc-400 uppercase tracking-[0.4em] font-mono text-[9px] font-bold">
                                    <Camera className="h-4 w-4" />
                                    <span>Metadata // Technical</span>
                                </div>
                                <div className="grid grid-cols-3 gap-8">
                                    <div className="flex flex-col gap-1.5">
                                        <span className="text-[9px] text-zinc-700 font-mono font-bold uppercase tracking-wider">ISO</span>
                                        <span className="text-xs font-bold text-white tracking-widest">{photo.specs?.iso || "100"}</span>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <span className="text-[9px] text-zinc-700 font-mono font-bold uppercase tracking-wider">Shut</span>
                                        <span className="text-xs font-bold text-white tracking-widest">{photo.specs?.shutter || "1/125s"}</span>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <span className="text-[9px] text-zinc-700 font-mono font-bold uppercase tracking-wider">Aper</span>
                                        <span className="text-xs font-bold text-white tracking-widest">{photo.specs?.aperture || "f/2.8"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-12 border-t border-white/5">
                            <div className="flex items-center gap-3 text-[9px] font-mono tracking-[0.4em] text-zinc-800 font-bold">
                                <Info className="h-3 w-3" />
                                <span>REF_{photo.id?.toString().padStart(3, '0')}</span>
                            </div>
                            <span className="text-[8px] text-zinc-900 font-bold tracking-widest">&copy; 2026 MUTENA</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* High Fidelity Full-Screen Overlay */}
            <AnimatePresence>
                {isHiFi && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[300] bg-black flex items-center justify-center cursor-zoom-out"
                        onClick={() => setIsHiFi(false)}
                    >
                        <motion.img
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            src={photo.url}
                            alt={photo.title}
                            className="h-full w-full object-contain p-4"
                        />
                        <button
                            className="absolute top-10 right-10 text-white/40 hover:text-white transition-colors"
                            onClick={() => setIsHiFi(false)}
                        >
                            <X className="h-10 w-10" />
                        </button>
                        <div className="absolute bottom-10 left-10 text-white/20 font-mono text-[10px] tracking-[1em] uppercase select-none">
                            High Fidelity Detail Mode
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default PhotoModal;
