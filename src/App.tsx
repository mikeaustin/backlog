import { useState } from 'react'
import { gql, useQuery } from "urql";
import { View, Text, Icon } from "onyx-ui"
import { BookCheckIcon } from "lucide-react"

import './App.css'

const SELECT_ITEM_LIST = gql`
  query SelectItemList {
    items2 {
      id
      title
    }
  }
`;

function BacklogItem() {
  return (
    <View fillColor="white" padding="8px 16px" spacing="8px">
      <Text fontWeight="600">
        Comments can be added to item
      </Text>
      <View horizontal align="middle left" spacing="4px">
        <Icon icon={BookCheckIcon} size={14} />
        <Text light fontSize="12px">
          GEM-1
        </Text>
      </View>
    </View>
  );
}

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
        style={{ overflow: "clip" }}
      >
        <BacklogItem />
        <BacklogItem />
      </View>
    </View>
  );
}

export default App
