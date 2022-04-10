import { useEffect, useState } from "react";

import useInterval from "../hooks/useInterval";
import { hitType } from "../types/hit";

interface CanvasProps {
  pickedColor: string;
  index: any;
  showGrid: boolean;
  setCooldown: (e: any) => void;
  cooldown: boolean;
  hasCooldown: boolean;
  setCurrentHit: (e: any) => void;
  useApiRoute?: boolean;
}

const Canvas = ({
  pickedColor,
  index,
  showGrid,
  setCooldown,
  cooldown,
  hasCooldown,
  setCurrentHit,
  useApiRoute,
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

  const indexData = (e: any, hit: hitType) => {
    (e.target as HTMLDivElement).style.background = pickedColor;
    index.saveObject({
      objectID: hit.objectID,
      bg_color: pickedColor,
      id: hit.id,
    });
  };

  const handleClick = (e: any, hit: hitType) => {
    if (hasCooldown && !cooldown) {
      indexData(e, hit);
      setCooldown(true);
    } else {
      indexData(e, hit);
    }
  };

  /**
   * The following code works fine on dev but not on prod.
   */
  const handleClickThroughApiRoute = async (e: any, hit: hitType) => {
    (e.target as HTMLDivElement).style.background = pickedColor;
    await fetch(`/api/indexData`, {
      method: "POST",
      body: JSON.stringify({
        objectID: hit.objectID,
        bg_color: pickedColor,
        id: hit.id,
      }),
    });
  };

  const handleMouseOver = (hit: hitType) => {
    setCurrentHit(hit);
  };

  return (
    <>
      <main className="canvas">
        {allHits.map((hit: any) => {
          return (
            <div
              onMouseOver={(e) => handleMouseOver(hit)}
              data-cell-id={hit.id}
              key={hit.objectID}
              onClick={(e) =>
                useApiRoute
                  ? handleClickThroughApiRoute(e, hit)
                  : handleClick(e, hit)
              }
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
