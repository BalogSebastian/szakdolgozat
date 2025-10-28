// app/fiokom/page.tsx
// -- szemelyre szabott oldal: háttér, felhasználói menü, saját playlistek kezelése

"use client";

import Image from "next/image";
import FelhasznaloMenu from "@/components/FelhasznaloMenu";
import FelugroAblak from "@/components/FelugroAblak";
import {
  feltoltPlaylist,
  listazPlaylistek,
  torolPlaylist,
  type PlaylistDokumentum,
} from "@/lib/api";
import { useEffect, useMemo, useState } from "react";

export default function FiokomOldal() {
  // --- Állapotok
  const [email, beallitEmail] = useState<string>("");
  const [nev, beallitNev] = useState<string>("");
  const [fajl, beallitFajl] = useState<File | null>(null);
  const [toltes, beallitToltes] = useState(false);
  const [hiba, beallitHiba] = useState<string | null>(null);
  const [uzenet, beallitUzenet] = useState<string | null>(null);
  const [playlistek, beallitPlaylistek] = useState<PlaylistDokumentum[]>([]);

  // --- Részletek modal
  const [reszletekNyitva, beallitReszletekNyitva] = useState(false);
  const [kivalasztott, beallitKivalasztott] = useState<PlaylistDokumentum | null>(null);

  // --- belépett email helyes beolvasása
  useEffect(() => {
    try {
      const tarolt = window.localStorage.getItem("bejelentkezett_email");
      if (tarolt && tarolt.trim()) {
        beallitEmail(tarolt.trim().toLowerCase());
      } else {
        beallitEmail("");
      }
    } catch {
      beallitEmail("");
    }
  }, []);

  // --- Kezdeti lekérés
  useEffect(() => {
    if (!email) return;
    (async () => {
      try {
        const adatok = await listazPlaylistek(email);
        beallitPlaylistek(adatok);
      } catch (e: any) {
        beallitHiba(e?.message || "Hiba a listázásnál");
      }
    })();
  }, [email]);

  // --- Egyszerű validálás
  const ervenyesFeltoltes = useMemo(
    () => email.trim() && nev.trim() && !!fajl,
    [email, nev, fajl]
  );

  // --- Fájl kiválasztás
  function fajlKivalasztas(e: React.ChangeEvent<HTMLInputElement>) {
    beallitFajl(e.target.files?.[0] || null);
  }

  // --- Feltöltés
  async function bekuldFeltoltes() {
    if (!ervenyesFeltoltes || !fajl) return;

    beallitToltes(true);
    beallitHiba(null);
    beallitUzenet(null);

    try {
      const id = await feltoltPlaylist(email, nev, fajl);
      beallitUzenet(`Sikeres feltöltés (ID: ${id})`);
      beallitNev("");
      beallitFajl(null);

      const friss = await listazPlaylistek(email);
      beallitPlaylistek(friss);
    } catch (e: any) {
      beallitHiba(e?.message || "Hiba a feltöltésnél");
    } finally {
      beallitToltes(false);
    }
  }

  // --- Törlés
  async function torlesKatt(id: string) {
    beallitToltes(true);
    beallitHiba(null);
    beallitUzenet(null);

    try {
      await torolPlaylist(id, email);
      beallitUzenet("Playlist törölve.");
      const friss = await listazPlaylistek(email);
      beallitPlaylistek(friss);

      // ha a megnyitott épp ez volt, zárjuk be
      if (kivalasztott?.id === id) {
        beallitKivalasztott(null);
        beallitReszletekNyitva(false);
      }
    } catch (e: any) {
      beallitHiba(e?.message || "Hiba a törlésnél");
    } finally {
      beallitToltes(false);
    }
  }

  // --- Részletek megnyitás
  function megnyitReszletek(p: PlaylistDokumentum) {
    beallitKivalasztott(p);
    beallitReszletekNyitva(true);
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-zinc-100">
      {/* --- Háttérkép + overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hatter2.jpg"
          alt="Hangulat háttér"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* --- Fejléc */}
      <header className="flex items-center justify-end px-6 py-4">
        <FelhasznaloMenu />
      </header>

      {/* --- Központi tartalom */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-20 sm:px-10">
        {/* Üdvözlés */}
        <div className="mb-8 text-center">
          <div className="text-sm text-zinc-300">
            Belépve:{" "}
            <span className="font-medium text-zinc-100">
              {email || "ismeretlen"}
            </span>
          </div>
          <h1 className="mt-1 text-3xl font-semibold tracking-wide">
            Üdv a saját felületeden.
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-zinc-300">
            Itt tudod kezelni a playlisteket: feltöltés, megtekintés, törlés.
          </p>
        </div>

        {/* --- Feltöltő blokk */}
        <div className="mb-10 rounded-2xl border border-white/10 bg-black/40 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,.06)] sm:p-8">
          <h2 className="mb-2 text-lg font-bold uppercase tracking-wide">
            Új playlist feltöltése
          </h2>
          <p className="mb-6 text-sm text-zinc-300">
            M3U / CSV / TXT – soronként <em>„Előadó - Cím”</em> formátum is jó.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-wider">
                Playlist neve
              </span>
              <input
                value={nev}
                onChange={(e) => beallitNev(e.target.value)}
                className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
                placeholder="Pl. Reggeli fókusz"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-wider">
                Fájl kiválasztása
              </span>
              <input
                type="file"
                accept=".m3u,.m3u8,.csv,.txt"
                onChange={fajlKivalasztas}
                className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-1.5 file:mr-3 file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-zinc-100 file:hover:bg-white/20"
              />
            </label>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={bekuldFeltoltes}
              disabled={!ervenyesFeltoltes || toltes}
              className="rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(18,18,22,.85),rgba(10,10,12,.85))] px-5 py-2 uppercase tracking-wide hover:border-white/20 hover:bg-[linear-gradient(180deg,rgba(24,24,28,.9),rgba(12,12,14,.9))] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Feltöltés
            </button>

            {/* Deezer gomb */}
            <a
              href="/deezer"
              className="rounded-full border border-white/10 px-4 py-2 text-sm hover:border-white/20 hover:bg-white/10 transition"
            >
              🎵 Új playlist készítése Deezerből
            </a>

            {toltes && <span className="text-sm text-zinc-300">Feltöltés folyamatban…</span>}
            {uzenet && <span className="text-sm text-emerald-300">{uzenet}</span>}
            {hiba && <span className="text-sm text-red-300">{hiba}</span>}
          </div>
        </div>

        {/* --- Lista */}
        <div className="rounded-2xl border border-white/10 bg-black/40 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,.06)] sm:p-8">
          <h2 className="mb-4 text-lg font-bold uppercase tracking-wide">
            Saját playlistek
          </h2>

          {!email ? (
            <p className="text-sm text-red-400">
              Hiba: Nem található bejelentkezett email. Jelentkezz be újra.
            </p>
          ) : playlistek.length === 0 ? (
            <p className="text-sm text-zinc-300">
              Még nincs feltöltött playlist. Tölts fel egyet fent!
            </p>
          ) : (
            <ul className="space-y-3">
              {playlistek.map((p) => (
                <li
                  key={p.id}
                  className="flex flex-col gap-3 rounded-lg border border-white/10 bg-black/30 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="text-base font-semibold">{p.nev}</div>
                    <div className="text-xs text-zinc-400">
                      {new Date(p.letrehozva).toLocaleString("hu-HU")}
                      {" · "}
                      {p.szamok?.length ?? 0} szám
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => megnyitReszletek(p)}
                      className="rounded-full border border-white/10 px-4 py-1.5 hover:border-white/20 hover:bg-white/10"
                    >
                      Megnézem
                    </button>
                    <button
                      onClick={() => torlesKatt(p.id)}
                      className="rounded-full border border-white/10 px-4 py-1.5 text-red-200 hover:border-red-300/40 hover:bg-red-300/10"
                    >
                      Törlés
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* --- Részletek modal */}
      <FelugroAblak
        nyitva={reszletekNyitva}
        bezar={() => beallitReszletekNyitva(false)}
        cim={kivalasztott ? `„${kivalasztott.nev}” – dalok` : "Részletek"}
        gyerek={
          <div className="max-h-[60vh] overflow-auto pr-1">
            {!kivalasztott?.szamok?.length ? (
              <div className="text-sm text-zinc-300">
                Ebben a playlistben még nincs dal.
              </div>
            ) : (
              <ol className="space-y-2 text-sm">
                {kivalasztott.szamok.map((s, i) => (
                  <li
                    key={`${s.eloado}-${s.cim}-${i}`}
                    className="flex items-start justify-between rounded-md border border-white/10 bg-black/30 px-3 py-2"
                  >
                    <span className="text-zinc-100">
                      <span className="text-zinc-400 mr-2">{i + 1}.</span>
                      <strong className="mr-1">{s.eloado}</strong>
                      – {s.cim}
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        }
      />
    </main>
  );
}
