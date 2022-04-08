import { useState } from "react";
import { colors } from "../data/colors";

interface PaletteProps {
  setPickedColor: (e: any) => void;
  setShowGrid: (e: any) => void;
  showGrid: boolean;
  cooldown: boolean;
}

const PALETTE_HEIGHT = 80;

const Palette = ({
  setPickedColor,
  setShowGrid,
  showGrid,
  cooldown,
}: PaletteProps) => {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        width: "calc(var(--canvas-size)/1.25)",
        margin: "1em auto",
        height: PALETTE_HEIGHT,
        pointerEvents: cooldown ? "none" : "all",
        opacity: cooldown ? 0.5 : 1,
      }}
    >
      <button
        style={{ height: PALETTE_HEIGHT, marginRight: 10 }}
        onClick={() => setShowGrid(!showGrid)}
      >
        Show grid
      </button>

      <div className="palette">
        {colors.map((color) => (
          <button
            key={color}
            onClick={(e) => {
              e.preventDefault();
              setPickedColor(color);
            }}
            data-color={color}
            style={{
              background: color,
              height: PALETTE_HEIGHT / 2,
              appearance: "none",
              border: "1px solid rgb(0 0 0 / 20%)",
            }}
          />
        ))}
      </div>
    </nav>
  );
};

export default Palette;
