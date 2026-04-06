import type { FC } from 'react';

type ToolbarProps = {
  isExporting: boolean;
  onExport: () => void;
  onReset: () => void;
};

const Toolbar: FC<ToolbarProps> = ({ isExporting, onExport, onReset }) => {
  return (
    <header className="toolbar" aria-label="Editör araç çubuğu">
      <h1>Md2Pdf</h1>
      <div className="toolbar-actions">
        <button type="button" onClick={onReset} className="secondary-btn">
          Sıfırla
        </button>
        <button
          type="button"
          onClick={onExport}
          className="primary-btn"
          disabled={isExporting}
        >
          {isExporting ? 'Dışa aktarılıyor...' : 'PDF Olarak Dışa Aktar'}
        </button>
      </div>
    </header>
  );
};

export default Toolbar;
