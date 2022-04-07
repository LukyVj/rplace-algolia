interface PaletteProps {
  setPickedColor: (e: any) => void;
}

const Palette = ({ setPickedColor }: PaletteProps) => {
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
    <nav style={{ padding: "10px 0" }}>
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
            border: 0,
            marginBottom: 10,
          }}
        />
      ))}
    </nav>
  );
};

export default Palette;
