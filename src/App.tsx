import { useState } from 'react'
import { gql, useQuery } from "urql";
import { View, Text, Icon, Avatar } from "onyx-ui"
import { BookCheckIcon } from "lucide-react"

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

type TeamKeySeqId = string & { readonly __type: unique symbol };

function BacklogItem({
  title,
  teamKeySeqId,
}: Delegate<{
  title: string,
  teamKeySeqId: TeamKeySeqId,
}, typeof View<"div">>) {
  return (
    <View horizontal className={styles.BacklogItem} fillColor="white" padding="8px 16px" spacing="12px">
      <View flex spacing="8px">
        <Text fontWeight="600">
          {title}x
        </Text>
        <View horizontal align="middle left" spacing="4px">
          <Icon bleed icon={BookCheckIcon} size={14} />
          <Text light fontSize="12px">
            {teamKeySeqId}
          </Text>
        </View>
      </View>
      <View>
        <Avatar.Stack>
          <Avatar imageOnly name="Mike Austin" />
          <Avatar imageOnly name="John Connor" />
        </Avatar.Stack>
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
