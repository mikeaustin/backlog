import { useRef } from "react";
import { Checkbox, Input, Label, View } from "onyx-ui";

//

type Item = {
  id: string;
  checkboxValue: boolean;
  inputValue: string;
};

function ChecklistItem({
  id,
  inputElementRef,
  checkboxValue,
  inputValue,
  onCheckboxUpdate,
  onInputUpdate,
  onItemInsert,
  onItemDelete,
}: Item & {
  inputElementRef: React.Ref<HTMLInputElement>;
  onCheckboxUpdate: (id: string, value: boolean) => void;
  onInputUpdate: (id: string, value: string) => void;
  onItemInsert: (id: string, previousInputValue: string) => void;
  onItemDelete: (id: string) => void;
}) {
  const insertedRef = useRef(false);

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { currentTarget } = event;

    if (event.key === "Enter") {
      event.preventDefault();

      onItemInsert(id, currentTarget.value);

      insertedRef.current = true;
    } else if (event.key === "Backspace" && currentTarget.value === "") {
      onItemDelete(id);
    }
  };

  const handleCheckboxValueChange = (value: boolean) => {
    onCheckboxUpdate(id, value);
  };

  const handleInputValueChange = (value: string) => {
    console.log("handleInputValueChange");

    if (!insertedRef.current) {
      onInputUpdate(id, value);
    }

    insertedRef.current = false;
  };

  return (
    <View horizontal spacing="8px" align="middle left">
      <Checkbox
        tabIndex={-1}
        value={Boolean(checkboxValue)}
        onValueChange={handleCheckboxValueChange}
      />
      <Input
        flush
        inputRef={inputElementRef}
        borderOnFocus
        border="bottom"
        value={inputValue}
        placeholder="When is this item considered done..."
        onKeyDown={handleInputKeyDown}
        onValueChange={handleInputValueChange}
      />
    </View>
  );
}

//

function Checklist({
  items: _items,
  onValueChange,
}: {
  items: Item[];
  onValueChange?: (item: Item[]) => void;
}) {
  const inputElementsRef = useRef(new Map());

  const items = [
    ...(_items.length === 0
      ? [
          {
            id: crypto.randomUUID() as string,
            checkboxValue: false,
            inputValue: "",
          },
        ]
      : []),
    ..._items,
  ];

  const handleItemCheckboxUpdate = (id: string, value: boolean) => {
    const index = items.findIndex((item) => item.id === id);

    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      checkboxValue: value,
    };

    onValueChange?.(updatedItems);
  };

  const handleItemInputUpdate = (id: string, value: string) => {
    console.log("handleItemInputUpdate", value);

    const index = items.findIndex((item) => item.id === id);

    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      inputValue: value,
    };

    onValueChange?.(updatedItems);
  };

  const handleItemInsert = (id: string, previousInputValue: string) => {
    console.log("handleItemInsert");

    const index = items.findIndex((item) => item.id === id);

    const updatedItems = [...items];

    updatedItems[index] = {
      ...updatedItems[index],
      inputValue: previousInputValue,
    };

    updatedItems.splice(index + 1, 0, {
      id: crypto.randomUUID(),
      checkboxValue: false,
      inputValue: "",
    });

    onValueChange?.(updatedItems);

    setTimeout(() => {
      inputElementsRef.current.get(index + 1).focus();
    });
  };

  const handleItemDelete = (id: string) => {
    const index = items.findIndex((item) => item.id === id);

    const updatedItems = [...items];

    updatedItems.splice(index, 1);

    onValueChange?.(updatedItems);

    setTimeout(() => {
      inputElementsRef.current.get(index - 1).focus();
    });
  };

  return (
    <Label label="Criteria" spacing="4px">
      {items.map((item, index) => (
        <ChecklistItem
          key={item.id}
          id={item.id}
          inputElementRef={(node) => {
            inputElementsRef.current.set(index, node);
          }}
          checkboxValue={item.checkboxValue}
          inputValue={item.inputValue}
          onCheckboxUpdate={handleItemCheckboxUpdate}
          onInputUpdate={handleItemInputUpdate}
          onItemInsert={handleItemInsert}
          onItemDelete={handleItemDelete}
        />
      ))}
    </Label>
  );
}

export default Checklist;
