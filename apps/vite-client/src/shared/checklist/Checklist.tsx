import { useEffect, useRef, useState } from "react";
import { Icon, Input, Label, View, type Delegate } from "onyx-ui";
import { CheckIcon } from "lucide-react";

function Checkbox({
  value,
  icon,
  fillColor = "primary",
  tabIndex,
  onValueChange,
}: Delegate<
  {
    value?: boolean;
    icon?: React.ComponentProps<typeof Icon>["icon"];
    onValueChange?: (value: boolean) => void;
  },
  typeof View<"input">,
  "onClick"
>) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(event.currentTarget.checked);
  };

  const checkboxFillColor = value ? fillColor : undefined;

  return (
    <View horizontal opacityOnPress as="label" spacing="8px" align="middle left">
      <View
        border={!value}
        borderColor="gray-4"
        fillColor={checkboxFillColor}
        cornerRadius="2px"
        align="middle center"
        style={{ width: 24, height: 24 }}
      >
        <View
          as="input"
          type="checkbox"
          tabIndex={tabIndex}
          checked={value}
          onChange={handleChange}
        />
        {value && <Icon icon={icon ?? CheckIcon} size={20} color="white" />}
      </View>
    </View>
  );
}

//

type Item = {
  id: string;
  checkboxValue: boolean;
  inputValue: string;
};

function ChecklistItem({
  id,
  checkboxValue,
  inputValue,
  initialLoad,
  onCheckboxUpdate,
  onInputUpdate,
  onItemInsert,
  onItemDelete,
}: Item & {
  initialLoad: boolean;
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
        autoFocus={!initialLoad}
        borderOnFocus
        border="bottom"
        value={inputValue}
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
  const [initialized, setInitialized] = useState(false);

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
    console.log("handleItemInputUpdate");

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
  };

  const handleItemDelete = (id: string) => {
    const index = items.findIndex((item) => item.id === id);

    const updatedItems = [...items];

    updatedItems.splice(index, 1);

    onValueChange?.(updatedItems);
  };

  useEffect(() => {
    setTimeout(() => {
      setInitialized(true);
    });
  }, []);

  return (
    <Label label="Criteria" spacing="4px">
      {items.map((item) => (
        <ChecklistItem
          key={item.id}
          id={item.id}
          initialLoad={!initialized}
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
