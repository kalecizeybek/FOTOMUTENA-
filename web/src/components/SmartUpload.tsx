"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Check, Image as ImageIcon, Plus } from "lucide-react";

interface SmartUploadProps {
    onUpload: (data: FormData) => void;
}

const SmartUpload = ({ onUpload }: SmartUploadProps) => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (selectedFile: File) => {
        if (selectedFile.size > 50 * 1024 * 1024) {
            alert("Dosya 50MB'dan çok büyük. Lütfen profesyonel arşiv sınırlarına (max 50MB) uyun.");
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setImageUrl(objectUrl);
        setFile(selectedFile);
        if (!title) setTitle(selectedFile.name.replace(/\.[^/.]+$/, "").replace(/-/g, " "));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || isUploading) return;

        try {
            setIsUploading(true);

            const aspectRatio = await new Promise<number>((resolve) => {
                const img = new Image();
                img.onload = () => {
                    resolve(img.width / img.height);
                };
                img.onerror = () => resolve(1);
                img.src = imageUrl;
            });

            const formData = new FormData();
            formData.append("file", file);
            formData.append("title", title);
            formData.append("category", category || "Uncategorized");
            formData.append("aspectRatio", aspectRatio.toString());

            await onUpload(formData);

            setTitle("");
            setCategory("");
            setImageUrl("");
            setFile(null);
        } catch (error) {
            console.error("Submit error:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="relative w-full max-w-xl mx-auto px-2">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[32px] p-6 sm:p-8 shadow-2xl"
            >
                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                    {/* Perspective Drag Zone / Mobile Tap Zone */}
                    <div
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
                        onClick={() => !isUploading && fileInputRef.current?.click()}
                        className={`
                            relative h-72 sm:h-64 rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden group
                            ${isDragging ? "border-emerald-500 bg-emerald-500/10" : "border-white/5 bg-white/5 hover:border-white/20"}
                            ${isUploading ? "cursor-wait opacity-50" : ""}
                        `}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                        />

                        {imageUrl ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">
                                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover opacity-70" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-center justify-center">
                                    {isUploading ? (
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                            <span className="text-[8px] font-bold tracking-[0.3em] text-white uppercase px-4 text-center">ARŞİVE AKTARILIYOR...</span>
                                        </div>
                                    ) : (
                                        <div className="bg-emerald-500 p-4 rounded-full shadow-lg shadow-emerald-500/20"><Check className="text-black" /></div>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="text-center space-y-6">
                                <div className="mx-auto w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform active:scale-95">
                                    <Plus className="text-zinc-400" size={32} />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] sm:text-[8px] font-bold uppercase tracking-[0.4em] text-zinc-500">Görsel Seç veya Kamerayı Aç</p>
                                    <p className="text-[8px] text-zinc-700 tracking-[0.2em]">MAX: 50MB // PRO_ARCHIVE</p>
                                </div>
                            </div>
                        )}

                        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest pl-2">Eser Adı</label>
                            <input
                                type="text"
                                placeholder="Örn: Gece ve Işık"
                                value={title}
                                disabled={isUploading}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-xl text-sm tracking-[0.1em] placeholder:text-zinc-700 focus:border-emerald-500/50 outline-none transition-all disabled:opacity-50"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest pl-2">Kategori</label>
                            <input
                                type="text"
                                placeholder="Örn: Portre"
                                value={category}
                                disabled={isUploading}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-xl text-sm tracking-[0.1em] placeholder:text-zinc-700 focus:border-emerald-500/50 outline-none transition-all disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <button
                        disabled={!file || !title || isUploading}
                        className="w-full bg-white text-black font-black uppercase py-7 rounded-2xl text-[10px] tracking-[0.5em] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-20 shadow-xl shadow-white/5"
                    >
                        {isUploading ? "VERİ TABANI GÜNCELLENİYOR..." : "ARŞİVE YÜKLE"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default SmartUpload;
