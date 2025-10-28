// Szerveroldali proxy: POST /api/hid/playlist/feltolt  ->  POST {BACKEND_URL}/api/playlist/feltolt
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const backend = process.env.BACKEND_URL;
    if (!backend) {
      return new Response("BACKEND_URL hianyzik", { status: 500 });
    }

    // a böngészőtől érkező multipart formData beolvasása
    const bejovo = await req.formData();

    // ugyanígy továbbküldjük a Spring felé
    const valasz = await fetch(`${backend}/api/playlist/feltolt`, {
      method: "POST",
      body: bejovo,
      // NINCS header kézzel megadva -> a böngésző szépen kitölti a multipart boundary-t
    });

    const text = await valasz.text();
    return new Response(text, { status: valasz.status });
  } catch (e: any) {
    return new Response(e?.message || "proxy hiba (feltolt)", { status: 500 });
  }
}
