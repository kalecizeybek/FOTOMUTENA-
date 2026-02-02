import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const SETTINGS_FILE = path.join(process.cwd(), "src", "data", "settings.json");

async function getSettings() {
    try {
        const data = await fs.readFile(SETTINGS_FILE, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        const defaultSettings = {
            contact: {
                phone: "+90 5XX XXX XX XX",
                email: "studio@mutena.com",
                address: "İstanbul / Türkiye",
                instagram: "@fotomutena",
                website: "www.mutena.com"
            }
        };
        await fs.writeFile(SETTINGS_FILE, JSON.stringify(defaultSettings, null, 2));
        return defaultSettings;
    }
}

export async function GET() {
    const settings = await getSettings();
    return NextResponse.json(settings);
}

export async function POST(request: Request) {
    try {
        const newSettings = await request.json();
        await fs.writeFile(SETTINGS_FILE, JSON.stringify(newSettings, null, 2));
        return NextResponse.json({ success: true, settings: newSettings });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to update settings" }, { status: 500 });
    }
}
