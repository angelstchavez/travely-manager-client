import React, { useState, useEffect } from "react";
import ErrorModal from "../modals/error-modal";
import Cookies from "js-cookie";
import ConfirmationModal from "../modals/confirmation-modal";

interface Brand {
  id: number;
  name: string;
}

function BrandTable(): JSX.Element {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [error, setError] = useState<string>("");
  const [brandToDelete, setBrandToDelete] = useState<Brand | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
        const cookieData: { data: { token?: string } } =
          JSON.parse(cookieValue);
        const token = cookieData.data.token;

        if (!token) {
          throw new Error("No se encontró el token en el cookie.");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/car-brand/get-all?page=${currentPage}&perPage=${itemsPerPage}`,
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

        const responseData = await response.json();

        if (!responseData.success || !responseData.data) {
          throw new Error("La respuesta no contiene datos válidos.");
        }

        setBrands(responseData.data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  const handleDeleteConfirmation = async () => {
    if (brandToDelete) {
      try {
        const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
        const cookieData: { data: { token?: string } } =
          JSON.parse(cookieValue);
        const token = cookieData.data.token;

        if (!token) {
          throw new Error("No se encontró el token en el cookie.");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/car-brand/delete?carBrandId=${brandToDelete.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (response.ok) {
          const updatedBrands = brands.filter(
            (brand) => brand.id !== brandToDelete.id
          );
          setBrands(updatedBrands);
        } else {
          throw new Error("Error al eliminar la marca de vehículo.");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setBrandToDelete(null);
      }
    }
  };

  const handleDeleteCancel = () => {
    setBrandToDelete(null);
  };

  const handleDelete = (brand: Brand) => {
    setBrandToDelete(brand);
  };

  const totalPages = Math.ceil(brands.length / itemsPerPage);

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
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Eliminar
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {brands.map((brand) => (
              <tr key={brand.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {brand.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(brand)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {brandToDelete && (
        <ConfirmationModal
          processText={`eliminar la marca de vehículo "${brandToDelete.name}"`}
          onAccept={handleDeleteConfirmation}
          onCancel={handleDeleteCancel}
          actionType="delete"
        />
      )}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`mx-2 px-4 py-2 rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
}

export default BrandTable;
