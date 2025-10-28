"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DeezerOldal() {
  const [keresett, setKeresett] = useState("");
  const [talalatok, setTalalatok] = useState<any[]>([]);
  const [valasztott, setValasztott] = useState<any[]>([]);
  const [nev, setNev] = useState("");
  const [uzenet, setUzenet] = useState<string | null>(null);
  const [hiba, setHiba] = useState<string | null>(null);
  const router = useRouter();

  // Bejelentkezett email (localStorage-ból)
  const [email, setEmail] = useState("");
  useEffect(() => {
    const e = localStorage.getItem("bejelentkezett_email");
    if (e) setEmail(e.trim().toLowerCase());
  }, []);

  // --- Keresés a Deezer API-ban (ingyenes, CORS proxy-val)
  async function keres() {
    setHiba(null);
    setUzenet(null);
    setTalalatok([]);

    if (!keresett.trim()) {
      setHiba("Adj meg egy keresőkifejezést!");
      return;
    }

    try {
      const url = `https://api.deezer.com/search?q=${encodeURIComponent(keresett)}`;
      const resp = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
      const data = await resp.json();

      if (!data || !data.data) {
        setHiba("Nem sikerült betölteni az adatokat.");
        return;
      }

      setTalalatok(data.data);
    } catch (err) {
      setHiba("Keresési hiba. Ellenőrizd az internetkapcsolatot.");
    }
  }

  // --- Dal hozzáadása a playlisthez
  function hozzaad(zene: any) {
    if (valasztott.find((x) => x.id === zene.id)) return; // ne duplikáljuk
    setValasztott([...valasztott, zene]);
  }

  // --- Dal eltávolítása
  function eltavolit(id: number) {
    setValasztott(valasztott.filter((x) => x.id !== id));
  }

  // --- Playlist mentése a backendbe
  async function mentPlaylist() {
    if (!nev.trim() || valasztott.length === 0) {
      setHiba("Adj nevet és legalább egy dalt a playlisthez!");
      return;
    }

    const szamok = valasztott.map((z) => ({
      eloado: z.artist?.name || "Ismeretlen",
      cim: z.title || "Ismeretlen",
    }));

    try {
      const r = await fetch("/backend/api/playlist/feltolt-api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, nev, szamok }),
      });

      const txt = await r.text();
      if (!r.ok) throw new Error(txt);
      setUzenet("✅ Playlist sikeresen elmentve!");
      setNev("");
      setValasztott([]);
      setTimeout(() => router.push("/fiokom"), 1200);
    } catch (e: any) {
      setHiba(e.message || "Hiba a mentésnél.");
    }
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-zinc-100">
      {/* háttér */}
      <div className="absolute inset-0 -z-10">
        <Image src="/hatter2.jpg" alt="Zene háttér" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <section className="mx-auto w-full max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Új playlist létrehozása Deezerből
        </h1>

        {/* --- keresés --- */}
        <div className="space-y-3 mb-6 flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <input
            type="text"
            value={keresett}
            onChange={(e) => setKeresett(e.target.value)}
            placeholder="Keresés előadó vagy dal szerint..."
            className="flex-1 rounded-md border border-white/10 bg-black/40 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
          />
          <button
            onClick={keres}
            className="rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(18,18,22,.85),rgba(10,10,12,.85))] px-5 py-2 hover:border-white/20"
          >
            Keresés
          </button>
        </div>

        {/* --- találatok --- */}
        {talalatok.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg mb-3 font-semibold">Találatok:</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {talalatok.map((z) => (
                <li
                  key={z.id}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 p-3 hover:bg-white/5 transition"
                >
                  <span className="truncate">{z.artist?.name} – {z.title}</span>
                  <button
                    onClick={() => hozzaad(z)}
                    className="text-sm rounded-full border border-white/10 px-3 py-1 hover:bg-white/10"
                  >
                    ➕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* --- kiválasztott dalok --- */}
        {valasztott.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg mb-3 font-semibold">Kiválasztott dalok:</h2>
            <ul className="space-y-2">
              {valasztott.map((z) => (
                <li
                  key={z.id}
                  className="flex justify-between border border-white/10 bg-black/40 rounded-lg px-3 py-2"
                >
                  <span className="truncate">{z.artist?.name} – {z.title}</span>
                  <button
                    onClick={() => eltavolit(z.id)}
                    className="text-red-300 text-sm hover:text-red-400"
                  >
                    ✖
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-3">
              <input
                type="text"
                value={nev}
                onChange={(e) => setNev(e.target.value)}
                placeholder="Playlist neve"
                className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
              />
              <button
                onClick={mentPlaylist}
                className="w-full rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(24,24,28,.9),rgba(12,12,14,.9))] px-5 py-2 hover:border-white/20"
              >
                💾 Playlist mentése
              </button>
            </div>
          </div>
        )}

        {uzenet && <div className="text-green-400 mt-4">{uzenet}</div>}
        {hiba && <div className="text-red-400 mt-4">{hiba}</div>}

        <div className="mt-10 text-center">
          <a
            href="/fiokom"
            className="inline-block rounded-full border border-white/10 px-4 py-2 text-sm hover:border-white/20 hover:bg-white/10 transition"
          >
            ⬅ Vissza a fiókomhoz
          </a>
        </div>
      </section>
    </main>
  );
}
