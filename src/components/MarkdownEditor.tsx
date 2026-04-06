import type { ChangeEvent, DragEvent, FC } from 'react';
import { useState } from 'react';

type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
  onFileSelect: (file: File) => void;
};

const MarkdownEditor: FC<MarkdownEditorProps> = ({ value, onChange, onFileSelect }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  const handleDragOver = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    if (!isDragOver) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    setIsDragOver(false);

    const droppedFile = event.dataTransfer.files?.[0];
    if (!droppedFile) {
      return;
    }

    onFileSelect(droppedFile);
  };

  return (
    <section
      className={`panel editor-panel ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h2>Editor</h2>
      <p className="editor-drop-hint">Tip: Drag and drop a Markdown file here.</p>
      <textarea
        aria-label="Markdown editor"
        value={value}
        onChange={handleChange}
        placeholder="Write your Markdown content here..."
      />
    </section>
  );
};

export default MarkdownEditor;
