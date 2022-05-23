import { CodeStyles, code_styles } from "../../types/code_styles";
const DEDAULT_SELECTED_CODE_STYLE = "vs";

export const StyleSelector = ({ setCodeStyle }: any) => {
  return (
    <select
      className="select select-sm select-bordered min-w-[50px]"
      onChange={(e) => setCodeStyle(e.target.value)}
    >
      <option disabled selected>
        Style
      </option>
      {code_styles.map((current_code_style, index) =>
        current_code_style === DEDAULT_SELECTED_CODE_STYLE ? (
          <option key={index} selected={true}>
            {current_code_style}
          </option>
        ) : (
          <option key={index}>{current_code_style}</option>
        )
      )}
    </select>
  );
};
