import { gql, useMutation, type AnyVariables } from "urql";

import type { ItemId, Item } from "./types";
import { ITEM_FRAGMENT } from "./fragments";

type UpdateItemMutation = {
  update_items_by_pk: Item;
};

const UPDATE_ITEM_MUTATION = gql<UpdateItemMutation>`
  mutation UpdateItem($id: uuid!, $input: items_set_input) {
    update_items_by_pk(_set: $input, pk_columns: { id: $id }) {
      ...ItemFragment
    }
  }
  ${ITEM_FRAGMENT}
`;

function useUpdateItemMutation() {
  const [, updateItem] = useMutation(UPDATE_ITEM_MUTATION);

  return async ({ id, input }: { id: ItemId; input: AnyVariables }) => {
    await updateItem({
      id,
      input,
    });
  };
}

export default useUpdateItemMutation;
