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
const index = searchClient.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!
);

export default async function indexData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Cache-Control", "s-maxage=0");

  res.send({ body: JSON.parse(req.body) });
  await index.saveObject({
    objectID: JSON.parse(req.body).objectID,
    bg_color: JSON.parse(req.body).bg_color,
    id: JSON.parse(req.body).id,
  });
}
