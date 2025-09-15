import React from 'react';
import { useI18n } from '../i18n/I18nContext';

const LanguageSelector: React.FC = () => {
  const { availableLocales, locale, changeLocale } = useI18n();

  return (
    <div className="language-selector">
      <select
        value={locale.code}
        onChange={(e) => changeLocale(e.target.value)}
        className="language-select"
      >
        {availableLocales.map((loc) => (
          <option key={loc.code} value={loc.code}>
            {loc.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;