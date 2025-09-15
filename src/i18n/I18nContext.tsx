import type { ReactNode } from 'react';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { locales, defaultLocale } from './locales';
import type { Locale, TranslationKeys } from './locales';

interface I18nContextType {
  locale: Locale;
  t: (key: keyof TranslationKeys) => string;
  changeLocale: (code: string) => void;
  availableLocales: Locale[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  // 从本地存储获取上次选择的语言，否则使用默认语言
  const [currentLocale, setCurrentLocale] = useState<Locale>(() => {
    const savedLocale = localStorage.getItem('preferredLocale');
    return savedLocale && locales[savedLocale] 
      ? locales[savedLocale] 
      : locales[defaultLocale];
  });

  // 翻译函数
  const t = (key: keyof TranslationKeys): string => {
    return currentLocale.translations[key] || key;
  };

  // 切换语言
  const changeLocale = (code: string): void => {
    if (locales[code]) {
      setCurrentLocale(locales[code]);
      localStorage.setItem('preferredLocale', code);
    }
  };

  // 获取所有可用语言
  const availableLocales = Object.values(locales);

  // 添加 useEffect 钩子，当语言变化时更新页面标题
  useEffect(() => {
    document.title = currentLocale.translations.gameTitle;
  }, [currentLocale]);

  return (
    <I18nContext.Provider value={{ locale: currentLocale, t, changeLocale, availableLocales }}>
      {children}
    </I18nContext.Provider>
  );
};

// 自定义Hook，方便在组件中使用国际化功能
export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};