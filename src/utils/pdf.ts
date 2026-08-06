import type { RefObject } from 'react';

type Html2PdfOptions = {
  margin: [number, number, number, number];
  filename: string;
  image: { type: 'jpeg' | 'png'; quality: number };
  html2canvas: {
    scale: number;
    useCORS: boolean;
    scrollY: number;
    onclone: (documentClone: Document) => void;
  };
  jsPDF: { unit: 'mm'; format: 'a4'; orientation: 'portrait' | 'landscape' };
  pagebreak: { mode: Array<'css' | 'legacy' | 'avoid-all'>; avoid: string[] };
};

type Html2PdfInstance = {
  from: (source: HTMLElement) => Html2PdfInstance;
  set: (options: Html2PdfOptions) => Html2PdfInstance;
  save: () => Promise<void>;
};

type Html2PdfFactory = () => Html2PdfInstance;

const PDF_OPTIONS: Html2PdfOptions = {
  margin: [10, 10, 12, 10],
  filename: 'markdown-export.pdf',
  image: { type: 'jpeg', quality: 0.98 },
  html2canvas: {
    scale: 2,
    useCORS: true,
    scrollY: 0,
    onclone: (documentClone) => {
      const style = documentClone.createElement('style');
      style.textContent =
        '.preview-content, .preview-content * { animation: none !important; transition: none !important; }';
      documentClone.head.appendChild(style);

      documentClone.querySelectorAll('.preview-content').forEach((element) => {
        element.classList.add('pdf-export-source');

        let node = element as HTMLElement | null;
        while (node && node !== documentClone.body) {
          node.style.display = 'block';
          node.style.overflow = 'visible';
          node.style.height = 'auto';
          node.style.maxHeight = 'none';
          node.style.minHeight = '0';
          node.style.flex = 'none';
          node.style.alignSelf = 'start';
          node = node.parentElement;
        }
      });
    },
  },
  jsPDF: {
    unit: 'mm',
    format: 'a4',
    orientation: 'portrait',
  },
  pagebreak: {
    mode: ['css', 'legacy', 'avoid-all'],
    avoid: ['table', 'tr', 'pre', 'code', 'blockquote'],
  },
};

const getHtml2Pdf = () => {
  const html2pdf = window.html2pdf as Html2PdfFactory | undefined;

  if (!html2pdf) {
    throw new Error('PDF library failed to load. Please refresh and try again.');
  }

  return html2pdf;
};

export const exportPreviewToPdf = async (
  previewRef: RefObject<HTMLElement>,
  fileName = 'markdown-export.pdf',
) => {
  const sourceElement = previewRef.current;

  if (!sourceElement) {
    throw new Error('Preview area not found. Please try again.');
  }

  const html2pdf = getHtml2Pdf();

  sourceElement.classList.add('pdf-export-source');

  try {
    await html2pdf()
      .from(sourceElement)
      .set({
        ...PDF_OPTIONS,
        filename: fileName,
      })
      .save();
  } finally {
    sourceElement.classList.remove('pdf-export-source');
  }
};
