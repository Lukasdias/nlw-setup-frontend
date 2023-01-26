import {
  Dialog as ExternalDialog,
  Portal,
  Transition,
} from "@headlessui/react";
import { animated, config, easings, useTransition } from "@react-spring/web";

import React, { Fragment, memo } from "react";

type DialogProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export const Dialog: React.FC<DialogProps> = memo(({ ...props }) => {
  const transitions = useTransition(props.isOpen, {
    from: { opacity: 0, transform: "scale(0.9)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.9)" },
    config: {
      duration: 200,
      friction: 20,
    },
  });

  return (
    <Portal>
      <>
        {transitions(
          (style, item) =>
            item && (
              <>
                <ExternalDialog
                  static
                  open={props.isOpen}
                  onClose={props.onClose}
                  as={animated.div}
                >
                  <ExternalDialog.Overlay
                    className={"fixed inset-0 bg-black bg-opacity-50"}
                  />

                  <div
                    className={"fixed inset-0 flex items-center justify-center"}
                  >
                    <animated.div
                      style={style}
                      className={
                        "flex min-h-[300px] min-w-[420px] flex-col rounded-lg bg-zinc-900 p-6"
                      }
                    >
                      {props.children}
                    </animated.div>
                  </div>
                </ExternalDialog>
              </>
            )
        )}
      </>
    </Portal>
  );
});
