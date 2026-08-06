import type { ChangeEvent, DragEvent, FC } from 'react';
import { useState } from 'react';

type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
  onFileSelect: (file: File) => void;
  wordCount: number;
};

const MarkdownEditor: FC<MarkdownEditorProps> = ({ value, onChange, onFileSelect, wordCount }) => {
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
      className={`panel panel--editor ${isDragOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <header className="panel__head">
        <h2 className="panel__title">Editor</h2>
        <span className="panel__tag">markdown</span>
      </header>

      <div className="editor">
        <textarea
          className="editor__field"
          aria-label="Markdown editor"
          value={value}
          onChange={handleChange}
          placeholder="Write your Markdown here…"
          spellCheck={false}
        />
      </div>

      <footer className="editor__foot">
        <span className="editor__stat">{wordCount} words</span>
        <span className="editor__hint">Drag &amp; drop a .md file here</span>
      </footer>
    </section>
  );
};

export default MarkdownEditor;
