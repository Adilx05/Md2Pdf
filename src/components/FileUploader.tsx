import type { ChangeEvent, FC } from 'react';
import { useRef } from 'react';

type FileUploaderProps = {
  onFileSelect: (file: File) => void;
};

const FileUploader: FC<FileUploaderProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    onFileSelect(file);
    event.target.value = '';
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="file-uploader">
      Markdown yükle
      <button type="button" className="secondary-btn" onClick={handleButtonClick}>
        Dosya Seç
      </button>
      <input
        ref={fileInputRef}
        type="file"
        className="visually-hidden-file-input"
        accept=".md,.markdown,text/markdown,text/plain"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUploader;
