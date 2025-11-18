export type Language = 'en' | 'bn-bd' | 'bn' | 'hi';

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'bn-bd', name: 'Banglish', flag: '🇧🇩' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
];

export const defaultLanguage: Language = 'en';
