import React from "react";
import {
  AbsoluteFill, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing,
} from "remotion";
import { MARCA } from "./marca";

// ---------- base: fuentes, fondo, arte, brillos ----------
export const Fuentes: React.FC = () => (
  <style>{`
@font-face{font-family:'Montserrat';font-weight:700;src:url(${staticFile("fuentes/montserrat-latin-700-normal.woff2")}) format('woff2')}
@font-face{font-family:'Montserrat';font-weight:800;src:url(${staticFile("fuentes/montserrat-latin-800-normal.woff2")}) format('woff2')}
@font-face{font-family:'Montserrat';font-weight:900;src:url(${staticFile("fuentes/montserrat-latin-900-normal.woff2")}) format('woff2')}
@font-face{font-family:'Anton';font-weight:400;src:url(${staticFile("fuentes/anton-latin-400-normal.woff2")}) format('woff2')}
`}</style>
);

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const rnd = (i: number) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

export const Fondo: React.FC = () => {
  const f = useCurrentFrame();
  const p = 0.5 + 0.5 * Math.sin(f / 22);
  return (
    <AbsoluteFill style={{ background: MARCA.colorPrincipal }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 70% 40% at 50% 58%, rgba(196,51,220,${0.28 + 0.12 * p}), transparent 70%)` }} />
      <div style={{ position: "absolute", left: "10%", right: "10%", top: "66%", height: 3, background: "linear-gradient(90deg, transparent, rgba(214,160,255,.7), transparent)", boxShadow: "0 0 30px 6px rgba(169,75,255,.45)", opacity: 0.7 }} />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 60% 30% at 20% 85%, rgba(109,26,168,.35), transparent 70%), radial-gradient(ellipse 60% 30% at 85% 80%, rgba(169,75,255,.22), transparent 70%)` }} />
    </AbsoluteFill>
  );
};

export const Arte: React.FC<{
  src: string; alto?: number; zoom?: [number, number]; panX?: [number, number]; panY?: [number, number];
  desenfoque?: number; oscuro?: number; dur: number; foco?: string;
}> = ({ src, alto = 0.6, zoom = [1.05, 1.16], panX = [0, 0], panY = [0, 0], desenfoque = 0, oscuro = 0, dur, foco = "50% 35%" }) => {
  const f = useCurrentFrame();
  const { height } = useVideoConfig();
  const t = interpolate(f, [0, dur], [0, 1], { ...clamp, easing: Easing.inOut(Easing.ease) });
  const s = zoom[0] + (zoom[1] - zoom[0]) * t;
  const x = panX[0] + (panX[1] - panX[0]) * t, y = panY[0] + (panY[1] - panY[0]) * t;
  const h = height * alto;
  return (
    <>
    <div style={{ position: "absolute", left: 0, right: 0, top: h - 2, bottom: 0, overflow: "hidden", opacity: 0.42 }}>
      <Img src={staticFile(src)} style={{ width: "100%", height: h, objectFit: "cover", objectPosition: foco,
        transform: `scaleY(-1) translate(${x}px,${-y}px) scale(${s})`, transformOrigin: "50% 50%", filter: `blur(${16 + desenfoque}px) brightness(.55) saturate(1.3)` }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${MARCA.colorPrincipal} 0%, rgba(20,2,31,.2) 35%, rgba(20,2,31,.55) 75%, ${MARCA.colorPrincipal} 100%)` }} />
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: h, overflow: "hidden" }}>
      <Img src={staticFile(src)} style={{
        width: "100%", height: "100%", objectFit: "cover", objectPosition: foco,
        transform: `translate(${x}px,${y}px) scale(${s})`, transformOrigin: foco,
        filter: `blur(${desenfoque}px) brightness(${1 - oscuro}) saturate(1.1)`,
      }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(20,2,31,.35) 0%, rgba(20,2,31,0) 18%, rgba(20,2,31,0) 55%, ${MARCA.colorPrincipal} 98%)` }} />
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 180px 40px rgba(20,2,31,.75)" }} />
    </div>
    </>
  );
};

