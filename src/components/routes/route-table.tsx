import React, { useState, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import ErrorModal from "../modals/error-modal";
import Cookies from "js-cookie";
import Loading from "../utils/loading";
import { Icon } from "@iconify/react/dist/iconify.js";
import ConfirmationModal from "../modals/confirmation-modal";
import TravelRouteUpdate from "./route-update";
import SuccessModal from "../modals/success-modal";

interface City {
  id: string;
  name: string;
}
interface Department {
  id: string;
  name: string;
}
interface TravelRoute {
  id: number;
  departureCity: City;
  destinationCity: City;
  durationHours: number;
  distanceKilometers: number;
  deparment: Department;
}

const TableRoute: React.FC = () => {
  const [travelRoutes, setTravelRoutes] = useState<TravelRoute[]>([]);
  const [filteredTravelRoutes, setFilteredTravelRoutes] = useState<
    TravelRoute[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [travelRouteToDelete, setTravelRouteToDelete] =
    useState<TravelRoute | null>(null);
  const [travelRouteToUpdate, setTravelRouteToUpdate] =
    useState<TravelRoute | null>(null);
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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/travel-route/get-all`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener las rutas de viaje.");
        }

        const responseData = await response.json();

        if (!responseData.success || !responseData.data) {
          throw new Error("La respuesta no contiene datos válidos.");
        }

        setTravelRoutes(responseData.data);
        setFilteredTravelRoutes(responseData.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteConfirmation = async () => {
    if (travelRouteToDelete) {
      try {
        const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
        const cookieData = JSON.parse(cookieValue);
        const token = cookieData?.data?.token;

        if (!token) {
          throw new Error("No se encontró el token en el cookie.");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/car/delete?carId=${travelRouteToDelete.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (response.ok) {
          const updatedTravelRoutes = travelRoutes.filter(
            (travelRoute) => travelRoute.id !== travelRouteToDelete.id
          );
          setTravelRoutes(updatedTravelRoutes);
          setFilteredTravelRoutes(updatedTravelRoutes);
          setTravelRouteToDelete(null);
        } else {
          throw new Error("Error al eliminar el vehículo.");
        }
      } catch (error) {
        setError("Error al eliminar el vehículo.");
      }
    }
  };

  const handleDeleteCancel = () => {
    setTravelRouteToDelete(null);
  };

  const handleDelete = (travelRoute: TravelRoute) => {
    setTravelRouteToDelete(travelRoute);
  };

  const handleUpdate = (travelRoute: TravelRoute) => {
    setTravelRouteToUpdate(travelRoute);
  };

  const handleUpdateModalClose = () => {
    setTravelRouteToUpdate(null);
  };

  const handleUpdateConfirmation = async (
    updatedTravelRouteData: TravelRoute
  ) => {
    // Lógica para enviar los datos actualizados al servidor y manejar la respuesta
    setTravelRouteToUpdate(null);
    setSuccessMessage("El vehículo se actualizó satisfactoriamente.");
  };

  const columns: TableColumn<TravelRoute>[] = [
    {
      name: "Ruta",
      sortable: true,
      style: {
        width: "500px",
      },
      cell: (row) => (
        <>
          <div className="py-1 p-1 flex items-center rounded bg-red-100 text-red-900 font-semibold">
            <p className="mr-1 text-red-600 text-xl">
              {" "}
              <Icon icon="fluent:location-ripple-16-filled" />
            </p>

            <span>
              {row.departureCity.name} - {row.destinationCity.name}
            </span>
          </div>
        </>
      ),
    },

    {
      name: "Distancia (Kilómetros)",
      selector: (row) => row.distanceKilometers + " Km",
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
    {
      name: "Duración (Horas)",
      selector: (row) => row.durationHours + " Horas",
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
    const filtered = travelRoutes.filter(
      (route) =>
        route.departureCity.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        route.destinationCity.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setFilteredTravelRoutes(filtered);
  }, [travelRoutes, searchTerm]);

  return (
    <section className="border rounded p-4 my-4 bg-white">
      <h2 className="text-lg bg-tm40 rounded p-1 text-white text-center">
        Rutas de viaje
      </h2>
      <div className="m-2"></div>
      {error && <ErrorModal errorDescription={error} />}
      <input
        type="text"
        placeholder="Buscar por ciudad"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-3 pr-12 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      />
      <div className="m-3"></div>
      <div className="grid grid-col-1 border rounded">
        <DataTable
          columns={columns}
          data={filteredTravelRoutes}
          pagination
          progressPending={loading}
          progressComponent={<Loading />}
        />
      </div>
      {travelRouteToDelete && (
        <ConfirmationModal
          processText={`eliminar la con placa "${travelRouteToDelete.departureCity} - ${travelRouteToDelete.destinationCity}"`}
          onAccept={handleDeleteConfirmation}
          onCancel={handleDeleteCancel}
          actionType="delete"
        />
      )}
      {travelRouteToUpdate && (
        <TravelRouteUpdate
          travelRoute={travelRouteToUpdate}
          onClose={handleUpdateModalClose}
          onConfirm={handleUpdateConfirmation}
        />
      )}
      {successMessage && <SuccessModal successMessage={successMessage} />}
    </section>
  );
};

export default TableRoute;
