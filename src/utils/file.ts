const ALLOWED_EXTENSIONS = ['.md', '.markdown'] as const;
const ALLOWED_MIME_TYPES = ['text/markdown', 'text/plain'] as const;

const hasAllowedExtension = (fileName: string) => {
  const lowerFileName = fileName.toLowerCase();
  return ALLOWED_EXTENSIONS.some((extension) => lowerFileName.endsWith(extension));
};

const hasAllowedMimeType = (mimeType: string) => {
  if (!mimeType) {
    return false;
  }

  return ALLOWED_MIME_TYPES.includes(mimeType as (typeof ALLOWED_MIME_TYPES)[number]);
};

export const isMarkdownFile = (file: File) => {
  return hasAllowedExtension(file.name) || hasAllowedMimeType(file.type);
};

export const readMarkdownFile = async (file: File) => {
  if (!isMarkdownFile(file)) {
    throw new Error('Invalid file type. Please select .md/.markdown or text/markdown, text/plain.');
  }

  return file.text();
};
