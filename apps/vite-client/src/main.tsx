import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createClient as createUrlClient, Provider as UrqlProvider, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";

import "./index.css";

import App from "./App.tsx";

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
            cache.invalidate({ __typename: "items2", id: args.pk_columns.id });
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
