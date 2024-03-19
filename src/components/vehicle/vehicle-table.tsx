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
  const [error, setError] = useState<string | null>(null);

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
      } catch (error) {
        if (typeof error === "string") {
          setError(error);
        } else {
          setError("Ha ocurrido un error desconocido.");
        }
      }
    };

    fetchData();
  }, []);

  const columns: TableColumn<Vehicle>[] = [
    {
      name: "Placa",
      selector: row => row.plate,
      sortable: true,
    },
    {
      name: "Color",
      selector: row => row.color,
    },
    {
      name: "Fabricación",
      selector: row => row.manufacturingYear,
    },
    {
      name: "Marca",
      selector: (row) => row.carModel.carBrand.name,
    },
    {
      name: "Modelo",
      selector: (row) => row.carModel.name,
    },
  ];

  return (
    <section className="border rounded p-4 my-4 bg-white">
      {error && <div>Error: {error}</div>}
      <DataTable columns={columns} data={vehicles}></DataTable>
    </section>
  );
}

export default VehicleTable;
