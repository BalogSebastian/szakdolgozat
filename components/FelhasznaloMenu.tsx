// components/FelhasznaloMenu.tsx
// -- egyszeru jobb felso felhasznaloi menu
// -- felhasznalo neve -> lenyitva: email + kijelentkezes

"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

function alakitsNevet(email: string, nev?: string | null) {
  // ha van nev tarolva, hasznaljuk azt
  if (nev && nev.trim()) return nev.trim();

  // kulonben probaljuk az email kukac elotti reszet alakositani
  if (!email) return "Ismeretlen";
  const elotag = email.split("@")[0] || "Ismeretlen";
  // elotagbol csinaljunk valami olvashatot: elvalasztok menten nagy kezdobetuk
  return elotag
    .split(/[.\-_ ]+/)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

export default function FelhasznaloMenu() {
  const router = useRouter();

  // -- allapotok
  const [lenyitva, allitLenyitva] = useState(false);
  const [email, allitEmail] = useState<string>("");
  const [nev, allitNev] = useState<string>("");

  const menuRef = useRef<HTMLDivElement | null>(null);

  // -- betolteskor beolvassuk a localStorage-ot
  useEffect(() => {
    try {
      const token = localStorage.getItem("belepes_token");
      const taroltEmail = localStorage.getItem("bejelentkezett_email") || "";
      const taroltNev = localStorage.getItem("bejelentkezett_nev"); // ha regisztracional majd elmentjuk

      if (!token) {
        // nincs token -> vissza a belepesre
        router.replace("/belepes");
        return;
      }

      allitEmail(taroltEmail);
      allitNev(alakitsNevet(taroltEmail, taroltNev));
    } catch {
      // ha valami gond van a storage-al, terjunk vissza a belepesre
      router.replace("/belepes");
    }
  }, [router]);

  // -- katt a gombon: lenyit/becsuk
  function valtLenyit() {
    allitLenyitva((v) => !v);
  }

  // -- katt az ablakon kivul: csukjuk be
  useEffect(() => {
    function kattKivul(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) {
        allitLenyitva(false);
      }
    }
    window.addEventListener("click", kattKivul);
    return () => window.removeEventListener("click", kattKivul);
  }, []);

  // -- kijelentkezes: toroljuk a token/email/nev adatokat
  function kijelentkez() {
    try {
      localStorage.removeItem("belepes_token");
      localStorage.removeItem("bejelentkezett_email");
      localStorage.removeItem("bejelentkezett_nev");
    } catch {}
    router.replace("/belepes");
  }

  return (
    <div ref={menuRef} className="relative">
      {/* -- gomb a jobb felso sarokban */}
      <button
        onClick={valtLenyit}
        className="
          rounded-full px-4 py-2
          border border-white/10
          bg-[linear-gradient(180deg,rgba(24,24,28,.9),rgba(12,12,14,.9))]
          text-zinc-100
          hover:border-white/20 transition
          shadow-[inset_0_1px_0_rgba(255,255,255,.06)]
          backdrop-blur
        "
        aria-label="Felhasználói menü"
        title="Felhasználói menü"
      >
        {/* udvozles roviden */}
        <span className="text-sm">Szia, </span>
        <span className="text-sm font-semibold">{nev || "Felhasználó"}</span>
      </button>

      {/* -- lenyilo doboz */}
      {lenyitva && (
        <div
          className="
            absolute right-0 mt-2 w-64
            rounded-xl border border-white/10
            bg-[linear-gradient(180deg,rgba(18,18,22,.95),rgba(10,10,12,.95))]
            text-zinc-100
            shadow-[0_10px_30px_rgba(0,0,0,.5),inset_0_1px_0_rgba(255,255,255,.05)]
            backdrop-blur
            p-3 space-y-3
            z-20
          "
        >
          <div className="text-xs tracking-[0.25em] uppercase text-zinc-400">
            FIÓK
          </div>

          <div className="space-y-1">
            <div className="text-sm font-medium">{nev || "Felhasználó"}</div>
            <div className="text-xs text-zinc-400 break-all">
              {email || "ismeretlen@ismeretlen"}
            </div>
          </div>

          <div className="h-px w-full bg-white/10" />

          <button
            onClick={kijelentkez}
            className="
              w-full rounded-lg px-3 py-2
              text-left text-sm
              border border-white/10
              hover:border-white/20 transition
            "
          >
            Kijelentkezés
          </button>
        </div>
      )}
    </div>
  );
}
