import { useEffect, useMemo, useState } from 'react';
import FileUploader from './components/FileUploader';
import MarkdownEditor from './components/MarkdownEditor';
import MarkdownPreview from './components/MarkdownPreview';
import Toolbar from './components/Toolbar';
import './styles/app.css';

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
    setIsExporting(true);

    await new Promise((resolve) => {
      setTimeout(resolve, 1200);
    });

    setIsExporting(false);
    setFeedbackMessage('PDF dışa aktarma akışı hazırlandı (demo).');
  };

  const handleReset = () => {
    setMarkdown(SAMPLE_MARKDOWN);
    setFeedbackMessage('Editör örnek içerikle sıfırlandı.');
  };

  return (
    <main className="app-shell">
      <Toolbar isExporting={isExporting} onExport={handleExport} onReset={handleReset} />

      <section className="meta-row">
        <FileUploader onFileContent={setMarkdown} onFeedback={setFeedbackMessage} />
        <p>{wordCount} kelime</p>
      </section>

      {feedbackMessage && (
        <p className="toast" role="status" aria-live="polite">
          {feedbackMessage}
        </p>
      )}

      <section className="content-grid">
        <MarkdownEditor value={markdown} onChange={setMarkdown} />
        <MarkdownPreview markdown={markdown} />
      </section>
    </main>
  );
}

export default App;
