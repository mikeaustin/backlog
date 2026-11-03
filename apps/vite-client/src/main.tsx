import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createClient as createUrlClient, Provider as UrqlProvider, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";

import { SELECT_ITEM_LIST_QUERY } from "./queries/SelectItemListQuery.ts";

import App from "./App.tsx";

import "./index.css";

const client = createUrlClient({
  url: "https://edfbjhhlywdqsyngkmio.hasura.us-east-1.nhost.run/v1/graphql",
  preferGetMethod: false,
  exchanges: [
    cacheExchange({
      keys: {
        itemsAssignees: (data) => `${data.itemId}-${data.userId}`,
      },
      updates: {
        Mutation: {
          update_items2_by_pk: (result: any, args: any, cache) => {
            cache.updateQuery({ query: SELECT_ITEM_LIST_QUERY }, (data) => {
              if (!data) {
                return null;
              }

              return {
                ...data,
                items2: data?.items2.toSorted((a, b) => a.sortOrder - b.sortOrder),
              };
            });
          },
        },
      },
    }),
    fetchExchange,
  ],
});

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <UrqlProvider value={client}>
    <App />
  </UrqlProvider>,
  // </StrictMode>
);
