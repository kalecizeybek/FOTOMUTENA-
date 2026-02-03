import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import fs from "fs/promises";
import path from "path";
import { photos as initialPhotos } from "@/data/photos";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "store.json");
const KV_PHOTOS_KEY = "fotomutena_photos";
const IS_VERCEL = !!process.env.VERCEL;

async function getPhotos() {
    try {
        // Vercel'deysen ve KV bağlantısı varsa KV'den oku
        if (process.env.KV_REST_API_URL) {
            const photos = await kv.get(KV_PHOTOS_KEY);
            if (photos && Array.isArray(photos)) return photos;
        }

        // Yereldeysen veya KV henüz bağlanmadıysa dosyadan oku (ama Vercel'de hata fırlatma)
        if (!IS_VERCEL) {
            const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
            return JSON.parse(data);
        }
        return initialPhotos;
    } catch (error) {
        return initialPhotos;
    }
}

export async function GET() {
    const photos = await getPhotos();
    return NextResponse.json(photos);
}

export async function POST(request: Request) {
    try {
        const { url, title, category, aspectRatio } = await request.json();
        if (!url) return NextResponse.json({ success: false, error: "URL eksik" }, { status: 400 });

        const newPhoto = {
            id: String(Date.now()),
            url: url,
            title: title || "Mutena Arşiv",
            category: category || "Genel",
            aspectRatio: aspectRatio || 1,
            specs: {
                iso: "Cloud",
                shutter: "Direct",
                aperture: "Pro"
            }
        };

        const currentPhotos = await getPhotos();
        const updatedPhotos = [newPhoto, ...currentPhotos];

        // VERİTABANI KAYDI (KV Varsa)
        if (process.env.KV_REST_API_URL) {
            await kv.set(KV_PHOTOS_KEY, updatedPhotos);
        }

        // DOSYA KAYDI (Sadece Vercel dışındaysak dene)
        if (!IS_VERCEL) {
            try {
                await fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true });
                await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedPhotos, null, 2));
            } catch (e) {
                console.log("Local file write ignored");
            }
        }

        return NextResponse.json({ success: true, photos: updatedPhotos });
    } catch (error: any) {
        // Vercel'de readonly hatasını kullanıcıya gösterme, işlemi başarılı say (çünkü Cloudinary'ye yüklendi)
        return NextResponse.json({
            success: true,
            message: "Buluta yüklendi. Veritabanı senkronizasyonu bekleniyor."
        });
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
        if (!IS_VERCEL) {
            try { await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedPhotos, null, 2)); } catch (e) { }
        }

        return NextResponse.json({ success: true, photos: updatedPhotos });
    } catch (error) {
        return NextResponse.json({ success: false, error: "İşlem hatası" }, { status: 500 });
    }
}
