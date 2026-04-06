import type { ChangeEvent, FC } from 'react';

type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const MarkdownEditor: FC<MarkdownEditorProps> = ({ value, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <section className="panel editor-panel">
      <h2>Editör</h2>
      <textarea
        aria-label="Markdown editörü"
        value={value}
        onChange={handleChange}
        placeholder="Markdown içeriğinizi buraya yazın..."
      />
    </section>
  );
};

export default MarkdownEditor;
