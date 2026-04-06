import type { ChangeEvent, FC } from 'react';

type FileUploaderProps = {
  onFileContent: (content: string) => void;
  onFeedback: (message: string) => void;
};

const FileUploader: FC<FileUploaderProps> = ({ onFileContent, onFeedback }) => {
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.name.endsWith('.md') && file.type !== 'text/markdown') {
      onFeedback('Lütfen .md uzantılı bir dosya seçin.');
      event.target.value = '';
      return;
    }

    try {
      const text = await file.text();
      onFileContent(text);
      onFeedback(`${file.name} yüklendi.`);
    } catch {
      onFeedback('Dosya okunamadı. Lütfen tekrar deneyin.');
    } finally {
      event.target.value = '';
    }
  };

  return (
    <label className="file-uploader">
      Markdown yükle
      <input type="file" accept=".md,text/markdown" onChange={handleFileChange} />
    </label>
  );
};

export default FileUploader;
