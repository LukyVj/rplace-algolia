import { useState } from "react";

interface PaletteProps {
  setPickedColor: (e: any) => void;
  setShowGrid: (e: any) => void;
  showGrid: boolean;
}

const Palette = ({ setPickedColor, setShowGrid, showGrid }: PaletteProps) => {
  const colors = [
    "#FFFFFF",
    "#E4E4E4",
    "#888888",
    "#222222",
    "#FFA7D1",
    "#E50000",
    "#E59500",
    "#A06A42",
    "#E5D900",
    "#94E044",
    "#02BE01",
    "#00D3DD",
    "#0083C7",
    "#0000EA",
    "#CF6EE4",
    "#820080",
  ];
  return (
    <nav style={{ height: 100 }}>
      <button onClick={() => setShowGrid(!showGrid)}>Show grid</button>

      <div className="palette" style={{ padding: "10px 0" }}>
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
              height: 20,
              appearance: "none",
              border: "1px solid rgb(0 0 0 / 20%)",
              marginBottom: 10,
            }}
          />
        ))}
      </div>
    </nav>
  );
};

export default Palette;
