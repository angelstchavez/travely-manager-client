import React, { useState, useEffect } from "react";
import ErrorModal from "../modals/error-modal";
import ConfirmationModal from "../modals/confirmation-modal";
import Cookies from "js-cookie";
import DataTable, { TableColumn } from "react-data-table-component";
import Loading from "../utils/loading";

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
  const [filteredCarModels, setFilteredCarModels] = useState<CarModel[]>([]);
  const [error, setError] = useState<string>("");
  const [carModelToDelete, setCarModelToDelete] = useState<CarModel | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

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
        setFilteredCarModels(responseData.data); // Inicialmente, mostrar todos los modelos de vehículos
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
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
          setSearchTerm(""); // Limpiar el término de búsqueda
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

  const totalPages = Math.ceil(filteredCarModels.length / itemsPerPage);

  const columns: TableColumn<CarModel>[] = [
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Categoría",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Marca",
      selector: (row) => row.carBrand.name,
      sortable: true,
    },
    {
      name: "Gasolina",
      selector: (row) => row.fuelType,
      sortable: true,
    },
    {
      name: "Asientos",
      selector: (row) => row.seatingCapacity,
      sortable: true,
    },
    {
      name: "Transmisión",
      selector: (row) => row.transmissionType,
      sortable: true,
    },
    {
      name: "Eliminar",
      cell: (row) => (
        <button onClick={() => handleDelete(row)}>Eliminar</button>
      ),
    },
  ];

  useEffect(() => {
    const filtered = carModels.filter((carModel) =>
      carModel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCarModels(filtered);
  }, [carModels, searchTerm]);

  return (
    <section className="border rounded p-4 my-4 bg-white grid grid-col-1">
      <h2 className="text-lg font-semibold">Lista de Modelos de Vehículos</h2>
      {error && <ErrorModal errorDescription={error} />}
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      />
      <DataTable
        columns={columns}
        data={filteredCarModels}
        pagination
        paginationPerPage={itemsPerPage}
        paginationTotalRows={carModels.length}
        onChangePage={(page) => setCurrentPage(page)}
        progressPending={loading}
        progressComponent={<Loading />}
      />
      {carModelToDelete && (
        <ConfirmationModal
          processText={`eliminar el modelo de vehículo "${carModelToDelete.name}"`}
          onAccept={handleDeleteConfirmation}
          onCancel={handleDeleteCancel}
          actionType="delete"
        />
      )}
    </section>
  );
};

export default CarModelList;
