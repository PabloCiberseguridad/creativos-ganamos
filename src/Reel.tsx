import React from "react";
import {
  AbsoluteFill, OffthreadVideo, Sequence, interpolate, spring, staticFile,
  useCurrentFrame, useVideoConfig,
} from "remotion";
import { MARCA, zonaSegura } from "./marca";

export type Escena = { texto: string; segundos: number };
export type ReelProps = {
  gancho: string; // lo que se ve en los primeros 3 segundos
  escenas: Escena[]; // subtítulos, en orden
  cta: string; // llamado a la acción del final
  videoFondo?: string | null; // archivo dentro de /public, ej. "app.mp4"
  colorAcento?: string;
};

export const SEG_GANCHO = 3;
export const SEG_CTA = 3;
export const duracionReel = (p: ReelProps, fps: number) =>
  Math.round((SEG_GANCHO + p.escenas.reduce((s, e) => s + e.segundos, 0) + SEG_CTA) * fps);

const Fondo: React.FC<{ video?: string | null; acento: string }> = ({ video, acento }) => {
  const f = useCurrentFrame();
  if (video) {
    return (
      <AbsoluteFill>
        <OffthreadVideo src={staticFile(video)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,.35), rgba(0,0,0,.15) 40%, rgba(0,0,0,.55))" }} />
      </AbsoluteFill>
    );
  }
  // Sin grabación: fondo animado y un marco de celular que avisa dónde va la app.
  const giro = (f / 3) % 360;
  return (
    <AbsoluteFill style={{ background: MARCA.colorPrincipal }}>
      <AbsoluteFill style={{ background: `conic-gradient(from ${giro}deg at 50% 45%, ${acento}33, transparent 30%, ${acento}22 60%, transparent)`, filter: "blur(80px)" }} />
      <div style={{
        position: "absolute", left: "50%", top: "47%", width: 520, height: 1000, transform: "translate(-50%,-50%)",
        borderRadius: 64, border: "10px solid #2a2d34", background: "#16181e",
        display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 90, color: "#6b7280",
        fontFamily: MARCA.fuente, fontSize: 34, textAlign: "center", padding: 40,
      }}>
        Acá va tu grabación de la app
        <br />(public/app.mp4)
      </div>
    </AbsoluteFill>
  );
};

const Legal: React.FC = () => {
  const { width, height } = useVideoConfig();
  const z = zonaSegura(width, height);
  return (
    <div style={{
      position: "absolute", top: z.arriba + 10, left: z.lados, padding: "10px 22px", borderRadius: 999,
      background: "rgba(0,0,0,.6)", color: "#fff", fontFamily: MARCA.fuente, fontSize: 34, fontWeight: 700,
    }}>{MARCA.legal}</div>
  );
};

const Titular: React.FC<{ texto: string; acento: string; grande?: boolean }> = ({ texto, acento, grande }) => {
  const f = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const z = zonaSegura(width, height);
  const s = spring({ frame: f, fps, config: { damping: 14, mass: 0.6 } });
  return (
    <AbsoluteFill style={{ paddingTop: z.arriba, paddingBottom: z.abajo, paddingLeft: z.lados, paddingRight: z.lados, justifyContent: "center", alignItems: "center" }}>
      <div style={{
        transform: `scale(${0.8 + 0.2 * s})`, opacity: s, textAlign: "center",
        fontFamily: MARCA.fuente, fontWeight: 900, fontSize: grande ? 96 : 78, lineHeight: 1.05,
        color: MARCA.colorTexto, textShadow: "0 6px 24px rgba(0,0,0,.6)",
      }}>
        {texto}
        <div style={{ height: 14, width: 180 * s, background: acento, borderRadius: 8, margin: "28px auto 0" }} />
      </div>
    </AbsoluteFill>
  );
};

const Subtitulo: React.FC<{ texto: string }> = ({ texto }) => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const z = zonaSegura(width, height);
  const op = interpolate(f, [0, 6], [0, 1], { extrapolateRight: "clamp" });
  const y = interpolate(f, [0, 8], [30, 0], { extrapolateRight: "clamp" });
  return (
    <div style={{
      position: "absolute", left: z.lados, right: z.lados, bottom: z.abajo + 20, display: "flex", justifyContent: "center",
      opacity: op, transform: `translateY(${y}px)`,
    }}>
      <span style={{
        background: "rgba(0,0,0,.72)", color: "#fff", fontFamily: MARCA.fuente, fontWeight: 800, fontSize: 58,
        lineHeight: 1.2, padding: "18px 30px", borderRadius: 20, textAlign: "center",
      }}>{texto}</span>
    </div>
  );
};

const Cta: React.FC<{ texto: string; acento: string }> = ({ texto, acento }) => {
  const f = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const z = zonaSegura(width, height);
  const s = spring({ frame: f, fps, config: { damping: 12 } });
  const pulso = 1 + 0.03 * Math.sin(f / 4);
  return (
    <AbsoluteFill style={{ paddingTop: z.arriba, paddingBottom: z.abajo, justifyContent: "center", alignItems: "center", background: "rgba(0,0,0,.45)" }}>
      <div style={{
        transform: `scale(${s * pulso})`, background: acento, color: "#111", fontFamily: MARCA.fuente,
        fontWeight: 900, fontSize: 72, padding: "34px 56px", borderRadius: 28, textAlign: "center", maxWidth: width - z.lados * 2,
      }}>{texto}</div>
    </AbsoluteFill>
  );
};

export const Reel: React.FC<ReelProps> = (p) => {
  const { fps } = useVideoConfig();
  const acento = p.colorAcento ?? MARCA.colorAcento;
  let desde = SEG_GANCHO * fps;
  return (
    <AbsoluteFill style={{ background: MARCA.colorPrincipal }}>
      <Fondo video={p.videoFondo} acento={acento} />
      <Sequence durationInFrames={SEG_GANCHO * fps}>
        <Titular texto={p.gancho} acento={acento} grande />
      </Sequence>
      {p.escenas.map((e, i) => {
        const dur = Math.round(e.segundos * fps);
        const seq = (
          <Sequence key={i} from={desde} durationInFrames={dur}>
            <Subtitulo texto={e.texto} />
          </Sequence>
        );
        desde += dur;
        return seq;
      })}
      <Sequence from={desde} durationInFrames={SEG_CTA * fps}>
        <Cta texto={p.cta} acento={acento} />
      </Sequence>
      <Legal />
    </AbsoluteFill>
  );
};
