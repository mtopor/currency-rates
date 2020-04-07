import React, { ChangeEvent } from 'react';

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
    <>
      <select onChange={onChange} className="form-control form-control-lg">
        {defaultOption && (
          <option value={defaultOption} key={0}>
            {defaultOption}
          </option>
        )}
        {options.map((option: string, index: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <option value={option} key={index + 1}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectComponent;
