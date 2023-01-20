import {
  Dialog as ExternalDialog,
  Portal,
  Transition,
} from '@headlessui/react';

import React, { Fragment } from 'react';

type DialogProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const DURATION = 300;

export const Dialog: React.FC<DialogProps> = ({ ...props }) => {
  return (
    <Portal>
      <Transition appear show={props.isOpen} as={Fragment}>
        <ExternalDialog as='div' onClose={props.onClose}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <ExternalDialog.Overlay
              className={'fixed inset-0 bg-black bg-opacity-50'}
            />
          </Transition.Child>

          <div className={'fixed inset-0 flex justify-center items-center'}>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div
                className={
                  'bg-zinc-900 p-6 flex flex-col rounded-lg min-w-[300px] min-h-[300px]'
                }
              >
                {props.children}
              </div>
            </Transition.Child>
          </div>
        </ExternalDialog>
      </Transition>
    </Portal>
  );
};
