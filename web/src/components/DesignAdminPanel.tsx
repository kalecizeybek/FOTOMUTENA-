"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { X, Upload, Activity, Database, Trash2, GripVertical, Lock, Key } from "lucide-react";
import SmartUpload from "./SmartUpload";

interface DesignAdminPanelProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (data: FormData) => void;
    refreshDesigns: () => void;
}

const DesignAdminPanel = ({ isOpen, onClose, onUpload, refreshDesigns }: DesignAdminPanelProps) => {
    const [activeTab, setActiveTab] = useState<"upload" | "manage">("upload");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [designs, setDesigns] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const auth = localStorage.getItem("mutena_auth");
            if (auth === "true") setIsLoggedIn(true);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && isLoggedIn) {
            fetchDesigns();
        }
    }, [isOpen, isLoggedIn]);

    const fetchDesigns = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/designs");
            if (res.ok) {
                const data = await res.json();
                setDesigns(data);
            }
        } catch (error) {
            console.error("Failed to fetch designs:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "mutena2026") {
            setIsLoggedIn(true);
            setLoginError(false);
            localStorage.setItem("mutena_auth", "true");
        } else {
            setLoginError(true);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu tasarımı silmek istediğinize emin misiniz?")) return;
        try {
            const res = await fetch(`/api/designs?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                const data = await res.json();
                setDesigns(data.designs);
                refreshDesigns();
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            >
                <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#070707] shadow-2xl flex flex-col md:flex-row h-[80vh]"
                >
                    <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors z-20">
                        <X size={24} />
                    </button>

                    {!isLoggedIn ? (
                        <div className="flex-1 flex items-center justify-center p-8 bg-black/60 backdrop-blur-md">
                            <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-6 items-center text-center">
                                <div className="h-16 w-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                                    <Lock size={32} className="text-zinc-600" />
                                </div>
                                <h3 className="font-syne text-2xl font-black uppercase tracking-tighter text-white">DESIGN_ADMIN</h3>
                                <div className="w-full space-y-4">
                                    <input
                                        type="password"
                                        placeholder="SİSTEM ŞİFRESİ"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-sm tracking-[0.2em] focus:outline-none focus:border-white/20 transition-all font-mono"
                                        autoFocus
                                    />
                                    <button type="submit" className="w-full bg-white text-black font-bold uppercase py-4 rounded-xl text-[10px] tracking-[0.2em]">Sisteme Bağlan</button>
                                    {loginError && <p className="text-red-500 text-[9px] uppercase tracking-widest">Hatalı Şifre.</p>}
                                </div>
                            </form>
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col gap-8 border-r border-white/5 p-8 md:w-1/4 bg-black/20">
                                <div className="flex flex-col">
                                    <h2 className="font-syne text-xl font-black uppercase tracking-tighter text-white">DESIGN_OS</h2>
                                    <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest mt-1 italic">Tasarım Arşivi v1.0</span>
                                </div>
                                <div className="space-y-2">
                                    <button onClick={() => setActiveTab("upload")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all uppercase tracking-widest text-[9px] font-bold ${activeTab === 'upload' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}>
                                        <Upload size={14} /> Yeni Ekle
                                    </button>
                                    <button onClick={() => setActiveTab("manage")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all uppercase tracking-widest text-[9px] font-bold ${activeTab === 'manage' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}>
                                        <Database size={14} /> Tasarımları Yönet
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                                {activeTab === "upload" ? (
                                    <div className="max-w-2xl mx-auto py-10 text-center">
                                        <h2 className="font-syne text-3xl font-black text-white uppercase tracking-tighter mb-4">Tasarım Yükle</h2>
                                        <SmartUpload onUpload={(data) => {
                                            onUpload(data);
                                            setTimeout(fetchDesigns, 500);
                                        }} />
                                    </div>
                                ) : (
                                    <div className="flex flex-col h-full">
                                        <h2 className="font-syne text-3xl font-black text-white uppercase tracking-tighter mb-10">Tasarım Listesi</h2>
                                        {isLoading ? <Activity className="animate-spin m-auto" /> : (
                                            <div className="flex flex-col gap-4">
                                                {designs.map((design) => (
                                                    <div key={design.id} className="flex items-center gap-6 bg-white/5 p-4 rounded-xl border border-white/5 group transition-all">
                                                        <img src={design.url} className="h-16 w-16 object-cover rounded-lg border border-white/10" alt="" />
                                                        <div className="flex-1">
                                                            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">{design.alt}</h4>
                                                            <p className="text-[8px] text-zinc-500 uppercase tracking-widest">{design.category}</p>
                                                        </div>
                                                        <button onClick={() => handleDelete(design.id)} className="p-3 text-zinc-500 hover:text-red-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all active:scale-95">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default DesignAdminPanel;
