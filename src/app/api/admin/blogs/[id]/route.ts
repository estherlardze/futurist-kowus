import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/admin-auth";
import { deleteBlog, updateBlog } from "@/lib/blog-store";
import { parseBlogInput } from "@/lib/blog-validate";

export async function PUT(req: Request, ctx: RouteContext<"/api/admin/blogs/[id]">) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const parsed = parseBlogInput(await req.json().catch(() => null));
  if (!parsed.ok) return NextResponse.json({ message: parsed.message }, { status: 400 });
  try {
    const blog = await updateBlog(id, parsed.data);
    if (!blog) return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    revalidatePath("/", "layout");
    return NextResponse.json({ blog });
  } catch (e) {
    return NextResponse.json({ message: e instanceof Error ? e.message : "Could not save" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, ctx: RouteContext<"/api/admin/blogs/[id]">) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  try {
    const ok = await deleteBlog(id);
    if (!ok) return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ message: e instanceof Error ? e.message : "Could not delete" }, { status: 500 });
  }
}
