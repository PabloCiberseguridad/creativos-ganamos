# Creativos GANAMOS

Plantillas para los anuncios de Meta: un **reel 9:16** y **placas 1:1, 4:5 y 9:16**.
Las arma Vale (la agente de creativos) cambiando solo los textos y el material de fondo.

Hecho con [Remotion](https://www.remotion.dev). Es gratis para personas y empresas de hasta 3 personas.

## Reglas que ya vienen puestas

- **+18 · Jugá con responsabilidad** siempre visible (se cambia solo en `src/marca.ts`, no desde los textos).
- **Zonas seguras de Meta** en 9:16: nada importante en el ~14% de arriba ni en el ~35% de abajo.
- **Subtítulos** en todo el video (mucha gente lo mira sin sonido).
- Gancho fuerte en los primeros 3 segundos y llamado a la acción al final.

## Instalar (una sola vez)

Necesitás [Node.js](https://nodejs.org) 18 o más nuevo.

```bash
npm install
```

## Cómo se usa

1. **Material**: poné tu grabación de pantalla de la app en `public/app.mp4` (y capturas en `public/`, por ejemplo `public/captura.png`).
2. **Textos**: copiá un archivo de `props/` y cambiá los textos. Para usar tu grabación, poné `"videoFondo": "app.mp4"`; para una captura en la placa, `"imagenFondo": "captura.png"`.
3. **Generar**:

```bash
# Reel
npx remotion render Reel salida/servicio24hs_9x16_v1.mp4 --props=props/reel-servicio24hs.json

# Las 3 placas
npm run placas -- props/placa-servicio24hs.json
```

Los archivos quedan en `salida/` con el nombre `angulo_formato_v1`, así Leo los puede seguir en la bitácora.

Para ver y ajustar en vivo: `npm run studio`.

## Colores

En `src/marca.ts`: `colorPrincipal` (fondo), `colorAcento` (botones y destacados) y `colorTexto`.

## Qué no va nunca

Billetes, lujos, autos, estética infantil, personas que parezcan menores, logos o marcas ajenas, ni capturas falsas de premios o retiros.
