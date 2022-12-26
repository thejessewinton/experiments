import create from "zustand";

interface DialogState {
  isOpen: boolean;
  onClose: () => void;
  dialogContent: React.ReactNode;
  dialogTitle: string | null;
  handleDialog: ({
    content,
    title,
  }: {
    content: React.ReactNode;
    title: string;
  }) => void;
  handleDialogClose: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  onClose: () => set(() => ({ isOpen: false })),
  dialogContent: null,
  dialogTitle: null,
  handleDialog: ({ content, title }) =>
    set({ dialogContent: content, dialogTitle: title, isOpen: true }),
  handleDialogClose: () => set({ isOpen: false }),
}));
