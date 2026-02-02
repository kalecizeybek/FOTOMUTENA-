"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomCursor from "@/components/CustomCursor";
import DreamyBackground from "@/components/DreamyBackground";
import EliteNav from "@/components/EliteNav";
import AmbientPlayer from "@/components/AmbientPlayer";
import DesignAdminPanel from "@/components/DesignAdminPanel";
import ContactModal from "@/components/ContactModal";
import AboutModal from "@/components/AboutModal";
import { Plus, Maximize2 } from "lucide-react";

interface Design {
    id: string;
    url: string;
    alt: string;
    category: string;
    specs?: {
        tool: string;
        version: string;
        type: string;
    }
}

export default function DesignsPage() {
    const [designs, setDesigns] = useState<Design[]>([]);
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);

    useEffect(() => {
        fetchDesigns();
    }, []);

    const fetchDesigns = async () => {
        try {
            const res = await fetch("/api/designs");
            if (res.ok) {
                const data = await res.json();
                setDesigns(data);
            }
        } catch (error) {
            console.error("Failed to fetch designs:", error);
        }
    };

    const handleUpload = async (formData: FormData) => {
        try {
            const res = await fetch("/api/designs", {
                method: "POST",
                body: formData,
            });
            if (res.ok) {
                const data = await res.json();
                setDesigns(data.designs);
            }
        } catch (error) {
            console.error("Failed to upload design:", error);
        }
    };

    return (
        <div className="relative min-h-screen text-[#F5F5F0] bg-[#000000] selection:bg-white selection:text-black cursor-none overflow-x-hidden">
            <DreamyBackground />
            <CustomCursor />

            <EliteNav
                onAdminClick={() => setIsAdminOpen(true)}
                onAboutClick={() => setIsAboutOpen(true)}
                onContactClick={() => setIsContactOpen(true)}
            />

            <AmbientPlayer />

            {/* Modals */}
            <AnimatePresence>
                {isAdminOpen && (
                    <DesignAdminPanel
                        isOpen={isAdminOpen}
                        onClose={() => setIsAdminOpen(false)}
                        onUpload={handleUpload}
                        refreshDesigns={fetchDesigns}
                    />
                )}
                {isContactOpen && (
                    <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
                )}
                {isAboutOpen && (
                    <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
                )}
            </AnimatePresence>

            {/* Blueprint Grid Layout */}
            <main className="relative pt-32 md:pt-40 pb-32 px-6 sm:px-12 md:px-24">
                {/* Architectural Lines Background */}
                <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                </div>

                {/* Page Header */}
                <header className="relative z-10 mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="flex flex-col gap-4">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="font-mono text-[10px] uppercase tracking-[0.8em] text-zinc-600"
                        >
                            Drafting / Studio Mutena
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-syne text-5xl sm:text-8xl font-black uppercase tracking-tighter leading-none"
                        >
                            TASARIM <br /> <span className="text-zinc-800 italic">ARŞİVİ.</span>
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col items-end gap-2"
                    >
                        <p className="font-sans text-[9px] uppercase tracking-[0.4em] text-zinc-500 max-w-[200px] text-right leading-loose">
                            Yeni nesil mimari formlar ve dijital taslakların deneysel dökümü.
                        </p>
                        <div className="h-px w-32 bg-white/10" />
                    </motion.div>
                </header>

                {/* The Asymmetric Grid */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:auto-rows-[100px]">
                    {designs.length === 0 ? (
                        <div className="col-span-12 py-32 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-[40px] bg-white/[0.02]">
                            <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">Henüz bir tasarım eklenmedi.</span>
                            <button
                                onClick={() => setIsAdminOpen(true)}
                                className="mt-8 flex items-center gap-2 text-white/40 hover:text-white transition-colors"
                            >
                                <Plus size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest">Yükle</span>
                            </button>
                        </div>
                    ) : (
                        designs.map((design, index) => {
                            // Logic for asymmetric grid sizes
                            const spans = [
                                "md:col-span-8 md:row-span-6",
                                "md:col-span-4 md:row-span-4",
                                "md:col-span-4 md:row-span-6",
                                "md:col-span-4 md:row-span-3",
                                "md:col-span-8 md:row-span-4",
                                "md:col-span-4 md:row-span-5",
                            ];
                            const spanClass = spans[index % spans.length];

                            return (
                                <motion.div
                                    key={design.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className={`relative group overflow-hidden rounded-3xl bg-zinc-900 border border-white/5 ${spanClass}`}
                                >
                                    <img
                                        src={design.url}
                                        alt={design.alt}
                                        className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                                    />

                                    {/* Blueprint Overlay */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <span className="font-mono text-[8px] text-zinc-400 uppercase tracking-widest">v {design.specs?.version || '0.1'}</span>
                                            <button className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10 hover:bg-white hover:text-black transition-all">
                                                <Maximize2 size={16} />
                                            </button>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <span className="font-mono text-[8px] text-teal-500 uppercase tracking-widest">{design.category}</span>
                                            <h3 className="font-syne text-2xl font-black uppercase tracking-tighter text-white">{design.alt}</h3>
                                        </div>
                                    </div>

                                    {/* Corner Details */}
                                    <div className="absolute top-4 left-4 h-4 w-4 border-t border-l border-white/20 opacity-40 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-white/20 opacity-40 group-hover:opacity-100 transition-opacity" />
                                </motion.div>
                            );
                        })
                    )}
                </div>

                {/* Footer Copy for the page */}
                <div className="mt-32 flex flex-col items-center gap-12 text-center relative z-10">
                    <div className="h-px w-24 bg-white/10" />
                    <p className="font-serif italic text-2xl sm:text-4xl text-zinc-600 max-w-2xl px-6 leading-relaxed">
                        "En saf haliyle mimari, zihindeki bir fikrin fiziksel bir form kazanmadan önceki <strong className="text-zinc-300">son durak noktasıdır.</strong>"
                    </p>
                    <span className="font-mono text-[8px] text-zinc-700 uppercase tracking-[0.5em]">Studio Mutena Research Dep. &copy; 2026</span>
                </div>
            </main>
        </div>
    );
}
