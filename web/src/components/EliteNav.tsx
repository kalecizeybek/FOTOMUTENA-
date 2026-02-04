"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

interface EliteNavProps {
    onAdminClick: () => void;
    onAboutClick: () => void;
    onContactClick: () => void;
}

const EliteNav = ({ onAdminClick, onAboutClick, onContactClick }: EliteNavProps) => {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: 0,
                    opacity: 1,
                    width: isScrolled ? "fit-content" : "100%",
                    x: isScrolled ? "-50%" : "0%",
                    left: isScrolled ? "50%" : "0",
                    top: isScrolled ? "32px" : "0px",
                    borderRadius: isScrolled ? "100px" : "0px",
                    background: isScrolled ? "rgba(0,0,0,0.3)" : "transparent",
                    backdropFilter: isScrolled ? "blur(24px)" : "blur(0px)",
                    paddingLeft: isScrolled ? "40px" : "var(--page-margin)",
                    paddingRight: isScrolled ? "40px" : "var(--page-margin)",
                }}
                transition={{
                    duration: 2.5,
                    ease: [0.19, 1, 0.22, 1], // cinematic slow
                    layout: { duration: 2.0, ease: [0.19, 1, 0.22, 1] }
                }}
                className={`fixed z-[150] border ${isScrolled ? "border-white/5 py-3.5 shadow-[0_30px_100px_rgba(0,0,0,0.6)]" : "border-transparent py-12 w-full"} flex items-center justify-center`}
            >
                <div className={`flex items-center justify-between ${isScrolled ? "gap-16" : "w-full"}`}>
                    {/* Brand */}
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                        <motion.h1
                            layout
                            animate={{
                                scale: [1, 1.03, 1],
                                opacity: [0.9, 1, 0.9]
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className={`font-syne font-black tracking-tighter uppercase leading-none text-white transition-all duration-[1.5s] ${isScrolled ? "text-sm" : "text-2xl"}`}
                        >
                            FOTOMUTENA
                        </motion.h1>
                    </Link>

                    {/* Desktop Links - Ultra Minimal Elite Style */}
                    <motion.div
                        layout
                        className={`hidden md:flex items-center gap-12 text-[9px] font-bold tracking-[0.5em] uppercase ${isScrolled ? "text-zinc-300" : "text-zinc-500"}`}
                    >
                        <Link href="/#archive" className="hover:text-white transition-all duration-700 relative group">
                            Koleksiyon
                            <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-white transition-all duration-700 group-hover:w-full group-hover:left-0 opacity-30" />
                        </Link>
                        <button onClick={onAboutClick} className="hover:text-white transition-all duration-700 uppercase relative group text-left">
                            Hakkımda
                            <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-white transition-all duration-700 group-hover:w-full group-hover:left-0 opacity-30" />
                        </button>
                        <Link href="/designs" className="hover:text-white transition-all duration-700 relative group">
                            Tasarım
                            <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-white transition-all duration-700 group-hover:w-full group-hover:left-0 opacity-30" />
                        </Link>
                        <button onClick={onContactClick} className="hover:text-white transition-all duration-700 uppercase relative group text-left">
                            İletişim
                            <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-white transition-all duration-700 group-hover:w-full group-hover:left-0 opacity-30" />
                        </button>

                        {/* Dot for Admin */}
                        <motion.button
                            initial={false}
                            animate={{ scale: isScrolled ? 0.8 : 1 }}
                            whileHover={{ scale: 1.5, backgroundColor: "#fff" }}
                            onClick={onAdminClick}
                            className={`w-2 h-2 rounded-full border border-white/20 transition-all duration-1000 ${isScrolled ? "ml-4" : "ml-8"}`}
                        />
                    </motion.div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden flex flex-col gap-1.5 p-2 z-[200]"
                    >
                        <motion.span
                            animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                            className="w-6 h-px bg-white block"
                        />
                        <motion.span
                            animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                            className="w-6 h-px bg-white block"
                        />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay - Minimalist Editorial */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[140] bg-black flex flex-col px-[var(--page-margin)] pt-40 md:hidden"
                    >
                        <nav className="flex flex-col gap-10">
                            <Link
                                href="/#archive"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="font-syne text-5xl font-black uppercase tracking-tighter text-zinc-800 hover:text-white transition-colors"
                            >
                                Koleksiyon
                            </Link>
                            <button
                                onClick={() => { onAboutClick(); setIsMobileMenuOpen(false); }}
                                className="text-left font-syne text-5xl font-black uppercase tracking-tighter text-zinc-800 hover:text-white transition-colors"
                            >
                                Hakkımda
                            </button>
                            <Link
                                href="/designs"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="font-syne text-5xl font-black uppercase tracking-tighter text-zinc-800 hover:text-white transition-colors"
                            >
                                Tasarım
                            </Link>
                            <button
                                onClick={() => { onContactClick(); setIsMobileMenuOpen(false); }}
                                className="text-left font-syne text-5xl font-black uppercase tracking-tighter text-zinc-800 hover:text-white transition-colors"
                            >
                                İletişim
                            </button>
                        </nav>

                        <div className="mt-auto pb-12 flex flex-col gap-8">
                            <button
                                onClick={() => { onAdminClick(); setIsMobileMenuOpen(false); }}
                                className="text-left font-sans text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-700 hover:text-white transition-colors flex items-center gap-3"
                            >
                                <span className="w-2 h-2 rounded-full border border-current" />
                                Erişim Paneli
                            </button>
                            <p className="font-sans text-[8px] text-zinc-900 uppercase tracking-[0.2em]">
                                MUTENA &copy; 2026 // Halil Topal
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default EliteNav;
