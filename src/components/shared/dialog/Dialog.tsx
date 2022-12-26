import { Transition, Dialog as DialogPrimitive } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDialogStore } from "client-data/state/use-dialog-store";
import { Fragment } from "react";

export const Dialog = () => {
  const { isOpen, onClose, dialogTitle, dialogContent, handleDialogClose } =
    useDialogStore();
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
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
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
              <DialogPrimitive.Panel className="w-full max-w-md transform overflow-hidden rounded-md  bg-neutral-900 p-6 text-left align-middle shadow-lg shadow-black/50 transition-all">
                <div className="mb-6 flex justify-between">
                  <DialogPrimitive.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                  >
                    {dialogTitle}
                  </DialogPrimitive.Title>
                  <button
                    onClick={() => handleDialogClose()}
                    className="flex h-8 w-8 items-center justify-center rounded outline-none transition-colors focus:ring-1 focus:ring-sky-600/75 hover:dark:bg-neutral-800"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
                {dialogContent}
              </DialogPrimitive.Panel>
            </Transition.Child>
          </div>
        </div>
      </DialogPrimitive>
    </Transition>
  );
};
