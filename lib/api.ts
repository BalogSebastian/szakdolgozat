// lib/api.ts – böngészőbarát kliens: a Next proxy végpontjait hívjuk

export type SzamAdat = { eloado: string; cim: string };
export type PlaylistDokumentum = {
  id: string;
  email: string;
  nev: string;
  szamok: SzamAdat[];
  letrehozva: string;
};

// -- playlist feltöltése a helyi proxyra
export async function feltoltPlaylist(email: string, nev: string, fajl: File): Promise<string> {
  const adat = new FormData();
  adat.append("email", email);
  adat.append("nev", nev);
  adat.append("fajl", fajl);

  const valasz = await fetch(`/api/hid/playlist/feltolt`, {
    method: "POST",
    body: adat,
  });

  const text = await valasz.text().catch(() => "hiba");
  if (!valasz.ok) throw new Error(text || "hiba");
  return text.trim(); // backend ID-t ad vissza plain textben
}

// -- playlist lista
export async function listazPlaylistek(email: string): Promise<PlaylistDokumentum[]> {
  const valasz = await fetch(`/api/hid/playlist?email=${encodeURIComponent(email)}`, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  const szoveg = await valasz.text().catch(() => "[]");
  if (!valasz.ok) throw new Error(szoveg || "hiba");

  try {
    return JSON.parse(szoveg) as PlaylistDokumentum[];
  } catch {
    throw new Error("Váratlan válasz (nem JSON)");
  }
}

// -- törlés
export async function torolPlaylist(id: string, email: string): Promise<void> {
  const valasz = await fetch(`/api/hid/playlist/${encodeURIComponent(id)}?email=${encodeURIComponent(email)}`, {
    method: "DELETE",
  });

  const text = await valasz.text().catch(() => "hiba");
  if (!valasz.ok) throw new Error(text || "hiba");
}
