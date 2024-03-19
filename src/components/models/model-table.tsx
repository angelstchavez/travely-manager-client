import React, { useState, useEffect } from "react";
import ErrorModal from "../modals/error-modal";
import ConfirmationModal from "../modals/confirmation-modal";
import Pagination from "../pagination";
import Cookies from "js-cookie";

interface CarModel {
  id: number;
  name: string;
  category: string;
  fuelType: string;
  seatingCapacity: number;
  transmissionType: string;
  carBrand: {
    id: number;
    name: string;
  };
}

const CarModelList: React.FC = () => {
  const [carModels, setCarModels] = useState<CarModel[]>([]);
  const [error, setError] = useState<string>("");
  const [carModelToDelete, setCarModelToDelete] = useState<CarModel | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
        const cookieData: { data: { token?: string } } =
          JSON.parse(cookieValue);
        const token = cookieData.data.token;

        if (!token) {
          throw new Error("No se encontró el token en el cookie.");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/car-model/get-all?page=${currentPage}&perPage=${itemsPerPage}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener los modelos de vehículos.");
        }

        const responseData = await response.json();

        if (!responseData.success || !responseData.data) {
          throw new Error("La respuesta no contiene datos válidos.");
        }

        setCarModels(responseData.data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  const handleDeleteConfirmation = async () => {
    if (carModelToDelete) {
      try {
        const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
        const cookieData: { data: { token?: string } } =
          JSON.parse(cookieValue);
        const token = cookieData.data.token;

        if (!token) {
          throw new Error("No se encontró el token en el cookie.");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/car-model/delete?carModelId=${carModelToDelete.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (response.ok) {
          const updatedCarModels = carModels.filter(
            (carModel) => carModel.id !== carModelToDelete.id
          );
          setCarModels(updatedCarModels);
        } else {
          throw new Error("Error al eliminar el modelo de vehículo.");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setCarModelToDelete(null);
      }
    }
  };

  const handleDeleteCancel = () => {
    setCarModelToDelete(null);
  };

  const handleDelete = (carModel: CarModel) => {
    setCarModelToDelete(carModel);
  };

  const totalPages = Math.ceil(carModels.length / itemsPerPage);

  return (
    <section className="border rounded p-4 my-4 bg-white">
      <h2 className="text-lg font-semibold">Lista de Modelos de Vehículos</h2>
      {error && <ErrorModal errorDescription={error} />}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="table-cell w-1/5 md:w-auto lg:w-1/5 text-left">Nombre</th>
              <th className="table-cell w-1/5 md:w-auto lg:w-1/5 text-left">Categoría</th>
              <th className="table-cell w-1/5 md:w-auto lg:w-1/5 text-left">Marca</th>
              <th className="table-cell w-1/5 md:w-auto lg:w-1/5 text-left">Gasolina</th>
              <th className="table-cell w-1/5 md:w-auto lg:w-1/5 text-left">Asientos</th>
              <th className="table-cell w-1/5 md:w-auto lg:w-1/5 text-left">
                Transmisión
              </th>
              <th className="w-1/6 md:w-auto lg:w-1/6">Eliminar</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {carModels.map((carModel) => (
              <tr key={carModel.id} className="hover:bg-gray-100">
                <td className="px-5 py-4 md:whitespace-nowrap text-sm font-medium text-gray-900 text-left">
                  {carModel.name}
                </td>
                <td className="px-5 py-4 md:whitespace-nowrap text-sm font-medium text-gray-900 text-left">
                  {carModel.category}
                </td>
                <td className="px-5 py-4 md:whitespace-nowrap text-sm font-medium text-gray-900 text-left">
                  {carModel.carBrand.name}
                </td>
                <td className="px-5 py-4 md:whitespace-nowrap text-sm font-medium text-gray-900 text-left">
                  {carModel.fuelType}
                </td>
                <td className="px-5 py-4 md:whitespace-nowrap text-sm font-medium text-gray-900 text-left">
                  {carModel.seatingCapacity}
                </td>
                <td className="px-5 py-4 md:whitespace-nowrap text-sm font-medium text-gray-900 text-left">
                  {carModel.transmissionType}
                </td>
                <td className="px-5 py-4 md:whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(carModel)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {carModelToDelete && (
        <ConfirmationModal
          processText={`eliminar el modelo de vehículo "${carModelToDelete.name}"`}
          onAccept={handleDeleteConfirmation}
          onCancel={handleDeleteCancel}
          actionType="delete"
        />
      )}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </section>
  );
};

export default CarModelList;
