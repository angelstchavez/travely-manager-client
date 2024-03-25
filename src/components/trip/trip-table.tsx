/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import DataTable, { TableColumn } from "react-data-table-component";
import ConfirmationModal from "../modals/confirmation-modal";
import Loading from "../utils/loading";
import SuccessModal from "../modals/success-modal";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Trip {
  id: number;
  travelDate: string;
  travelTime: string;
  ticketPrice: number;
  isActive: boolean;
  createdAt: string;
  travelRoute: {
    id: number;
    departureCityId: number;
    destinationCityId: number;
    durationHours: number;
    distanceKilometers: number;
    departureCity: {
      id: number;
      name: string;
      departmentId: number;
      department: any; // Puedes reemplazar 'any' con una interfaz si la tienes definida
    };
    destinationCity: {
      id: number;
      name: string;
      departmentId: number;
      department: any; // Puedes reemplazar 'any' con una interfaz si la tienes definida
    };
  };
  departureTerminal: {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    cityId: number;
    isActive: boolean;
    city: {
      id: number;
      name: string;
      departmentId: number;
      department: any; // Puedes reemplazar 'any' con una interfaz si la tienes definida
    };
  };
  destinationTerminal: {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    cityId: number;
    isActive: boolean;
    city: {
      id: number;
      name: string;
      departmentId: number;
      department: any; // Puedes reemplazar 'any' con una interfaz si la tienes definida
    };
  };
  carDriver: {
    id: number;
    carId: number;
    mainDriverId: number;
    auxiliaryDriverId: number;
    isActive: boolean;
    createdAt: string;
    car: {
      id: number;
      plate: string;
      color: string;
      manufacturingYear: number;
      isActive: boolean;
      carModelId: number;
      createdAt: string;
      carModel: any; // Puedes reemplazar 'any' con una interfaz si la tienes definida
    };
    mainDriver: {
      id: number;
      personId: number;
      role: string;
      createdAt: string;
      person: any; // Puedes reemplazar 'any' con una interfaz si la tienes definida
    };
    auxiliaryDriver: {
      id: number;
      personId: number;
      role: string;
      createdAt: string;
      person: any; // Puedes reemplazar 'any' con una interfaz si la tienes definida
    };
  };
}

