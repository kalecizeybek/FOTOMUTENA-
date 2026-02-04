"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { photos as initialPhotos, Photo } from "@/data/photos";
import imageCompression from 'browser-image-compression';
import Link from "next/link";
import Frame from "@/components/Frame";
import CustomCursor from "@/components/CustomCursor";
import PhotoModal from "@/components/PhotoModal";
import EliteNav from "@/components/EliteNav";
import AdminPanel from "@/components/AdminPanel";
import AmbientPlayer from "@/components/AmbientPlayer";
import { ArrowDown } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import AboutModal from "@/components/AboutModal";
import ContactModal from "@/components/ContactModal";
import EliteHeroText from "@/components/EliteHeroText";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [activeFilter, setActiveFilter] = useState("Hepsi");

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = ["Hepsi", ...Array.from(new Set(initialPhotos.map(p => p.category)))];

  // Fetch Photos from Persistent API
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch("/api/photos");
        if (res.ok) {
          const data = await res.json();
          setPhotos(data);
        }
      } catch (error) {
        console.error("Failed to fetch photos:", error);
      }
    };
    fetchPhotos();
  }, []);

  const filteredPhotos = activeFilter === "Hepsi"
    ? photos
    : photos.filter(p => p.category === activeFilter);

  const handleUpload = async (formData: FormData) => {
    try {
      // 1. Smart Compression (Görseli Kalite Kaybetmeden Küçültme)
      const rawFile = formData.get("file") as File;
      let fileToUpload = rawFile;

      if (rawFile.size > 9.9 * 1024 * 1024) {
        console.log("Profesyonel sıkıştırma motoru aktif: " + (rawFile.size / 1024 / 1024).toFixed(2) + "MB");
        const options = {
          maxSizeMB: 9.5, // 10MB sınırının biraz altında kalmak güvenlidir
          maxWidthOrHeight: 4096, // 4K çözünürlük profesyonel sunum için yeterlidir
          useWebWorker: true,
          initialQuality: 0.85,
          maxIteration: 15, // Dosya hala büyükse denemeye devam et
        };
        try {
          fileToUpload = await imageCompression(rawFile, options);
          console.log("Optimizasyon bitti: " + (fileToUpload.size / 1024 / 1024).toFixed(2) + "MB");
        } catch (error) {
          console.error("Compression technical failure:", error);
        }
      }

      const title = formData.get("title") as string;
      const category = formData.get("category") as string;
      const aspectRatio = parseFloat(formData.get("aspectRatio") as string || "1");

      const cloudinaryData = new FormData();
      cloudinaryData.append("file", fileToUpload);
      cloudinaryData.append("upload_preset", "mutena_preset");
      cloudinaryData.append("cloud_name", "duamuseuj");

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/duamuseuj/image/upload`,
        {
          method: "POST",
          body: cloudinaryData,
        }
      );

      if (!cloudRes.ok) {
        const errorData = await cloudRes.json();
        console.error("Cloudinary Error Data:", errorData);
        throw new Error(`Cloudinary: ${errorData.error?.message || "Yükleme reddedildi"}`);
      }
      const cloudJson = await cloudRes.json();
      const uploadedUrl = cloudJson.secure_url;

      // 2. Metadata Update (Sadece bilgileri gönderiyoruz, dosyayı değil!)
      const res = await fetch("/api/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: uploadedUrl,
          title,
          category,
          aspectRatio,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.photos) {
          setPhotos(data.photos);
          setActiveFilter("Hepsi");
        }
        alert("Görsel başarıyla arşive eklendi!");
        return data;
      } else {
        const errData = await res.json();
        throw new Error(`Veritabanı: ${errData.error || "Sunucuya kaydedilemedi"}`);
      }
    } catch (error) {
      console.error("Direct Upload Failed:", error);
      alert("Yükleme Başarısız: " + (error as Error).message);
      throw error;
    }
  };

  const scrollToArchive = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('archive');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) return null; // Prevent hydration mismatch by holding render until mount

  return (
    <div className="relative min-h-[500vh] text-[#F5F5F0] bg-[#000000] selection:bg-white selection:text-black cursor-none overflow-x-hidden">
      <CustomCursor />

      {/* Dynamic Navigation */}
      <EliteNav
        onAdminClick={() => setIsAdminOpen(true)}
        onAboutClick={() => setIsAboutOpen(true)}
        onContactClick={() => setIsContactOpen(true)}
      />
      <AmbientPlayer />

      {/* Overlays */}
      <AnimatePresence>
        {isAboutOpen && (
          <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isContactOpen && (
          <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedPhoto && (
          <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAdminOpen && (
          <AdminPanel
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
            onUpload={handleUpload}
            refreshPhotos={() => {
              fetch("/api/photos").then(res => res.json()).then(data => setPhotos(data));
            }}
          />
        )}
      </AnimatePresence>

      {/* Hero Section - Centered Identity */}
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-[90vh] pt-32 pb-20 px-[var(--page-margin)]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <EliteHeroText text="MUTENA" />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-6 text-[10px] sm:text-[12px] font-syne font-bold tracking-[0.4em] uppercase max-w-xl leading-relaxed opacity-60 text-white"
          >
            Işığın ötesinde bir arşiv
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-8"
          >
            <Link
              href="#archive"
              onClick={scrollToArchive}
              className="inline-block px-12 py-4 bg-white text-black font-bold text-[10px] tracking-[0.4em] uppercase hover:bg-zinc-200 transition-all active:scale-95"
            >
              View Collection
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Gallery Section - Full Width Transition */}
      <section id="archive" className="relative z-10 w-full py-20 bg-black overflow-hidden px-0 sm:px-24">
        {/* Header container with mobile padding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-[1800px] mx-auto mb-16 flex flex-col gap-12 sm:flex-row sm:items-end sm:justify-between border-t border-white/5 pt-12 px-12 sm:px-0"
        >
          <div className="flex flex-col gap-4">
            <h2 className="font-syne text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white">
              Collection
            </h2>
            <p className="text-[10px] text-zinc-700 font-bold tracking-[0.4em] uppercase">Inventory // {photos.length} Pieces</p>
          </div>

          {/* Minimal Text Filters */}
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-all px-5 py-3 border ${activeFilter === cat
                  ? "bg-white text-black border-white"
                  : "text-zinc-500 border-white/10 hover:border-white/40"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="max-w-[1800px] mx-auto flex flex-col gap-[4px] md:block md:columns-4 lg:columns-6 xl:columns-8 2xl:columns-10 md:gap-1 md:space-y-1 px-[4px] md:px-0">
          {filteredPhotos.map((photo) => (
            <div key={photo.id} className="w-full md:break-inside-avoid md:mb-1">
              <Frame photo={photo} onClick={(p) => setSelectedPhoto(p)} />
            </div>
          ))}
        </div>
      </section>

      {/* Footer - Minimal & Confident */}
      <footer className="relative py-40 border-t border-white/5 mt-20 px-[var(--page-margin)]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-20">
          <div className="flex flex-col gap-6 max-w-sm">
            <h3 className="font-syne font-black text-3xl tracking-tighter uppercase text-white">FOTOMUTENA</h3>
            <p className="text-[11px] text-zinc-600 leading-relaxed tracking-wider">
              Sessizliğin içindeki derinlik. <br />
              Dijital arşivin modern yüzü.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-20">
            <div className="flex flex-col gap-4 text-[10px] font-bold tracking-widest uppercase">
              <span className="text-white mb-2 underline underline-offset-8">Information</span>
              <button onClick={() => setIsAboutOpen(true)} className="text-zinc-600 hover:text-white transition-colors text-left uppercase">Hakkımda</button>
              <button onClick={() => setIsContactOpen(true)} className="text-zinc-600 hover:text-white transition-colors text-left uppercase">İletişim</button>
            </div>
            <div className="flex flex-col gap-4 text-[10px] font-bold tracking-widest uppercase">
              <span className="text-white mb-2 underline underline-offset-8">Perspectives</span>
              <Link href="/designs" className="text-zinc-600 hover:text-white transition-colors uppercase">Tasarım</Link>
              <span className="text-zinc-800">Archive 2026</span>
            </div>
          </div>
        </div>

        <div className="mt-40 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between gap-6 text-[8px] font-bold text-zinc-800 uppercase tracking-[0.4em]">
          <span>&copy; 2026 Fotomutena</span>
          <span>Designed for clarity & character</span>
          <span className="text-zinc-900">v3.0.0 Halil Topal</span>
        </div>
      </footer>
    </div>
  );
}

