import { useEffect, useState } from "react";

import useInterval from "../hooks/useInterval";

interface CanvasProps {
  pickedColor: string;
  index: any;
  showGrid: boolean;
  setCooldown: (e: any) => void;
  cooldown: boolean;
  hasCooldown: boolean;
}

const Canvas = ({
  pickedColor,
  index,
  showGrid,
  setCooldown,
  cooldown,
  hasCooldown,
}: CanvasProps) => {
  const [allHits, setAllHits] = useState<Object[]>([]);

  useEffect(() => {
    const id = setInterval(() => {
      let hits: Object[] = [];
      index
        .browseObjects({
          query: "",
          batch: (batch: any) => {
            hits = hits.concat(batch);
          },
        })
        .then(() => {
          setAllHits(hits);
        });
    }, 600);

    return () => clearInterval(id);
  }, []);

  const handleClick = (e: any, hit: any) => {
    if (hasCooldown && !cooldown) {
      (e.target as HTMLDivElement).style.background = pickedColor;
      index.saveObject({
        objectID: hit.objectID,
        bg_color: pickedColor,
        id: hit.id,
      });
      setCooldown(true);
    } else {
      (e.target as HTMLDivElement).style.background = pickedColor;
      index.saveObject({
        objectID: hit.objectID,
        bg_color: pickedColor,
        id: hit.id,
      });
    }
  };

  return (
    <>
      <main className="canvas">
        {allHits.map((hit: any) => {
          return (
            <div
              data-cell-id={hit.id}
              key={hit.objectID}
              onClick={(e) => handleClick(e, hit)}
              style={{
                background: hit.bg_color,
                border: showGrid ? "0.5px solid rgb(0 0 0 / 30%)" : "",
              }}
            />
          );
        })}
      </main>
    </>
  );
};

export default Canvas;
