import { en } from './en';
import { banglish } from './banglish';
import { bn } from './bn';
import { hi } from './hi';
import { Language } from '@/lib/i18n';

export const translations: Record<Language, typeof en> = {
  en,
  'bn-bd': banglish,
  bn,
  hi,
};
