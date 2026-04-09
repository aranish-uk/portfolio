import React from "react";
import { Composition } from "remotion";
import { OgImage } from "./OgImage";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="OgImage"
      component={OgImage}
      durationInFrames={1}
      fps={1}
      width={1200}
      height={630}
    />
  );
};
