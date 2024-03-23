import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const DocumentTypeIcon = ({ documentType }: { documentType: string }) => {
  return (
    <div
      className={`py-1 flex items-center rounded ${
        documentType === "Cédula de Ciudadanía"
          ? "bg-green-100 text-green-900"
          : documentType === "Tarjeta de Identidad"
          ? "bg-yellow-100 text-yellow-900"
          : documentType === "Cédula de Extranjería"
          ? "bg-purple-100 text-purple-900"
          : ""
      }`}
    >
      <span className="px-2">{documentType}</span>
    </div>
  );
};

export default DocumentTypeIcon;
