import { useEffect, useMemo, useRef, useState } from 'react';
import MarkdownEditor from './components/MarkdownEditor';
import MarkdownPreview from './components/MarkdownPreview';
import Toolbar from './components/Toolbar';
import './styles/app.css';
import { readMarkdownFile } from './utils/file';
import { exportPreviewToPdf } from './utils/pdf';

const SAMPLE_MARKDOWN = `# Welcome to Md2Pdf 👋

With this editor, you can write **Markdown** and see its live preview on the right.

## Quick Start

- Write Markdown in the left panel.
- Upload a .md file from the top toolbar.
- Export your content as PDF when it is ready.

### Tip

\`\`\`markdown
# Heading
Paragraph with **bold**, *italic*, and \`inline code\` support.
\`\`\`
`;

function App() {
  const [markdown, setMarkdown] = useState<string>('');
  const [isExporting, setIsExporting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const previewRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMarkdown(SAMPLE_MARKDOWN);
  }, []);

  useEffect(() => {
    if (!feedbackMessage?.text) {
      return;
    }

    const timer = window.setTimeout(() => {
      setFeedbackMessage(null);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [feedbackMessage]);

  const wordCount = useMemo(() => {
    return markdown.trim() ? markdown.trim().split(/\s+/).length : 0;
  }, [markdown]);

  const handleExport = async () => {
    if (isExporting || !markdown.trim()) {
      return;
    }

    try {
      setIsExporting(true);
      await exportPreviewToPdf(previewRef);
      setFeedbackMessage({ text: 'PDF exported successfully.', type: 'success' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to export PDF. Please try again.';
      setFeedbackMessage({ text: message, type: 'error' });
    } finally {
      setIsExporting(false);
    }
  };

  const handleClear = () => {
    setMarkdown('');
    setFeedbackMessage({ text: 'Markdown content cleared.', type: 'info' });
  };

  const handleCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setFeedbackMessage({ text: 'Markdown copied to clipboard.', type: 'success' });
    } catch {
      setFeedbackMessage({ text: 'Copy failed. Please try again.', type: 'error' });
    }
  };

  const handleMarkdownFile = async (file: File) => {
    try {
      const content = await readMarkdownFile(file);
      setMarkdown(content);
      setFeedbackMessage({ text: `${file.name} uploaded.`, type: 'success' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to read file. Please try again.';
      setFeedbackMessage({ text: message, type: 'error' });
    }
  };

  return (
    <main className="app-shell">
      <Toolbar
        isExporting={isExporting}
        canExport={Boolean(markdown.trim())}
        onUpload={handleMarkdownFile}
        onClear={handleClear}
        onCopyMarkdown={handleCopyMarkdown}
        onExport={handleExport}
      />

      <section className="meta-row">
        <p>{wordCount} words</p>
      </section>

      {feedbackMessage && (
        <p className={`toast toast-${feedbackMessage.type}`} role="status" aria-live="polite">
          {feedbackMessage.text}
        </p>
      )}

      <section className="content-grid">
        <MarkdownEditor value={markdown} onChange={setMarkdown} onFileSelect={handleMarkdownFile} />
        <MarkdownPreview markdown={markdown} previewRef={previewRef} />
      </section>

      <footer className="app-footer">
        Made by <a href="https://github.com/Adilx05" target="_blank" rel="noreferrer">QWRpbA==</a> with ❤️
      </footer>
    </main>
  );
}

export default App;
