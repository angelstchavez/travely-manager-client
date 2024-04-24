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
    <div className="bg-zinc-200 text-zinc-700 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div>{title}</div>
        <div className="text-2xl text-zinc-700">{icon}</div>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-zinc-700">{cantidad}</h1>
      </div>
    </div>
  );
};

export default BoxStat;
