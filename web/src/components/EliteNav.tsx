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
    const [currentTime, setCurrentTime] = useState("");
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const time = new Intl.DateTimeFormat('tr-TR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZone: 'Europe/Istanbul'
            }).format(new Date());
            setCurrentTime(time);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const navLinks = [
        { name: "KOLEKSİYON", href: "/#archive" },
        { name: "TASARIMLAR", href: "/designs" },
    ];

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: 0,
                    opacity: 1,
                    width: isScrolled ? "90%" : "100%",
                    top: isScrolled ? "2rem" : "0rem",
                    borderRadius: isScrolled ? "9999px" : "0px",
                    background: isScrolled ? "rgba(0,0,0,0.4)" : "transparent",
                    borderColor: isScrolled ? "rgba(255,255,255,0.1)" : "transparent",
                    backdropFilter: isScrolled ? "blur(24px)" : "blur(0px)"
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed left-1/2 z-[150] -translate-x-1/2 w-full transition-all duration-500 ease-out border border-transparent ${isScrolled ? "max-w-[95%] px-6 py-4 sm:px-10 sm:py-5" : "max-w-[95%] px-6 py-6 sm:px-12 sm:py-8"}`}
            >
                <div className="flex items-center justify-between w-full">
                    {/* Brand */}
                    <div className="flex-1 flex justify-start">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                            <h1 className={`font-syne font-black tracking-tighter uppercase leading-none transition-all duration-500 ${isScrolled ? "text-xl text-white" : "text-2xl sm:text-4xl text-white mix-blend-difference"}`}>
                                FOTOMUTENA
                            </h1>
                        </Link>
                    </div>

                    {/* Desktop Links */}
                    <div className={`hidden gap-10 lg:gap-20 font-sans font-bold tracking-[0.6em] uppercase transition-all duration-500 md:flex items-center justify-center ${isScrolled ? "text-[10px] text-zinc-500" : "text-[12px] sm:text-[13px] text-white/80 mix-blend-difference"}`}>
                        <Link href="/#archive" className="hover:text-white transition-all relative group">
                            KOLEKSİYON
                            <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-white transition-all group-hover:w-full" />
                        </Link>

                        <button onClick={onAboutClick} className="hover:text-white transition-all relative group uppercase">
                            Hakkımda
                            <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-white transition-all group-hover:w-full" />
                        </button>

                        <Link href="/designs" className="hover:text-white transition-all relative group">
                            TASARIMLAR
                            <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-white transition-all group-hover:w-full" />
                        </Link>

                        <button onClick={onContactClick} className="hover:text-white transition-all relative group uppercase">
                            İLETİŞİM
                            <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-white transition-all group-hover:w-full" />
                        </button>
                    </div>

                    {/* Right Side: Time & Mobile Toggle */}
                    <div className="flex-1 flex items-center justify-end gap-4 sm:gap-10">
                        <div className="hidden flex-col items-end sm:flex text-right">
                            <span className={`font-mono uppercase tracking-[0.3em] font-bold leading-none transition-colors ${isScrolled ? "text-[10px] text-zinc-600" : "text-[11px] text-white/70"}`}>{currentTime} IST</span>
                            <span className={`font-mono text-[8px] uppercase tracking-widest mt-1 ${isScrolled ? "text-zinc-700" : "text-white/30"}`}>Live_Stream</span>
                        </div>

                        {/* Admin Toggle */}
                        <button
                            onClick={onAdminClick}
                            className={`hidden sm:block rounded-full border p-3 transition-all hover:bg-white hover:text-black ${isScrolled ? "border-white/10 bg-white/5" : "border-white/20 bg-black/20 backdrop-blur-md"}`}
                        >
                            <div className="h-4 w-4 rounded-full border-2 border-current" />
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden flex flex-col gap-1.5 p-2 z-[200]"
                        >
                            <motion.span
                                animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                                className="w-8 h-px bg-white block"
                            />
                            <motion.span
                                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="w-8 h-px bg-white block"
                            />
                            <motion.span
                                animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                                className="w-8 h-px bg-white block"
                            />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[140] bg-black flex flex-col p-12 pt-40 md:hidden"
                    >
                        {/* Background Lines */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
                        </div>

                        <nav className="relative z-10 flex flex-col gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="font-syne text-5xl font-black uppercase tracking-tighter text-white hover:italic transition-all"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <button
                                onClick={() => { onAboutClick(); setIsMobileMenuOpen(false); }}
                                className="text-left font-syne text-5xl font-black uppercase tracking-tighter text-white hover:italic transition-all"
                            >
                                HAKKIMDA
                            </button>
                            <button
                                onClick={() => { onContactClick(); setIsMobileMenuOpen(false); }}
                                className="text-left font-syne text-5xl font-black uppercase tracking-tighter text-white hover:italic transition-all"
                            >
                                İLETİŞİM
                            </button>
                        </nav>

                        <div className="mt-auto flex flex-col gap-4 border-t border-white/10 pt-8">
                            <div className="flex justify-between items-end">
                                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest leading-none">{currentTime} IST</span>
                                <button onClick={() => { onAdminClick(); setIsMobileMenuOpen(false); }} className="text-white/40 text-[10px] font-bold uppercase tracking-widest h-10 w-10 border border-white/10 rounded-full flex items-center justify-center">
                                    A
                                </button>
                            </div>
                            <p className="font-sans text-[8px] text-zinc-700 uppercase tracking-[0.4em] leading-relaxed">
                                STUDIO MUTENA / ARCHIVE 2026.1 <br /> ALL RIGHTS RESERVED.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default EliteNav;
