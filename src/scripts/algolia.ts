import { createNullCache } from "@algolia/cache-common";
import algoliasearch from "algoliasearch";

export const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_BROWSE_API_KEY!,
  {
    responsesCache: createNullCache(),
    requestsCache: createNullCache(),
  }
);

export const index = searchClient.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME!
);
export const hugeIndex = searchClient.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_HUGE_INDEX_NAME!
);
export const snapshotIndex = searchClient.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME_SNAPSHOT!
);
