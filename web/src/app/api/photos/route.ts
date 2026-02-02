import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { photos as initialPhotos } from "@/data/photos";

/**
 * BU ROTA ARTIK DOSYA SİSTEMİYLE (store.json) ÇALIŞMAZ.
 * TAMAMEN VERCEL KV (VERİTABANI) ÜZERİNDEN ÇALIŞIR.
 */

const KV_PHOTOS_KEY = "fotomutena_photos";

async function getPhotos() {
    try {
        // 1. Veritabanından (KV) fotoğrafları çek
        const photos = await kv.get(KV_PHOTOS_KEY);
        if (photos && Array.isArray(photos)) {
            return photos;
        }

        // 2. Eğer veritabanı boşsa, örnek fotoğrafları veritabanına kaydet ve döndür
        await kv.set(KV_PHOTOS_KEY, initialPhotos);
        return initialPhotos;
    } catch (error) {
        console.error("KV Read Error:", error);
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

        if (!url) {
            return NextResponse.json({ success: false, error: "Görsel URL'i eksik" }, { status: 400 });
        }

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

        // VERİTABANINA KAYDET (Bu asla readonly hatası vermez!)
        await kv.set(KV_PHOTOS_KEY, updatedPhotos);

        return NextResponse.json({ success: true, photos: updatedPhotos });
    } catch (error: any) {
        console.error("Database Save Error:", error);
        return NextResponse.json({ success: false, error: "Veritabanına kaydedilemedi" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ success: false, error: "ID gerekli" }, { status: 400 });

        const currentPhotos = await getPhotos();
        const updatedPhotos = currentPhotos.filter((p: any) => p.id !== id);

        await kv.set(KV_PHOTOS_KEY, updatedPhotos);

        return NextResponse.json({ success: true, photos: updatedPhotos });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Silme başarısız" }, { status: 500 });
    }
}
