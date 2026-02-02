import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { photos as initialPhotos } from "@/data/photos";
import { writeFile } from "fs/promises";

// Path to store the JSON database
const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "store.json");
// Path to store uploaded images
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

async function ensureDir(dirPath: string) {
    try {
        await fs.access(dirPath);
    } catch {
        await fs.mkdir(dirPath, { recursive: true });
    }
}

// Helper to ensure data directory exists and read data
async function getPhotos() {
    try {
        const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, return initial data
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
            return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Create Base64 Data URL (Guaranteed to work immediately)
        const base64Data = buffer.toString("base64");
        const mimeType = file.type || "image/jpeg";
        const publicUrl = `data:${mimeType};base64,${base64Data}`;

        // No need to write to disk for this method
        // await writeFile(filePath, buffer);

        // Public URL is already defined as Base64 above

        const newPhoto = {
            id: Date.now().toString(),
            url: publicUrl,
            alt: title,
            category: category,
            width: 800,
            height: 600,
            specs: {
                iso: "100",
                shutter: "1/500",
                aperture: "f/2.8"
            }
        };

        const currentPhotos = await getPhotos();
        const updatedPhotos = [newPhoto, ...currentPhotos]; // Add to top

        // Save metadata to store.json
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedPhotos, null, 2));

        return NextResponse.json({ success: true, photos: updatedPhotos });
    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ success: false, error: "Failed to save photo" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
        }

        const currentPhotos = await getPhotos();
        const updatedPhotos = currentPhotos.filter((p: any) => p.id !== id);

        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedPhotos, null, 2));

        return NextResponse.json({ success: true, photos: updatedPhotos });
    } catch (error) {
        console.error("Delete Error:", error);
        return NextResponse.json({ success: false, error: "Failed to delete photo" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const { photos } = await request.json();

        if (!photos || !Array.isArray(photos)) {
            return NextResponse.json({ success: false, error: "Photos array is required" }, { status: 400 });
        }

        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(photos, null, 2));

        return NextResponse.json({ success: true, photos });
    } catch (error) {
        console.error("Update Error:", error);
        return NextResponse.json({ success: false, error: "Failed to update photos" }, { status: 500 });
    }
}
