import { type Delegate, View, Text, Icon, Avatar } from "onyx-ui";
import { BookCheckIcon, SquareIcon } from "lucide-react";

import type { UserId, ItemId, StatusId, TeamKeySeqId } from "../../queries";
import { useSortable } from "../../hooks";

import styles from "../../App.module.css";

const ItemStatus = {
  BACKLOG: {
    value: "BACKLOG",
    label: "Backlog",
    icon: SquareIcon,
    iconColor: "gray-4",
    iconFill: true,
    tooltip: "Items that are ready to be refined",
  },
  IN_PROGRESS: {
    value: "IN_PROGRESS",
    label: "In Progress",
    icon: SquareIcon,
    iconColor: "blue-2",
    iconFill: true,
    tooltip: "Items that are currently in progress",
  },
} as const;

function BacklogItem({
  id,
  title,
  statusId,
  teamKeySeqId,
  assignees,
  sourceElementRef,
  onItemSelect,
}: Delegate<
  {
    id: ItemId;
    title: string;
    statusId: StatusId;
    teamKeySeqId: TeamKeySeqId;
    assignees: { id: UserId; displayName: string }[];
    sourceElementRef: React.RefObject<HTMLElement | null>;
    onItemSelect?: (id: ItemId) => void;
  },
  typeof View<"div">
>) {
  const ref = useSortable({ itemId: id, itemOrder: 0 }, sourceElementRef, ({ sourceItemId }) => {
    console.log(sourceItemId);
  });

  return (
    <View
      horizontal
      draggable
      ref={ref}
      id={id}
      className={styles.BacklogItem}
      cursor="pointer"
      fillColor="white"
      padding="8px 16px"
      spacing="12px"
      onClick={() => onItemSelect?.(id)}
    >
      <View flex spacing="8px">
        <Text fontWeight="600">{title}</Text>
        <View horizontal align="middle left" spacing="4px">
          <Icon bleed icon={BookCheckIcon} size={14} />
          <Text light bold fontSize="12px">
            {teamKeySeqId}
          </Text>
        </View>
      </View>
      <View horizontal align="middle justify" spacing="16px">
        <Avatar.Stack>
          {assignees.map((assignee) => (
            <Avatar
              key={assignee.id}
              imageOnly
              name={assignee.displayName}
              tooltip={`Developer: ${assignee.displayName}`}
            />
          ))}
        </Avatar.Stack>
        <View horizontal align="middle left" spacing="4px" style={{ minWidth: 90 }}>
          <Icon
            icon={SquareIcon}
            color={ItemStatus[statusId].iconColor}
            size={14}
            fill="currentColor"
          />
          <Text bold>{ItemStatus[statusId].label}</Text>
        </View>
      </View>
    </View>
  );
}

export default BacklogItem;
