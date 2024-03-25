import React, { useState, useEffect } from "react";
import ErrorModal from "../modals/error-modal";
import ConfirmationModal from "../modals/confirmation-modal";
import Cookies from "js-cookie";
import DataTable, { TableColumn } from "react-data-table-component";
import Loading from "../utils/loading";
import CarModelUpdateModal from "./model-update";
import { Icon } from "@iconify/react/dist/iconify.js";
import SuccessModal from "../modals/success-modal";

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
  carBrandId: number; 
}

const CarModelList: React.FC = () => {
  const [carModels, setCarModels] = useState<CarModel[]>([]);
  const [filteredCarModels, setFilteredCarModels] = useState<CarModel[]>([]);
  const [error, setError] = useState<string>("");
  const [carModelToDelete, setCarModelToDelete] = useState<CarModel | null>(
    null
  );
  const [carModelToUpdate, setCarModelToUpdate] = useState<CarModel | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string>("");

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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/car-model/get-all`,
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
        setFilteredCarModels(responseData.data);
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
          setSearchTerm("");
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

  const handleUpdate = (carModel: CarModel) => {
    setCarModelToUpdate(carModel);
  };

  const handleUpdateModalClose = () => {
    setCarModelToUpdate(null);
  };

  const handleUpdateConfirmation = async (updatedCarModelData: CarModel) => {
    setCarModelToUpdate(null);
    // Lógica de confirmación de actualización del modelo de vehículo
    setSuccessMessage("La marca de vehículo se actualizó satisfactoriamente.");

    // Limpiar el mensaje de éxito después de 3 segundos
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const columns: TableColumn<CarModel>[] = [
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
    {
      name: "Categoría",
      selector: (row) => row.category,
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
    {
      name: "Marca",
      selector: (row) => row.carBrand.name,
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
    {
      name: "Gasolina",
      selector: (row) => row.fuelType,
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
    {
      name: "Asientos",
      selector: (row) => row.seatingCapacity,
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
    {
      name: "Transmisión",
      selector: (row) => row.transmissionType,
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <button
            className="bg-orange-600 rounded text-white mr-2 p-1"
            onClick={() => handleUpdate(row)}
          >
            <Icon icon="lets-icons:edit-fill" className="text-xl" />
          </button>
          <button
            className="bg-red-600 rounded text-white p-1"
            onClick={() => handleDelete(row)}
          >
            <Icon icon="mdi:delete" className="text-xl" />
          </button>
        </>
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
    <section className="border rounded p-4 my-4 bg-white">
      <h2 className="text-lg bg-tm40 rounded p-1 text-white text-center">
        Modelos de vehículos
      </h2>
      {error && <ErrorModal errorDescription={error} />}
      <div className="m-2"></div>
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      />
      <div className="m-3"></div>
      <div
        className="
grid grid-col-1 border rounded"
      >
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
      </div>

      {carModelToDelete && (
        <ConfirmationModal
          processText={`eliminar el modelo de vehículo "${carModelToDelete.name}"`}
          onAccept={handleDeleteConfirmation}
          onCancel={handleDeleteCancel}
          actionType="delete"
        />
      )}

      {carModelToUpdate && (
        <CarModelUpdateModal
          carModel={carModelToUpdate}
          onClose={handleUpdateModalClose}
          onConfirm={handleUpdateConfirmation}
        />
      )}
      {successMessage && <SuccessModal successMessage={successMessage} />}
    </section>
  );
};

export default CarModelList;
