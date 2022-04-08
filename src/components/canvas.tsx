import { useEffect, useState } from "react";

import useInterval from "../hooks/useInterval";

interface CanvasProps {
  pickedColor: string;
  index: any;
  showGrid: boolean;
  setCooldown: (e: any) => void;
  cooldown: boolean;
}

const Canvas = ({
  pickedColor,
  index,
  showGrid,
  setCooldown,
  cooldown,
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
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const handleClick = (e: any, hit: any) => {
    if (!cooldown) {
      (e.target as HTMLDivElement).style.background = pickedColor;
      index.saveObject({
        objectID: hit.objectID,
        bg_color: pickedColor,
        id: hit.id,
      });
      setCooldown(true);
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
