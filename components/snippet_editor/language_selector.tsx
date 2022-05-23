import { Language, language, language_hljs } from "../../types/language";

const DEFAULT_SELECTED_LANG = "Python";

export const LanguageSelector = ({ setLang }: any) => {
  return (
    <select
      className="select select-sm justify-self-center self-center select-bordered w-full max-w-xs"
      onChange={(e) =>
        setLang(language_hljs[language.indexOf(e.target.value as Language)])
      }
    >
      <option disabled selected>
        Language
      </option>
      {language.map((current_lang, index) =>
        current_lang === DEFAULT_SELECTED_LANG ? (
          <option key={index} selected={true}>
            {current_lang}
          </option>
        ) : (
          <option key={index}>{current_lang}</option>
        )
      )}
    </select>
  );
};
