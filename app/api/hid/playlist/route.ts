// GET /api/hid/playlist?email=...  ->  GET {BACKEND_URL}/api/playlist?email=...
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const backend = process.env.BACKEND_URL;
    if (!backend) {
      return new Response("BACKEND_URL hianyzik", { status: 500 });
    }

    const url = new URL(req.url);
    const email = url.searchParams.get("email") || "";

    const valasz = await fetch(`${backend}/api/playlist?email=${encodeURIComponent(email)}`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    const text = await valasz.text(); // lehet h JSON, lehet h hiba szöveg
    return new Response(text, {
      status: valasz.status,
      headers: { "Content-Type": valasz.headers.get("Content-Type") || "application/json" },
    });
  } catch (e: any) {
    return new Response(e?.message || "proxy hiba (lista)", { status: 500 });
  }
}
