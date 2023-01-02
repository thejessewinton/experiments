import { Transition, Dialog as DialogPrimitive } from "@headlessui/react";
import { useDialogStore } from "client-data/state/use-dialog-store";
import { Fragment } from "react";

export const Dialog = () => {
  const { isOpen, onClose, dialogTitle, dialogContent } = useDialogStore();
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <DialogPrimitive as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm dark:bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPrimitive.Panel className="w-full max-w-2xl transform rounded bg-white p-6 text-left align-middle shadow-2xl shadow-black/50 transition-all dark:bg-neutral-900">
                <DialogPrimitive.Title as="h3" className="hidden">
                  {dialogTitle}
                </DialogPrimitive.Title>
                {dialogContent}
              </DialogPrimitive.Panel>
            </Transition.Child>
          </div>
        </div>
      </DialogPrimitive>
    </Transition>
  );
};
