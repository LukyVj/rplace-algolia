const algoliasearch = require("algoliasearch");
const fs = require("fs");

require("dotenv").config();

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);
const index = searchClient.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME
);

let hits = [];

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

index
  .browseObjects({
    query: "",
    batch: (batch) => {
      hits = hits.concat(batch);
    },
  })
  .then(() => {
    fs.writeFileSync(
      `./src/snapshots/algolia_canvas_place-${formatDate(new Date())}.json`,
      JSON.stringify(hits)
    );
  });
