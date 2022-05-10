import React, { useCallback, useRef, useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { ColorPickerBaseProps } from "react-colorful/dist/types";

import useClickOutside from "../../hooks/useClickOutside";

interface PopoverPickerProps extends ColorPickerBaseProps<string> {
  disabled: boolean | undefined;
}

export const PopoverPicker = ({
  color,
  onChange,
  disabled = false,
}: PopoverPickerProps) => {
  const popover = useRef<HTMLDivElement>(null);
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  return (
    <div className="relative flex gap-2">
      <div
        className="w-[28px] h-[28px] min-w-[28px] min-h-[28px] rounded-[8px] border-[3] cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={() => toggle(true)}
      />
      <HexColorInput
        color={color}
        onChange={onChange}
        prefixed={true}
        alpha={true}
        className="w-[90px] min-w-[50px] text-center uppercase"
        disabled={disabled}
      />
      {isOpen && !disabled && (
        <div
          className="absolute left-0 rounded-[9px] top-[calc(100%+2px)] shadow-md z-50"
          ref={popover}
        >
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};
