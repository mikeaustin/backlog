import { useState } from "react";
import { Avatar, Label, type Delegate, type FieldValue } from "onyx-ui";
import { Button, Form, Input, Menu, Select, Text, View } from "onyx-ui";
import { FlagIcon, TrashIcon } from "lucide-react";

import { type Item, useUpdateItemMutation } from "../../queries";
import ItemStatuses from "../../data/ItemStatuses";

import Checklist from "../../shared/checklist";
import Modal from "../../shared/modal";

const InputField = Form.Field.withComponent(Input);
const SelectField = Form.Field.withComponent(Select);

function Flag() {
  return (
    <svg height="16" width="16" style={{ position: "absolute", left: 0, top: 0 }}>
      <polygon points="0,0 16,0 0,16" style={{ fill: "var(--onyx-red-4)", strokeWidth: 3 }} />
    </svg>
  );
}

const itemStatusSelectOptions = [...Object.values(ItemStatuses)] as const;

function ModifyItemModal({ item, ...props }: Delegate<{ item: Item }, typeof Modal, "title">) {
  const [itemFields, setItemFields] = useState({
    title: item.title,
    statusId: item.statusId,
    description: item.description,
    flagged: item.flagged,
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
        flagged: itemFields.flagged,
        criteria: criteria,
      },
    });
  };

  const modalActions = [
    <Button round solid primary onClick={handleSaveChangesClick}>
      Save Changes
    </Button>,
  ];

  const itemActions = [
    <Menu.Item
      icon={FlagIcon}
      title={item.flagged ? "Unflag Item" : "Flag Item"}
      onClick={() => handleItemFormFieldChange("flagged", !item.flagged)}
    />,
    <Menu.Divider />,
    <Menu.Item disabled icon={TrashIcon} title="Archive Item" />,
  ];

  return (
    <Modal title="Modify Item" actions={modalActions} style={{ width: 600 }} {...props}>
      <View style={{ minHeight: 0 }}>
        <View
          border="bottom"
          fillColor="panel"
          padding="16px"
          spacing="16px"
          style={{ paddingBottom: 8 }}
        >
          {itemFields.flagged && <Flag />}
          <View horizontal align="middle justify">
            <View spacing="8px">
              <Text>ENG-1</Text>
              <Text light fontSize="12px">
                Updated {new Date(item.updatedAt).toLocaleDateString()}
              </Text>
            </View>
            <Button.Menu solid offsetTop={8} cornerRadius="max" items={itemActions}>
              Actions
            </Button.Menu>
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
        <View border="bottom" fillColor="gutter" padding="16px">
          <Label horizontal label="Developers" spacing="16px">
            {item.assignees.map((assignee) => (
              <Avatar
                key={assignee.id}
                imageFillColor="divider"
                name={assignee.displayName}
                label={assignee.metadata?.roleLabel}
              />
            ))}
          </Label>
        </View>
        <View fillColor="content" padding="16px" style={{ overflowY: "auto" }}>
          <Form fields={itemFields} spacing="16px" onFieldChange={handleItemFormFieldChange}>
            <InputField
              flush
              multiline
              borderOnFocus
              border="bottom"
              name="description"
              label="Summary"
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
