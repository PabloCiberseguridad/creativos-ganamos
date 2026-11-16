// Ajustes de marca y reglas fijas que usan todas las piezas.
// Estilo Ganamos: violeta oscuro con brillo neón, títulos dorados metálicos,
// el bulldog violeta con anteojos como mascota y el logo "G♠NAMOS".
// Ejemplos aprobados en /referencias.

export const MARCA = {
  colorPrincipal: "#14021f", // fondo: violeta casi negro
  colorAcento: "#f2c127", // dorado de títulos y destacados
  colorTexto: "#ffffff",
  violeta: "#6d1aa8", // violeta de marca (botones, marcos)
  violetaNeon: "#a94bff", // bordes y brillos neón
  magentaBrillo: "#c433dc", // halos de luz
  doradoDegradado: "linear-gradient(180deg,#fff4b8 0%,#f7cf3d 38%,#d9921a 70%,#8a520a 100%)", // texto dorado metálico
  plataDegradado: "linear-gradient(180deg,#ffffff 0%,#d9d4de 45%,#8f8597 100%)", // texto plateado (logo, títulos secundarios)
  botonFondo: "linear-gradient(180deg,#8b2fd6 0%,#5a1394 100%)", // píldora violeta con borde blanco
  botonBorde: "#ffffff",
  fuente: "'Montserrat', 'Inter', Arial, sans-serif", // títulos en 900 (Black), mayúsculas
  fuenteCondensada: "'Anton', 'Bebas Neue', Impact, sans-serif", // títulos altos tipo "RULETA EN VIVO"
  logo: "marca/logo-ganamos-net.png", // PNG transparente, horizontal
  logoIcono: "marca/logo-ganamos.jpg", // G grande con fondo oscuro, para avatar o cierre
  web: "WWW.GANAMOS.NET",
  // Siempre visible. No se puede desactivar desde los props.
  legal: "+18 · Jugá con responsabilidad",
};

// Zonas seguras de Meta para 9:16 (Reels e Historias):
// arriba ~14% (nombre de la página) y abajo ~35% (texto del anuncio y botones).
// A los costados dejamos ~6%.
export const zonaSegura = (w: number, h: number) => {
  const vertical = h / w > 1.5;
  return {
    arriba: vertical ? Math.round(h * 0.14) : Math.round(h * 0.06),
    abajo: vertical ? Math.round(h * 0.35) : Math.round(h * 0.06),
    lados: Math.round(w * 0.06),
  };
};
