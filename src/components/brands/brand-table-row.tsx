// BrandTableRow.tsx
import React from "react";

interface Brand {
  id: number;
  name: string;
}

interface BrandTableRowProps {
  brand: Brand;
  onDelete: (brand: Brand) => void;
}

const BrandTableRow: React.FC<BrandTableRowProps> = ({ brand, onDelete }) => {
  return (
    <tr className="hover:bg-gray-100">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {brand.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          className="text-red-600 hover:text-red-900"
          onClick={() => onDelete(brand)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default BrandTableRow;
