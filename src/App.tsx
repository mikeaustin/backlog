import { useState } from 'react'
import { gql, useQuery } from "urql";
import { View, Text, Icon, Avatar } from "onyx-ui"
import { BookCheckIcon } from "lucide-react"

import BacklogItem from "./components/backlog-item";

import styles from './App.module.css'

const SELECT_ITEM_LIST = gql`
  query SelectItemList {
    items2 {
      id
      title
      teamKeySeqId
    }
  }
`;

function App() {
  const [{ data }] = useQuery({
    query: SELECT_ITEM_LIST,
  });

  return (
    <View flex fillColor="gutter" padding="16px">
      <View
        border
        cornerRadius="4px"
        fillColor="divider"
        spacing="1px"
        style={{ overflow: "clip", containerType: "inline-size" }}
      >
        {data?.items2.map(item => (
          <BacklogItem key={item.id} {...item} />
        ))}
      </View>
    </View>
  );
}

export default App
