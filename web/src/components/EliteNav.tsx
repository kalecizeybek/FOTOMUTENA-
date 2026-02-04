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
                    background: isScrolled ? "rgba(0,0,0,0.9)" : "transparent",
                    backdropFilter: isScrolled ? "blur(20px)" : "blur(0px)"
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 w-full z-[150] transition-all duration-500 border-b ${isScrolled ? "border-white/5 py-4" : "border-transparent py-8"} px-[var(--page-margin)]`}
            >
                <div className="flex items-center justify-between w-full">
                    {/* Brand */}
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                        <h1 className="font-syne font-black text-2xl tracking-tighter uppercase leading-none text-white">
                            FOTOMUTENA
                        </h1>
                    </Link>

                    {/* Desktop Links - Minimal Editorial Style */}
                    <div className="hidden md:flex items-center gap-12 text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500">
                        <Link href="/#archive" className="hover:text-white transition-colors">
                            Koleksiyon
                        </Link>
                        <button onClick={onAboutClick} className="hover:text-white transition-colors uppercase">
                            Hakkımda
                        </button>
                        <Link href="/designs" className="hover:text-white transition-colors">
                            Tasarım
                        </Link>
                        <button onClick={onContactClick} className="hover:text-white transition-colors uppercase">
                            İletişim
                        </button>

                        {/* Dot for Admin */}
                        <button
                            onClick={onAdminClick}
                            className="w-2 h-2 rounded-full border border-white/20 hover:bg-white transition-all ml-4"
                        />
                    </div>

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
