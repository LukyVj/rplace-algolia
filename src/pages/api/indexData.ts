import { createNullCache } from "@algolia/cache-common";
import algoliasearch from "algoliasearch";
import { NextApiRequest, NextApiResponse } from "next";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!,
  {
    responsesCache: createNullCache(),
    requestsCache: createNullCache(),
  }
);
const index = searchClient.initIndex("algolia_canvas_place_test");

export default function indexData(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  res.send({ body: JSON.parse(req.body) });
  index.saveObject({
    objectID: JSON.parse(req.body).objectID,
    bg_color: JSON.parse(req.body).bg_color,
    id: JSON.parse(req.body).id,
  });
}
