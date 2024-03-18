import React, { useState, useEffect } from "react";
import ErrorModal from "../modals/error-modal";
import Cookies from "js-cookie";

interface Brand {
  id: number;
  name: string;
  // Agrega más propiedades según tus datos
}

function BrandTable(): JSX.Element {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        // Obtener el valor del cookie y decodificarlo
        const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");

        // Convertir el valor del cookie a objeto JSON
        const cookieData: { data: { token?: string } } =
          JSON.parse(cookieValue);

        // Obtener el token del objeto JSON
        const token = cookieData.data.token;

        if (!token) {
          throw new Error("No se encontró el token en el cookie.");
        }

        const response = await fetch(
          "http://localhost:5000/api/v1/car-brand/get-all",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener las marcas de vehículos.");
        }

        const data: Brand[] = await response.json();
        setBrands(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="border rounded p-4 my-4 bg-white">
      <h2 className="text-lg font-semibold">Lista de Marcas de Vehículos</h2>
      {error && <ErrorModal errorDescription={error} />}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nombre
              </th>
              {/* Agrega más columnas según tus datos */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {brands.map((brand) => (
              <tr key={brand.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {brand.name}
                </td>
                {/* Agrega más celdas según tus datos */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default BrandTable;
