import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import path from "path";
import { photos as initialPhotos } from "@/data/photos";

// Cloudinary Configuration
cloudinary.config({
    cloud_name: "duamuseuj",
    api_key: "847797246444547",
    api_secret: "GrhIVFo_FNyOWQPgrjyaWaSzCjY"
});

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
        await ensureDir(path.dirname(DATA_FILE_PATH));
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(initialPhotos, null, 2));
        return initialPhotos;
    }
}

export async function GET() {
    const photos = await getPhotos();
    return NextResponse.json(photos);
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        const title = formData.get("title") as string;
        const category = formData.get("category") as string;

        if (!file) {
            return NextResponse.json({ success: false, error: "Dosya seçilmedi" }, { status: 400 });
        }

        // Convert file to Buffer for Cloudinary
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Cloudinary using a Promise
        const uploadResponse = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    resource_type: "auto",
                    folder: "fotomutena",
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        }) as any;

        const newPhoto = {
            id: Date.now().toString(),
            url: uploadResponse.secure_url, // Bulut üzerindeki kalıcı yüksek çözünürlüklü link
            alt: title,
            category: category || "Genel",
            specs: {
                iso: "Bulut Yükleme",
                shutter: "4K Optimize",
                aperture: "Kalıcı Arşiv"
            }
        };

        const currentPhotos = await getPhotos();
        const updatedPhotos = [newPhoto, ...currentPhotos];

        // Save updated metadata back to store.json
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedPhotos, null, 2));

        return NextResponse.json({ success: true, photos: updatedPhotos });
    } catch (error: any) {
        console.error("Cloudinary Upload Error:", error);
        return NextResponse.json({
            success: false,
            error: "Buluta yükleme başarısız oldu: " + (error.message || "Bilinmeyen hata")
        }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ success: false, error: "ID gerekli" }, { status: 400 });

        const currentPhotos = await getPhotos();
        const updatedPhotos = currentPhotos.filter((p: any) => p.id !== id);

        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedPhotos, null, 2));

        return NextResponse.json({ success: true, photos: updatedPhotos });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Silme başarısız" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const { photos } = await request.json();
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(photos, null, 2));
        return NextResponse.json({ success: true, photos });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Güncelleme başarısız" }, { status: 500 });
    }
}
