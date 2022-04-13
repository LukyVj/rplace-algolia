const algoliasearch = require("algoliasearch");
const fs = require("fs");

require("dotenv").config();

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToShortHex(rgb) {
  var hexR = Math.round(rgb.r / 17).toString(16);
  var hexG = Math.round(rgb.g / 17).toString(16);
  var hexB = Math.round(rgb.b / 17).toString(16);
  return "#" + hexR + "" + hexG + "" + hexB;
}

function getShortHexColorCode(code) {
  var rgb = hexToRgb(code);
  return rgbToShortHex(rgb);
}

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY_SNAPSHOT
);
const index = searchClient.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_HUGE_INDEX_NAME
);

const snapshotsIndex = searchClient.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME_SNAPSHOT
);

let latestHit;
let snapshots = [];

let formatDate = (date) => {
  let d = date;
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();
  let hour = "" + d.getHours();
  let minute = "" + d.getMinutes();
  let second = "" + d.getSeconds();
  const time = [hour, minute, second].join(":");
  return [day, month, year, time].join("-");
};

try {
  index
    .browseObjects({
      query: "",
      batch: (batch) => {
        snapshots = snapshots.concat(
          batch.map((hit) =>
            getShortHexColorCode(hit.bg_color).replace("#", "")
          )
        );
      },
    })
    .then(() => {
      fs.writeFileSync(
        `./src/snapshots_array/algolia_canvas_place-${formatDate(
          new Date()
        )}.json`,
        JSON.stringify({
          objectID: Math.floor(new Date().getTime() / 1000),
          timestamp: parseInt(Math.floor(new Date().getTime() / 1000)),
          snapshot: snapshots,
        })
      );
    })
    .catch((err) => {
      console.log(err);
    });
} catch (err) {
  console.log(err);
}
