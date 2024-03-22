import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

function ColorIcon({ color }: { color: string }) {
  let iconColorClass = "";
  switch (color) {
    case "Rojo":
      iconColorClass = "text-red-500";
      break;
    case "Azul":
      iconColorClass = "text-blue-500";
      break;
    case "Verde":
      iconColorClass = "text-green-500";
      break;
    case "Amarillo":
      iconColorClass = "text-yellow-500";
      break;
    case "Blanco":
      iconColorClass = "text-zinc-300";
      break;
    case "Negro":
      iconColorClass = "text-black";
      break;
    case "Naranja":
      iconColorClass = "text-orange-500";
      break;
    case "Morado":
      iconColorClass = "text-purple-500";
      break;
    case "Café":
      iconColorClass = "text-brown-500";
      break;
    default:
      iconColorClass = "text-gray-500";
  }

  return (
    <div
      className={`pl-2 py-1 flex items-center rounded ${
        color === "Rojo"
          ? "bg-red-100"
          : color === "Azul"
          ? "bg-blue-100"
          : color === "Verde"
          ? "bg-green-100"
          : color === "Amarillo"
          ? "bg-yellow-100"
          : color === "Blanco"
          ? "bg-zinc-100"
          : color === "Negro"
          ? "bg-zinc-400"
          : color === "Naranja"
          ? "bg-orange-100"
          : color === "Morado"
          ? "bg-purple-100"
          : color === "Café"
          ? "bg-brown-100"
          : "bg-gray-100"
      }`}
    >
      <Icon
        icon="iconoir:fill-color-solid"
        className={`text-lg ${iconColorClass}`}
      />
      <span className="px-2">{color}</span>
    </div>
  );
}

export default ColorIcon;