export const Brillos: React.FC<{ n?: number; desde?: number; hasta?: number }> = ({ n = 70, desde = 0.25, hasta = 0.95 }) => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {Array.from({ length: n }).map((_, i) => {
        const vel = 0.6 + rnd(i) * 1.6, x = rnd(i + 99) * width;
        const rango = (hasta - desde) * height;
        const y = desde * height + ((rnd(i + 7) * rango - f * vel) % rango + rango) % rango;
        const tam = 2 + rnd(i + 3) * 5, tw = 0.35 + 0.65 * Math.abs(Math.sin(f / (6 + rnd(i) * 10) + i));
        const col = i % 3 === 0 ? "255,214,102" : i % 3 === 1 ? "214,160,255" : "255,255,255";
        return <div key={i} style={{ position: "absolute", left: x, top: y, width: tam, height: tam, borderRadius: 99, background: `rgba(${col},${tw})`, boxShadow: `0 0 ${tam * 4}px rgba(${col},${tw})` }} />;
      })}
    </AbsoluteFill>
  );
};

export const Destello: React.FC<{ dur?: number }> = ({ dur = 40 }) => {
  const f = useCurrentFrame();
  const x = interpolate(f % dur, [0, dur], [-60, 160]);
  return <AbsoluteFill style={{ pointerEvents: "none", background: `linear-gradient(110deg, transparent ${x - 12}%, rgba(255,255,255,.10) ${x}%, transparent ${x + 12}%)`, mixBlendMode: "screen" }} />;
};

export const Flash: React.FC<{ en: number; color?: string }> = ({ en, color = "255,255,255" }) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [en - 2, en, en + 10], [0, 0.85, 0], clamp);
  return <AbsoluteFill style={{ background: `rgba(${color},${o})`, pointerEvents: "none" }} />;
};

// ---------- textos ----------
const ORO = "linear-gradient(180deg,#fff7cf 0%,#ffe27a 22%,#f6c12c 45%,#d98c12 66%,#9a560a 82%,#f3c64e 100%)";
const PLATA = "linear-gradient(180deg,#ffffff 0%,#f1edf6 35%,#bdb3c8 62%,#7f7490 80%,#e9e4ef 100%)";

