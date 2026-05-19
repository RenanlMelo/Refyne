"use client";

import MDEditor, { commands } from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

interface SimpleMDEditorProps {
  value: string;
  onChange: (val?: string) => void;
  placeholder?: string;
}

export default function SimpleMDEditor({ value, onChange, placeholder }: SimpleMDEditorProps) {
  return (
    <MDEditor
      value={value}
      onChange={onChange}
      height={200}
      preview="edit"
      data-color-mode="dark"
      textareaProps={{
        placeholder: placeholder,
      }}
      commands={[
        commands.bold,
        commands.italic,
        commands.divider,
        commands.unorderedListCommand,
        commands.orderedListCommand,
      ]}
      extraCommands={[]}
    />
  );
}
