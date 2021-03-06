import { useEffect, useState } from "react";
import cx from "classnames";
import { getCoords, hexToRgb } from "../scripts/helpers";

import { hitType } from "../types/hit";
import { snaptshotType } from "../types/snaptshot";

import { colors } from "../data/colors";

interface CanvasProps {
  pickedColor?: string;
  index?: any;
  showGrid?: boolean;
  setCooldown?: (e: any) => void;
  cooldown?: boolean;
  hasCooldown?: boolean;
  setCurrentHit?: (e: any) => void;
  useApiRoute?: boolean;
  isSnapshot?: boolean;
  snapshot?: snaptshotType;
  huge?: boolean;
  moderation?: boolean;
}

/**
 * The canvas will refetch data only when the canvasHover props is set to true
 * On mouse over it'll be true and on mouse out it'll be false
 *
 */

const Canvas = ({
  pickedColor,
  index,
  showGrid,
  setCooldown,
  cooldown,
  hasCooldown,
  setCurrentHit,
  useApiRoute,
  isSnapshot,
  snapshot,
  huge,
  moderation,
}: CanvasProps) => {
  const [allHits, setAllHits] = useState<Object[]>([]);

  const canvas = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const canvasSize = 4020; // Size of each small canvas
  const [loaderColor] = useState(
    colors[Math.floor(Math.random() * colors.length)]
  );
  const [canvasHovered, setCanvasHovered] = useState(true);
  const [tabHasFocus, setTabHasFocus] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [canvasSleeping, setCanvasSleeping] = useState(false);

  useEffect(() => {
    if (index && shouldFetch) {
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

      return () => {
        clearInterval(id);
        setIsLoading && setIsLoading(false);
      };
    }
  }, [allHits, shouldFetch]);

  // The following code doesn't seem to work
  useEffect(() => {
    if (document.hasFocus()) {
      setTabHasFocus(true);
      setShouldFetch(true);
      console.log("tab has focus");
    } else {
      setTabHasFocus(false);
      setShouldFetch(false);
      console.log("tab lost focus");
    }
  }, [canvasHovered, tabHasFocus]);

  useEffect(() => {
    if (!canvasHovered) {
      const timeout = setInterval(() => {
        setShouldFetch(false);
        setCanvasSleeping(moderation ? false : true);
      }, 10 * 1000);

      return () => {
        clearInterval(timeout);
      };
    } else {
      setCanvasSleeping(false);
    }
  }, [canvasHovered]);

  /**
   * The following code works fine on dev but not on prod.
   */
  const handleClickThroughApiRoute = async (e: any, hit: hitType) => {
    // if the color of the clicked element is the same as the color of the current hit
    // Do nothing
    if (
      (e.target as HTMLDivElement).style.background !== hexToRgb(pickedColor!)
    ) {
      (e.target as HTMLDivElement).style.background = pickedColor || "";

      if (hasCooldown && !cooldown && setCooldown) {
        setCooldown(true);
      }

      await fetch(`/api/indexData`, {
        method: "POST",
        body: JSON.stringify({
          objectID: hit.objectID,
          bg_color: pickedColor,
          id: hit.id,
        }),
      });
    }
  };

  const handleMouseOver = (hit: hitType) => {
    setCurrentHit &&
      setCurrentHit({
        ...hit,
        coordinates: {
          x: 0,
          y: 0,
        },
      });
  };

  const [isLoading, setIsLoading] = useState<boolean | null>(null);

  useEffect(() => {
    setIsLoading(true);
    isSnapshot && setIsLoading(false);
  }, []);

  return (
    <>
      <main
        id="canvas-wrapper"
        className={cx(
          isLoading ? "d-flex jc-center ai-center" : "d-grid pos-relative",
          "canvas-wrapper"
        )}
        style={{
          gridTemplateColumns: !isLoading ? "repeat(3,1fr)" : "",
          width: isLoading ? 800 : "",
          height: isLoading ? "100%" : "",
          textAlign: "center",
        }}
        onMouseOver={(e) => {
          getCoords(e);
          setCanvasHovered(true);
        }}
        onMouseLeave={() => setCanvasHovered(false)}
      >
        {canvasSleeping && (
          <div
            className="pos-absolute us-none pe-none z-5"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <h2>The canvas is inacitve, hover it to activate it</h2>
            <p>
              This was made in order to avoid fetching data from Algolia if the
              canvas isn't being used
            </p>
          </div>
        )}
        {/* <div
          style={{
            display: "none",
            width: 200,
            height: 400,
            top: 746,
            right: 371,
            opacity: 0.5,
            pointerEvents: "none",
            userSelect: "none",
            overflow: "hidden",
          }}
          className="pos-absolute w-200"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg"
            className="w-100p"
          ></img>
        </div> */}
        {isLoading ? (
          <>
            <h2
              className="d-flex ai-center jc-center w-300"
              style={{
                color: loaderColor === "#FFFFFF" ? "#000000" : loaderColor,
              }}
            >
              <div className="mr-32">LOADING</div>{" "}
              <div className="dot-bricks" />
            </h2>
          </>
        ) : (
          canvas.map((c) => {
            const start = 1 + c * canvasSize;
            const end = canvasSize + canvasSize * c;

            return (
              <div
                className="canvas"
                key={c}
                style={{
                  order: c === 2 ? 3 : c === 3 ? 4 : c === 4 ? 2 : c,
                  opacity: canvasSleeping ? 0.05 : 1,
                }}
              >
                {isSnapshot && snapshot?.snapshot
                  ? snapshot.snapshot
                      .slice(start - 1, end)
                      .map((color: string, index: number) => {
                        return (
                          <div
                            data-cell-id={`${color}-${index}`}
                            key={`${color}-${index}`}
                            style={{
                              background: `#${color}`,
                            }}
                          />
                        );
                      })
                  : allHits.slice(start - 1, end).map((hit: any) => {
                      return (
                        <div
                          onMouseOver={(e) => {
                            handleMouseOver(hit);
                          }}
                          data-cell-id={hit.id}
                          key={hit.objectID}
                          onClick={(e) =>
                            moderation
                              ? e.preventDefault()
                              : handleClickThroughApiRoute(e, hit)
                          }
                          style={{
                            background: hit.bg_color,
                            outline: showGrid
                              ? "1px solid rgb(0 0 0 / 30%)"
                              : "",
                          }}
                        />
                      );
                    })}
              </div>
            );
          })
        )}
      </main>
    </>
  );
};

export default Canvas;
