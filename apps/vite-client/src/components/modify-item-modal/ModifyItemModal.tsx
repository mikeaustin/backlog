import { useState } from "react";
import { type Delegate, type FieldValue } from "onyx-ui";
import { Button, Form, Input, Modal, Select, View } from "onyx-ui";

import type { useSelectItemListQuery } from "../../queries";
import { useUpdateItemMutation } from "../../queries";
import ItemStatuses from "../../data/ItemStatuses";

type Item = Exclude<ReturnType<typeof useSelectItemListQuery>, undefined>["items"][number];

const InputField = Form.Field.withComponent(Input);
const SelectField = Form.Field.withComponent(Select);

const itemStatusSelectOptions = [...Object.values(ItemStatuses)] as const;

function ModifyItemModal({ item, ...props }: Delegate<{ item: Item }, typeof Modal, "title">) {
  const [itemFields, setItemFields] = useState({
    title: item.title,
    statusId: item.statusId,
    description: "",
  });

  const updateItem = useUpdateItemMutation();

  //

  const handleItemFormFieldChange = (name: string, value: FieldValue) => {
    console.log("here");
    setItemFields((itemFields) => ({
      ...itemFields,
      [name]: value,
    }));
  };

  const handleSaveChangesClick = () => {
    updateItem({
      id: item.id,
      input: {
        statusId: itemFields.statusId,
        title: itemFields.title,
      },
    });
  };

  const actions = [
    <Button round solid primary onClick={handleSaveChangesClick}>
      Save Changes
    </Button>,
  ];

  return (
    <Modal title="Modify Item" actions={actions} {...props}>
      <Form fields={itemFields} onFieldChange={handleItemFormFieldChange}>
        <View border="bottom" fillColor="panel" padding="16px" spacing="16px">
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
        </View>
        <View fillColor="content" padding="16px">
          <InputField name="description" label="Description" style={{ height: 30 }} />
        </View>
      </Form>
    </Modal>
  );
}

export default ModifyItemModal;
