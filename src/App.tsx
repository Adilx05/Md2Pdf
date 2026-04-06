import { useEffect, useMemo, useRef, useState } from 'react';
import MarkdownEditor from './components/MarkdownEditor';
import MarkdownPreview from './components/MarkdownPreview';
import Toolbar from './components/Toolbar';
import './styles/app.css';
import { readMarkdownFile } from './utils/file';
import { exportPreviewToPdf } from './utils/pdf';

const SAMPLE_MARKDOWN = `# Md2Pdf'e hoş geldin 👋

Bu editör ile **Markdown** metni yazabilir, anlık önizlemesini sağ tarafta görebilirsin.

## Hızlı Başlangıç

- Sol panelde markdown yaz.
- Üst araç çubuğundan .md dosyası yükle.
- Hazır olduğunda PDF olarak dışa aktar.

### İpucu

\`\`\`markdown
# Başlık
Paragraf, **kalın**, *italik* ve \`inline code\` desteği var.
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
      setFeedbackMessage({ text: 'PDF başarıyla dışa aktarıldı.', type: 'success' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'PDF dışa aktarılamadı. Lütfen tekrar deneyin.';
      setFeedbackMessage({ text: message, type: 'error' });
    } finally {
      setIsExporting(false);
    }
  };

  const handleClear = () => {
    setMarkdown('');
    setFeedbackMessage({ text: 'Markdown içeriği temizlendi.', type: 'info' });
  };

  const handleCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setFeedbackMessage({ text: 'Markdown panoya kopyalandı.', type: 'success' });
    } catch {
      setFeedbackMessage({ text: 'Kopyalama başarısız oldu. Lütfen tekrar deneyin.', type: 'error' });
    }
  };

  const handleMarkdownFile = async (file: File) => {
    try {
      const content = await readMarkdownFile(file);
      setMarkdown(content);
      setFeedbackMessage({ text: `${file.name} yüklendi.`, type: 'success' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Dosya okunamadı. Lütfen tekrar deneyin.';
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
        <p>{wordCount} kelime</p>
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
        made by <a href="https://github.com/Adilx05" target="_blank" rel="noreferrer">QWRpbA==</a> with ❤️
      </footer>
    </main>
  );
}

export default App;
