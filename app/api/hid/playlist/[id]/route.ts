// DELETE /api/hid/playlist/:id?email=...  ->  DELETE {BACKEND_URL}/api/playlist/:id?email=...
export const dynamic = "force-dynamic";

export async function DELETE(req: Request, ctx: { params: { id: string } }) {
  try {
    const backend = process.env.BACKEND_URL;
    if (!backend) {
      return new Response("BACKEND_URL hianyzik", { status: 500 });
    }

    const url = new URL(req.url);
    const email = url.searchParams.get("email") || "";
    const id = ctx.params.id;

    const valasz = await fetch(
      `${backend}/api/playlist/${encodeURIComponent(id)}?email=${encodeURIComponent(email)}`,
      { method: "DELETE" }
    );

    const text = await valasz.text();
    return new Response(text, { status: valasz.status });
  } catch (e: any) {
    return new Response(e?.message || "proxy hiba (torles)", { status: 500 });
  }
}
