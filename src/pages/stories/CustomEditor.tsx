import { forwardRef, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.core.css";
import "./custom-editor.css";

interface CustomEditorProps {
  value?: string;
  onChange?: (content: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  defaultValue?: string;
}

const CustomEditor = forwardRef<Quill, CustomEditorProps>(
  ({
    onChange,
    defaultValue,
    readOnly = false,
    placeholder = "Write something...",
  }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);
    const defaultValueRef = useRef(defaultValue);
    const [editorId] = useState(
      // eslint-disable-next-line react-hooks/purity
      `quill-editor-${Math.random().toString(36).substring(2, 9)}`
    );

    useEffect(() => {
      const destroyQuill = () => {
        if (quillRef.current) {
          quillRef.current = null;
        }
        document
          .querySelectorAll(".ql-toolbar")
          .forEach((toolbar) => toolbar.remove());
        if (editorRef.current) {
          editorRef.current.innerHTML = "";
          const editorElement = document.createElement("div");
          editorElement.id = editorId;
          editorRef.current.appendChild(editorElement);
          return editorElement;
        }
        return null;
      };

      const editorElement = destroyQuill();
      if (!editorElement) return;

      const modules = {
        toolbar: [
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }],
          [{ align: [] }],
        ],
      };

      const quill = new Quill(editorElement, {
        theme: "snow",
        modules,
        placeholder,
        readOnly,
      });
      quillRef.current = quill;

      quill.on("text-change", () => {
        if (onChange) {
          onChange(quill.root.innerHTML);
        }
      });

      if (defaultValueRef.current) {
        const value = defaultValueRef.current;
        const delta = quill.clipboard.convert({ html: value });
        quill.setContents(delta, "silent");
      }

      return () => {
        destroyQuill();
      };
    }, [placeholder, readOnly, editorId, onChange]);

    return <div ref={editorRef} className="custom-editor-container"></div>;
  }
);

export default CustomEditor;
