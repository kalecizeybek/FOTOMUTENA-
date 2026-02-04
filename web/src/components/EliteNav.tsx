"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";

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
                <div className={`flex items-center justify-between ${isScrolled ? "gap-14" : "w-full"} relative z-10`}>

                    {/* Brand with its own slow transformation */}
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col items-center">
                        <motion.h1
                            layout
                            animate={{
                                scale: isScrolled ? 0.9 : 1,
                                opacity: [0.8, 1, 0.8],
                                letterSpacing: isScrolled ? "0.3em" : "0.5em",
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                            }}
                            transition={{
                                scale: { duration: 3, ease: [0.16, 1, 0.3, 1] },
                                opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                letterSpacing: { duration: 3, ease: [0.16, 1, 0.3, 1] },
                                backgroundPosition: { duration: 10, repeat: Infinity, ease: "linear" }
                            }}
                            className={`font-serif font-light tracking-[0.2em] uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-white bg-[length:200%_auto] transition-all duration-[3s] italic ${isScrolled ? "text-lg" : "text-3xl"}`}
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

                        {/* Status Dot with slow pulse */}
                        <motion.button
                            initial={false}
                            animate={{
                                scale: isScrolled ? 0.8 : 1,
                                borderColor: isScrolled ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)"
                            }}
                            whileHover={{ scale: 1.4, backgroundColor: "#fff" }}
                            onClick={onAdminClick}
                            className={`w-2 h-2 rounded-full border transition-all duration-[2s] ${isScrolled ? "ml-4" : "ml-8"}`}
                        />
                    </motion.div>

                    {/* Mobile Menu Icon */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden flex flex-col gap-1.5 p-2"
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
                        <nav className="flex flex-col gap-8">
                            {["Koleksiyon", "Hakkımda", "Tasarım", "İletişim"].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => {
                                        if (item === "Hakkımda") onAboutClick();
                                        else if (item === "İletişim") onContactClick();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="text-left font-syne text-5xl font-black uppercase tracking-tighter text-zinc-800 hover:text-white transition-colors"
                                >
                                    {item}
                                </button>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default EliteNav;
