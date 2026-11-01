import { type Delegate, View, Text, Icon, Avatar } from "onyx-ui";
import { BookCheckIcon, SquareIcon } from "lucide-react";

import type { UserId, ItemId, StatusId, TeamKeySeqId } from "../../queries";

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
}: Delegate<
  {
    id: ItemId;
    title: string;
    statusId: StatusId;
    teamKeySeqId: TeamKeySeqId;
    assignees: { id: UserId }[];
  },
  typeof View<"div">
>) {
  return (
    <View
      horizontal
      id={id}
      className={styles.BacklogItem}
      fillColor="white"
      padding="8px 16px"
      spacing="12px"
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
      <View horizontal align="middle center" spacing="16px">
        <Avatar.Stack>
          {assignees.map((assignee) => (
            <Avatar key={assignee.id} imageOnly name="Mike Austin" />
          ))}
          <Avatar imageOnly name="Mike Austin" />
          <Avatar imageOnly name="John Connor" />
        </Avatar.Stack>
        <View horizontal align="middle left" spacing="4px" style={{ minWidth: 90 }}>
          <Icon icon={SquareIcon} color="violet-2" size={14} fill="currentColor" />
          <Text bold>{ItemStatus[statusId].label}</Text>
        </View>
      </View>
    </View>
  );
}

export default BacklogItem;
