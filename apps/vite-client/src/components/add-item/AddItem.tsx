import { useState } from "react";
import { Button, Form, Input, View, type FieldValue } from "onyx-ui";

import useCreateItemMutation from "../../queries/CreateItemMutation";

const InputField = Form.Field.withComponent(Input);

function AddItem() {
  const [itemFormFields, setItemFormFields] = useState({ title: "" });

  const createItem = useCreateItemMutation();

  const handleInputChange = (event: React.InputEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (target.value) {
      target.value = target.value.at(0)?.toUpperCase() + target.value.slice(1);
    }
  };

  const handleItemFormFieldChange = (name: string, value: FieldValue) => {
    setItemFormFields((itemFormFields) => ({
      ...itemFormFields,
      [name]: value,
    }));
  };

  const handleItemFormSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();

    if (itemFormFields.title) {
      createItem({
        input: {
          statusId: "BACKLOG",
          title: itemFormFields.title,
        },
      });

      setItemFormFields({
        title: "",
      });
    }
  };

  return (
    <View fillColor="content">
      <Form
        fields={itemFormFields}
        onFieldChange={handleItemFormFieldChange}
        onSubmit={handleItemFormSubmit}
      >
        <View horizontal padding="12px 16px" spacing="8px">
          <InputField
            borderOnFocus
            border="bottom"
            name="title"
            placeholder="Add an item..."
            onInput={handleInputChange}
          />
          <Button round primary type="submit">
            Add Item
          </Button>
        </View>
      </Form>
    </View>
  );
}

export default AddItem;
