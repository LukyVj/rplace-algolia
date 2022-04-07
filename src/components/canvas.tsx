import { useEffect, useState } from "react";

import useInterval from "../hooks/useInterval";

interface CanvasProps {
  pickedColor: string;
  index: any;
}

const Canvas = ({ pickedColor, index }: CanvasProps) => {
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
  return (
    <main className="canvas">
      {allHits.map((hit: any) => {
        const handleClick = (e: any, hit: any) => {
          (e.target as HTMLDivElement).style.background = pickedColor;
          index.saveObject({
            objectID: hit.objectID,
            bg_color: pickedColor,
            id: hit.id,
          });
        };
        return (
          <div
            data-cell-id={hit.id}
            key={hit.objectID}
            onClick={(e) => handleClick(e, hit)}
            style={{
              background: hit.bg_color,
              border:
                process.env.NODE_ENV === "development"
                  ? "0.5px solid rgb(0 0 0 / 30%)"
                  : "",
            }}
          />
        );
      })}
    </main>
  );
};

export default Canvas;
