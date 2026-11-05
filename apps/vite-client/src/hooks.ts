import { useLayoutEffect, useRef } from "react";

import type { ItemId } from "./queries/types";

import styles from "./App.module.css";

type Draggable = {
  itemId: ItemId;
};

type Droppable = {
  itemId: ItemId;
};

type Sortable = Draggable & Droppable;

type OnDrop = {
  sourceItemId: ItemId;
  aboveOrBelow: "above" | "below";
};

const useSortable = (
  data: Sortable,
  sourceElementRef: React.RefObject<HTMLElement | null>,
  onDrop: (data: OnDrop) => void,
) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const cloneRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const handleDragStart = (event: DragEvent) => {
      const currentTarget = event.currentTarget as HTMLElement;

      if (event.dataTransfer) {
        event.dataTransfer.setData("application/json", JSON.stringify(data));

        const canvas = document.createElement("canvas");
        canvas.width = 1;
        canvas.height = 1;
        document.body.appendChild(canvas);

        cloneRef.current = currentTarget.cloneNode(true) as HTMLElement;
        cloneRef.current.style.position = "absolute";
        cloneRef.current.style.left = `${event.clientX + 5}px`;
        cloneRef.current.style.top = `${event.clientY + 15}px`;
        cloneRef.current.style.width = "500px";
        cloneRef.current.style.border = "1px solid var(--divider-color)";
        cloneRef.current.style.zIndex = "1000";
        cloneRef.current.style.pointerEvents = "none";
        document.body.appendChild(cloneRef.current);

        event.dataTransfer.setDragImage(canvas, 0, 0);
        event.dataTransfer.effectAllowed = "move";
      }

      sourceElementRef.current = currentTarget;

      document.body.classList.add("is-dragging");
    };

    const handleDrag = (event: DragEvent) => {
      if (cloneRef.current) {
        cloneRef.current.style.left = `${event.clientX + 5}px`;
        cloneRef.current.style.top = `${event.clientY + 15}px`;
      }
    };

    const handleDragOver = (event: DragEvent) => {
      const currentTarget = event.currentTarget as Element;

      event.preventDefault();

      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "move";
      }

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
        currentTarget.classList.remove(styles.top);
        currentTarget.classList.remove(styles.bottom);
      }, 20);
    };

    const handleDragDrop = (event: DragEvent) => {
      event.preventDefault();

      sourceElementRef.current = null;

      const currentTarget = event.currentTarget as Element;

      const rect = currentTarget.getBoundingClientRect();
      const middle = event.clientY - (rect.top + rect.height / 2);

      const { itemId } = JSON.parse(event.dataTransfer!.getData("application/json"));

      if (
        currentTarget.classList.contains(styles.top!) ||
        currentTarget.classList.contains(styles.bottom!)
      ) {
        onDrop?.({
          sourceItemId: itemId as ItemId,
          aboveOrBelow: middle <= 0 ? "above" : "below",
        });
      }

      currentTarget.classList.remove(styles.top);
      currentTarget.classList.remove(styles.bottom!);
    };

    const handleDragEnd = () => {
      document.body.classList.remove("is-dragging");

      cloneRef.current?.remove();
    };

    elementRef.current?.setAttribute("draggable", "true");

    elementRef.current?.addEventListener("drag", handleDrag);
    elementRef.current?.addEventListener("dragstart", handleDragStart);
    elementRef.current?.addEventListener("dragover", handleDragOver);
    elementRef.current?.addEventListener("dragleave", handleDragLeave);
    elementRef.current?.addEventListener("dragend", handleDragEnd);
    elementRef.current?.addEventListener("drop", handleDragDrop);

    const element = elementRef.current;

    return () => {
      element?.removeEventListener("drag", handleDrag);
      element?.removeEventListener("dragstart", handleDragStart);
      element?.removeEventListener("dragover", handleDragOver);
      element?.removeEventListener("dragleave", handleDragLeave);
      element?.removeEventListener("dragend", handleDragEnd);
      element?.removeEventListener("drop", handleDragDrop);
    };
  }, [data, onDrop, sourceElementRef]);

  return elementRef;
};

export { useSortable };
