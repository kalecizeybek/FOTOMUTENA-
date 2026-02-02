import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import fs from "fs/promises";
import path from "path";
import { photos as initialPhotos } from "@/data/photos";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "store.json");
const KV_PHOTOS_KEY = "fotomutena_photos";

// Akıllı Veri Okuma (KV varsa KV'den, yoksa Dosya'dan)
async function getPhotos() {
    try {
        // 1. Vercel KV Bağlı mı?
        if (process.env.KV_REST_API_URL) {
            const photos = await kv.get(KV_PHOTOS_KEY);
            if (photos && Array.isArray(photos)) return photos;
        }

        // 2. Değilse Dosyadan Oku (Yerel Çalışma)
        const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        try {
            await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
            await fs.writeFile(DATA_FILE_PATH, JSON.stringify(initialPhotos, null, 2));
        } catch (e) { }
        return initialPhotos;
    }
}

export async function GET() {
    const photos = await getPhotos();
    return NextResponse.json(photos);
}

export async function POST(request: Request) {
    try {
        const { url, title, category } = await request.json();
        if (!url) return NextResponse.json({ success: false, error: "URL eksik" }, { status: 400 });

        const newPhoto = {
            id: String(Date.now()),
            url: url,
            alt: title || "Mutena Arşiv",
            category: category || "Genel",
            specs: {
                iso: "Bulut Yükleme",
                shutter: "Doğrudan Aktarım",
                aperture: "Kalıcı Arşiv"
            }
        };

        const currentPhotos = await getPhotos();
        const updatedPhotos = [newPhoto, ...currentPhotos];

        // AKILLI KAYIT
        // 1. Vercel KV'ye Kaydet (Varsa)
        if (process.env.KV_REST_API_URL) {
            await kv.set(KV_PHOTOS_KEY, updatedPhotos);
        }

        // 2. Dosyaya Kaydet (Yereldeyse ve izin varsa)
        try {
            await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedPhotos, null, 2));
        } catch (e) {
            // Vercel'de dosya yazma hatası normaldir, KV varsa sorun yok
            if (!process.env.KV_REST_API_URL) throw e;
        }

        return NextResponse.json({ success: true, photos: updatedPhotos });
    } catch (error: any) {
        console.error("Database Save Error:", error);
        return NextResponse.json({ success: false, error: "Kaydedilemedi: " + error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ success: false, error: "ID gerekli" }, { status: 400 });

        const currentPhotos = await getPhotos();
        const updatedPhotos = currentPhotos.filter((p: any) => p.id !== id);

        if (process.env.KV_REST_API_URL) await kv.set(KV_PHOTOS_KEY, updatedPhotos);
        try { await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedPhotos, null, 2)); } catch (e) { }

        return NextResponse.json({ success: true, photos: updatedPhotos });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Silme başarısız" }, { status: 500 });
    }
}
