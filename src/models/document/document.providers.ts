import { Document } from './document.entity';

export const documentsProviders = [
  {
    provide: 'DOCUMENTS_REPOSITORY',
    useValue: Document,
  },
];