function TripTable() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [tripToDelete, setTripToDelete] = useState<Trip | null>(null);
  const [tripToUpdate, setTripToUpdate] = useState<Trip | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
  const cookieData = JSON.parse(cookieValue);
  const token = cookieData?.data?.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          throw new Error("No se encontró el token en el cookie.");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/trip/get-all`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos de los viajes.");
        }

        const responseData = await response.json();

        if (!responseData.success || !responseData.data) {
          throw new Error("La respuesta no contiene datos válidos.");
        }

        setTrips(responseData.data);
        setFilteredTrips(responseData.data);
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
  }, [token]);

  const handleDeleteConfirmation = async () => {
    if (tripToDelete) {
      try {
        if (!token) {
          throw new Error("No se encontró el token en el cookie.");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/trip/delete?carId=${tripToDelete.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (response.ok) {
          const updatedTrips = trips.filter(
            (trip) => trip.id !== tripToDelete.id
          );
          setTrips(updatedTrips);
          setFilteredTrips(updatedTrips);
          setTripToDelete(null);
        } else {
          throw new Error("Error al eliminar el vehículo.");
        }
      } catch (error) {
        setError("Error al eliminar el vehículo.");
      }
    }
  };

  const handleDeleteCancel = () => {
    setTripToDelete(null);
  };

  const handleDelete = (trip: Trip) => {
    setTripToDelete(trip);
  };

  const handleUpdate = (trip: Trip) => {
    setTripToUpdate(trip);
  };

  const handleUpdateModalClose = () => {
    setTripToUpdate(null);
  };

  const handleUpdateConfirmation = async (updatedTripData: Trip) => {
    // Lógica para enviar los datos actualizados al servidor y manejar la respuesta
    setTripToUpdate(null);
    setSuccessMessage("El vehículo se actualizó satisfactoriamente.");
  };

  const columns: TableColumn<Trip>[] = [
    {
      name: "Ruta",
      sortable: true,
      style: {
        width: "900px",
      },
      cell: (row) => (
        <>
          <div className="py-1 p-1 flex items-center rounded  bg-tm10 text-white font-semibold">
            <p className="mr-1">
              {" "}
              <Icon icon="solar:bus-bold-duotone" />
            </p>

            <span>
              {row.travelRoute.departureCity.name} -{" "}
              {row.travelRoute.destinationCity.name}
            </span>
          </div>
        </>
      ),
    },
    {
      name: "Autobús",
      sortable: true,
      style: {
        fontSize: 14,
      },
      cell: (row) => (
        <div className="py-1 p-1 flex items-center rounded bg-blue-100 text-blue-800 font-semibold">
          <span className="mr-1">
            <Icon icon="solar:bus-bold-duotone" />
          </span>
          <span>
            {row.carDriver.car.plate} - Color {row.carDriver.car.color}
          </span>
        </div>
      ),
    },
    {
      name: "Fecha de Viaje",
      sortable: true,
      style: {
        fontSize: 14,
      },
      cell: (row) => {
        const travelDate = new Date(row.travelDate);
        const options: Intl.DateTimeFormatOptions = {
          weekday: "long",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        };
        const formattedDate = `${travelDate.toLocaleDateString(
          "es-CO",
          options
        )}`;
        return (
          <div className="py-1 p-1 flex items-center rounded bg-zinc-100 text-zinc-800 font-semibold">
            <span className="mr-1">
              <Icon icon="solar:calendar-line-duotone" />
            </span>
            <span>{formattedDate}</span>
          </div>
        );
      },
    },
    {
      name: "Hora de Viaje",
      sortable: true,
      style: {
        fontSize: 14,
      },
      cell: (row) => (
        <div className="py-1 p-1 flex items-center rounded bg-zinc-100 text-zinc-800 font-semibold">
          <span className="mr-1">
            <Icon icon="ph:clock-duotone" />
          </span>
          <span>{row.travelTime}</span>
        </div>
      ),
    },
    {
      name: "Duración",
      sortable: true,
      style: {
        fontSize: 14,
      },
      cell: (row) => (
        <div className="py-1 p-1 flex items-center rounded bg-zinc-100 text-zinc-800 font-semibold">
          <span className="mr-1">
            <Icon icon="ph:clock-duotone" />
          </span>
          <span>{row.travelRoute.durationHours} horas</span>
        </div>
      ),
    },
    {
      name: "Precio del Boleto",
      sortable: true,
      style: {
        fontSize: 14,
      },
      cell: (row) => (
        <div className="py-1 p-1 flex items-center rounded bg-green-100 text-green-900 font-semibold">
          <span className="mr-1">
            <Icon icon="icon-park-twotone:tickets-two" />
          </span>
          <span>
            {row.ticketPrice.toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
            })}
          </span>
        </div>
      ),
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

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = trips.filter((trip) =>
      trip.travelDate.toLowerCase().includes(searchTerm)
    );
    setFilteredTrips(filtered);
  };

  return (
    <>
      <section className="border rounded p-2 my-2 bg-white">
        <h2 className="text-lg bg-tm40 rounded p-1 text-white text-center">
          Viajes
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
            data={filteredTrips}
            pagination
            paginationPerPage={10}
            fixedHeader
            progressPending={loading}
            progressComponent={<Loading />}
          />
        </div>
        {tripToDelete && (
          <ConfirmationModal
            processText={`eliminar el vehículo con placa "${tripToDelete.travelRoute.departureCity.name}"`}
            onAccept={handleDeleteConfirmation}
            onCancel={handleDeleteCancel}
            actionType="delete"
          />
        )}
        {successMessage && <SuccessModal successMessage={successMessage} />}
      </section>
    </>
  );
}
export default TripTable;
