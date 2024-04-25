"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import DataTable, { TableColumn } from "react-data-table-component";
import { Icon } from "@iconify/react/dist/iconify.js";
import SuccessModal from "../modals/success-modal";
import Loading from "../utils/loading";
import SaleTab from "../utils/sale/sale-tab";
import CustomTitleIcon from "../utils/icons/custom-title-icon";

interface Trip {
  id: number;
  travelDate: string;
  travelTime: string;
  ticketPrice: number;
  isActive: boolean;
  createdAt: string;
  travelRoute: {
    durationHours: number;
    distanceKilometers: number;
    departureCity: {
      id: number;
      name: string;
    };
    destinationCity: {
      id: number;
      name: string;
    };
  };
  carDriver: {
    car: {
      plate: string;
    };
  };
}

function SaleTripsTable() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [selectedTripId, setSelectedTripId] = useState<number | null>(null);
  const [cityFilter, setCityFilter] = useState<string>("");
  const [destinationCityFilter, setDestinationCityFilter] =
    useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [timeFilter, setTimeFilter] = useState<string>("");
  const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
  const cookieData = cookieValue ? JSON.parse(cookieValue) : null;
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

  useEffect(() => {
    const filterTrips = () => {
      let filteredData = trips.filter((trip) => {
        const tripDate = new Date(trip.travelDate);
        const tripTime = trip.travelTime.slice(0, 5); // Obtenemos solo las horas y minutos

        if (
          cityFilter &&
          !trip.travelRoute.departureCity.name
            .toLowerCase()
            .includes(cityFilter.toLowerCase()) &&
          !trip.travelRoute.destinationCity.name
            .toLowerCase()
            .includes(cityFilter.toLowerCase())
        ) {
          return false;
        }

        if (
          destinationCityFilter &&
          !trip.travelRoute.destinationCity.name
            .toLowerCase()
            .includes(destinationCityFilter.toLowerCase())
        ) {
          return false;
        }

        if (
          dateFilter &&
          (tripDate.getDate() !== new Date(dateFilter).getDate() ||
            tripDate.getMonth() !== new Date(dateFilter).getMonth() ||
            tripDate.getFullYear() !== new Date(dateFilter).getFullYear())
        ) {
          return false;
        }

        if (timeFilter && tripTime !== timeFilter) {
          return false;
        }

        return true;
      });

      setFilteredTrips(filteredData);
    };

    filterTrips();
  }, [cityFilter, destinationCityFilter, dateFilter, timeFilter, trips]);

  const handleCancel = () => {
    setSelectedTripId(null);
  };

  const columns: TableColumn<Trip>[] = [
    {
      name: "Origen",
      selector: (row) => row.travelRoute.departureCity.name,
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
    {
      name: "Destino",
      selector: (row) => row.travelRoute.destinationCity.name,
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
    {
      name: "Fecha de Viaje",
      sortable: true,
      selector: (row) => row.travelDate,
      style: {
        fontSize: 14,
      },
    },
    {
      name: "Hora de Viaje",
      sortable: true,
      selector: (row) => row.travelTime,
      style: {
        fontSize: 14,
      },
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
      name: "Distancia",
      sortable: true,
      style: {
        fontSize: 14,
      },
      cell: (row) => (
        <div className="py-1 p-1 flex items-center rounded bg-zinc-100 text-zinc-800 font-semibold">
          <span className="mr-1">
            <Icon icon="ph:clock-duotone" />
          </span>
          <span>{row.travelRoute.distanceKilometers} Km</span>
        </div>
      ),
    },
    {
      name: "Precio del Boleto",
      sortable: true,
      style: {
        fontSize: 14,
        width: "400px",
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
      name: "Ver Sillas",
      cell: (row) => (
        <button
          className="bg-tm20 hover:bg-tm10 text-white font-semibold py-2 px-4 rounded"
          onClick={() => handleViewSeats(row.id)}
        >
          Ver sillas
        </button>
      ),
    },
  ];

  const handleViewSeats = (tripId: number) => {
    setSelectedTripId(tripId);
  };

  return (
    <>
      <section className="border rounded p-2 my-2 bg-white">
        <CustomTitleIcon icon="wpf:search" text="Consultar viajes" />
        <div className="m-2"></div>
        {error && <div>Error: {error}</div>}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="cityFilter"
              className="block text-xs font-medium text-gray-700"
            >
              Ciudad de origen o destino
            </label>
            <input
              type="text"
              id="cityFilter"
              placeholder="Ej. Bogotá"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            />
          </div>
          <div>
            <label
              htmlFor="dateFilter"
              className="block text-xs font-medium text-gray-700"
            >
              Fecha de viaje
            </label>
            <input
              type="date"
              id="dateFilter"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            />
          </div>
          <div>
            <label
              htmlFor="timeFilter"
              className="block text-xs font-medium text-gray-700"
            >
              Hora de viaje
            </label>
            <input
              type="time"
              id="timeFilter"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            />
          </div>
        </div>
        <div className="mt-2 flex flex-col sm:flex-row sm:items-center justify-end">
          <div className="relative flex-grow flex items-center">
            <button
              onClick={() => {
                setCityFilter("");
                setDestinationCityFilter("");
                setDateFilter("");
                setTimeFilter("");
                setFilteredTrips(trips);
              }}
              className="relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-white bg-zinc-400"
            >
              Restablecer búsqueda
            </button>
          </div>
        </div>
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
        {successMessage && <SuccessModal successMessage={successMessage} />}
        {selectedTripId && (
          <SaleTab tripId={selectedTripId} onCancel={handleCancel} />
        )}
      </section>
    </>
  );
}

export default SaleTripsTable;
