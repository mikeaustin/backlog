import { type Delegate, Modal, Text, View } from "onyx-ui";

import type { useSelectItemListQuery } from "../../queries";

type Item = Exclude<ReturnType<typeof useSelectItemListQuery>, undefined>["items"][number];

function ModifyItemModal({ item, ...props }: Delegate<{ item?: Item }, typeof Modal, "title">) {
  return (
    <Modal title="Modify Item" {...props}>
      <View padding="16px">
        <Text fontSize="18px">{item?.title}</Text>
      </View>
    </Modal>
  );
}

export default ModifyItemModal;
