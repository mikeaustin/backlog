import { useState } from "react";
import { Text, type Delegate, type FieldValue } from "onyx-ui";
import { Button, Form, Input, Modal, Select, View } from "onyx-ui";

import type { useSelectItemListQuery } from "../../queries";
import { useUpdateItemMutation } from "../../queries";
import ItemStatuses from "../../data/ItemStatuses";

import Checklist from "../../shared/checklist";

type Item = Exclude<ReturnType<typeof useSelectItemListQuery>, undefined>["items"][number];

const InputField = Form.Field.withComponent(Input);
const SelectField = Form.Field.withComponent(Select);

const itemStatusSelectOptions = [...Object.values(ItemStatuses)] as const;

function ModifyItemModal({ item, ...props }: Delegate<{ item: Item }, typeof Modal, "title">) {
  const [itemFields, setItemFields] = useState({
    title: item.title,
    statusId: item.statusId,
    description: item.description,
  });

  const [criteria, setCriteria] = useState<Item["criteria"]>(item.criteria);

  const updateItem = useUpdateItemMutation();

  //

  const handleItemFormFieldChange = (name: string, value: FieldValue) => {
    setItemFields((itemFields) => ({
      ...itemFields,
      [name]: value,
    }));
  };

  const handleCriteriaChecklistValueChange = (
    items: { id: string; checkboxValue: boolean; inputValue: string }[],
  ) => {
    setCriteria(items);
  };

  const handleSaveChangesClick = () => {
    updateItem({
      id: item.id,
      input: {
        title: itemFields.title,
        statusId: itemFields.statusId,
        description: itemFields.description,
        criteria: criteria,
      },
    });
  };

  const actions = [
    <Button round solid primary onClick={handleSaveChangesClick}>
      Save Changes
    </Button>,
  ];

  return (
    <Modal title="Modify Item" actions={actions} style={{ width: 600 }} {...props}>
      <View>
        <View
          border="bottom"
          fillColor="panel"
          padding="16px"
          spacing="16px"
          style={{ paddingBottom: 8 }}
        >
          <View horizontal align="middle justify">
            <View spacing="8px">
              <Text>ENG-1</Text>
              <Text light fontSize="12px">
                Updated foo
              </Text>
            </View>
            <Button round solid>
              Actions
            </Button>
          </View>
          <Form fields={itemFields} spacing="16px" onFieldChange={handleItemFormFieldChange}>
            <InputField
              flush
              borderOnFocus
              border="bottom"
              multiline
              name="title"
              innerStyle={{ fontSize: 18 }}
            />
            <View horizontal>
              <SelectField name="statusId" label="Status" options={itemStatusSelectOptions} />
            </View>
          </Form>
        </View>
        <View fillColor="content" padding="16px">
          <Form fields={itemFields} spacing="16px" onFieldChange={handleItemFormFieldChange}>
            <InputField
              flush
              multiline
              borderOnFocus
              border="bottom"
              name="description"
              label="Notes"
              placeholder="Details about this item..."
            />
            <Checklist items={criteria} onValueChange={handleCriteriaChecklistValueChange} />
          </Form>
        </View>
      </View>
    </Modal>
  );
}

export default ModifyItemModal;
