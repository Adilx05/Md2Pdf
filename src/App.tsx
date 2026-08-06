import { useEffect, useMemo, useRef, useState } from 'react';
import MarkdownEditor from './components/MarkdownEditor';
import MarkdownPreview from './components/MarkdownPreview';
import Toolbar from './components/Toolbar';
import './styles/app.css';
import { readMarkdownFile } from './utils/file';
import { exportPreviewToPdf } from './utils/pdf';

const SAMPLE_MARKDOWN = `# Welcome to Md2Pdf 👋

Write **Markdown** in the editor and watch the live preview on the right. When you're happy with the result, export it as a beautifully styled PDF — right in your browser.

## Quick Start

- Type Markdown in the left panel, or drag & drop a \`.md\` file anywhere on the page.
- Use the **Download PDF** button in the toolbar when you're ready.
- Everything runs locally, nothing is sent to a server.

### Tip

\`\`\`markdown
# A Title
A paragraph with **bold**, *italic* and \`inline code\` support.
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
      const message = error instanceof Error ? error.message : 'Could not export the PDF. Please try again.';
      setFeedbackMessage({ text: message, type: 'error' });
    } finally {
      setIsExporting(false);
    }
  };

  const handleClear = () => {
    setMarkdown('');
    setFeedbackMessage({ text: 'Markdown cleared.', type: 'info' });
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
      setFeedbackMessage({ text: `${file.name} loaded.`, type: 'success' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not read the file. Please try again.';
      setFeedbackMessage({ text: message, type: 'error' });
    }
  };

  return (
    <main className="app">
      <Toolbar
        isExporting={isExporting}
        canExport={Boolean(markdown.trim())}
        onUpload={handleMarkdownFile}
        onClear={handleClear}
        onCopyMarkdown={handleCopyMarkdown}
        onExport={handleExport}
      />

      <section className="workspace">
        <MarkdownEditor
          value={markdown}
          onChange={setMarkdown}
          onFileSelect={handleMarkdownFile}
          wordCount={wordCount}
        />
        <MarkdownPreview markdown={markdown} previewRef={previewRef} />
      </section>

      {feedbackMessage && (
        <div className={`toast toast--${feedbackMessage.type}`} role="status" aria-live="polite">
          {feedbackMessage.text}
        </div>
      )}

      <footer className="app-foot">
        <span>Runs entirely in your browser</span>
        <i className="app-foot__dot" aria-hidden="true" />
        <span>Your content never leaves your device</span>
      </footer>
    </main>
  );
}

export default App;
