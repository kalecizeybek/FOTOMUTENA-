"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { photos as initialPhotos, Photo } from "@/data/photos";
import imageCompression from 'browser-image-compression';
import Frame from "@/components/Frame";
import CustomCursor from "@/components/CustomCursor";
import DreamyBackground from "@/components/DreamyBackground";
import PhotoModal from "@/components/PhotoModal";
import EliteNav from "@/components/EliteNav";
import Manifesto from "@/components/Manifesto";
import AdminPanel from "@/components/AdminPanel";
import AmbientPlayer from "@/components/AmbientPlayer";
import { ArrowDown } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import AboutModal from "@/components/AboutModal";
import ContactModal from "@/components/ContactModal";
import InteractiveHeroBg from "@/components/InteractiveHeroBg";
import ArchitectHeroText from "@/components/ArchitectHeroText";

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

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 200 });

  const heroScrollY = useTransform(smoothProgress, [0, 0.2], [0, -150]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

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

  if (!mounted) return null; // Prevent hydration mismatch by holding render until mount

  return (
    <div className="relative min-h-[500vh] text-[#F5F5F0] bg-[#000000] selection:bg-white selection:text-black cursor-none overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full z-[9999] bg-emerald-500 text-black text-[8px] font-black uppercase tracking-[0.4em] py-1 text-center">
        System Sync Active // v2.1 // Build Success
      </div>
      <DreamyBackground />
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
              // Re-fetch or trigger state update
              fetch("/api/photos").then(res => res.json()).then(data => setPhotos(data));
            }}
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative flex h-screen items-center justify-center px-4 sm:px-10">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-zinc-800/20 rounded-full blur-[120px] mix-blend-screen animate-pulse hidden sm:block" style={{ animationDuration: '6s' }} />
          <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] bg-neutral-800/10 rounded-full blur-[100px] mix-blend-screen animate-pulse hidden sm:block" style={{ animationDuration: '9s' }} />
        </div>

        <motion.div
          style={{ y: heroScrollY, opacity: heroOpacity }}
          className="z-10 flex flex-col items-center text-center mix-blend-difference"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <InteractiveHeroBg />
            <div className="relative group will-change-transform">
              <h1 className="sr-only">FOTOMUTENA Portfolio</h1>
              <ArchitectHeroText text="MUTENA" />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1.5 }}
            className="mt-12 text-sm text-zinc-500 max-w-md mx-auto font-light tracking-[0.2em] uppercase px-6"
          >
            Işığın ve gölgenin ötesinde bir arşiv.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 100 }}
          transition={{ delay: 2, duration: 1.5 }}
          className="absolute bottom-0 left-1/2 w-px bg-gradient-to-t from-white/20 to-transparent"
        />
      </section>

      {/* Gallery Section */}
      <section id="archive" className="relative z-10 mx-auto w-full px-0 pb-48 sm:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24 flex flex-col gap-10 border-b border-white/5 pb-10 sm:flex-row sm:items-end sm:justify-between px-6 sm:px-0"
        >
          <div className="flex flex-col gap-2">
            <h2 className="font-syne text-4xl font-black uppercase tracking-tighter italic bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent underline-offset-8 decoration-white/10">Koleksiyon.</h2>
          </div>

          <div className="flex flex-wrap gap-4 font-sans text-[8px] font-bold tracking-[0.4em] uppercase text-zinc-500">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`transition-all px-3 py-1.5 rounded-full ${activeFilter === cat
                  ? "text-white bg-white/10 backdrop-blur-sm border border-white/20"
                  : "hover:text-white hover:bg-white/5"
                  }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          <motion.span
            key={filteredPhotos.length}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-sans text-[8px] text-zinc-600 tracking-[0.5em] uppercase backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full border border-white/10"
          >
            Arşiv: {filteredPhotos.length}
          </motion.span>
        </motion.div>

        <div className="columns-1 gap-0 space-y-0 sm:columns-2 sm:gap-4 sm:space-y-4 md:columns-3 lg:columns-4 xl:columns-5">
          {filteredPhotos.map((photo) => (
            <div key={photo.id} className="break-inside-avoid">
              <Frame photo={photo} onClick={(p) => setSelectedPhoto(p)} />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center py-48 text-center px-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="absolute inset-0 bg-radial-[at_50%_50%] from-white/[0.03] to-transparent pointer-events-none"
        />

        <h2 className="font-serif text-4xl italic tracking-tighter sm:text-[10vw] text-zinc-600 leading-[0.8]">
          Gelecek Burada <br /> <span className="text-white">Şekilleniyor.</span>
        </h2>

        <footer className="mt-48 flex w-full flex-col items-center justify-between gap-12 px-10 font-sans text-[8px] font-light tracking-[0.5em] uppercase text-zinc-800 sm:flex-row">
          <div className="flex flex-col gap-2 items-center sm:items-start text-center sm:text-left text-zinc-500">
            <span className="font-syne font-black text-white text-xl tracking-normal uppercase">Mutena // ARC_PRO_2.1</span>
            <span>MUTENA &copy; 2026 // Global Visual Archive</span>
          </div>
          <div className="flex gap-16 text-zinc-700">
            <button key="yasal" className="hover:text-white transition-colors uppercase">Yasal Uyarı</button>
            <button key="kvkk" className="hover:text-white transition-colors uppercase">KVKK</button>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full border border-white/5 bg-white/5 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-white opacity-20" />
            </div>
            <span>DESIGNED IN THE VOID</span>
          </div>
        </footer>
      </section>
    </div>
  );
}

