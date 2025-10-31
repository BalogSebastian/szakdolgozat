// ez a : components/FejlecSav.tsx file

import Link from "next/link";

export default function FejlecSav() {
  return (
    <header className="fixed inset-x-0 top-0 z-20">
      <nav
        className="
          mx-auto flex max-w-none items-center justify-between
          px-6 py-5 sm:px-10
          bg-black/50 backdrop-blur supports-[backdrop-filter]:bg-black/50
          border-b border-white/10
        "
      >

        {/* 
                -- itt található a navbar bal oldala 
        */}

        <div className="hidden md:flex items-center gap-10">
          <Link
            href="#zenei-dns"
            className="uppercase tracking-wide text-lg sm:text-xl text-zinc-100 hover:text-white transition"
          >
            Zenei DNS
          </Link>
          <Link
            href="#ajanlasok"
            className="uppercase tracking-wide text-lg sm:text-xl text-zinc-100 hover:text-white transition"
          >
            Ajánlások
          </Link>
          <Link
            href="#playlistek"
            className="uppercase tracking-wide text-lg sm:text-xl text-zinc-100 hover:text-white transition"
          >
            Playlistek
          </Link>
        </div>

         {/* 
                -- itt található a navbar középső oldala 
        */}

        <div className="flex flex-1 md:flex-none justify-center">
          <span className="font-bold uppercase tracking-[0.45em] text-sm sm:text-base text-zinc-200">
            FEEL&nbsp;THE&nbsp;MUSIC
          </span>
        </div>

         {/* 
                -- itt található a navbar jobb oldala 
        */}
        <div className="flex items-center gap-4 sm:gap-5">
          <Link
            href="belepes"
            className="uppercase tracking-wide text-lg sm:text-xl text-zinc-100 hover:text-white transition"
          >
            Bejelentkezés
          </Link>

          {/* 

          itt az RGB kombinácíókat netről néztem, ezt a részt =>

          => bg-[linear-gradient(180deg,rgba(18,18,22,.85),rgba(10,10,12,.85))]
              shadow-[inset_0_1px_0_rgba(255,255,255,.06)]
              hover:bg-[linear-gradient(180deg,rgba(24,24,28,.9),rgba(12,12,14,.9))]
              hover:border-white/20
              hover:shadow-[0_0_30px_rgba(255,255,255,.08),inset_0_1px_0_rgba(255,255,255,.08)]
              ,
               csak azért, hogy szép legyen :) 
          
          */}
          
          <Link
            href="regisztracio"
            className="
              relative inline-flex items-center justify-center
              uppercase tracking-wide text-lg sm:text-xl
              rounded-full px-5 py-2
              text-white
              border border-white/10
              bg-[linear-gradient(180deg,rgba(18,18,22,.85),rgba(10,10,12,.85))]
              shadow-[inset_0_1px_0_rgba(255,255,255,.06)]
              hover:bg-[linear-gradient(180deg,rgba(24,24,28,.9),rgba(12,12,14,.9))]
              hover:border-white/20
              hover:shadow-[0_0_30px_rgba(255,255,255,.08),inset_0_1px_0_rgba(255,255,255,.08)]
              transition
              backdrop-blur
            "
            aria-label="Regisztráció"
          >
            Regisztráció
            <span className="pointer-events-none absolute -inset-px rounded-full ring-1 ring-white/10" />
          </Link>
        </div>
      </nav>
      <div className="h-px w-full bg-white/10" />
    </header>
  );
}
