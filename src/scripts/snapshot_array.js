const algoliasearch = require("algoliasearch");
const fs = require("fs");

require("dotenv").config();

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY_SNAPSHOT
);
const index = searchClient.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME
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

let hits = [];

index
  .browseObjects({
    query: "",
    batch: (batch) => {
      snapshots = snapshots.concat(batch.map((hit) => hit.bg_color));
    },
  })
  .then(() => {
    if (process.env.NODE_ENV === "development") {
      fs.writeFileSync(
        `./src/snapshots_array/algolia_canvas_place-${formatDate(
          new Date()
        )}.json`,
        JSON.stringify(snapshots)
      );
    } else {
      snapshotsIndex
        .browseObjects({
          query: "",
          filters: "newest:true",
          batch: (batch) => {
            latestHit = batch[0];
          },
        })
        .then(() => {
          if (
            JSON.stringify(latestHit.snapshot) === JSON.stringify(snapshots)
          ) {
            console.log("Snapshot is the same, do nothing");
          } else {
            snapshotsIndex
              .browseObjects({
                query: "",
                batch: (batch) => {
                  hits = hits.concat(
                    batch.map((hit) => ({ ...hit, newest: false }))
                  );
                },
              })
              .then(() => {
                snapshotsIndex.saveObjects(hits);
              });
            snapshotsIndex.saveObject({
              objectID: `${formatDate(new Date())}`,
              snapshot: snapshots,
              newest: true,
            });
          }
        });
    }
  })
  .catch((err) => {
    console.log(err);
  });
