import React from "react";
import { AbsoluteFill, Img, staticFile, useVideoConfig } from "remotion";
import { MARCA, zonaSegura } from "./marca";

export type PlacaProps = {
  titulo: string;
  bajada?: string; // una línea secundaria, como mucho
  cta: string;
  imagenFondo?: string | null; // archivo dentro de /public, ej. "captura.png"
  colorAcento?: string;
};

export const Placa: React.FC<PlacaProps> = (p) => {
  const { width, height } = useVideoConfig();
  const z = zonaSegura(width, height);
  const acento = p.colorAcento ?? MARCA.colorAcento;
  const escala = width / 1080;
  return (
    <AbsoluteFill style={{ background: MARCA.colorPrincipal, fontFamily: MARCA.fuente, color: MARCA.colorTexto }}>
      {p.imagenFondo ? (
        <>
          <Img src={staticFile(p.imagenFondo)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,.25), rgba(0,0,0,.75))" }} />
        </>
      ) : (
        <AbsoluteFill style={{ background: `radial-gradient(circle at 75% 20%, ${acento}40, transparent 55%), radial-gradient(circle at 10% 90%, ${acento}26, transparent 50%)` }} />
      )}
      <AbsoluteFill style={{
        paddingTop: z.arriba + 70 * escala, paddingBottom: z.abajo + 40 * escala, paddingLeft: z.lados, paddingRight: z.lados,
        justifyContent: "center", gap: 36 * escala,
      }}>
        <div style={{ fontWeight: 900, fontSize: 92 * escala, lineHeight: 1.05, textShadow: "0 4px 18px rgba(0,0,0,.5)" }}>{p.titulo}</div>
        {p.bajada && <div style={{ fontSize: 44 * escala, lineHeight: 1.25, opacity: 0.9 }}>{p.bajada}</div>}
        <div style={{
          alignSelf: "flex-start", background: acento, color: "#111", fontWeight: 900, fontSize: 48 * escala,
          padding: `${22 * escala}px ${40 * escala}px`, borderRadius: 22 * escala,
        }}>{p.cta}</div>
      </AbsoluteFill>
      <div style={{
        position: "absolute", top: z.arriba + 10, left: z.lados, padding: `${8 * escala}px ${20 * escala}px`, borderRadius: 999,
        background: "rgba(0,0,0,.6)", fontSize: 30 * escala, fontWeight: 700,
      }}>{MARCA.legal}</div>
    </AbsoluteFill>
  );
};
