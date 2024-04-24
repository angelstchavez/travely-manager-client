import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface CustomIconProps {
  icon: string;
  text: string;
}

const CustomTitleIcon: React.FC<CustomIconProps> = ({ icon, text }) => {
  return (
    <div className="px-2 font-semibold text-zinc-700 bg-zinc-200 rounded border inline-flex items-center">
      <Icon icon={icon} className="mr-2 h-5 w-5" />{" "}
      <h2 className="text-lg font-semibold">{text}</h2>
    </div>
  );
};

export default CustomTitleIcon;
