import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import DataTable, { TableColumn } from "react-data-table-component";
import Loading from "../utils/loading";
import ConfirmationModal from "../modals/confirmation-modal";
import UpdateVehicleModal from "./vehicle-update"; // Importamos el nuevo componente de modal de actualización
import { Icon } from "@iconify/react/dist/iconify.js";
import SuccessModal from "../modals/success-modal";
import ColorIcon from "../utils/color-icon";

interface Vehicle {
  id: number;
  plate: string;
  color: string;
  manufacturingYear: number;
  carModel: {
    id: number;
    name: string;
    carBrand: {
      id: string;
      name: string;
    };
  };
}

function VehicleTable() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);
  const [vehicleToUpdate, setVehicleToUpdate] = useState<Vehicle | null>(null); // Nuevo estado para el vehículo a actualizar
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
        const cookieData = JSON.parse(cookieValue);
        const token = cookieData?.data?.token;

        if (!token) {
          throw new Error("No se encontró el token en el cookie.");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/car/get-all`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos de los vehículos.");
        }

        const responseData = await response.json();

        if (!responseData.success || !responseData.data) {
          throw new Error("La respuesta no contiene datos válidos.");
        }

        setVehicles(responseData.data);
        setFilteredVehicles(responseData.data);
        setLoading(false);
      } catch (error) {
        if (typeof error === "string") {
          setError(error);
        } else {
          setError("Ha ocurrido un error desconocido.");
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteConfirmation = async () => {
    if (vehicleToDelete) {
      try {
        const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
        const cookieData = JSON.parse(cookieValue);
        const token = cookieData?.data?.token;

        if (!token) {
          throw new Error("No se encontró el token en el cookie.");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/car/delete?carId=${vehicleToDelete.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (response.ok) {
          const updatedVehicles = vehicles.filter(
            (vehicle) => vehicle.id !== vehicleToDelete.id
          );
          setVehicles(updatedVehicles);
          setFilteredVehicles(updatedVehicles);
          setVehicleToDelete(null);
        } else {
          throw new Error("Error al eliminar el vehículo.");
        }
      } catch (error) {
        setError("Error al eliminar el vehículo.");
      }
    }
  };

  const handleDeleteCancel = () => {
    setVehicleToDelete(null);
  };

  const handleDelete = (vehicle: Vehicle) => {
    setVehicleToDelete(vehicle);
  };

  const handleUpdate = (vehicle: Vehicle) => {
    setVehicleToUpdate(vehicle);
  };

  const handleUpdateModalClose = () => {
    setVehicleToUpdate(null);
  };

  const handleUpdateConfirmation = async (updatedVehicleData: Vehicle) => {
    // Lógica para enviar los datos actualizados al servidor y manejar la respuesta
    setVehicleToUpdate(null);
    setSuccessMessage("El vehículo se actualizó satisfactoriamente.");
  };

  const columns: TableColumn<Vehicle>[] = [
    {
      name: "Placa",
      selector: (row) => row.plate,
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
    {
      name: "Color",
      sortable: true,
      style: {
        fontSize: 14,
        width: "250px",
      },
      cell: (row) => (
        <>
          <ColorIcon color={row.color} />
        </>
      ),
    },
    {
      name: "Fabricación",
      selector: (row) => row.manufacturingYear,
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
    {
      name: "Marca",
      selector: (row) => row.carModel.carBrand.name,
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
    {
      name: "Modelo",
      selector: (row) => row.carModel.name,
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

  // Función para filtrar los vehículos por placa
  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = vehicles.filter((vehicle) =>
      vehicle.plate.toLowerCase().includes(searchTerm)
    );
    setFilteredVehicles(filtered);
  };

  return (
    <>
      <section className="border rounded p-4 my-4 bg-white">
        <h2 className="text-lg bg-tm40 rounded p-1 text-white text-center">
          Vehículos
        </h2>
        <div className="m-2"></div>
        {error && <div>Error: {error}</div>}
        <input
          type="text"
          placeholder="Buscar por placa"
          onChange={handleFilter}
          className="pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        />
        <div className="m-3"></div>
        <div className="grid grid-col-1 border rounded">
          <DataTable
            columns={columns}
            data={filteredVehicles}
            pagination
            paginationPerPage={10}
            fixedHeader
            progressPending={loading}
            progressComponent={<Loading />}
          />
        </div>
        {vehicleToDelete && (
          <ConfirmationModal
            processText={`eliminar el vehículo con placa "${vehicleToDelete.plate}"`}
            onAccept={handleDeleteConfirmation}
            onCancel={handleDeleteCancel}
            actionType="delete"
          />
        )}
        {vehicleToUpdate && (
          <UpdateVehicleModal
            vehicle={vehicleToUpdate}
            onClose={handleUpdateModalClose}
            onConfirm={handleUpdateConfirmation}
          />
        )}
        {successMessage && <SuccessModal successMessage={successMessage} />}
      </section>
    </>
  );
}

export default VehicleTable;
