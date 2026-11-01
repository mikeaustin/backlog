import { useState } from "react";
import { type FieldValue, View, Page, Form, Select } from "onyx-ui";
import { SquareIcon } from "lucide-react";

import { useSelectItemListQuery } from "./queries";

import BacklogItem from "./components/backlog-item";

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

  const selectItemListData = useSelectItemListQuery();

  const handleFilterFormFieldChange = (name: string, value: FieldValue) => {
    setFormFields((formFields) => ({
      ...formFields,
      [name]: value,
    }));
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
          style={{ overflow: "clip", containerType: "inline-size" }}
        >
          {filteredSelectItemListData?.items.map((item) => (
            <BacklogItem key={item.id} {...item} />
          ))}
        </View>
      </Page.Content>
    </Page>
  );
}

export default App;
