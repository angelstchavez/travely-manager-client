import { InputProps } from "@/types";
import React from "react";

const InputComponent: React.FC<InputProps> = ({ label, error, ...Props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700  ">
        {label}
      </label>
      <input
        className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
          error ? "border-red-500" : "border"
        } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
        {...Props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputComponent;
