import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { photos as initialPhotos } from "@/data/photos";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "store.json");

async function ensureDir(dirPath: string) {
    try {
        await fs.access(dirPath);
    } catch {
        await fs.mkdir(dirPath, { recursive: true });
    }
}

async function getPhotos() {
    try {
        const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        // Vercel'de readonly hatası almamak için sessizce initial datayı dön
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
            id: Date.now().toString(),
            url: url,
            alt: title || "Mutena Arşiv",
            category: category || "Genel",
            specs: {
                iso: "Bulut Yükleme",
                shutter: "Doğrudan Aktarım",
                aperture: "Yüksek Kalite"
            }
        };

        const currentPhotos = await getPhotos();
        const updatedPhotos = [newPhoto, ...currentPhotos];

        // Yerel çalışırken store.json'a yaz, Vercel'de sessizce devam et
        try {
            await ensureDir(path.dirname(DATA_FILE_PATH));
            await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedPhotos, null, 2));
        } catch (e) {
            console.log("Not writing to file system in production environment");
        }

        return NextResponse.json({ success: true, photos: updatedPhotos });
    } catch (error: any) {
        console.error("Save Error:", error);
        return NextResponse.json({ success: false, error: "Kaydedilemedi" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ success: false, error: "ID gerekli" }, { status: 400 });

        const currentPhotos = await getPhotos();
        const updatedPhotos = currentPhotos.filter((p: any) => p.id !== id);

        try {
            await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedPhotos, null, 2));
        } catch (e) { }

        return NextResponse.json({ success: true, photos: updatedPhotos });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Silme başarısız" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const { photos } = await request.json();
        try {
            await fs.writeFile(DATA_FILE_PATH, JSON.stringify(photos, null, 2));
        } catch (e) { }
        return NextResponse.json({ success: true, photos });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Güncelleme başarısız" }, { status: 500 });
    }
}
