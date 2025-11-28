import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import type { Setting, SettingType } from "@/lib/types";

interface Setting {
  id: string;
  key: string;
  value: string;
  type: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const publicOnly = searchParams.get("public");

    // Check authentication for non-public settings
    const session = await getSession();
    const isAuthenticated =
      session && ["SUPER_ADMIN", "ADMIN", "EDITOR"].includes(session.user.role);

    const where: any = {};

    if (category) {
      where.category = category;
    }

    // If not authenticated, only return public settings
    if (!isAuthenticated || publicOnly === "true") {
      where.isPublic = true;
    }

    const settings = await prisma.setting.findMany({
      where,
      orderBy: { key: "asc" },
    });

    const settingsMap = settings.reduce((acc, setting) => {
      let value: any = setting.value;

      if (setting.type === "BOOLEAN") {
        value = setting.value === "true";
      } else if (setting.type === "NUMBER") {
        value = setting.value ? Number.parseFloat(setting.value) : 0;
      } else if (setting.type === "JSON") {
        try {
          value = setting.value ? JSON.parse(setting.value) : null;
        } catch {
          value = null;
        }
      }

      acc[setting.key] = value;
      return acc;
    }, {} as Record<string, any>);

    return NextResponse.json({
      data: settingsMap,
      raw: isAuthenticated ? settings : undefined,
    });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const session = await getSession();
    if (!session || !["SUPER_ADMIN", "ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Handle both single setting and bulk updates
    if (Array.isArray(body)) {
      // Bulk update
      for (const setting of body) {
        const { key, value, type, category, description, isPublic } = setting;

        await prisma.setting.upsert({
          where: { key },
          update: {
            value: String(value),
            type: type as SettingType,
            category: category || "general",
            description,
            isPublic: isPublic ?? false,
          },
          create: {
            key,
            value: String(value),
            type: (type as SettingType) || "STRING",
            category: category || "general",
            description,
            isPublic: isPublic ?? false,
          },
        });
      }
    } else {
      // Single setting or key-value pairs
      for (const [key, value] of Object.entries(body)) {
        await prisma.setting.upsert({
          where: { key },
          update: { value: String(value) },
          create: {
            key,
            value: String(value),
            type: "STRING",
            category: "general",
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully",
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
