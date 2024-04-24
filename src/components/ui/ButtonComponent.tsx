import { ButtonProps } from "@/types";
import React from "react";

const ButtonComponent: React.FC<ButtonProps> = ({ children, ...Props }) => {
  return (
    <button
      className="relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-white bg-tm20"
      {...Props}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
