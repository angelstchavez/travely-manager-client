import { SelectProps } from "@/types";
import React from "react";

const SelectComponent: React.FC<SelectProps> = ({
  label,
  options,
  ...Props
}) => {
  return (
    <>
      <label className="block text-sm font-medium text-gray-700  ">
        {label}
      </label>

      <select
        {...Props}
        className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-nonesm:text-sm rounded-mdml-1 relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        <option value="">Seleccione</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectComponent;
