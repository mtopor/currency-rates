import React, { ChangeEvent } from "react";

interface Props {
  defaultOption?: string;
  options: string[];
  onChange(e: ChangeEvent<HTMLSelectElement>): void;
}

const SelectComponent: React.FC<Props> = ({
  onChange,
  defaultOption,
  options,
}) => {
  return (
    <select onChange={onChange}>
      {defaultOption && (
        <option value={defaultOption} key={0}>
          `${defaultOption}`
        </option>
      )}
      {options.map((option: string, index: number) => (
        <option value={option} key={index + 1}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectComponent;
