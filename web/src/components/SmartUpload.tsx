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
        // limit to 10MB due to Cloudinary Free Tier restrictions
        if (selectedFile.size > 10 * 1024 * 1024) {
            alert("Cloudinary ücretsiz planı 10MB üzerindeki fotoğraflara izin vermiyor. Lütfen 10MB'den küçük bir görsel seçin.");
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
            const formData = new FormData();
            formData.append("file", file);
            formData.append("title", title);
            formData.append("category", category || "Uncategorized");

            await onUpload(formData);

            // Reset
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
        <div className="relative w-full max-w-xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[32px] p-8 shadow-2xl"
            >
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Perspective Drag Zone */}
                    <div
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
                        onClick={() => !isUploading && fileInputRef.current?.click()}
                        className={`
                            relative h-64 rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden group
                            ${isDragging ? "border-emerald-500 bg-emerald-500/10" : "border-white/5 bg-white/5 hover:border-white/20"}
                            ${isUploading ? "cursor-wait opacity-50" : ""}
                        `}
                    >
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => e.target.files && handleFile(e.target.files[0])} />

                        {imageUrl ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">
                                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover opacity-70" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-center justify-center">
                                    {isUploading ? (
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                            <span className="text-[8px] font-bold tracking-[0.3em] text-white">BULUTA AKTARILIYOR...</span>
                                        </div>
                                    ) : (
                                        <div className="bg-emerald-500 p-2 rounded-full"><Check className="text-black" /></div>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="text-center space-y-4">
                                <div className="mx-auto w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Plus className="text-zinc-400" />
                                </div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">Görseli buraya bırakın</p>
                            </div>
                        )}

                        {/* Decorative grid */}
                        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                    </div>

                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="ESER ADI"
                            value={title}
                            disabled={isUploading}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-xl text-sm tracking-[0.2em] uppercase focus:border-emerald-500/50 outline-none transition-all disabled:opacity-50"
                        />
                        <input
                            type="text"
                            placeholder="KATEGORİ"
                            value={category}
                            disabled={isUploading}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-xl text-sm tracking-[0.2em] uppercase focus:border-emerald-500/50 outline-none transition-all disabled:opacity-50"
                        />
                    </div>

                    <button
                        disabled={!file || !title || isUploading}
                        className="w-full bg-white text-black font-black uppercase py-6 rounded-2xl text-[10px] tracking-[0.5em] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-20"
                    >
                        {isUploading ? "İŞLENİYOR..." : "ARŞİVE YÜKLE"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default SmartUpload;
