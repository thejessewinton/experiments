import type { JSONContent, PureEditorContent } from "@tiptap/react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";
import type { Ref } from "react";
import { forwardRef } from "react";

interface MarkdownEditorProps {
  defaultValue?: string;
  placeholder?: string;
  onChange?: (v: JSONContent) => void;
}

export const MarkdownEditor = forwardRef(
  (
    {
      defaultValue,
      placeholder = "Enter text...",
      onChange,
      ...rest
    }: MarkdownEditorProps,
    ref: Ref<PureEditorContent>
  ) => {
    const editor = useEditor({
      extensions: [
        StarterKit,
        Highlight,
        Typography,
        Placeholder.configure({
          emptyEditorClass: "is-empty",
          placeholder: () => {
            return placeholder;
          },
        }),
      ],
      content: defaultValue,
      autofocus: "start",
      editorProps: {
        attributes: {
          class:
            "bg-neutral-900 h-full w-full grow prose prose-dark font-light text-neutral-500 focus:outline-none",
        },
      },
      onUpdate: ({ editor }) => {
        const content = editor.getJSON();
        if (onChange) {
          onChange(content);
        }
      },
    });

    return (
      <EditorContent
        {...rest}
        ref={ref}
        editor={editor}
        className="h-fit w-full resize-none bg-transparent py-2 px-3 text-sm text-neutral-500 outline-none transition-all placeholder:text-neutral-500 focus:outline-none"
      />
    );
  }
);

MarkdownEditor.displayName = "MarkdownEditor";
