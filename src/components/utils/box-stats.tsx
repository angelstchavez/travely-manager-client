"use client";
import { ReactNode } from "react";
import { Icon } from "@iconify/react";

interface Props {
  cantidad: number | null;
  icon: ReactNode;
  title: ReactNode; 
}

const BoxStat = ({ cantidad, icon, title }: Props) => {
  return (
    <div className="bg-white p-8 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div>{title}</div>
        <div className="text-2xl">{icon}</div>
      </div>
      <div>
        <h1 className="text-4xl text-black font-bold">{cantidad}</h1>
      </div>
    </div>
  );
};

export default BoxStat;
