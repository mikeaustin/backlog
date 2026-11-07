import { gql, useMutation, type OperationContext } from "urql";

import type { Item } from "./types";
import { ITEM_FRAGMENT } from "./fragments";

type CreateItemMutation = {
  insert_items_one: Item;
};

type CreateItemMutationInput = {
  input: {
    title: string;
    statusId: string;
  };
};

const CREATE_ITEM_MUTATION = gql<CreateItemMutation, CreateItemMutationInput>`
  mutation CreateItem($input: items_insert_input!) {
    insert_items_one(object: $input) {
      ...ItemFragment
    }
  }
  ${ITEM_FRAGMENT}
`;

function useCreateItemMutation() {
  const [_, createItem] = useMutation(CREATE_ITEM_MUTATION);

  return (variables: Parameters<typeof createItem>[0], context?: Partial<OperationContext>) => {
    const result = createItem(variables, context);

    return result;
  };
}

export default useCreateItemMutation;
