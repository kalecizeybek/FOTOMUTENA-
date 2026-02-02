
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import mime from "mime";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ filename: string }> } // Params is a Promise in Next 15+
) {
    const { filename } = await params; // Await params here

    // Define where uploads are correctly located
    const filePath = path.join(process.cwd(), "public", "uploads", filename);

    try {
        const fileBuffer = await fs.readFile(filePath);

        // Determine content type automatically or default to jpeg
        const contentType = mime.getType(filename) || "image/jpeg";

        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error) {
        console.error("Image file not found:", filePath);
        return new NextResponse("File not found", { status: 404 });
    }
}
