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
    <div className="bg-tm20 text-zinc-200 p-4 rounded-xl">
      <div className="flex items-center justify-between">
        <div>{title}</div>
        <div className="text-2xl text-tm60">{icon}</div>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-white">{cantidad}</h1>
      </div>
    </div>
  );
};

export default BoxStat;
