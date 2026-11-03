import { useRef, useState } from "react";
import { type FieldValue, View, Page, Form, Select, List } from "onyx-ui";
import { SquareIcon } from "lucide-react";

import { type ItemId, useSelectItemListQuery, useUpdateItemMutation } from "./queries";

import BacklogItem from "./components/backlog-item";
import ModifyItemModal from "./components/modify-item-modal/ModifyItemModal";

// import styles from './App.module.css'

const SelectField = Form.Field.withComponent(Select);

const itemStatusSelectOptions = [
  {
    divider: true,
    options: [{ value: undefined, label: "Any" }],
  },
  {
    value: "BACKLOG",
    icon: SquareIcon,
    iconColor: "gray-4",
    iconFill: true,
    label: "Backlog",
  },
  {
    value: "IN_PROGRESS",
    icon: SquareIcon,
    iconColor: "blue-2",
    iconFill: true,
    label: "In Progress",
  },
] as const;

function App() {
  const [filterFields, setFormFields] = useState({ statusId: undefined });
  const [selectedItemId, setSelectedItemId] = useState<ItemId | undefined>();
  const [isModifyItemModalVisible, setIsModifyItemModalVisible] = useState(false);

  const sourceElementRef = useRef<HTMLElement | null>(null);

  const selectItemListData = useSelectItemListQuery();
  const updateItem = useUpdateItemMutation();

  const handleFilterFormFieldChange = (name: string, value: FieldValue) => {
    setFormFields((formFields) => ({
      ...formFields,
      [name]: value,
    }));
  };

  const handleItemSelect = (id: ItemId) => {
    setSelectedItemId(id);

    setIsModifyItemModalVisible(true);
  };

  const handleItemMove = (
    sourceItemId: ItemId,
    targetItemOrder: number,
    aboveOrBelow: "above" | "below",
  ) => {
    if (selectItemListData) {
      const items = selectItemListData.items;
      const targetItemIndex = items.findIndex((item) => item.sortOrder === targetItemOrder);

      let updatedSortOrder;

      if (aboveOrBelow === "above") {
        if (targetItemIndex > 0) {
          updatedSortOrder =
            targetItemOrder - (targetItemOrder - items[targetItemIndex - 1].sortOrder) / 2;
        } else {
          updatedSortOrder = targetItemOrder / 2;
        }
      } else if (aboveOrBelow === "below") {
        if (targetItemIndex < items.length - 1) {
          updatedSortOrder =
            targetItemOrder + (items[targetItemIndex + 1].sortOrder - targetItemOrder) / 2;
        } else {
          updatedSortOrder = targetItemOrder + 1;
        }
      }

      updateItem({
        id: sourceItemId,
        input: {
          sortOrder: updatedSortOrder,
        },
      });
    }
  };

  const filteredSelectItemListData = selectItemListData && {
    ...selectItemListData,
    items: selectItemListData.items.filter(
      (item) => filterFields.statusId === undefined || item.statusId === filterFields.statusId,
    ),
  };

  return (
    <Page
      flex
      id="window"
      fillColor="divider"
      style={{
        width: "100%",
        maxWidth: 960,
        margin: "0 auto",
        boxShadow: "0 0 64px hsla(0, 0%, 0%, 0.1)",
      }}
    >
      <View id="overlay" absolute style={{ zIndex: 1000, inset: 0, pointerEvents: "none" }} />
      <Page.Header title="Backlog" style={{ paddingTop: 16 }}>
        <Form fields={filterFields} onFieldChange={handleFilterFormFieldChange}>
          <View horizontal>
            <SelectField name="statusId" label="Status" options={itemStatusSelectOptions} />
          </View>
        </Form>
      </Page.Header>
      <Page.Content flex fillColor="gutter" padding="16px">
        <List
          className="roundedList"
          style={{ containerType: "inline-size" }}
          onDragEnter={(event) => event.preventDefault()}
          onDragOver={(event) => event.preventDefault()}
        >
          {filteredSelectItemListData?.items.map((item) => (
            <BacklogItem
              key={item.id}
              sourceElementRef={sourceElementRef}
              {...item}
              onItemSelect={handleItemSelect}
              onItemMove={handleItemMove}
            />
          ))}
        </List>
      </Page.Content>
      {isModifyItemModalVisible && (
        <ModifyItemModal
          item={selectItemListData?.items.find((item) => item.id === selectedItemId)!}
          onRequestClose={() => setIsModifyItemModalVisible(false)}
        />
      )}
    </Page>
  );
}

export default App;
