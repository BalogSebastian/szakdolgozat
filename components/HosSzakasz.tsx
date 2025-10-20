// ez itt a components/HosSzakasz.tsx file


import Image from "next/image";

export default function HosSzakasz() {
  return (
    <section className="relative h-screen w-full">
      <Image
        src="/hatter.jpg"           
        alt="Absztrakt zenei minta"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-[#2b1e54]/20 mix-blend-multiply" />

      {/* 
      
      ez itt a FEEL szó középen
      
      */}

      
      <div className="absolute inset-0 flex items-center">
      <h1
  className="px-4 text-[19.2vw] leading-none text-white/95 sm:px-8"
  style={{ fontWeight: 500, fontFamily: "serif" }}
>
  FEEL
</h1>
      </div>

      <div className="absolute inset-x-0 bottom-0 grid grid-cols-1 gap-6 px-6 pb-6 sm:grid-cols-2 sm:px-10">
        <div className="max-w-sm text-sm text-zinc-300">
        Kortalan, modern elegancia
        </div>
        <div className="max-w-sm text-sm text-zinc-300 sm:justify-self-end">
        Zene, ami nemcsak a füledhez szól, hanem a lelkedhez is
        </div>
      </div>
    </section>
  );
}
