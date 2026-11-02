import { useRef, useState } from "react";
import { type FieldValue, View, Page, Form, Select } from "onyx-ui";
import { SquareIcon } from "lucide-react";

import { useSelectItemListQuery, type ItemId } from "./queries";

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

  const filteredSelectItemListData = selectItemListData && {
    ...selectItemListData,
    items: selectItemListData.items.filter(
      (item) => filterFields.statusId === undefined || item.statusId === filterFields.statusId,
    ),
  };

  return (
    <Page flex id="window">
      <View id="overlay" absolute style={{ zIndex: 1000, inset: 0, pointerEvents: "none" }} />
      <Page.Header title="Backlog" style={{ paddingTop: 16 }}>
        <Form fields={filterFields} onFieldChange={handleFilterFormFieldChange}>
          <SelectField name="statusId" label="Status" options={itemStatusSelectOptions} />
        </Form>
      </Page.Header>
      <Page.Content flex fillColor="gutter" padding="16px">
        <View
          border
          cornerRadius="4px"
          fillColor="divider"
          spacing="1px"
          style={{ containerType: "inline-size" }}
        >
          {filteredSelectItemListData?.items.map((item) => (
            <BacklogItem
              key={item.id}
              sourceElementRef={sourceElementRef}
              {...item}
              onItemSelect={handleItemSelect}
            />
          ))}
        </View>
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
