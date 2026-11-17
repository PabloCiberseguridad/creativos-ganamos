import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Fuentes, Fondo, Brillos, Destello, Flash, Titulo, Bajada, Boton, Logo, Legal } from "./Ganamos";
import { MARCA } from "./marca";

// Video del oso (832x1024) mejorado: gancho, textos, +18 fijo y cierre de marca.
// formato "9x16" (1080x1920) o "4x5" (1080x1350).
const CLIP = "clips/tragamonedas.mp4";
const DUR_CLIP = 300; // 10 s a 30 fps
export const DUR_TRAGA = DUR_CLIP + 90; // + 3 s de cierre

const Clip: React.FC<{ vertical: boolean }> = ({ vertical }) => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const h = width * (1024 / 832);
  const top = vertical ? height * 0.06 : (height - h) / 2;
  const vol = interpolate(f, [DUR_CLIP - 20, DUR_CLIP], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      {/* relleno de fondo: el mismo video, desenfocado */}
      <OffthreadVideo src={staticFile(CLIP)} muted style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", filter: "blur(40px) brightness(.45) saturate(1.3)", transform: "scale(1.2)" }} />
      <div style={{ position: "absolute", left: 0, top, width, height: h, overflow: "hidden", boxShadow: "0 0 80px rgba(169,75,255,.45)" }}>
        <OffthreadVideo src={staticFile(CLIP)} volume={vol} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(20,2,31,.0) 45%, rgba(20,2,31,.75) 85%, rgba(20,2,31,.95) 100%)" }} />
      </div>
    </AbsoluteFill>
  );
};

const CierreTraga: React.FC<{ vertical: boolean }> = ({ vertical }) => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, 90], [1.05, 1.15]);
  return (
    <AbsoluteFill>
      <Fondo />
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <Img src={staticFile("clips/tragamonedas_final.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(10px) brightness(.4)", transform: `scale(${z})` }} />
      </AbsoluteFill>
      <Logo y={vertical ? 0.33 : 0.3} ancho={0.66} />
      <Bajada texto="Slots · Ruleta · En vivo" y={vertical ? 0.43 : 0.45} tam={46} demora={6} />
      <Boton texto="Jugar ahora" y={vertical ? 0.49 : 0.55} demora={12} />
    </AbsoluteFill>
  );
};

export const Tragamonedas: React.FC<{ formato: "9x16" | "4x5" }> = ({ formato }) => {
  const v = formato === "9x16";
  // posiciones de textos: en 9:16 todo queda arriba del 35% de abajo (lo tapan los botones de Reels)
  const yA = v ? 0.47 : 0.62, yB = v ? 0.545 : 0.72;
  return (
    <AbsoluteFill style={{ background: MARCA.colorPrincipal }}>
      <Fuentes />
      <Sequence durationInFrames={DUR_CLIP}>
        <Clip vertical={v} />
        <Sequence durationInFrames={75}>
          <Titulo texto="¿PLAN PARA" tam={v ? 104 : 96} tipo="plata" y={yA} demora={6} efecto="sube" />
          <Titulo texto="ESTA NOCHE?" tam={v ? 124 : 112} tipo="oro" y={yB} demora={14} efecto="slam" />
        </Sequence>
        <Sequence from={75} durationInFrames={70}>
          <Titulo texto="UN CAFÉ," tam={v ? 110 : 100} tipo="plata" y={yA} efecto="sube" />
          <Titulo texto="UNAS TIRADAS" tam={v ? 110 : 100} tipo="oro" y={yB} demora={8} efecto="sube" />
        </Sequence>
        <Sequence from={145} durationInFrames={80}>
          <Titulo texto="¡A GIRAR!" tam={v ? 150 : 132} tipo="oro" y={yA + 0.02} efecto="slam" fuente="a" />
        </Sequence>
        <Sequence from={225} durationInFrames={75}>
          <Titulo texto="¡QUÉ NOCHE!" tam={v ? 140 : 124} tipo="oro" y={yA + 0.02} efecto="slam" fuente="a" />
        </Sequence>
        <Brillos n={40} desde={0.3} hasta={0.9} />
      </Sequence>
      <Sequence from={DUR_CLIP} durationInFrames={90}>
        <CierreTraga vertical={v} />
        <Brillos n={70} />
        <Destello />
      </Sequence>
      <Flash en={225} color="255,214,102" />
      <Flash en={DUR_CLIP} color="169,75,255" />
      <Legal y={v ? 0.625 : 0.9} />
    </AbsoluteFill>
  );
};
