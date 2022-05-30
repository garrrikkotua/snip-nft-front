import { font_sizes } from "../../types/font_size";
import { DEFAULT_FONT_SIZE } from "../../types/font_size";

export const FontSizeSelector = ({ setFontSize }: any) => {
  return (
    <select
      className="select select-sm select-bordered min-w-[50px]"
      onChange={(e) => setFontSize(Number(e.target.value))}
    >
      <option disabled selected>
        Font Size
      </option>
      {font_sizes.map((current_font_size, index) =>
        current_font_size === DEFAULT_FONT_SIZE ? (
          <option key={index} selected={true}>
            {current_font_size}
          </option>
        ) : (
          <option key={index}>{current_font_size}</option>
        )
      )}
    </select>
  );
};
