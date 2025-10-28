// app/(auth)/regisztracio/page.tsx
// ez itt a regisztracio oldal nagyon egyszeru valtozata
// - magyar valtozo_nevek, magyar kommentek
// - hatterkep ugyanaz a stilus, mint a belepesnel
// - proxyzott hivas: POST /backend/api/regisztral
// - siker eseten tovabbit /belepes oldalra

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisztracioOldal() {
  const router = useRouter();

  // -- itt taroljuk a beviteli mezo ertekeket
  const [nev, allitNev] = useState("");
  const [email, allitEmail] = useState("");
  const [jelszo, allitJelszo] = useState("");

  // -- allapotok (egyszeru)
  const [folyamatban, allitFolyamatban] = useState(false);
  const [hiba, allitHiba] = useState<string | null>(null);
  const [visszajelzes, allitVisszajelzes] = useState<string | null>(null);

  // -- minden API hivast proxyn keresztul kuldunk (Next -> Spring)
  const apiAlap = "/backend";

  // -- minimal kliens oldali ellenorzes (ne legyen ures)
  function ellenorizEgyszeru() {
    if (!nev.trim()) return "Adj meg egy nevet.";
    if (!email.trim()) return "Adj meg egy email címet.";
    if (!email.includes("@")) return "Az email formátuma hibásnak tűnik.";
    if (!jelszo || jelszo.length < 6) return "A jelszónak legalább 6 karakterből kell állnia.";
    return null;
  }

  // -- kuldes gomb logika
  async function kuldRegisztracio(e: React.FormEvent) {
    e.preventDefault();
    allitHiba(null);
    allitVisszajelzes(null);

    const helyiHiba = ellenorizEgyszeru();
    if (helyiHiba) {
      allitHiba(helyiHiba);
      return;
    }

    allitFolyamatban(true);

    try {
      const valasz = await fetch(`${apiAlap}/api/regisztral`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nev, email, jelszo }),
      });

      const szoveg = await valasz.text(); // backend: "siker" vagy "mar_letezik"

      if (!valasz.ok) {
        // ha a backend 400-al kuldi vissza pl. "mar_letezik"
        allitHiba(szoveg || "Sikertelen regisztráció.");
        allitFolyamatban(false);
        return;
      }

      if (szoveg === "siker") {
        allitVisszajelzes("Sikeres regisztráció. Továbbítunk a belépéshez…");
        // rovid kesleltetes, hogy a felhasznalo elolvashassa
        setTimeout(() => router.push("/belepes"), 700);
        return;
      }

      // pl. "mar_letezik"
      allitHiba(szoveg || "Sikertelen regisztráció.");
      allitFolyamatban(false);
    } catch {
      allitHiba("Valami hiba történt. Próbáld újra.");
      allitFolyamatban(false);
    }
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* -- hatterkep -- */}
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

      {/* -- kozepre igazitas -- */}
      <div className="flex min-h-screen items-center justify-center px-6">
        <form
          onSubmit={kuldRegisztracio}
          className="
            w-full max-w-md rounded-2xl border border-white/10
            bg-[linear-gradient(180deg,rgba(18,18,22,.85),rgba(10,10,12,.85))]
            shadow-[inset_0_1px_0_rgba(255,255,255,.06)]
            backdrop-blur p-6 space-y-5
            text-zinc-100
          "
        >
          {/* -- fejlec -- */}
          <div className="text-center space-y-1">
            <div className="text-xs tracking-[0.35em] uppercase text-zinc-400">
              FEEL&nbsp;THE&nbsp;MUSIC
            </div>
            <h1 className="text-2xl font-semibold">Regisztráció</h1>
            <p className="text-sm text-zinc-400">
              Hozz létre egy fiókot, és kezdjük el.
            </p>
          </div>

          {/* -- nev mezo -- */}
          <div className="space-y-2">
            <label className="text-sm text-zinc-300">Név</label>
            <input
              type="text"
              value={nev}
              onChange={(e) => allitNev(e.target.value)}
              required
              className="
                w-full rounded-lg border border-white/10 bg-black/40
                px-3 py-2 outline-none
                focus:border-white/25
              "
              placeholder="Példa Péter"
            />
          </div>

          {/* -- email mezo -- */}
          <div className="space-y-2">
            <label className="text-sm text-zinc-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => allitEmail(e.target.value)}
              required
              className="
                w-full rounded-lg border border-white/10 bg-black/40
                px-3 py-2 outline-none
                focus:border-white/25
              "
              placeholder="pelda@pelda.hu"
            />
          </div>

          {/* -- jelszo mezo -- */}
          <div className="space-y-2">
            <label className="text-sm text-zinc-300">Jelszó</label>
            <input
              type="password"
              value={jelszo}
              onChange={(e) => allitJelszo(e.target.value)}
              required
              className="
                w-full rounded-lg border border-white/10 bg-black/40
                px-3 py-2 outline-none
                focus:border-white/25
              "
              placeholder="••••••••"
            />
            <p className="text-xs text-zinc-400">
              Minimum 6 karakter (egyszerűen indulunk).
            </p>
          </div>

          {/* -- hiba / visszajelzes -- */}
          {hiba && <div className="text-sm text-red-400">{hiba}</div>}
          {visszajelzes && (
            <div className="text-sm text-emerald-400">{visszajelzes}</div>
          )}

          {/* -- kuldes gomb -- */}
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
            aria-label="Regisztráció"
          >
            {folyamatban ? "Küldés..." : "Regisztráció"}
          </button>

          {/* -- visszalepes a belepeshez -- */}
          <div className="text-center text-sm text-zinc-400">
            Van már fiókod?{" "}
            <a href="/belepes" className="underline hover:opacity-80">
              Belépés
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
