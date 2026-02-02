import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Path to store the Designs JSON database
const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "designs_store.json");

async function ensureDir(dirPath: string) {
    try {
        await fs.access(dirPath);
    } catch {
        await fs.mkdir(dirPath, { recursive: true });
    }
}

async function getDesigns() {
    try {
        const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        await ensureDir(path.dirname(DATA_FILE_PATH));
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify([], null, 2));
        return [];
    }
}

export async function GET() {
    const designs = await getDesigns();
    return NextResponse.json(designs);
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        const title = formData.get("title") as string;
        const category = formData.get("category") as string || "Tasarım";

        if (!file) {
            return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const base64Data = buffer.toString("base64");
        const mimeType = file.type || "image/jpeg";
        const publicUrl = `data:${mimeType};base64,${base64Data}`;

        const newDesign = {
            id: Date.now().toString(),
            url: publicUrl,
            alt: title,
            category: category,
            width: 800,
            height: 600,
            specs: {
                tool: "Studio Mutena",
                version: "2026.1",
                type: "Draft"
            }
        };

        const currentDesigns = await getDesigns();
        const updatedDesigns = [newDesign, ...currentDesigns];

        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedDesigns, null, 2));

        return NextResponse.json({ success: true, designs: updatedDesigns });
    } catch (error) {
        console.error("Design Upload Error:", error);
        return NextResponse.json({ success: false, error: "Failed to save design" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
        }

        const currentDesigns = await getDesigns();
        const updatedDesigns = currentDesigns.filter((d: any) => d.id !== id);

        await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedDesigns, null, 2));

        return NextResponse.json({ success: true, designs: updatedDesigns });
    } catch (error) {
        console.error("Design Delete Error:", error);
        return NextResponse.json({ success: false, error: "Failed to delete design" }, { status: 500 });
    }
}
