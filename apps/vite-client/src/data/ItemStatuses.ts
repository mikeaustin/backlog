import { SquareIcon } from "lucide-react";

const ItemStatuses = {
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
  DONE: {
    value: "DONE",
    label: "Done",
    icon: SquareIcon,
    iconColor: "lime-2",
    iconFill: true,
    tooltip: "Items with acceptance criteria done",
  },
} as const;

export default ItemStatuses;
