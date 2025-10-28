//      app/(auth)/elfelejtett-jelszo/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ElfelejtettJelszoOldal() {
  const router = useRouter();

  // ártalmatlan prefetch, csak a linter miatt is jó
  useEffect(() => {
    router.prefetch("/belepes");
  }, [router]);

  // -- beviteli mezo
  const [email, allitEmail] = useState("");

  // -- allapotok
  const [folyamatban, allitFolyamatban] = useState(false);
  const [hiba, allitHiba] = useState<string | null>(null);
  const [visszajelzes, allitVisszajelzes] = useState<string | null>(null);

  // -- dev: ha a backend visszaad egy tokent (szoveg), ide tesszuk
  const [kapottToken, allitKapottToken] = useState<string | null>(null);

  // -- proxyzott alapu api
  const apiAlap = "/backend";

  async function kuldKerest(e: React.FormEvent) {
    e.preventDefault();
    allitHiba(null);
    allitVisszajelzes(null);
    allitKapottToken(null);

    if (!email.trim() || !email.includes("@")) {
      allitHiba("Adj meg egy érvényes email címet.");
      return;
    }

    allitFolyamatban(true);

    try {
      const valasz = await fetch(`${apiAlap}/api/jelszo/elfelejtett`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const szoveg = await valasz.text(); // fejleszteskor lehet, hogy a token sztringet kapjuk vissza

      if (!valasz.ok) {
        allitHiba("Kérés sikertelen. Próbáld meg később.");
        allitFolyamatban(false);
        return;
      }

      // visszajelzes a felhasznalonak
      allitVisszajelzes(
        "Ha az email címed létezik nálunk, küldtünk egy visszaállítási linket. (Fejlesztésben lent megjelenhet a token is.)"
      );

      // dev: ha nem csak "ok", akkor lehet, hogy ez a token
      if (szoveg && szoveg !== "ok") {
        allitKapottToken(szoveg);
      }

      allitFolyamatban(false);
    } catch {
      allitHiba("Valami hiba történt. Próbáld meg később.");
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

      {/* -- kartya -- */}
      <div className="flex min-h-screen items-center justify-center px-6">
        <form
          onSubmit={kuldKerest}
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
            <h1 className="text-2xl font-semibold">Elfelejtett jelszó</h1>
            <p className="text-sm text-zinc-400">
              Írd be az email címed, és küldünk visszaállítási lehetőséget.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-zinc-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => allitEmail(e.target.value)}
              required
              className="
                w-full rounded-lg border border-white/10 bg-black/40
                px-3 py-2 outline-none focus:border-white/25
              "
              placeholder="pelda@pelda.hu"
            />
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
            aria-label="Elküld"
          >
            {folyamatban ? "Küldés..." : "Visszaállítás kérése"}
          </button>

          <div className="text-center text-sm text-zinc-400">
            Vissza a{" "}
            <a href="/belepes" className="underline hover:opacity-80">
              Belépéshez
            </a>
            .
          </div>

          {/* -- fejlesztoi segitseg: ha kaptunk tokent, mutassuk meg + gyors link a 2. lepesre */}
          {kapottToken && (
            <div className="mt-2 rounded-lg border border-white/10 p-3 text-xs text-zinc-300">
              <div className="font-semibold mb-1">Fejlesztés (token):</div>
              <div className="break-all">{kapottToken}</div>
              <div className="mt-2">
                <a
                  className="underline hover:opacity-80"
                  href={`/jelszo-visszaallitasa?token=${encodeURIComponent(kapottToken)}`}
                >
                  Ugrás a visszaállítás 2. lépésére ezzel a tokennel
                </a>
              </div>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
