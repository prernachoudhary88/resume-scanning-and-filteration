import { GlobalWorkerOptions, version as pdfjsVersion } from 'pdfjs-dist';

// Using CDN version of the worker
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`;
