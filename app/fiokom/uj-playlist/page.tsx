"use client";

import { useState } from "react";
import Image from "next/image";

type DeezerDal = {
  id: number;
  title: string;
  artist: { name: string };
  album: { title: string; cover_medium: string };
  preview: string;
};

export default function UjPlaylistDeezerbol() {
  const [kereses, setKereses] = useState("");
  const [talalatok, setTalalatok] = useState<DeezerDal[]>([]);
  const [kivalasztott, setKivalasztott] = useState<DeezerDal[]>([]);
  const [nev, setNev] = useState("");
  const [uzenet, setUzenet] = useState<string | null>(null);
  const [toltes, setToltes] = useState(false);

  // -- keresés Deezer API-n
  async function keres(e: React.FormEvent) {
    e.preventDefault();
    if (!kereses.trim()) return;

    setToltes(true);
    setUzenet(null);
    try {
      const r = await fetch(
        `https://api.deezer.com/search?q=${encodeURIComponent(kereses)}`
      );
      const j = await r.json();
      setTalalatok(j.data || []);
    } catch {
      setUzenet("Hiba történt a keresés során.");
    } finally {
      setToltes(false);
    }
  }

  // -- hozzáadás a kiválasztott listához
  function hozzaad(dal: DeezerDal) {
    if (kivalasztott.find((x) => x.id === dal.id)) return;
    setKivalasztott([...kivalasztott, dal]);
  }

  // -- eltávolítás
  function eltavolit(id: number) {
    setKivalasztott(kivalasztott.filter((x) => x.id !== id));
  }

  // -- mentés backendre
  async function mentPlaylistet() {
    try {
      setToltes(true);
      setUzenet(null);

      const email = localStorage.getItem("bejelentkezett_email");
      if (!email) {
        setUzenet("Nem található bejelentkezett email.");
        return;
      }

      const szamok = kivalasztott.map((d) => ({
        eloado: d.artist.name,
        cim: d.title,
      }));

      const valasz = await fetch("/backend/api/playlist/feltolt-api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, nev, szamok }),
      });

      const text = await valasz.text();
      if (!valasz.ok) throw new Error(text);
      setUzenet("Playlist sikeresen mentve!");
      setKivalasztott([]);
      setNev("");
    } catch (e: any) {
      setUzenet(e.message || "Hiba a mentésnél.");
    } finally {
      setToltes(false);
    }
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-zinc-100">
      {/* háttér */}
      <div className="absolute inset-0 -z-10">
        <Image src="/hatter2.jpg" alt="Háttér" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <section className="mx-auto w-full max-w-4xl px-6 py-16 space-y-8">
        <h1 className="text-3xl font-semibold text-center">
          🎵 Új playlist készítése (Deezer API)
        </h1>

        {/* keresőmező */}
        <form onSubmit={keres} className="flex gap-3 justify-center">
          <input
            type="text"
            value={kereses}
            onChange={(e) => setKereses(e.target.value)}
            placeholder="Keresés (pl. Ed Sheeran - Perfect)"
            className="w-full max-w-md rounded-lg border border-white/10 bg-black/40 px-3 py-2 outline-none"
          />
          <button
            type="submit"
            disabled={toltes}
            className="rounded-lg border border-white/10 bg-white/10 px-4 hover:bg-white/20"
          >
            {toltes ? "Keresés..." : "Keresés"}
          </button>
        </form>

        {/* találatok */}
        {talalatok.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {talalatok.map((t) => (
              <div
                key={t.id}
                className="rounded-lg border border-white/10 bg-black/40 p-3"
              >
                <img
                  src={t.album.cover_medium}
                  alt={t.title}
                  className="rounded-md mb-2 w-full"
                />
                <div className="text-sm font-semibold">{t.title}</div>
                <div className="text-xs text-zinc-400">{t.artist.name}</div>
                <button
                  onClick={() => hozzaad(t)}
                  className="mt-2 text-xs rounded-full border border-white/10 px-3 py-1 hover:border-white/20"
                >
                  ➕ Hozzáadás
                </button>
              </div>
            ))}
          </div>
        )}

        {/* kiválasztott zenék */}
        {kivalasztott.length > 0 && (
          <div className="mt-10 space-y-4">
            <h2 className="text-lg font-semibold">Kiválasztott dalok:</h2>
            <ul className="space-y-2 text-sm">
              {kivalasztott.map((d) => (
                <li
                  key={d.id}
                  className="flex items-center justify-between border-b border-white/10 pb-1"
                >
                  <span>
                    <strong>{d.artist.name}</strong> – {d.title}
                  </span>
                  <button
                    onClick={() => eltavolit(d.id)}
                    className="text-red-400 hover:text-red-300 text-xs"
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>

            {/* név és mentés */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center">
              <input
                type="text"
                value={nev}
                onChange={(e) => setNev(e.target.value)}
                placeholder="Playlist neve"
                className="w-full sm:flex-1 rounded-lg border border-white/10 bg-black/40 px-3 py-2 outline-none"
              />
              <button
                onClick={mentPlaylistet}
                disabled={toltes || !nev.trim()}
                className="rounded-full border border-white/10 bg-white/10 px-6 py-2 hover:bg-white/20"
              >
                💾 Mentés
              </button>
            </div>
          </div>
        )}

        {uzenet && <div className="text-center text-sm text-emerald-300">{uzenet}</div>}
      </section>
    </main>
  );
}
