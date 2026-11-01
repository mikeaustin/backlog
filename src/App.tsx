import { useState } from 'react'
import { gql, useQuery } from "urql";

import './App.css'

const SELECT_ITEM_LIST = gql`
  query SelectItemList {
    items2 {
      id
      title
    }
  }
`;

function App() {
  const [{ data }] = useQuery({
    query: SELECT_ITEM_LIST,
  });

  console.log(data);

  return (
    <>
    </>
  )
}

export default App
