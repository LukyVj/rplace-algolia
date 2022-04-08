const algoliasearch = require("algoliasearch");
const blank = require("../data/blank.json");

require("dotenv").config();

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);
const index = searchClient.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME_TEST
);

index
  .clearObjects()
  .then(() => {
    index
      .saveObjects(blank, { autoGenerateObjectIDIfNotExist: true })
      .then(() => {
        console.log("Index saved");
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });
