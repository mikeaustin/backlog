import { gql } from "urql";

const ITEM_FRAGMENT = gql`
  fragment ItemFragment on items {
    id
    title
    statusId
    description
    sortOrder
    createdAt
    updatedAt
    flagged
    criteria
    itemsAssignees {
      itemId
      userId
      assignee {
        id
        displayName
      }
    }
  }
`;

export { ITEM_FRAGMENT };
