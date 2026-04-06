import { useEffect, useMemo, useState } from 'react';
import MarkdownEditor from './components/MarkdownEditor';
import MarkdownPreview from './components/MarkdownPreview';
import Toolbar from './components/Toolbar';
import './styles/app.css';
import { readMarkdownFile } from './utils/file';

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
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    setMarkdown(SAMPLE_MARKDOWN);
  }, []);

  useEffect(() => {
    if (!feedbackMessage) {
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

    setIsExporting(true);

    await new Promise((resolve) => {
      setTimeout(resolve, 1200);
    });

    setIsExporting(false);
    setFeedbackMessage('PDF dışa aktarma akışı hazırlandı (demo).');
  };

  const handleClear = () => {
    setMarkdown('');
    setFeedbackMessage('Markdown içeriği temizlendi.');
  };

  const handleCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setFeedbackMessage('Markdown panoya kopyalandı.');
    } catch {
      setFeedbackMessage('Kopyalama başarısız oldu. Lütfen tekrar deneyin.');
    }
  };

  const handleMarkdownFile = async (file: File) => {
    try {
      const content = await readMarkdownFile(file);
      setMarkdown(content);
      setFeedbackMessage(`${file.name} yüklendi.`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Dosya okunamadı. Lütfen tekrar deneyin.';
      setFeedbackMessage(message);
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
        <p className="toast" role="status" aria-live="polite">
          {feedbackMessage}
        </p>
      )}

      <section className="content-grid">
        <MarkdownEditor value={markdown} onChange={setMarkdown} onFileSelect={handleMarkdownFile} />
        <MarkdownPreview markdown={markdown} />
      </section>
    </main>
  );
}

export default App;
