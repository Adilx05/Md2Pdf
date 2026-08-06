import type { FC, RefObject } from 'react';
import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { parseFrontmatter } from '../utils/frontmatter';

type MarkdownPreviewProps = {
  markdown: string;
  previewRef: RefObject<HTMLElement>;
};

const EmptyGlyph: FC = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6M9 17h4" />
  </svg>
);

const MarkdownPreview: FC<MarkdownPreviewProps> = ({ markdown, previewRef }) => {
  const { data, content } = useMemo(() => parseFrontmatter(markdown), [markdown]);
  const hasContent = content.trim().length > 0;

  const metaLabel = useMemo(() => {
    const keys = Object.keys(data);
    if (keys.length === 0) {
      return null;
    }

    const shown = keys.slice(0, 4).join(' · ');
    return keys.length > 4 ? `${shown} …` : shown;
  }, [data]);

  return (
    <section className="panel panel--preview">
      <header className="panel__head">
        <h2 className="panel__title">Preview</h2>
        <div className="panel__tags">
          {metaLabel && <span className="panel__tag panel__tag--meta" title="Frontmatter settings">{metaLabel}</span>}
          <span className="panel__tag panel__tag--live">
            <i className="live-dot" aria-hidden="true" />
            live
          </span>
        </div>
      </header>

      <div className="sheet">
        {hasContent ? (
          <article
            ref={previewRef}
            className="sheet__body preview-content"
            aria-label="Markdown preview"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </article>
        ) : (
          <div className="preview-empty" role="status" aria-live="polite">
            <div className="preview-empty__glyph">
              <EmptyGlyph />
            </div>
            <p>
              <strong>Start typing.</strong>
              <br />
              Your preview will appear here, like a sheet of paper ready for print.
            </p>
            <small>markdown → pdf</small>
          </div>
        )}
      </div>
    </section>
  );
};

export default MarkdownPreview;
