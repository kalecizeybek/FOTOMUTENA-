"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

const StudioSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax Effects
    const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

    return (
        <section
            ref={containerRef}
            id="manifesto"
            className="relative min-h-[120vh] flex flex-col items-center justify-center overflow-hidden py-32"
        >
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    style={{ y: y1 }}
                    className="absolute top-1/4 left-10 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen"
                />
                <motion.div
                    style={{ y: y2 }}
                    className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[150px] mix-blend-screen"
                />
            </div>

            <motion.div
                style={{ opacity, scale }}
                className="relative z-10 container mx-auto px-6 sm:px-12 flex flex-col items-center text-center"
            >
                {/* Header Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                        Gallery v2
                    </span>
                </motion.div>
                <div className="relative font-syne font-black uppercase text-white leading-[0.85] tracking-tighter mix-blend-difference">
                    <motion.h2
                        className="text-[10vw] sm:text-[10vw] relative z-10 group cursor-default"
                        whileHover={{ scale: 1.02, color: "#fff" }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="block text-zinc-700 transition-colors duration-500 group-hover:text-white">Yeni Nesil</span>
                    </motion.h2>
                    <motion.h2
                        className="text-[10vw] sm:text-[10vw] relative z-10"
                        style={{ x: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
                    >
                        <span className="bg-gradient-to-r from-white via-zinc-400 to-zinc-800 bg-clip-text text-transparent">% Tasarımlar</span>
                    </motion.h2>
                    <motion.h2
                        className="text-[10vw] sm:text-[10vw] relative z-10 italic font-serif lowercase tracking-normal text-zinc-500"
                        style={{ x: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
                    >
                        & Tasarım
                    </motion.h2>
                </div>

                {/* Description Text with Blur Reveal */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl text-left">
                    <motion.div
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1 }}
                        className="border-t border-white/20 pt-8"
                    >
                        <h3 className="font-syne text-2xl font-bold mb-4 text-white">Manifesto v.1</h3>
                        <p className="font-sans text-zinc-400 leading-relaxed font-light text-sm sm:text-base">
                            Sıradanlığın gürültüsünde kaybolmak yerine, sessizliğin gücünü seçiyoruz.
                            Her piksel, her gölge ve her boşluk bir anlam taşır. Biz sadece görüntü oluşturmuyoruz;
                            duyguları dijital formlara döküyoruz.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="border-t border-white/20 pt-8 md:mt-24"
                    >
                        <h3 className="font-syne text-2xl font-bold mb-4 text-white">Yaklaşım</h3>
                        <p className="font-sans text-zinc-400 leading-relaxed font-light text-sm sm:text-base">
                            Minimalizm bizim için bir estetik değil, bir düşünce biçimidir.
                            Fazlalıklardan arınmış, net ve vurucu. Amacımız, izleyiciyi saniyelik bir bakışla değil,
                            derin bir izlenimle yakalamaktır.
                        </p>

                        <div className="mt-8 flex gap-4">
                            {["Işık", "Gölge", "Form"].map((tag, i) => (
                                <span key={tag} className="px-3 py-1 rounded-full border border-white/10 text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white hover:bg-white/5 transition-all cursor-default">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>

            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity: useTransform(scrollYProgress, [0.8, 1], [1, 0]) }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent" />
            </motion.div>
        </section>
    );
};

export default StudioSection;
