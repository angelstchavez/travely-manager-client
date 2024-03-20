import React, { useState, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import ErrorModal from "../modals/error-modal";
import Cookies from "js-cookie";
import Loading from "../utils/loading";

interface City {
  id: number;
  name: string;
}

interface Route {
  id: number;
  departureCity: City;
  destinationCity: City;
  durationHours: number;
  distanceKilometers: number;
}

const TableRoute: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);
  const [error, setError] = useState<string | null>(null);
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

        setRoutes(responseData.data);
        setFilteredRoutes(responseData.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns: TableColumn<Route>[] = [
    {
      name: "Ciudad de Origen",
      selector: (row) => row.departureCity.name,
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
    {
      name: "Ciudad de Destino",
      selector: (row) => row.destinationCity.name,
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
    {
      name: "Distancia (Kilómetros)",
      selector: (row) => row.distanceKilometers,
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
    {
      name: "Duración (Horas)",
      selector: (row) => row.durationHours,
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
  ];

  useEffect(() => {
    const filtered = routes.filter(
      (route) =>
        route.departureCity.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        route.destinationCity.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setFilteredRoutes(filtered);
  }, [routes, searchTerm]);

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
          data={filteredRoutes}
          pagination
          progressPending={loading}
          progressComponent={<Loading />}
        />
      </div>
    </section>
  );
};

export default TableRoute;
