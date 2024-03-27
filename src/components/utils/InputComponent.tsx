import { InputProps } from "@/types";
import React from "react";

const InputComponent: React.FC<InputProps> = ({ label, ...Props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700  ">
        {label}
      </label>
      <input
        className="w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        {...Props}
      />
    </div>
  );
};

export default InputComponent;
