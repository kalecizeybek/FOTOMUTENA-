"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, User } from "lucide-react";

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

    // Ultra-Elite Cinematic Timing
    const transitionConfig: any = {
        duration: 3.5,
        ease: [0.16, 1, 0.3, 1],
        layout: { duration: 2.8, ease: [0.16, 1, 0.3, 1] }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: 0,
                    opacity: 1,
                    // Bulletproof mobile widths
                    width: isScrolled ? (typeof window !== 'undefined' && window.innerWidth < 768 ? "92%" : "fit-content") : "100%",
                    x: isScrolled ? "-50%" : "0%",
                    left: isScrolled ? "50%" : "0",
                    top: isScrolled ? "20px" : "0px",
                    borderRadius: isScrolled ? "30px" : "0px",
                    background: isScrolled ? "rgba(10, 10, 10, 0.8)" : "rgba(0,0,0,0)",
                    backdropFilter: isScrolled ? "blur(25px)" : "blur(0px)",
                    paddingLeft: isScrolled ? "20px" : "var(--page-margin)",
                    paddingRight: isScrolled ? "20px" : "var(--page-margin)",
                }}
                transition={transitionConfig}
                className={`fixed z-[150] border ${isScrolled
                    ? "border-white/20 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    : "border-transparent py-12 w-full"
                    } flex items-center justify-center`}
            >
                {/* Internal container - Enhanced for mobile visibility */}
                <div className={`flex items-center justify-between w-full relative z-10 ${isScrolled ? "md:gap-14" : "md:w-auto"}`}>

                    {/* Brand with its own slow transformation */}
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col items-center">
                        <motion.h1
                            layout
                            animate={{
                                scale: isScrolled ? 0.85 : 1,
                                opacity: [0.7, 1, 0.7],
                                letterSpacing: isScrolled ? "0.4em" : "0.2em",
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                            }}
                            transition={{
                                scale: { duration: 3, ease: [0.16, 1, 0.3, 1] },
                                opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                letterSpacing: { duration: 3, ease: [0.16, 1, 0.3, 1] },
                                backgroundPosition: { duration: 10, repeat: Infinity, ease: "linear" }
                            }}
                            className={`font-syne font-black tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-white bg-[length:200%_auto] transition-all duration-[3s] ${isScrolled ? "text-sm" : "text-2xl"}`}
                        >
                            FOTOMUTENA
                        </motion.h1>
                    </Link>

                    {/* Desktop Links with staggered convergence */}
                    <motion.div
                        layout
                        className="hidden md:flex items-center gap-10"
                    >
                        {[
                            { label: "Koleksiyon", href: "/#archive" },
                            { label: "Hakkımda", action: onAboutClick },
                            { label: "Tasarım", href: "/designs" },
                            { label: "İletişim", action: onContactClick }
                        ].map((item, i) => (
                            <motion.div
                                key={item.label}
                                animate={{
                                    opacity: isScrolled ? 1 : 0.6,
                                    scale: isScrolled ? 0.95 : 1,
                                    x: isScrolled ? 0 : 0
                                }}
                                transition={{
                                    delay: 0.1,
                                    duration: 2.5,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                className={`text-[9px] font-bold tracking-[0.4em] uppercase transition-colors duration-[2s] ${isScrolled ? "text-white" : "text-zinc-500"
                                    }`}
                            >
                                {item.href ? (
                                    <Link href={item.href} className="hover:text-white transition-colors relative group">
                                        {item.label}
                                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-700 group-hover:w-full opacity-30" />
                                    </Link>
                                ) : (
                                    <button onClick={item.action} className="hover:text-white transition-colors relative group uppercase">
                                        {item.label}
                                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-700 group-hover:w-full opacity-30" />
                                    </button>
                                )}
                            </motion.div>
                        ))}

                        {/* Prominent Admin Panel Button */}
                        <motion.button
                            initial={false}
                            animate={{
                                scale: isScrolled ? 0.9 : 1,
                                opacity: isScrolled ? 1 : 0.6,
                                borderColor: isScrolled ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)"
                            }}
                            whileHover={{
                                scale: 1.1,
                                backgroundColor: "rgba(255,255,255,0.05)",
                                borderColor: "rgba(255,255,255,0.4)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onAdminClick}
                            className={`flex items-center gap-2 px-4 py-2 border rounded-full transition-all duration-300 ${isScrolled ? "ml-4" : "ml-8"}`}
                        >
                            <ShieldCheck className="w-3.5 h-3.5 text-white/70" />
                            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/70">Admin</span>
                        </motion.button>
                    </motion.div>

                    {/* Mobile Menu & Admin Icon - Emergency High Visibility */}
                    <div className="md:hidden flex items-center gap-3">
                        <button
                            onClick={onAdminClick}
                            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-red-500 bg-red-500/20 active:scale-90 transition-all text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                        >
                            <ShieldCheck className="w-6 h-6" />
                        </button>
                        <button
                            onClick={toggleMobileMenu}
                            className="flex flex-col gap-1.5 p-2"
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
                </div>

                {/* Background Shimmer Effect during scroll */}
                <motion.div
                    animate={{
                        opacity: isScrolled ? [0, 0.05, 0] : 0,
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute inset-0 bg-white/10 pointer-events-none"
                />
            </motion.nav>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[140] bg-black/95 backdrop-blur-2xl flex flex-col justify-center px-12 md:hidden"
                    >
                        <div className="flex flex-col gap-8">
                            {["Koleksiyon", "Hakkımda", "Tasarım", "İletişim"].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => {
                                        if (item === "Hakkımda") onAboutClick();
                                        else if (item === "İletişim") onContactClick();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="text-left font-syne text-5xl font-black uppercase tracking-tighter text-white/20 hover:text-white transition-colors"
                                >
                                    {item}
                                </button>
                            ))}
                            <button
                                onClick={() => {
                                    onAdminClick();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="flex items-center gap-4 text-left font-syne text-3xl font-black uppercase tracking-tighter text-white hover:text-red-500 transition-colors pt-8 border-t border-white/20"
                            >
                                <ShieldCheck className="w-8 h-8 text-red-500" />
                                Yönetim Paneli
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Fixed Mobile Admin Shortcut - Bulletproof Visibility */}
            <div className="md:hidden fixed bottom-8 right-8 z-[200]">
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onAdminClick}
                    className="w-14 h-14 bg-white text-black rounded-full shadow-[0_10px_30px_rgba(255,255,255,0.3)] flex items-center justify-center border-4 border-black/10"
                >
                    <ShieldCheck className="w-7 h-7" />
                </motion.button>
            </div>
        </>
    );
};

export default EliteNav;
