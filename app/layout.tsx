import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "feel the music not just hear it",
  description: "Letisztult kezdőoldal – Next.js + React + TS + Tailwind",
};

export default function GyokerElrendezes({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hu">
      <body className="antialiased">{children}</body>
    </html>
  );
}
