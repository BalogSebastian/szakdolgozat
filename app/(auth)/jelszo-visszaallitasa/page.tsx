//    app/(auth)/jelszo-visszaallitasa/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function JelszoVisszaallitasaOldal() {
  const params = useSearchParams();
  const router = useRouter();

  const [token, allitToken] = useState<string>("");
  const [ujJelszo, allitUjJelszo] = useState("");
  const [folyamatban, allitFolyamatban] = useState(false);
  const [hiba, allitHiba] = useState<string | null>(null);
  const [visszajelzes, allitVisszajelzes] = useState<string | null>(null);

  const apiAlap = "/backend";

  // -- indulaskor olvassuk be a tokent a query-bol 
  useEffect(() => {
    const t = params.get("token") || "";
    allitToken(t);
  }, [params]);

  async function kuldUjJelszo(e: React.FormEvent) {
    e.preventDefault();
    allitHiba(null);
    allitVisszajelzes(null);

    if (!token.trim()) {
      allitHiba("Hiányzik a token.");
      return;
    }
    if (!ujJelszo || ujJelszo.length < 6) {
      allitHiba("Az új jelszó legalább 6 karakter legyen.");
      return;
    }

    allitFolyamatban(true);

    try {
      const valasz = await fetch(`${apiAlap}/api/jelszo/uj`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, ujJelszo }),
      });

      const szoveg = await valasz.text(); // "siker" | "ervenytelen" | "lejart" | "hiba"

      if (!valasz.ok) {
        allitHiba(szoveg || "Sikertelen visszaállítás.");
        allitFolyamatban(false);
        return;
      }

      if (szoveg === "siker") {
        allitVisszajelzes("Jelszó frissítve. Átirányítás a belépéshez…");
        setTimeout(() => router.replace("/belepes"), 800);
        return;
      }

      // ha nem "siker", akkor a szoveg tartalmazza az okot
      allitHiba(szoveg || "Sikertelen visszaállítás.");
      allitFolyamatban(false);
    } catch {
      allitHiba("Valami hiba történt. Próbáld később.");
      allitFolyamatban(false);
    }
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* -- hatter -- */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black/55" />
        <Image
          src="/hatter.jpg"
          alt="Hangulat hatter"
          fill
          priority
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex min-h-screen items-center justify-center px-6">
        <form
          onSubmit={kuldUjJelszo}
          className="
            w-full max-w-md rounded-2xl border border-white/10
            bg-[linear-gradient(180deg,rgba(18,18,22,.85),rgba(10,10,12,.85))]
            shadow-[inset_0_1px_0_rgba(255,255,255,.06)]
            backdrop-blur p-6 space-y-5
            text-zinc-100
          "
        >
          <div className="text-center space-y-1">
            <div className="text-xs tracking-[0.35em] uppercase text-zinc-400">
              FEEL&nbsp;THE&nbsp;MUSIC
            </div>
            <h1 className="text-2xl font-semibold">Új jelszó beállítása</h1>
            <p className="text-sm text-zinc-400">
              Add meg az új jelszavad. A token automatikusan betöltődik a linkből.
            </p>
          </div>

          {/* -- token csak olvasható (ha látni szeretnéd) */}
          <div className="space-y-2">
            <label className="text-sm text-zinc-300">Token</label>
            <input
              type="text"
              value={token}
              readOnly
              className="
                w-full rounded-lg border border-white/10 bg-black/40
                px-3 py-2 outline-none
              "
              placeholder="token automatikusan a linkből"
            />
          </div>

          {/* -- uj jelszo mezo -- */}
          <div className="space-y-2">
            <label className="text-sm text-zinc-300">Új jelszó</label>
            <input
              type="password"
              value={ujJelszo}
              onChange={(e) => allitUjJelszo(e.target.value)}
              required
              className="
                w-full rounded-lg border border-white/10 bg-black/40
                px-3 py-2 outline-none focus:border-white/25
              "
              placeholder="••••••••"
            />
            <p className="text-xs text-zinc-400">
              Minimum 6 karakter. (Egyszerű induló szabály.)
            </p>
          </div>

          {hiba && <div className="text-sm text-red-400">{hiba}</div>}
          {visszajelzes && (
            <div className="text-sm text-emerald-400">{visszajelzes}</div>
          )}

          <button
            type="submit"
            disabled={folyamatban}
            className="
              w-full rounded-full px-4 py-2
              border border-white/10
              bg-[linear-gradient(180deg,rgba(24,24,28,.9),rgba(12,12,14,.9))]
              hover:border-white/20
              hover:shadow-[0_0_30px_rgba(255,255,255,.08),inset_0_1px_0_rgba(255,255,255,.08)]
              transition
            "
            aria-label="Jelszó mentése"
          >
            {folyamatban ? "Mentés..." : "Új jelszó mentése"}
          </button>

          <div className="text-center text-sm text-zinc-400">
            Vissza a{" "}
            <a href="/belepes" className="underline hover:opacity-80">
              Belépéshez
            </a>
            .
          </div>
        </form>
      </div>
    </main>
  );
}
