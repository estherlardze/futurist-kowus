import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/admin-auth";
import { createBlog, getAllBlogs } from "@/lib/blog-store";
import { parseBlogInput } from "@/lib/blog-validate";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ blogs: await getAllBlogs() });
}

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const parsed = parseBlogInput(await req.json().catch(() => null));
  if (!parsed.ok) return NextResponse.json({ message: parsed.message }, { status: 400 });
  try {
    const blog = await createBlog(parsed.data);
    revalidatePath("/", "layout");
    return NextResponse.json({ blog }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: e instanceof Error ? e.message : "Could not save" }, { status: 500 });
  }
}
