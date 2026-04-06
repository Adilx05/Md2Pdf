import type { FC, RefObject } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type MarkdownPreviewProps = {
  markdown: string;
  previewRef: RefObject<HTMLElement>;
};

const MarkdownPreview: FC<MarkdownPreviewProps> = ({ markdown, previewRef }) => {
  const hasContent = markdown.trim().length > 0;

  return (
    <section className="panel preview-panel">
      <h2>Live Preview</h2>

      {hasContent ? (
        <article ref={previewRef} className="preview-content" aria-label="Markdown preview">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </article>
      ) : (
        <div className="preview-empty" role="status" aria-live="polite">
          Nothing to preview yet.
        </div>
      )}
    </section>
  );
};

export default MarkdownPreview;
