import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { X, Upload, Check, AlertCircle, Image as ImageIcon, Activity, Database, Settings, Trash2, GripVertical, Lock, Key } from "lucide-react";
import { Photo } from "@/data/photos";

interface AdminPanelProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (data: FormData) => void;
    refreshPhotos: () => void;
}

import SmartUpload from "./SmartUpload";

const AdminPanel = ({ isOpen, onClose, onUpload, refreshPhotos }: AdminPanelProps) => {
    const [activeTab, setActiveTab] = useState<"upload" | "manage" | "settings">("upload");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [settings, setSettings] = useState<any>({
        contact: { phone: "", email: "", address: "", instagram: "", website: "" }
    });

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [file, setFile] = useState<File | null>(null);

    // Persist login
    useEffect(() => {
        if (typeof window !== "undefined") {
            const auth = localStorage.getItem("mutena_auth");
            if (auth === "true") setIsLoggedIn(true);
        }
    }, [isOpen]);

    // Load photos and settings
    useEffect(() => {
        if (isOpen && isLoggedIn) {
            fetchPhotos();
            fetchSettings();
        }
    }, [isOpen, isLoggedIn]);

    const fetchPhotos = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/photos");
            if (res.ok) {
                const data = await res.json();
                setPhotos(data);
            }
        } catch (error) {
            console.error("Failed to fetch photos:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSettings = async () => {
        try {
            const res = await fetch("/api/settings");
            if (res.ok) {
                const data = await res.json();
                setSettings(data);
            }
        } catch (error) {
            console.error("Failed to fetch settings:", error);
        }
    };

    const handleSaveSettings = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings)
            });
            if (res.ok) {
                alert("Ayarlar başarıyla kaydedildi.");
            }
        } catch (error) {
            console.error("Failed to save settings:", error);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple hardcoded password for demonstration
        if (password === "mutena2026") {
            setIsLoggedIn(true);
            setLoginError(false);
            localStorage.setItem("mutena_auth", "true");
        } else {
            setLoginError(true);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu fotoğrafı silmek istediğinize emin misiniz?")) return;

        try {
            const res = await fetch(`/api/photos?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setPhotos(prev => prev.filter(p => p.id !== id));
                refreshPhotos();
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const handleReorder = async (newPhotos: Photo[]) => {
        setPhotos(newPhotos);
        try {
            await fetch("/api/photos", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ photos: newPhotos })
            });
            refreshPhotos();
        } catch (error) {
            console.error("Reorder failed:", error);
        }
    };

    const handleFile = (selectedFile: File) => {
        const objectUrl = URL.createObjectURL(selectedFile);
        setImageUrl(objectUrl);
        setFile(selectedFile);
        if (!title) setTitle(selectedFile.name.replace(/\.[^/.]+$/, "").replace(/-/g, " "));
    };

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("category", category || "Uncategorized");

        onUpload(formData);

        // Reset
        setTitle("");
        setCategory("");
        setImageUrl("");
        setFile(null);
        // Success feedback then refresh list
        refreshPhotos();
        setTimeout(fetchPhotos, 500);
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
                    className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#070707] shadow-2xl flex flex-col md:flex-row h-full max-h-[92vh] md:h-[80vh]"
                >
                    <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors z-20">
                        <X size={24} />
                    </button>

                    {/* Auth Overlay */}
                    <AnimatePresence>
                        {!isLoggedIn && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-6 sm:p-8"
                            >
                                <motion.form
                                    onSubmit={handleLogin}
                                    initial={{ y: 20 }}
                                    animate={{ y: 0 }}
                                    className="w-full max-w-sm flex flex-col gap-6 items-center text-center"
                                >
                                    <div className="h-16 w-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                                        <Lock size={32} className="text-zinc-400" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-syne text-2xl font-black uppercase tracking-tighter text-white">ADM_ACCESS</h3>
                                        <p className="text-zinc-500 text-[10px] uppercase tracking-[0.3em]">Yönetim Paneli Girişi</p>
                                    </div>
                                    <div className="w-full space-y-4">
                                        <div className="relative">
                                            <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                            <input
                                                type="password"
                                                placeholder="SİSTEM ŞİFRESİ"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className={`w-full bg-white/5 border ${loginError ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-12 py-4 text-sm tracking-[0.2em] focus:outline-none focus:border-white/20 transition-all font-mono`}
                                                autoFocus
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-white text-black font-bold uppercase py-4 rounded-xl text-xs tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all"
                                        >
                                            Sisteme Bağlan
                                        </button>
                                        {loginError && (
                                            <p className="text-red-500 text-[9px] uppercase tracking-widest font-bold">Hatalı Şifre. Erişim Reddedildi.</p>
                                        )}
                                    </div>
                                </motion.form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Sidebar */}
                    <div className="flex flex-row md:flex-col gap-4 md:gap-8 border-b md:border-b-0 md:border-r border-white/5 p-4 sm:p-8 md:w-1/4 bg-black/20 overflow-x-auto hide-scrollbar">
                        <div className="flex flex-col min-w-[120px] md:min-w-0">
                            <h2 className="font-syne text-xl font-black uppercase tracking-tighter text-white">MUTENA_OS</h2>
                            <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest mt-1 italic">Visual Intelligence v2.0</span>
                        </div>

                        <div className="flex md:flex-col gap-2">
                            <button
                                onClick={() => setActiveTab("upload")}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all uppercase tracking-widest text-[9px] font-bold whitespace-nowrap ${activeTab === 'upload' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
                            >
                                <Upload size={14} />
                                <span className="hidden sm:inline md:inline">Yeni Ekle</span>
                            </button>
                            <button
                                onClick={() => setActiveTab("manage")}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all uppercase tracking-widest text-[9px] font-bold whitespace-nowrap ${activeTab === 'manage' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
                            >
                                <Database size={14} />
                                <span className="hidden sm:inline md:inline">Arşivi Yönet</span>
                            </button>
                            <button
                                onClick={() => setActiveTab("settings")}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all uppercase tracking-widest text-[9px] font-bold whitespace-nowrap ${activeTab === 'settings' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
                            >
                                <Settings size={14} />
                                <span className="hidden sm:inline md:inline">Ayarlar</span>
                            </button>
                        </div>

                        <div className="hidden md:block mt-auto space-y-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                <span className="block font-mono text-[8px] text-zinc-600 uppercase mb-2">Sistem Durumu</span>
                                <div className="flex items-center gap-2 text-emerald-500">
                                    <Activity className="w-3 h-3 animate-pulse" />
                                    <span className="font-mono text-[9px] tracking-widest uppercase">Encryption Active</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 overflow-y-auto p-6 sm:p-12 custom-scrollbar bg-gradient-to-br from-transparent to-white/[0.02]">
                        {activeTab === "upload" && (
                            <div className="max-w-2xl mx-auto py-10">
                                <div className="mb-10 text-center">
                                    <h2 className="font-syne text-3xl font-black text-white uppercase tracking-tighter mb-2">Fragment Yükleyici</h2>
                                    <p className="text-zinc-500 text-xs uppercase tracking-widest font-light">Arşive yüksek çözünürlüklü yeni bir eser ekleyin.</p>
                                </div>
                                <SmartUpload onUpload={async (data) => {
                                    try {
                                        setIsLoading(true);
                                        await onUpload(data);
                                        // The onUpload in page.tsx already updates state, 
                                        // but we trigger a re-fetch to be safe and update Admin list
                                        await fetchPhotos();
                                        refreshPhotos();
                                    } catch (err) {
                                        console.error("Upload failed in AdminPanel:", err);
                                        alert("Yükleme başarısız oldu. Lütfen tekrar deneyin.");
                                    } finally {
                                        setIsLoading(false);
                                    }
                                }} />
                            </div>
                        )}

                        {activeTab === "manage" && (
                            <div className="flex flex-col h-full">
                                <div className="mb-10 flex items-end justify-between">
                                    <div>
                                        <h2 className="font-syne text-3xl font-black text-white uppercase tracking-tighter mb-2">Arşiv Yönetimi</h2>
                                        <p className="text-zinc-500 text-xs uppercase tracking-widest font-light">Eserlerin sırasını değiştirin veya silin.</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-[8px] font-mono text-zinc-600 uppercase tracking-widest">
                                        <GripVertical size={12} />
                                        Drag to Reorder
                                    </div>
                                </div>

                                {isLoading ? (
                                    <div className="flex-1 flex items-center justify-center">
                                        <Activity className="animate-spin text-zinc-800" />
                                    </div>
                                ) : (
                                    <Reorder.Group
                                        axis="y"
                                        values={photos}
                                        onReorder={handleReorder}
                                        className="flex flex-col gap-2"
                                    >
                                        {photos.map((photo) => (
                                            <Reorder.Item
                                                key={photo.id}
                                                value={photo}
                                                className="group relative flex items-center gap-4 bg-white/[0.02] border border-white/5 p-3 rounded-xl hover:bg-white/[0.05] transition-all cursor-grab active:cursor-grabbing"
                                            >
                                                <GripVertical className="text-zinc-800 group-hover:text-zinc-600 transition-colors" size={16} />

                                                <div className="h-12 w-12 rounded-lg overflow-hidden bg-zinc-900 flex-shrink-0 border border-white/5">
                                                    <img src={photo.url} alt="" className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    {editingId === photo.id ? (
                                                        <div className="flex flex-col gap-2 p-2">
                                                            <input
                                                                type="text"
                                                                value={photo.title}
                                                                onChange={(e) => {
                                                                    const updated = photos.map(p => p.id === photo.id ? { ...p, title: e.target.value } : p);
                                                                    setPhotos(updated);
                                                                }}
                                                                className="bg-zinc-900 border border-white/10 text-white text-[10px] px-2 py-1 rounded outline-none"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={photo.category}
                                                                onChange={(e) => {
                                                                    const updated = photos.map(p => p.id === photo.id ? { ...p, category: e.target.value } : p);
                                                                    setPhotos(updated);
                                                                }}
                                                                className="bg-zinc-900 border border-white/10 text-zinc-400 text-[8px] px-2 py-1 rounded outline-none"
                                                            />
                                                            <textarea
                                                                value={photo.description || ""}
                                                                onChange={(e) => {
                                                                    const updated = photos.map(p => p.id === photo.id ? { ...p, description: e.target.value } : p);
                                                                    setPhotos(updated);
                                                                }}
                                                                placeholder="Açıklama"
                                                                className="bg-zinc-900 border border-white/10 text-zinc-500 text-[8px] px-2 py-1 rounded outline-none h-16 resize-none"
                                                            />
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => {
                                                                        handleReorder(photos); // Save
                                                                        setEditingId(null);
                                                                    }}
                                                                    className="text-emerald-500 text-[8px] font-bold"
                                                                >
                                                                    KAYDET
                                                                </button>
                                                                <button onClick={() => setEditingId(null)} className="text-zinc-600 text-[8px]">İPTAL</button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div onClick={() => setEditingId(photo.id)}>
                                                            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest truncate">{photo.title}</h4>
                                                            <p className="text-[8px] text-zinc-600 uppercase tracking-[0.2em]">{photo.category}</p>
                                                        </div>
                                                    )}
                                                </div>

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(photo.id);
                                                    }}
                                                    className="opacity-0 group-hover:opacity-100 p-3 text-zinc-600 hover:text-red-500 transition-all"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </Reorder.Item>
                                        ))}
                                    </Reorder.Group>
                                )}
                            </div>
                        )}

                        {activeTab === "settings" && (
                            <div className="max-w-2xl mx-auto py-10">
                                <div className="mb-10">
                                    <h2 className="font-syne text-3xl font-black text-white uppercase tracking-tighter mb-2">Sistem Ayarları</h2>
                                    <p className="text-zinc-500 text-xs uppercase tracking-widest font-light">İletişim bilgilerini ve global ayarları düzenleyin.</p>
                                </div>

                                <form onSubmit={handleSaveSettings} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[8px] text-zinc-500 uppercase tracking-[0.3em] font-bold">Telefon</label>
                                            <input
                                                type="text"
                                                value={settings.contact.phone}
                                                onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, phone: e.target.value } })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-white/20"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[8px] text-zinc-500 uppercase tracking-[0.3em] font-bold">E-Posta</label>
                                            <input
                                                type="email"
                                                value={settings.contact.email}
                                                onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, email: e.target.value } })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-white/20"
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-[8px] text-zinc-500 uppercase tracking-[0.3em] font-bold">Stüdyo Adresi</label>
                                            <input
                                                type="text"
                                                value={settings.contact.address}
                                                onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, address: e.target.value } })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-white/20"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[8px] text-zinc-500 uppercase tracking-[0.3em] font-bold">Instagram</label>
                                            <input
                                                type="text"
                                                value={settings.contact.instagram}
                                                onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, instagram: e.target.value } })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-white/20"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[8px] text-zinc-500 uppercase tracking-[0.3em] font-bold">Website</label>
                                            <input
                                                type="text"
                                                value={settings.contact.website}
                                                onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, website: e.target.value } })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-white/20"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-white text-black font-black uppercase py-6 rounded-2xl text-[10px] tracking-[0.5em] hover:scale-[1.02] active:scale-[0.98] transition-all mt-8"
                                    >
                                        Değişiklikleri Kaydet
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AdminPanel;
