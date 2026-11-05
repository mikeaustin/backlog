import { gql, useMutation } from "urql";

import type { Item } from "./types";
import { ITEM_FRAGMENT } from "./fragments";

type CreateItemMutation = {
  insert_items_one: Item;
};

const CREATE_ITEM_MUTATION = gql<CreateItemMutation>`
  mutation CreateItem($input: items_insert_input!) {
    insert_items_one(object: $input) {
      ...ItemFragment
    }
  }
  ${ITEM_FRAGMENT}
`;

function useCreateItemMutation() {
  const [_, createItem] = useMutation(CREATE_ITEM_MUTATION);

  return createItem;
}

export default useCreateItemMutation;
