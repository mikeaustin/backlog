import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { XIcon } from "lucide-react";

// import { type Delegate } from "../../types/Delegate";
// import { Button, Text, View } from "..";
import { Button, Text, View, type Delegate } from "onyx-ui";

import styles from "./Modal.module.css";

function Modal({
  title,
  children,
  actions,
  onRequestClose,
  ...props
}: Delegate<
  {
    title?: React.ReactNode;
    actions?: React.ReactElement<{ onClick: () => void }>[];
    onRequestClose?: () => void;
  },
  typeof View<"div">
>) {
  const overlayElementRef = useRef<HTMLDivElement>(null);
  const modalElementRef = useRef<HTMLDivElement>(null);

  const handleCloseButtonClick = () => {
    if (overlayElementRef.current && modalElementRef.current) {
      overlayElementRef.current.classList.add(styles.close as string);
      modalElementRef.current.classList.add(styles.close as string);
    }
  };

  const handleAnimationEnd = (event: React.AnimationEvent) => {
    if (event.animationName === styles.slideOut) {
      onRequestClose?.();
    }
  };

  const handleDocumentKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleCloseButtonClick();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleDocumentKeyDown);

    return () => {
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  });

  const titleElement = typeof title !== "string" ? title : <Text fontSize="24px">{title}</Text>;

  const overlayElement = document.querySelector("#overlay");

  const modalContent = (
    <View absolute align="top center" style={{ inset: 0 }}>
      <View absolute ref={overlayElementRef} className={styles.Overlay} />
      <View
        ref={modalElementRef}
        fillColor="gutter"
        className={styles.Modal}
        onAnimationEnd={handleAnimationEnd}
        style={{ minHeight: 0 }}
        {...props}
      >
        <View
          horizontal
          align="middle justify"
          border="bottom"
          padding="12px 16px"
          spacing="16px"
          fillColor="content"
        >
          {titleElement}
          <Button solid bleed icon={XIcon} cornerRadius="max" onClick={handleCloseButtonClick} />
        </View>
        <View style={{ minHeight: 0 }}>{children}</View>
        {actions && (
          <View horizontal padding="12px 16px" align="middle center" fillColor="panel" border="top">
            {actions?.map((action, index) =>
              React.cloneElement(action, {
                key: index,
                onClick: () => (action.props.onClick(), handleCloseButtonClick()),
              }),
            )}
          </View>
        )}
      </View>
    </View>
  );

  if (overlayElement) {
    return createPortal(modalContent, overlayElement);
  }
}

export default Modal;
