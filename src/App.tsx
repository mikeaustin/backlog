import { View } from "onyx-ui";

import { useSelectItemListQuery } from "./queries";

import BacklogItem from "./components/backlog-item";

// import styles from './App.module.css'

function App() {
  const selectItemListData = useSelectItemListQuery();

  return (
    <View flex fillColor="gutter" padding="16px">
      <View
        border
        cornerRadius="4px"
        fillColor="divider"
        spacing="1px"
        style={{ overflow: "clip", containerType: "inline-size" }}
      >
        {selectItemListData?.items2.map((item) => (
          <BacklogItem key={item.id} {...item} />
        ))}
      </View>
    </View>
  );
}

export default App;