export const Titulo: React.FC<{
  texto: string; tam: number; tipo?: "oro" | "plata" | "blanco"; efecto?: "pop" | "slam" | "sube" | "letras";
  y: number; demora?: number; fuente?: "m" | "a"; ancho?: number;
}> = ({ texto, tam, tipo = "oro", efecto = "pop", y, demora = 0, fuente = "m", ancho = 0.9 }) => {
  const f = useCurrentFrame() - demora;
  const { fps, width, height } = useVideoConfig();
  if (f < 0) return null;
  const fam = fuente === "a" ? "'Anton', Impact, sans-serif" : "'Montserrat', 'Arial Black', sans-serif";
  const peso = fuente === "a" ? 400 : 900;
  const sp = spring({ frame: f, fps, config: efecto === "slam" ? { damping: 9, mass: 0.7, stiffness: 180 } : { damping: 13, mass: 0.6 } });
  let tr = "", op = 1;
  if (efecto === "pop") { tr = `scale(${0.6 + 0.4 * sp})`; op = Math.min(1, sp * 1.4); }
  if (efecto === "slam") { tr = `scale(${2.2 - 1.2 * sp})`; op = interpolate(f, [0, 4], [0, 1], clamp); }
  if (efecto === "sube") { tr = `translateY(${(1 - sp) * 60}px)`; op = sp; }
  const fondo = tipo === "oro" ? ORO : tipo === "plata" ? PLATA : "linear-gradient(#fff,#fff)";
  const base: React.CSSProperties = {
    fontFamily: fam, fontWeight: peso, fontSize: tam, lineHeight: 1, letterSpacing: fuente === "a" ? 2 : -1,
    textTransform: "uppercase", whiteSpace: "nowrap",
  };
  const letras = efecto === "letras" ? texto.split("") : [texto];
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: y * height, display: "flex", justifyContent: "center", transform: tr, opacity: op }}>
      <div style={{ position: "relative", maxWidth: width * ancho, whiteSpace: "nowrap" }}>
        {letras.map((l, i) => {
          const fl = efecto === "letras" ? f - i * 2 : f;
          const sl = efecto === "letras" ? spring({ frame: fl, fps, config: { damping: 12, mass: 0.5 } }) : 1;
          return (
            <span key={i} style={{ position: "relative", display: "inline-block", transform: efecto === "letras" ? `translateY(${(1 - sl) * 70}px)` : undefined, opacity: efecto === "letras" ? sl : 1 }}>
              <span style={{ ...base, position: "absolute", left: 0, top: 0, color: "transparent", WebkitTextStroke: `${tam * 0.12}px #1a0524`, textShadow: tipo === "blanco" ? "0 6px 24px rgba(0,0,0,.7)" : `0 0 ${tam * 0.35}px rgba(169,75,255,.9), 0 ${tam * 0.06}px 0 #12031a` }}>{l === " " ? " " : l}</span>
              <span style={{ ...base, position: "relative", backgroundImage: fondo, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", WebkitTextStroke: tipo === "blanco" ? undefined : `${Math.max(1, tam * 0.012)}px ${tipo === "oro" ? "#7a4306" : "#5d536b"}` }}>{l === " " ? " " : l}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export const Bajada: React.FC<{ texto: string; y: number; tam?: number; demora?: number }> = ({ texto, y, tam = 46, demora = 0 }) => {
  const f = useCurrentFrame() - demora;
  const { height } = useVideoConfig();
  if (f < 0) return null;
  const o = interpolate(f, [0, 10], [0, 1], clamp), dy = interpolate(f, [0, 12], [24, 0], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <div style={{ position: "absolute", left: 40, right: 40, top: y * height, textAlign: "center", opacity: o, transform: `translateY(${dy}px)`,
      fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: tam, color: "#fff", letterSpacing: 1.5, textTransform: "uppercase",
      textShadow: "0 3px 14px rgba(0,0,0,.8), 0 0 30px rgba(169,75,255,.5)" }}>{texto}</div>
  );
};

export const Boton: React.FC<{ texto: string; y: number; demora?: number; icono?: string }> = ({ texto, y, demora = 0, icono = "▶" }) => {
  const f = useCurrentFrame() - demora;
  const { fps, height } = useVideoConfig();
  if (f < 0) return null;
  const s = spring({ frame: f, fps, config: { damping: 11, mass: 0.6 } });
  const pulso = 1 + 0.035 * Math.sin(f / 5);
  const brillo = interpolate((f % 45), [0, 45], [-30, 130]);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: y * height, display: "flex", justifyContent: "center", transform: `scale(${s * pulso})` }}>
      <div style={{ position: "relative", overflow: "hidden", padding: "30px 70px", borderRadius: 999, border: "4px solid #fff",
        background: "linear-gradient(180deg,#a64bff 0%,#7a22d0 50%,#4f0f8a 100%)",
        boxShadow: "0 0 40px rgba(169,75,255,.95), 0 0 90px rgba(196,51,220,.55), inset 0 2px 0 rgba(255,255,255,.5)",
        fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 52, color: "#fff", letterSpacing: 1, textTransform: "uppercase", whiteSpace: "nowrap" }}>
        <span style={{ marginRight: 18, fontSize: 40, verticalAlign: "middle" }}>{icono}</span>{texto}
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, transparent ${brillo - 15}%, rgba(255,255,255,.45) ${brillo}%, transparent ${brillo + 15}%)` }} />
      </div>
    </div>
  );
};

export const Logo: React.FC<{ y: number; ancho?: number; demora?: number }> = ({ y, ancho = 0.5, demora = 0 }) => {
  const f = useCurrentFrame() - demora;
  const { width, height } = useVideoConfig();
  if (f < 0) return null;
  const o = interpolate(f, [0, 12], [0, 1], clamp);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: y * height, display: "flex", justifyContent: "center", opacity: o }}>
      <Img src={staticFile(MARCA.logo)} style={{ width: width * ancho, filter: "drop-shadow(0 0 18px rgba(169,75,255,.8))" }} />
    </div>
  );
};

export const Legal: React.FC<{ y?: number }> = ({ y = 0.625 }) => {
  const { height } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: y * height, display: "flex", justifyContent: "center" }}>
      <div style={{ padding: "10px 26px", borderRadius: 999, background: "rgba(10,0,18,.7)", border: "2px solid rgba(255,255,255,.25)",
        fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 30, color: "#fff", letterSpacing: 1 }}>+18 | JUGÁ CON RESPONSABILIDAD</div>
    </div>
  );
};

// Cierre igual en todos: logo, botón y legal
export const Cierre: React.FC<{ boton: string; bajada?: string; arte: string; dur: number; foco?: string }> = ({ boton, bajada, arte, dur, foco }) => (
  <AbsoluteFill>
    <Arte src={arte} dur={dur} zoom={[1.12, 1.2]} alto={0.5} foco={foco} />
    <Logo y={0.37} ancho={0.62} />
    {bajada ? <Bajada texto={bajada} y={0.455} tam={44} demora={6} /> : null}
    <Boton texto={boton} y={0.51} demora={10} />
  </AbsoluteFill>
);

const S = 30; // fps

// ---------- 1. La página oficial (misterio y revelación) ----------
const Perfil: React.FC<{ x: number; y: number; d: number }> = ({ x, y, d }) => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const flota = Math.sin((f + d * 7) / 12) * 10;
  const o = interpolate(f, [d, d + 10, 95, 108], [0, 1, 1, 0], clamp);
  return (
    <div style={{ position: "absolute", left: x * width, top: y * height + flota, opacity: o, width: 560, padding: 22, borderRadius: 26,
      background: "rgba(40,16,60,.78)", border: "2px solid rgba(214,160,255,.35)", display: "flex", alignItems: "center", gap: 20, filter: "blur(1.2px)",
      boxShadow: "0 10px 40px rgba(0,0,0,.5)" }}>
      <div style={{ width: 84, height: 84, borderRadius: 99, background: "linear-gradient(135deg,#6b5f78,#3a2d4a)" }} />
      <div style={{ flex: 1 }}>
        <div style={{ height: 22, width: "70%", borderRadius: 8, background: "rgba(255,255,255,.55)" }} />
        <div style={{ height: 16, width: "45%", borderRadius: 8, background: "rgba(255,255,255,.25)", marginTop: 12 }} />
      </div>
      <div style={{ fontFamily: "'Anton'", fontSize: 64, color: "rgba(255,255,255,.5)" }}>?</div>
    </div>
  );
};
const G3D: React.FC<{ demora: number }> = ({ demora }) => {
  const f = useCurrentFrame() - demora;
  const { fps, width, height } = useVideoConfig();
  if (f < 0) return null;
  const s = spring({ frame: f, fps, config: { damping: 10, mass: 0.8 } });
  const rot = interpolate(f, [0, 30], [-25, 0], { ...clamp, easing: Easing.out(Easing.cubic) });
  const w = width * 0.5;
  return (
    <div style={{ position: "absolute", left: (width - w) / 2, top: height * 0.13, width: w, transform: `scale(${0.3 + 0.7 * s}) rotateY(${rot}deg)`, opacity: Math.min(1, s * 1.5) }}>
      <div style={{ position: "absolute", inset: -80, background: "radial-gradient(circle, rgba(169,75,255,.8), transparent 65%)", filter: "blur(10px)" }} />
      <Img src={staticFile("arte/g3d.jpg")} style={{ position: "relative", width: "100%", mixBlendMode: "screen", WebkitMaskImage: "radial-gradient(circle at 50% 50%, #000 52%, transparent 72%)", maskImage: "radial-gradient(circle at 50% 50%, #000 52%, transparent 72%)" }} />
    </div>
  );
};
export const ReelOficial: React.FC = () => (
  <AbsoluteFill style={{ background: MARCA.colorPrincipal }}>
    <Fuentes />
    <Fondo />
    <Sequence durationInFrames={108}>
      <Arte src="arte/app.jpg" dur={108} desenfoque={14} oscuro={0.45} zoom={[1.2, 1.3]} foco="30% 40%" />
      <Perfil x={0.06} y={0.12} d={4} />
      <Perfil x={0.38} y={0.22} d={10} />
      <Perfil x={0.1} y={0.32} d={16} />
      <Titulo texto="¿CUÁL ES" tam={120} tipo="plata" y={0.44} demora={20} />
      <Titulo texto="LA OFICIAL?" tam={130} tipo="oro" y={0.51} demora={28} efecto="slam" />
    </Sequence>
    <Sequence from={108} durationInFrames={102}>
      <Arte src="arte/app.jpg" dur={102} zoom={[1.0, 1.08]} oscuro={0.15} foco="30% 40%" alto={0.62} />
      <G3D demora={0} />
      <Titulo texto="ESTA." tam={190} tipo="oro" y={0.39} demora={12} efecto="slam" fuente="a" />
      <Titulo texto="LA PÁGINA OFICIAL" tam={84} tipo="plata" y={0.5} demora={22} efecto="sube" />
      <Bajada texto="Slots · Ruleta · En vivo" y={0.565} demora={32} />
    </Sequence>
    <Sequence from={210} durationInFrames={120}>
      <Cierre arte="arte/app.jpg" dur={120} boton="Jugar ahora" bajada="Desde la página de siempre" foco="30% 40%" />
    </Sequence>
    <Flash en={108} />
    <Flash en={210} color="169,75,255" />
    <Brillos />
    <Destello />
    <Legal />
  </AbsoluteFill>
);

// ---------- 2. Hoy hay plan (foto cálida, ritmo tranquilo) ----------
export const ReelPlan: React.FC = () => (
  <AbsoluteFill style={{ background: MARCA.colorPrincipal }}>
    <Fuentes />
    <Fondo />
    <Arte src="arte/foto.jpg" dur={330} zoom={[1.0, 1.22]} panX={[40, -40]} alto={0.62} foco="55% 50%" />
    <Sequence durationInFrames={95}>
      <Titulo texto="¿VIERNES" tam={130} tipo="plata" y={0.43} demora={6} efecto="sube" />
      <Titulo texto="EN CASA?" tam={140} tipo="oro" y={0.51} demora={16} efecto="sube" />
    </Sequence>
    <Sequence from={95} durationInFrames={115}>
      <Titulo texto="HOY HAY PLAN" tam={112} tipo="oro" y={0.43} efecto="letras" />
      <Bajada texto="Unas tiradas, una mano en vivo" y={0.525} demora={24} tam={42} />
      <Bajada texto="y listo" y={0.565} demora={34} tam={42} />
    </Sequence>
    <Sequence from={210} durationInFrames={120}>
      <Logo y={0.37} ancho={0.62} />
      <Bajada texto="El plan lo armás vos" y={0.455} tam={44} demora={6} />
      <Boton texto="Jugar ahora" y={0.51} demora={10} />
    </Sequence>
    <Flash en={95} color="255,214,150" />
    <Brillos n={40} />
    <Legal />
  </AbsoluteFill>
);

// ---------- 3. Ruleta en vivo 24 hs (neón con energía) ----------
const Rueda: React.FC<{ y: number; tam: number }> = ({ y, tam }) => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const giro = interpolate(f, [0, 330], [0, 900], { easing: Easing.out(Easing.cubic) });
  const n = 37, r = tam / 2;
  return (
    <div style={{ position: "absolute", left: (width - tam) / 2, top: y * height - r, width: tam, height: tam, transform: `rotate(${giro}deg)`, opacity: 0.85 }}>
      <svg viewBox={`0 0 ${tam} ${tam}`} width={tam} height={tam}>
        <circle cx={r} cy={r} r={r - 8} fill="none" stroke="#c433dc" strokeWidth={6} style={{ filter: "drop-shadow(0 0 14px #c433dc)" }} />
        {Array.from({ length: n }).map((_, i) => {
          const a = (i / n) * Math.PI * 2;
          return <line key={i} x1={r + Math.cos(a) * (r - 60)} y1={r + Math.sin(a) * (r - 60)} x2={r + Math.cos(a) * (r - 14)} y2={r + Math.sin(a) * (r - 14)}
            stroke={i === 0 ? "#2fd47a" : i % 2 ? "#a94bff" : "#ffd166"} strokeWidth={i === 0 ? 8 : 4} strokeLinecap="round" />;
        })}
        <circle cx={r} cy={r} r={r - 70} fill="none" stroke="rgba(255,214,102,.6)" strokeWidth={3} />
      </svg>
    </div>
  );
};
const Reloj: React.FC<{ y: number; demora: number }> = ({ y, demora }) => {
  const f = useCurrentFrame() - demora;
  const { height } = useVideoConfig();
  if (f < 0) return null;
  const h = Math.min(24, Math.floor(interpolate(f, [0, 30], [0, 24], clamp)));
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: y * height, textAlign: "center", fontFamily: "'Anton'", fontSize: 150, color: "#fff",
      textShadow: "0 0 30px rgba(169,75,255,1), 0 0 60px rgba(196,51,220,.8)", letterSpacing: 4 }}>{String(h).padStart(2, "0")} HS</div>
  );
};
export const ReelRuleta: React.FC = () => (
  <AbsoluteFill style={{ background: MARCA.colorPrincipal }}>
    <Fuentes />
    <Fondo />
    <Arte src="arte/ruleta.jpg" dur={330} zoom={[1.25, 1.45]} alto={0.6} foco="50% 60%" />
    <Rueda y={0.3} tam={980} />
    <Sequence durationInFrames={120}>
      <Titulo texto="RULETA" tam={190} tipo="plata" y={0.4} demora={8} efecto="slam" fuente="a" />
      <Titulo texto="EN VIVO" tam={190} tipo="oro" y={0.5} demora={22} efecto="slam" fuente="a" />
    </Sequence>
    <Sequence from={120} durationInFrames={95}>
      <Bajada texto="Las" y={0.4} tam={60} />
      <Reloj y={0.43} demora={4} />
      <Bajada texto="Todos los días, a la hora que quieras" y={0.555} demora={20} tam={38} />
    </Sequence>
    <Sequence from={215} durationInFrames={115}>
      <Logo y={0.37} ancho={0.62} />
      <Bajada texto="Mesas en vivo · Slots" y={0.455} tam={44} demora={6} />
      <Boton texto="Jugar ahora" y={0.51} demora={10} />
    </Sequence>
    <Flash en={120} color="169,75,255" />
    <Flash en={215} />
    <Brillos n={90} />
    <Destello dur={30} />
    <Legal />
  </AbsoluteFill>
);

// ---------- 4. Así de fácil (celular y 3 pasos) ----------
const Pantalla: React.FC<{ paso: number }> = ({ paso }) => {
  const f = useCurrentFrame();
  const fila = (t: string, c: string, i: number) => (
    <div key={t} style={{ margin: "14px 18px", height: 110, borderRadius: 18, background: c, display: "flex", alignItems: "center", padding: "0 22px",
      fontFamily: "'Montserrat'", fontWeight: 800, fontSize: 30, color: "#fff", opacity: interpolate(f, [i * 4, i * 4 + 10], [0, 1], clamp) }}>{t}</div>
  );
  return (
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#1c0630,#2b0b4a)", paddingTop: 70 }}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "0 22px 14px", fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 30, color: "#fff" }}>
        <span>≡ GANAMOS</span><span style={{ background: "#7a22d0", borderRadius: 12, padding: "4px 14px", fontSize: 22 }}>{paso === 1 ? "Crear usuario" : "Mi cuenta"}</span>
      </div>
      {paso === 1 && <>
        {fila("Usuario", "rgba(255,255,255,.08)", 0)}{fila("Contraseña", "rgba(255,255,255,.08)", 1)}
        {fila("✓  Cuenta creada", "linear-gradient(90deg,#1f9d57,#2fd47a)", 3)}
      </>}
      {paso === 2 && <>
        {fila("Cargar", "linear-gradient(90deg,#7a22d0,#a64bff)", 0)}{fila("Atención por chat 24 hs", "rgba(255,255,255,.08)", 1)}{fila("Página oficial", "rgba(255,255,255,.08)", 2)}
      </>}
      {paso === 3 && <>
        {fila("🎰  Slots", "linear-gradient(90deg,#5a1394,#9b3ef0)", 0)}{fila("🎡  Ruleta en vivo", "linear-gradient(90deg,#8a1a6f,#c433dc)", 1)}{fila("🃏  Mesas en vivo", "linear-gradient(90deg,#5a1394,#9b3ef0)", 2)}
      </>}
    </div>
  );
};
const Celular: React.FC<{ paso: number }> = ({ paso }) => {
  const f = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const s = spring({ frame: f, fps, config: { damping: 14 } });
  const w = 470, h = 900;
  return (
    <div style={{ position: "absolute", left: width * 0.5 - w / 2 + 150, top: height * 0.08, width: w, height: h, transform: `rotate(${6 - 2 * s}deg) translateY(${(1 - s) * 80}px)`,
      borderRadius: 64, border: "12px solid #0e0e14", background: "#000", overflow: "hidden", boxShadow: "0 0 60px rgba(169,75,255,.8), 0 30px 80px rgba(0,0,0,.6)" }}>
      <Pantalla paso={paso} />
      <div style={{ position: "absolute", top: 14, left: "50%", width: 140, height: 34, marginLeft: -70, borderRadius: 20, background: "#000" }} />
    </div>
  );
};
const Paso: React.FC<{ n: number; texto: string }> = ({ n, texto }) => {
  const f = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const s = spring({ frame: f, fps, config: { damping: 12 } });
  return (
    <div style={{ position: "absolute", left: 50, top: height * 0.44, display: "flex", alignItems: "center", gap: 26, transform: `translateX(${(1 - s) * -200}px)`, opacity: s }}>
      <div style={{ fontFamily: "'Anton'", fontSize: 230, lineHeight: 1, backgroundImage: ORO, WebkitBackgroundClip: "text", color: "transparent", filter: "drop-shadow(0 0 22px rgba(169,75,255,.9))" }}>{n}</div>
      <div style={{ fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 64, lineHeight: 1.05, color: "#fff", textTransform: "uppercase", textShadow: "0 4px 18px rgba(0,0,0,.8)", whiteSpace: "pre-line" }}>{texto}</div>
    </div>
  );
};
export const ReelFacil: React.FC = () => (
  <AbsoluteFill style={{ background: MARCA.colorPrincipal }}>
    <Fuentes />
    <Fondo />
    <Arte src="arte/neon.jpg" dur={360} desenfoque={6} oscuro={0.35} zoom={[1.1, 1.2]} alto={0.62} foco="50% 30%" />
    <Sequence durationInFrames={60}>
      <Titulo texto="ASÍ DE" tam={140} tipo="plata" y={0.42} demora={4} efecto="slam" />
      <Titulo texto="FÁCIL" tam={200} tipo="oro" y={0.5} demora={14} efecto="slam" fuente="a" />
    </Sequence>
    <Sequence from={60} durationInFrames={70}><Celular paso={1} /><Paso n={1} texto={"Creá tu\nusuario"} /></Sequence>
    <Sequence from={130} durationInFrames={70}><Celular paso={2} /><Paso n={2} texto={"Cargá\npor chat"} /></Sequence>
    <Sequence from={200} durationInFrames={70}><Celular paso={3} /><Paso n={3} texto={"Elegí\ny jugá"} /></Sequence>
    <Sequence from={270} durationInFrames={90}>
      <Logo y={0.37} ancho={0.62} />
      <Bajada texto="En minutos, desde el celu" y={0.455} tam={44} demora={6} />
      <Boton texto="Crear usuario" y={0.51} demora={10} icono="➜" />
    </Sequence>
    <Flash en={60} /><Flash en={270} color="169,75,255" />
    <Brillos n={50} />
    <Legal />
  </AbsoluteFill>
);

// ---------- 5. Atención real (lista con checks) ----------
const Check: React.FC<{ texto: string; y: number; demora: number }> = ({ texto, y, demora }) => {
  const f = useCurrentFrame() - demora;
  const { fps, height } = useVideoConfig();
  if (f < 0) return null;
  const s = spring({ frame: f, fps, config: { damping: 12 } });
  return (
    <div style={{ position: "absolute", left: 70, right: 70, top: y * height, display: "flex", alignItems: "center", gap: 26, opacity: s, transform: `translateX(${(1 - s) * 120}px)`,
      padding: "20px 30px", borderRadius: 28, background: "linear-gradient(90deg,rgba(122,34,208,.55),rgba(40,10,70,.55))", border: "2px solid rgba(214,160,255,.45)",
      boxShadow: "0 0 30px rgba(169,75,255,.35)" }}>
      <div style={{ width: 70, height: 70, borderRadius: 99, background: ORO, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, fontWeight: 900, color: "#3a1a00", fontFamily: "'Montserrat'" }}>✓</div>
      <div style={{ fontFamily: "'Montserrat'", fontWeight: 900, fontSize: 50, color: "#fff", textTransform: "uppercase" }}>{texto}</div>
    </div>
  );
};
export const ReelAtencion: React.FC = () => (
  <AbsoluteFill style={{ background: MARCA.colorPrincipal }}>
    <Fuentes />
    <Fondo />
    <Arte src="arte/cartas.jpg" dur={330} zoom={[1.05, 1.2]} alto={0.5} foco="50% 30%" />
    <Sequence durationInFrames={210}>
      <Titulo texto="ATENCIÓN" tam={150} tipo="oro" y={0.27} demora={4} efecto="slam" fuente="a" />
      <Titulo texto="DE VERDAD" tam={96} tipo="plata" y={0.355} demora={14} efecto="sube" />
      <Check texto="Chat 24 horas" y={0.43} demora={34} />
      <Check texto="Cargas rápidas" y={0.495} demora={52} />
      <Check texto="Página oficial" y={0.56} demora={70} />
    </Sequence>
    <Sequence from={210} durationInFrames={120}>
      <Logo y={0.37} ancho={0.62} />
      <Bajada texto="Te atiende una persona" y={0.455} tam={44} demora={6} />
      <Boton texto="Jugar ahora" y={0.51} demora={10} />
    </Sequence>
    <Flash en={210} color="169,75,255" />
    <Brillos n={50} />
    <Destello />
    <Legal y={0.632} />
  </AbsoluteFill>
);

export const REELS = [
  { id: "G-Oficial", component: ReelOficial, dur: 330 },
  { id: "G-Plan", component: ReelPlan, dur: 330 },
  { id: "G-Ruleta", component: ReelRuleta, dur: 330 },
  { id: "G-Facil", component: ReelFacil, dur: 360 },
  { id: "G-Atencion", component: ReelAtencion, dur: 330 },
];
export const FPS_G = S;
