import React from "react";
import { Composition, Still } from "remotion";
import { Reel, duracionReel, type ReelProps } from "./Reel";
import { Placa, type PlacaProps } from "./Placa";
import { REELS, FPS_G } from "./Ganamos";
import { Tragamonedas, DUR_TRAGA } from "./Tragamonedas";
import reelEjemplo from "../props/reel-servicio24hs.json";
import placaEjemplo from "../props/placa-servicio24hs.json";

const FPS = 30;

export const Root: React.FC = () => (
  <>
    <Composition
      id="Reel"
      component={Reel}
      width={1080}
      height={1920}
      fps={FPS}
      durationInFrames={duracionReel(reelEjemplo as ReelProps, FPS)}
      defaultProps={reelEjemplo as ReelProps}
      calculateMetadata={({ props }) => ({ durationInFrames: duracionReel(props, FPS) })}
    />
    <Still id="Placa-1x1" component={Placa} width={1080} height={1080} defaultProps={placaEjemplo as PlacaProps} />
    <Still id="Placa-4x5" component={Placa} width={1080} height={1350} defaultProps={placaEjemplo as PlacaProps} />
    <Still id="Placa-9x16" component={Placa} width={1080} height={1920} defaultProps={placaEjemplo as PlacaProps} />
    <Composition id="Traga-9x16" component={Tragamonedas} width={1080} height={1920} fps={30} durationInFrames={DUR_TRAGA} defaultProps={{ formato: "9x16" as const }} />
    <Composition id="Traga-4x5" component={Tragamonedas} width={1080} height={1350} fps={30} durationInFrames={DUR_TRAGA} defaultProps={{ formato: "4x5" as const }} />
    {REELS.map((r) => (
      <Composition key={r.id} id={r.id} component={r.component} width={1080} height={1920} fps={FPS_G} durationInFrames={r.dur} />
    ))}
  </>
);
