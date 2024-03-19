import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import DataTable, { TableColumn } from "react-data-table-component";

interface Vehicle {
  id: number;
  plate: string;
  color: string;
  manufacturingYear: number;
  carModel: {
    name: string;
    carBrand: {
      name: string;
    };
  };
}

function VehicleTable() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
        setFilteredVehicles(responseData.data); // Inicialmente, mostrar todos los vehículos
        setLoading(false); // Se establece la carga como completada
      } catch (error) {
        if (typeof error === "string") {
          setError(error);
        } else {
          setError("Ha ocurrido un error desconocido.");
        }
        setLoading(false); // Se establece la carga como completada aunque haya errores
      }
    };

    fetchData();
  }, []);

  const columns: TableColumn<Vehicle>[] = [
    {
      name: "Placa",
      selector: (row) => row.plate,
      sortable: true,
    },
    {
      name: "Color",
      selector: (row) => row.color,
      sortable: true,
    },
    {
      name: "Fabricación",
      selector: (row) => row.manufacturingYear,
      sortable: true,
    },
    {
      name: "Marca",
      selector: (row) => row.carModel.carBrand.name,
      sortable: true,
    },
    {
      name: "Modelo",
      selector: (row) => row.carModel.name,
      sortable: true,
    },
  ];

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = vehicles.filter((vehicle) =>
      vehicle.plate.toLowerCase().includes(searchTerm)
    );
    setFilteredVehicles(filtered);
  };

  return (
    <section className="border rounded p-4 my-4 bg-white">
      {error && <div>Error: {error}</div>}
      <input
        type="text"
        placeholder="Buscar por placa"
        onChange={handleFilter}
        className="pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      />
      <DataTable
        columns={columns}
        data={filteredVehicles}
        pagination
        paginationPerPage={5}
        fixedHeader
        progressPending={loading} // Indica si la carga está pendiente o no
      />
    </section>
  );
}

export default VehicleTable;
