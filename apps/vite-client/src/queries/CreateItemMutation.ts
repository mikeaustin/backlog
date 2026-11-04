import { gql, useMutation } from "urql";

import type { Item } from ".";

type CreateItemMutation = {
  insert_items_one: Item;
};

const CREATE_ITEM_MUTATION = gql<CreateItemMutation>`
  mutation CreateItem($input: items2_insert_input!) {
    insert_items2_one(object: $input) {
      id
      title
      statusId
      teamKeySeqId
      sortOrder
      flagged
      itemsAssignees {
        assignee {
          id
          displayName
        }
      }
    }
  }
`;

function useCreateItemMutation() {
  const [_, createItem] = useMutation(CREATE_ITEM_MUTATION);

  return createItem;
}

export default useCreateItemMutation;
