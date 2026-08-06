import { type ChangeEvent, type FC, useRef } from 'react';

type ToolbarProps = {
  isExporting: boolean;
  canExport: boolean;
  onUpload: (file: File) => void;
  onClear: () => void;
  onCopyMarkdown: () => void;
  onExport: () => void;
};

type IconProps = {
  className?: string;
};

const BrandMark: FC = () => (
  <svg className="topbar__mark" viewBox="0 0 40 40" aria-hidden="true">
    <rect x="3" y="3" width="34" height="34" rx="9" fill="#3E5B37" />
    <path
      d="M14 10h9l7 7v13a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2Z"
      fill="#F6F2E7"
    />
    <path d="M23 10v7h7" fill="none" stroke="#DE8325" strokeWidth="2" strokeLinejoin="round" />
    <path
      d="M14 24h10M14 28h7"
      stroke="#3E5B37"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const UploadIcon: FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const CopyIcon: FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const TrashIcon: FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const PrintIcon: FC<IconProps> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);

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
    <header className="topbar" aria-label="Toolbar">
      <div className="topbar__brand">
        <BrandMark />
        <div className="topbar__text">
          <span className="topbar__title">
            Md<span className="brand__mid">2</span>Pdf
          </span>
          <span className="topbar__sub">markdown → pdf</span>
        </div>
      </div>

      <div className="topbar__actions">
        <button type="button" className="btn" onClick={handleButtonClick}>
          <UploadIcon className="btn__ico" />
          Upload
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="visually-hidden"
          accept=".md,.markdown,text/markdown,text/plain"
          onChange={handleFileChange}
        />

        <button type="button" className="btn" onClick={onCopyMarkdown}>
          <CopyIcon className="btn__ico" />
          Copy
        </button>

        <button type="button" className="btn btn--quiet" onClick={onClear}>
          <TrashIcon className="btn__ico" />
          Clear
        </button>

        <button
          type="button"
          className="btn btn--primary"
          onClick={onExport}
          disabled={isExporting || !canExport}
        >
          {isExporting ? <span className="spinner" aria-hidden="true" /> : <PrintIcon className="btn__ico" />}
          {isExporting ? 'Preparing PDF…' : 'Download PDF'}
        </button>
      </div>
    </header>
  );
};

export default Toolbar;
