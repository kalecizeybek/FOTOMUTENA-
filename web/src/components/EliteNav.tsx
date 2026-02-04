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
                    width: isScrolled ? "fit-content" : "100%",
                    x: isScrolled ? "-50%" : "0%",
                    left: isScrolled ? "50%" : "0",
                    top: isScrolled ? "32px" : "0px",
                    borderRadius: isScrolled ? "80px" : "0px",
                    background: isScrolled ? "rgba(255, 255, 255, 0.05)" : "rgba(0,0,0,0)",
                    backdropFilter: isScrolled ? "blur(40px)" : "blur(0px)",
                    paddingLeft: isScrolled ? "32px" : "var(--page-margin)",
                    paddingRight: isScrolled ? "32px" : "var(--page-margin)",
                }}
                transition={transitionConfig}
                className={`fixed z-[150] border ${isScrolled
                    ? "border-white/10 py-3 shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
                    : "border-transparent py-12 w-full"
                    } flex items-center justify-center overflow-hidden`}
            >
                {/* Internal container to manage layout shift smoothly */}
                <div className={`flex items-center justify-between w-full max-w-[1800px] ${isScrolled ? "md:gap-14" : ""} relative z-10`}>

                    {/* Brand */}
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col items-center">
                        <motion.h1
                            layout
                            className={`font-syne font-black tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-white bg-[length:200%_auto] transition-all duration-300 ${isScrolled ? "text-sm" : "text-2xl"}`}
                        >
                            FOTOMUTENA
                        </motion.h1>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-10">
                        {[
                            { label: "Koleksiyon", href: "/#archive" },
                            { label: "Hakkımda", action: onAboutClick },
                            { label: "Tasarım", href: "/designs" },
                            { label: "İletişim", action: onContactClick }
                        ].map((item) => (
                            <div key={item.label} className="text-[9px] font-bold tracking-[0.4em] uppercase text-zinc-500 hover:text-white transition-colors">
                                {item.href ? (
                                    <Link href={item.href}>{item.label}</Link>
                                ) : (
                                    <button onClick={item.action}>{item.label}</button>
                                )}
                            </div>
                        ))}

                        {/* PC Admin Button */}
                        <button
                            onClick={onAdminClick}
                            className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full hover:bg-white/10 transition-all ml-4"
                        >
                            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/50">Admin</span>
                        </button>
                    </div>

                    <div className="md:hidden flex items-center gap-3">
                        <button
                            onClick={onAdminClick}
                            className="relative flex items-center justify-center w-12 h-12 rounded-full border-2 border-red-500/50 bg-red-500/10 active:scale-90 transition-all text-red-500"
                        >
                            <ShieldCheck className="w-6 h-6" />
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                        </button>
                        <button
                            onClick={toggleMobileMenu}
                            className="flex flex-col gap-1.5 p-3 bg-white/5 rounded-xl border border-white/10"
                        >
                            <div className="w-6 h-px bg-white" />
                            <div className="w-6 h-px bg-white" />
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
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-3xl flex flex-col justify-center px-12 md:hidden"
                    >
                        <div className="flex flex-col gap-8">
                            {["Yönetim", "Koleksiyon", "Hakkımda", "Tasarım", "İletişim"].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => {
                                        if (item === "Hakkımda") onAboutClick();
                                        else if (item === "İletişim") onContactClick();
                                        else if (item === "Yönetim") onAdminClick();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`text-left font-syne text-5xl font-black uppercase tracking-tighter transition-colors flex items-center gap-4 ${item === 'Yönetim' ? 'text-red-500' : 'text-white/20'} hover:text-white`}
                                >
                                    {item}
                                    {item === "Yönetim" && (
                                        <>
                                            <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded font-mono tracking-widest animate-pulse">LIVE</span>
                                            <span className="text-[8px] text-white/40 font-mono tracking-tighter">v3.3</span>
                                        </>
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default EliteNav;
