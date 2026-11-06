import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { saveImage } from "@/lib/blog-store";

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return NextResponse.json({ message: "No file provided" }, { status: 400 });
  try {
    return NextResponse.json({ url: await saveImage(file) });
  } catch (e) {
    return NextResponse.json({ message: e instanceof Error ? e.message : "Upload failed" }, { status: 400 });
  }
}
