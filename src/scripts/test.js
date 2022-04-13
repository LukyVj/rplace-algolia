const data = require("../data/test.json");
const fs = require("fs");

const newData = [];

data.map((item, index) => {
  newData.push({ ...item, objectID: index + 1 });
});

fs.writeFileSync("./src/data/newHits.json", JSON.stringify(newData));
