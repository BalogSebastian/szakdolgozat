// app/fiokom/page.tsx
// -- szemelyre szabott oldal hatter2.jpg-vel
// -- jobb felso sarokban a felhasznaloi menu (nev + lenyilo)

"use client";

import FelhasznaloMenu from "@/components/FelhasznaloMenu";
import Image from "next/image";

export default function FiokomOldal() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* -- hatterkep (pirosas-fekete hangulat) -- */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black/55" />
        <Image
          src="/hatter2.jpg"
          alt="Hangulat hatter"
          fill
          priority
          className="h-full w-full object-cover"
        />
      </div>

      {/* -- felso sav, jobb oldalon a felhasznaloi menu -- */}
      <header className="flex items-center justify-end px-6 py-4">
        <FelhasznaloMenu />
      </header>

      {/* -- egyszeru kozep tartalom helyorzo -- */}
      <section className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center text-zinc-100 space-y-2">
          <h1 className="text-3xl font-semibold tracking-wide">
            Üdv a saját felületeden.
          </h1>
          <p className="text-zinc-300 text-sm max-w-md mx-auto">
            Itt fogod kezelni a playlisteket, állapotokat és az ajánlásokat.
          </p>
        </div>
      </section>
    </main>
  );
}
