"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, Phone, Mail, Instagram, MapPin, Globe } from "lucide-react";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
    const [settings, setSettings] = React.useState<any>(null);

    React.useEffect(() => {
        if (isOpen) {
            fetch("/api/settings")
                .then(res => res.json())
                .then(data => setSettings(data));
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-12">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            {/* Modal Content */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900/50 p-8 sm:p-16 shadow-2xl"
            >
                {/* Decorative Elements */}
                <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/5 blur-[80px]" />
                <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white/5 blur-[80px]" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-8 top-8 rounded-full border border-white/10 bg-white/5 p-3 text-white transition-all hover:bg-white hover:text-black"
                >
                    <X size={20} />
                </button>

                <div className="relative flex flex-col gap-12">
                    <div className="flex flex-col gap-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-zinc-500">Contact / İletişim</span>
                        <h2 className="font-syne text-5xl font-black uppercase tracking-tighter text-white sm:text-7xl">
                            BAĞLANTI <br /> <span className="text-zinc-600 italic">KURUN.</span>
                        </h2>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2">
                        {/* Contact Items */}
                        <div className="flex flex-col gap-8">
                            <ContactItem
                                icon={<Phone size={18} />}
                                label="Telefon"
                                value={settings?.contact?.phone || "Yükleniyor..."}
                                href={`tel:${settings?.contact?.phone}`}
                            />
                            <ContactItem
                                icon={<Mail size={18} />}
                                label="E-Posta"
                                value={settings?.contact?.email || "Yükleniyor..."}
                                href={`mailto:${settings?.contact?.email}`}
                            />
                            <ContactItem
                                icon={<MapPin size={18} />}
                                label="Stüdyo"
                                value={settings?.contact?.address || "Yükleniyor..."}
                                href="#"
                            />
                        </div>

                        <div className="flex flex-col gap-8">
                            <ContactItem
                                icon={<Instagram size={18} />}
                                label="Instagram"
                                value={settings?.contact?.instagram || "Yükleniyor..."}
                                href={`https://instagram.com/${settings?.contact?.instagram?.replace('@', '')}`}
                            />
                            <ContactItem
                                icon={<Globe size={18} />}
                                label="Website"
                                value={settings?.contact?.website || "Yükleniyor..."}
                                href={`https://${settings?.contact?.website}`}
                            />
                            <div className="mt-auto pt-8">
                                <p className="font-sans text-[9px] leading-relaxed tracking-widest text-zinc-600 uppercase">
                                    Projeleriniz için 7/24 <br /> aktif iletişim kanallarımız.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const ContactItem = ({ icon, label, value, href }: { icon: any, label: string, value: string, href: string }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-6 transition-all"
    >
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/5 bg-white/5 text-zinc-500 transition-all group-hover:border-white/20 group-hover:bg-white group-hover:text-black">
            {icon}
        </div>
        <div className="flex flex-col gap-1">
            <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-700">{label}</span>
            <span className="font-sans text-sm font-medium tracking-wider text-zinc-300 transition-colors group-hover:text-white">{value}</span>
        </div>
    </a>
);

export default ContactModal;
