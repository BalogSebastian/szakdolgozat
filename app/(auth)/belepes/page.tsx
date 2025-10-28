//    ez itt : app/(auth)/belepes/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BelepesOldal() {
  const router = useRouter();

  // -- beviteli mezok
  const [email, allitEmail] = useState("");
  const [jelszo, allitJelszo] = useState("");

  // -- allapotok
  const [folyamatban, allitFolyamatban] = useState(false);
  const [hiba, allitHiba] = useState<string | null>(null);
  const [diagUzenet, allitDiagUzenet] = useState<string | null>(null);
  const [szerverAllapot, allitSzerverAllapot] = useState<string | null>(null);

  // -- API ALAP: mindig relativ, a Next proxyzza (/backend -> :8081)
  const apiAlap = "/backend";
  console.log("API ALAP:", apiAlap);

  // -- diag: ellenorizzuk, hogy el-e a szerver
  async function tesztElo() {
    allitSzerverAllapot("ellenőrzés...");
    allitDiagUzenet(null);
    try {
      const r = await fetch(`${apiAlap}/api/elo`, { method: "GET" });
      const t = await r.text();
      allitSzerverAllapot(`status=${r.status} válasz="${t}"`);
    } catch (e: unknown) {
      const uzenet = e instanceof Error ? e.message : String(e);
      allitSzerverAllapot(`hiba: ${uzenet}`);
    }
  }

  // -- belepes kuldese
  async function kuldBelepes(e: React.FormEvent) {
    e.preventDefault();
    allitHiba(null);
    allitDiagUzenet(null);
    allitFolyamatban(true);

    try {
      const valasz = await fetch(`${apiAlap}/api/belep`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, jelszo }),
      });

      const szoveg = await valasz.text();
      console.log("VALASZ ALLAPOT:", valasz.status, "SZOVEG:", szoveg);

      if (!valasz.ok || szoveg === "hiba") {
        allitHiba("Hibás email vagy jelszó.");
        allitDiagUzenet(`HTTP ${valasz.status} | törzs: ${szoveg}`);
        allitFolyamatban(false);
        return;
      }

      // -- siker: egyszeru token_... sztring jön vissza
      try {
        localStorage.setItem("belepes_token", szoveg);
        // fontos: a dashboard jobb felso menuje innen olvassa ki
        localStorage.setItem("bejelentkezett_email", email);
        // ha kesobb a backend visszaad nevet is, itt el lehet menteni:
        // localStorage.setItem("bejelentkezett_nev", kapottNev);
      } catch {
        /* semmi, tovabblepunk */
      }

      router.push("/fiokom");
    } catch (err: unknown) {
      const uzenet = err instanceof Error ? err.message : String(err);
      allitHiba("Valami hiba történt. Próbáld újra.");
      allitDiagUzenet(uzenet);
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
          onSubmit={kuldBelepes}
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
            <h1 className="text-2xl font-semibold">Belépés</h1>
            <p className="text-sm text-zinc-400">
              Jelentkezz be az email címeddel.
            </p>
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

          {/* 
          
          jelszo mezo ez lesz 
          
           */}
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
          </div>

          {/* 
          
          hiba uzenet 
          
          diag  */}
          {hiba && <div className="text-sm text-red-400">{hiba}</div>}
          {diagUzenet && (
            <div className="text-xs text-zinc-400">
              (diag) {diagUzenet}
            </div>
          )}

          {/* 
          
          kuldes gomb +
          
          szerver teszt 
           */}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={folyamatban}
              className="
                flex-1 rounded-full px-4 py-2
                border border-white/10
                bg-[linear-gradient(180deg,rgba(24,24,28,.9),rgba(12,12,14,.9))]
                hover:border-white/20
                hover:shadow-[0_0_30px_rgba(255,255,255,.08),inset_0_1px_0_rgba(255,255,255,.08)]
                transition
              "
              aria-label="Belépés"
            >
              {folyamatban ? "Beléptetés..." : "Belépés"}
            </button>

            <button
              type="button"
              onClick={tesztElo}
              className="
                rounded-full px-4 py-2 text-sm
                border border-white/10
                hover:border-white/20 transition
              "
              aria-label="Szerver teszt"
              title="Szerver teszt (GET /backend/api/elo)"
            >
              Szerver teszt
            </button>
          </div>

          {szerverAllapot && (
            <div className="text-xs text-zinc-400">
              (szerver) {szerverAllapot}
            </div>
          )}

          <div className="text-center text-sm text-zinc-400">
            <span className="opacity-75">Nincs fiókod?</span>{" "}
            <a href="/regisztracio" className="underline hover:opacity-80">
              Regisztráció
            </a>
            <span className="mx-2">•</span>
            <a href="/elfelejtett-jelszo" className="underline hover:opacity-80">
              Elfelejtett jelszó
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
