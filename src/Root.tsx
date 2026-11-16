import React from "react";
import { Composition, Still } from "remotion";
import { Reel, duracionReel, type ReelProps } from "./Reel";
import { Placa, type PlacaProps } from "./Placa";
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
  </>
);
