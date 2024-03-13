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
    <div className="bg-zinc-100 text-black p-4 rounded-xl">
      <div className="flex items-center justify-between mb-1">
        <div>{title}</div>
        <div className="text-2xl">{icon}</div>
      </div>
      <div>
        <h1 className="text-4xl font-bold">{cantidad}</h1>
      </div>
    </div>
  );
};

export default BoxStat;
