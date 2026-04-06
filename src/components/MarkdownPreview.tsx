import type { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type MarkdownPreviewProps = {
  markdown: string;
};

const MarkdownPreview: FC<MarkdownPreviewProps> = ({ markdown }) => {
  const hasContent = markdown.trim().length > 0;

  return (
    <section className="panel preview-panel">
      <h2>Canlı Önizleme</h2>

      {hasContent ? (
        <article className="preview-content" aria-label="Markdown preview">
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
