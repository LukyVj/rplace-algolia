import { useState } from "react";
import { colors } from "../data/colors";
import Button from "./button/button";

import takeshot from "../scripts/screenshot";

interface PaletteProps {
  setPickedColor: (e: any) => void;
  setShowGrid: (e: any) => void;
  showGrid: boolean;
  cooldown: boolean;
  hasCooldown: boolean;
  pickedColor: string;
}

const PALETTE_HEIGHT = 80;

const Palette = ({
  setPickedColor,
  setShowGrid,
  showGrid,
  cooldown,
  hasCooldown,
  pickedColor,
}: PaletteProps) => {
  return (
    <div
      style={{
        pointerEvents: hasCooldown && cooldown ? "none" : "all",
        opacity: hasCooldown && cooldown ? 0.5 : 1,
      }}
    >
      <div className="d-grid g-2">
        {colors.map((color) => (
          <Button
            key={color}
            onClick={(e) => {
              e.preventDefault();
              setPickedColor(color);
            }}
            data-color={color}
            square
            style={{
              background: color,
              height: PALETTE_HEIGHT / 2.5,
              appearance: "none",
            }}
          />
        ))}
      </div>
      <Button
        style={{ background: pickedColor }}
        tag="div"
        className="mv-16"
        square
      />
      <div className="mt-24">
        <Button
          style={{ height: PALETTE_HEIGHT }}
          onClick={() => setShowGrid(!showGrid)}
        >
          Show grid
        </Button>
        <Button
          className="w-100p mt-24"
          onClick={(e) => {
            takeshot();
            e.target.innerText = "processing";
            setTimeout(() => {
              e.target.innerText = "Download image";
            }, 3000);
          }}
        >
          Download image
        </Button>
      </div>
    </div>
  );
};

export default Palette;
