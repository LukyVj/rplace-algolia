import { useState } from "react";
import { colors } from "../data/colors";
import Button from "./button/button";

interface PaletteProps {
  setPickedColor: (e: any) => void;
  setShowGrid: (e: any) => void;
  showGrid: boolean;
  cooldown: boolean;
  hasCooldown: boolean;
}

const PALETTE_HEIGHT = 80;

const Palette = ({
  setPickedColor,
  setShowGrid,
  showGrid,
  cooldown,
  hasCooldown,
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
      <div className="mt-24">
        <Button
          style={{ height: PALETTE_HEIGHT, marginRight: 10 }}
          onClick={() => setShowGrid(!showGrid)}
        >
          Show grid
        </Button>
      </div>
    </div>
  );
};

export default Palette;
