"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play, Pause, Music } from "lucide-react";

const AmbientPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Ethereal/Ambient Track URL (Royalty Free Placeholder)
    // Using a reliable CDN source for an ambient drone sound
    const AUDIO_SRC = "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3";

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.4;
            audioRef.current.loop = true;
        }
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch((e) => console.log("Audio play failed:", e));
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        if (!audioRef.current) return;
        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    return (
        <div className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-[200] flex flex-col items-end gap-4">
            <audio ref={audioRef} src={AUDIO_SRC} />

            <AnimatePresence>
                {isPlaying && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5"
                    >
                        <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest mr-2">Now Playing: Deep Focus</span>
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    height: [4, 12, 4],
                                    backgroundColor: ["#555", "#fff", "#555"]
                                }}
                                transition={{
                                    duration: 0.5 + Math.random() * 0.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.1
                                }}
                                className="w-0.5 rounded-full bg-white"
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 p-2 backdrop-blur-xl transition-all hover:bg-white/5 hover:scale-105 hover:border-white/20">
                <button
                    onClick={togglePlay}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-white hover:text-black"
                >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                </button>

                <AnimatePresence>
                    {isPlaying && (
                        <motion.button
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "auto", opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            onClick={toggleMute}
                            className="overflow-hidden pr-2"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors">
                                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                            </div>
                        </motion.button>
                    )}
                </AnimatePresence>

                {!isPlaying && (
                    <div className="pr-4 pl-2 font-mono text-[9px] text-zinc-500 uppercase tracking-widest cursor-default">
                        Sound Scape
                    </div>
                )}
            </div>
        </div>
    );
};

export default AmbientPlayer;
