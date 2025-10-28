// components/FelugroAblak.tsx
// -- nagyon egyszeru felugro (modal) komponens, ESC-re es hatterkattintasra is zarhato


import { useEffect } from "react";

type Tulajdonsagok = {
  nyitva: boolean;
  bezar: () => void;
  cim?: string;
  gyerek: React.ReactNode;
};

export default function FelugroAblak({ nyitva, bezar, cim, gyerek }: Tulajdonsagok) {
  // -- ESC gomb: bezar
  useEffect(() => {
    function kezelo(e: KeyboardEvent) {
      if (e.key === "Escape") bezar();
    }
    if (nyitva) window.addEventListener("keydown", kezelo);
    return () => window.removeEventListener("keydown", kezelo);
  }, [nyitva, bezar]);

  if (!nyitva) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={bezar}
      role="dialog"
      aria-modal="true"
    >
      {/* sotet hatter */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* doboz */}
      <div
        className="relative z-10 w-full max-w-2xl rounded-2xl border border-white/10 bg-black/85 p-6 shadow-[0_20px_80px_rgba(0,0,0,.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-100">{cim || "Részletek"}</h3>
          <button
            onClick={bezar}
            className="rounded-md border border-white/10 px-3 py-1 text-sm text-zinc-200 hover:border-white/20 hover:bg-white/10"
          >
            Bezár
          </button>
        </div>
        <div className="text-zinc-100">{gyerek}</div>
      </div>
    </div>
  );
}
