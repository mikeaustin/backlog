import { useState } from "react";
import { Button, Form, Input, View, type FieldValue } from "onyx-ui";

import useCreateItemMutation from "../../queries/CreateItemMutation";

const InputField = Form.Field.withComponent(Input);

function AddItem() {
  const [itemFormFields, setItemFormFields] = useState({ title: "" });

  const createItem = useCreateItemMutation();

  const handleItemFormFieldChange = (name: string, value: FieldValue) => {
    setItemFormFields((itemFormFields) => ({
      ...itemFormFields,
      [name]: value,
    }));
  };

  const handleItemFormSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();

    createItem({
      input: {
        statusId: "BACKLOG",
        title: itemFormFields.title,
      },
    });

    setItemFormFields({
      title: "",
    });
  };

  return (
    <Form
      fields={itemFormFields}
      onFieldChange={handleItemFormFieldChange}
      onSubmit={handleItemFormSubmit}
    >
      <View horizontal fillColor="content" padding="12px 16px" spacing="8px">
        <InputField borderOnFocus border="bottom" name="title" placeholder="Add an item..." />
        <Button round primary type="submit">
          Add Item
        </Button>
      </View>
    </Form>
  );
}

export default AddItem;
