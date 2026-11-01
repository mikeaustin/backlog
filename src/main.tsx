import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createClient as createUrlClient, Provider as UrqlProvider, fetchExchange } from "urql";

import './index.css'

import App from './App.tsx'

const client = createUrlClient({
  url: "https://edfbjhhlywdqsyngkmio.hasura.us-east-1.nhost.run/v1/graphql",
  preferGetMethod: false,
  exchanges: [
    fetchExchange,
  ],
});

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <UrqlProvider value={client}>
      <App />
    </UrqlProvider>
  // </StrictMode>
);
