import { type ChangeEvent, type FC, useRef } from 'react';

type ToolbarProps = {
  isExporting: boolean;
  canExport: boolean;
  onUpload: (file: File) => void;
  onClear: () => void;
  onCopyMarkdown: () => void;
  onExport: () => void;
};

const Toolbar: FC<ToolbarProps> = ({
  isExporting,
  canExport,
  onUpload,
  onClear,
  onCopyMarkdown,
  onExport,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    onUpload(file);
    event.target.value = '';
  };

  return (
    <header className="toolbar" aria-label="Editör araç çubuğu">
      <h1 className="toolbar-brand" aria-label="Md2Pdf">
        <img src="/Md2Pdf/logo.png" alt="Md2Pdf logo" className="toolbar-logo" />
      </h1>
      <div className="toolbar-actions">
        <button type="button" className="secondary-btn" onClick={handleButtonClick}>
          Upload .md
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="visually-hidden-file-input"
          accept=".md,.markdown,text/markdown,text/plain"
          onChange={handleFileChange}
        />

        <button type="button" onClick={onClear} className="secondary-btn">
          Clear
        </button>
        <button type="button" onClick={onCopyMarkdown} className="secondary-btn">
          Copy Markdown
        </button>
        <button
          type="button"
          onClick={onExport}
          className="primary-btn"
          disabled={isExporting || !canExport}
        >
          {isExporting ? 'Generating PDF...' : 'Download PDF'}
        </button>
      </div>
    </header>
  );
};

export default Toolbar;
