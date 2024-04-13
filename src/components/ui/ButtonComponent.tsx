import { ButtonProps } from "@/types";
import React from "react";

const ButtonComponent: React.FC<ButtonProps> = ({ children, ...Props }) => {
  return (
    <button
      className="ml-1 relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      {...Props}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
