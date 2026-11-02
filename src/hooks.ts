import { useLayoutEffect, useRef } from "react";
import type { ItemId } from "./queries";

import styles from "./App.module.css";

type Draggable = {
  itemId: ItemId;
};

type Droppable = {
  itemId: ItemId;
  itemOrder: number;
};

type Sortable = Draggable & Droppable;

type OnDrop = {
  sourceItemId: ItemId;
  targetItemId: ItemId;
  targetItemOrder: number;
  aboveOrBelow: "above" | "below";
};

const useSortable = (
  data: Sortable,
  sourceElementRef: React.RefObject<HTMLElement | null>,
  onDrop: (data: OnDrop) => void,
) => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const handleDragStart = (event: DragEvent) => {
      const currentTarget = event.currentTarget as HTMLElement;

      event.dataTransfer?.setData("application/gemtask", JSON.stringify(data));

      sourceElementRef.current = currentTarget;
    };

    const handleDragOver = (event: DragEvent) => {
      const currentTarget = event.currentTarget as Element;

      event.preventDefault();

      const rect = currentTarget.getBoundingClientRect();
      const middle = event.clientY - (rect.top + rect.height / 2);

      if (currentTarget === sourceElementRef.current) {
        return;
      }

      if (middle >= 0 && currentTarget !== sourceElementRef.current?.previousElementSibling) {
        currentTarget.classList.remove(styles.top);
        currentTarget.classList.add(styles.bottom);
      }

      if (middle < 0 && currentTarget !== sourceElementRef.current?.nextElementSibling) {
        currentTarget.classList.add(styles.top);
        currentTarget.classList.remove(styles.bottom);
      }
    };

    const handleDragLeave = (event: DragEvent) => {
      const currentTarget = event.currentTarget as Element;

      setTimeout(() => {
        currentTarget.classList.remove(styles.top!);
        currentTarget.classList.remove(styles.bottom!);
      }, 100);
    };

    const handleDragDrop = (event: DragEvent) => {
      sourceElementRef.current = null;

      const currentTarget = event.currentTarget as Element;

      const rect = currentTarget.getBoundingClientRect();
      const middle = event.clientY - (rect.top + rect.height / 2);

      const { itemId } = JSON.parse(event.dataTransfer!.getData("application/gemtask"));

      if (
        currentTarget.classList.contains(styles.top!) ||
        currentTarget.classList.contains(styles.bottom!)
      ) {
        onDrop?.({
          sourceItemId: itemId as ItemId,
          targetItemId: data.itemId,
          targetItemOrder: data.itemOrder,
          aboveOrBelow: middle <= 0 ? "above" : "below",
        });
      }

      currentTarget.classList.remove(styles.top!);
      currentTarget.classList.remove(styles.bottom!);
    };

    elementRef.current?.setAttribute("draggable", "true");

    elementRef.current?.addEventListener("dragstart", handleDragStart);
    elementRef.current?.addEventListener("dragover", handleDragOver);
    elementRef.current?.addEventListener("dragleave", handleDragLeave);
    elementRef.current?.addEventListener("drop", handleDragDrop);

    const element = elementRef.current;

    return () => {
      element?.removeEventListener("dragstart", handleDragStart);
      element?.removeEventListener("dragover", handleDragOver);
      element?.removeEventListener("dragleave", handleDragLeave);
      element?.removeEventListener("drop", handleDragDrop);
    };
  }, [data, onDrop, sourceElementRef]);

  return elementRef;
};

export { useSortable };
