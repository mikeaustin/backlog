import { CheckIcon } from "lucide-react";
import { Icon, Input, Label, Text, View, type Delegate } from "onyx-ui";

function Checkbox({
  value,
  icon,
  fillColor = "primary",
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
        <View as="input" type="checkbox" checked={value} onChange={handleChange} />
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

function Item({
  id,
  checkboxValue,
  inputValue,
  onCheckboxUpdate,
  onInputUpdate,
}: Item & {
  onCheckboxUpdate: (id: string, value: boolean) => void;
  onInputUpdate: (id: string, value: string) => void;
}) {
  const handleCheckboxValueChange = (value: boolean) => {
    onCheckboxUpdate(id, value);
  };

  const handleInputValueChange = (value: string) => {
    onInputUpdate(id, value);
  };

  return (
    <View horizontal spacing="8px" align="middle left">
      <Checkbox value={Boolean(checkboxValue)} onValueChange={handleCheckboxValueChange} />
      <Input
        flush
        borderOnFocus
        border="bottom"
        value={inputValue}
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
    const index = items.findIndex((item) => item.id === id);

    const updatedItems = [...items];

    updatedItems[index] = {
      ...updatedItems[index],
      inputValue: value,
    };

    onValueChange?.(updatedItems);
  };

  return (
    <Label label="Criteria" spacing="4px">
      {items.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          checkboxValue={item.checkboxValue}
          inputValue={item.inputValue}
          onCheckboxUpdate={handleItemCheckboxUpdate}
          onInputUpdate={handleItemInputUpdate}
        />
      ))}
    </Label>
  );
}

export default Checklist;
