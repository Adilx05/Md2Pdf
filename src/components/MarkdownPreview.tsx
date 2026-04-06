import type { FC } from 'react';

type MarkdownPreviewProps = {
  markdown: string;
};

const escapeHtml = (text: string): string =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const renderMarkdown = (markdown: string): string => {
  const escaped = escapeHtml(markdown);
  const withHeadings = escaped
    .replace(/^###\s(.+)$/gm, '<h3>$1</h3>')
    .replace(/^##\s(.+)$/gm, '<h2>$1</h2>')
    .replace(/^#\s(.+)$/gm, '<h1>$1</h1>');

  const withStyles = withHeadings
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>');

  return withStyles
    .split(/\n{2,}/)
    .map((block) => {
      if (block.startsWith('<h1>') || block.startsWith('<h2>') || block.startsWith('<h3>')) {
        return block;
      }

      return `<p>${block.replace(/\n/g, '<br />')}</p>`;
    })
    .join('');
};

const MarkdownPreview: FC<MarkdownPreviewProps> = ({ markdown }) => {
  return (
    <section className="panel preview-panel">
      <h2>Canlı Önizleme</h2>
      <article
        className="preview-content"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
      />
    </section>
  );
};

export default MarkdownPreview;
