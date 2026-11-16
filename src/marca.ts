// Ajustes de marca y reglas fijas que usan todas las piezas.
// Cambiá los colores acá y se aplican a todos los reels y placas.

export const MARCA = {
  colorPrincipal: "#0f1115", // fondo
  colorAcento: "#ffb800", // botones y destacados
  colorTexto: "#ffffff",
  fuente: "'Inter', 'Helvetica Neue', Arial, sans-serif",
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
