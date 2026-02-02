"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, Mail, Instagram, Twitter, Linkedin, ExternalLink } from "lucide-react";

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AboutModal = ({ isOpen, onClose }: AboutModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
                initial={{ y: 100, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 100, opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A] shadow-2xl"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 z-20 rounded-full bg-white/5 p-2 text-white/50 transition-all hover:bg-white/10 hover:text-white"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col md:flex-row h-[80vh] md:h-[70vh]">

                    {/* Left Side: Photo & Brand */}
                    <div className="relative h-64 md:h-auto w-full md:w-2/5 overflow-hidden bg-zinc-900 border-b md:border-b-0 md:border-r border-white/5">
                        {/* Placeholder for realistic photo effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop"
                            alt="Profile"
                            className="h-full w-full object-cover grayscale opacity-80 hover:scale-105 hover:grayscale-0 transition-all duration-700"
                        />

                        <div className="absolute bottom-8 left-8 z-20">
                            <span className="block font-mono text-xs text-emerald-500 mb-2">● AVAILABLE FOR HIRE</span>
                            <h2 className="font-syne text-4xl font-black text-white leading-none uppercase">
                                Ahmet<br />Yılmaz
                            </h2>
                            <span className="text-zinc-400 text-sm mt-1 block">Visual Artist & Developer</span>
                        </div>
                    </div>

                    {/* Right Side: Content */}
                    <div className="flex-1 overflow-y-auto p-8 md:p-12 scrollbar-hide">

                        {/* Biography */}
                        <div className="mb-12">
                            <h3 className="font-syne text-xl font-bold text-white mb-4 uppercase flex items-center gap-3">
                                <span className="w-8 h-px bg-emerald-500"></span>
                                Biyografi
                            </h3>
                            <p className="font-sans text-zinc-400 leading-relaxed text-sm md:text-base">
                                Dijital dünyanın karmaşasında sadeliği arayan bir tasarımcı ve geliştiriciyim.
                                2018'den beri görsel sanatlar ve kullanıcı deneyimi üzerine çalışıyorum.
                                Amacım, teknolojiyi estetikle birleştirerek unutulmaz dijital deneyimler yaratmak.
                                <br /><br />
                                Minimalizm, sadece az şey kullanmak değil, en önemli olanı vurgulamaktır.
                                Her pikselin bir amacı olduğuna inanıyorum.
                            </p>
                        </div>

                        {/* Skills & Stats */}
                        <div className="grid grid-cols-2 gap-8 mb-12">
                            <div>
                                <h4 className="font-mono text-xs text-zinc-500 uppercase mb-4 tracking-widest">Yetenekler</h4>
                                <ul className="space-y-2 text-sm text-zinc-300 font-light">
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full" /> UI/UX Design</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full" /> React & Next.js</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full" /> Photography</li>
                                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full" /> Motion Graphics</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-mono text-xs text-zinc-500 uppercase mb-4 tracking-widest">İstatistikler</h4>
                                <div className="space-y-4">
                                    <div>
                                        <span className="block text-2xl font-syne font-bold text-white">50+</span>
                                        <span className="text-xs text-zinc-500">Tamamlanan Proje</span>
                                    </div>
                                    <div>
                                        <span className="block text-2xl font-syne font-bold text-white">5Y</span>
                                        <span className="text-xs text-zinc-500">Deneyim</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="font-syne text-xl font-bold text-white mb-6 uppercase flex items-center gap-3">
                                <span className="w-8 h-px bg-blue-500"></span>
                                İletişim
                            </h3>
                            <div className="flex flex-wrap gap-4">
                                <a href="#" className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white text-sm hover:bg-white hover:text-black transition-all group">
                                    <Mail size={16} /> hi@ahmet.com
                                </a>
                                <a href="#" className="flex items-center gap-2 px-4 py-3 rounded-full border border-white/10 bg-white/5 text-white text-sm hover:bg-[#1DA1F2] hover:border-[#1DA1F2] transition-all">
                                    <Twitter size={16} />
                                </a>
                                <a href="#" className="flex items-center gap-2 px-4 py-3 rounded-full border border-white/10 bg-white/5 text-white text-sm hover:bg-[#E1306C] hover:border-[#E1306C] transition-all">
                                    <Instagram size={16} />
                                </a>
                                <a href="#" className="flex items-center gap-2 px-4 py-3 rounded-full border border-white/10 bg-white/5 text-white text-sm hover:bg-[#0077B5] hover:border-[#0077B5] transition-all">
                                    <Linkedin size={16} />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AboutModal;
