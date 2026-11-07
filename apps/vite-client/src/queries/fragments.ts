import { gql } from "urql";

const USER_FRAGMENT = gql`
  fragment UserFragment on users {
    id
    displayName
    metadata
  }
`;

const ITEM_FRAGMENT = gql`
  fragment ItemFragment on items {
    id
    title
    seqId
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
        metadata
      }
    }
  }
`;

export { USER_FRAGMENT, ITEM_FRAGMENT };
