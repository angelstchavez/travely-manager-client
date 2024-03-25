"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import DataTable, { TableColumn } from "react-data-table-component";
import Loading from "../utils/loading";
import { Icon } from "@iconify/react/dist/iconify.js";
import ColorIcon from "../utils/icons/color-icon";

interface Allocation {
  id: number;
  car: {
    plate: string;
    color: string;
    manufacturingYear: number;
    carModel: {
      name: string;
      category: string;
      fuelType: string;
      seatingCapacity: number;
      transmissionType: string;
    };
  };
  mainDriver: {
    person: {
      names: string;
      surnames: string;
    };
  };
  auxiliaryDriver: {
    person: {
      names: string;
      surnames: string;
    };
  };
  isActive: boolean;
  createdAt: string;
}

const AllocationTable: React.FC = () => {
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [filteredAllocations, setFilteredAllocations] = useState<Allocation[]>(
    []
  );
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/car-driver/get-all?page=${currentPage}&perPage=${itemsPerPage}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener las asignaciones de vehículos.");
        }

        const responseData = await response.json();

        if (!responseData.success || !responseData.data) {
          throw new Error("La respuesta no contiene datos válidos.");
        }

        setAllocations(responseData.data);
        setFilteredAllocations(responseData.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  const columns: TableColumn<Allocation>[] = [
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
          <span>{row.car.plate}</span>
        </div>
      ),
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
          <ColorIcon color={row.car.color} />
        </>
      ),
    },
    {
      name: "Categoría",
      selector: (row) => row.car.carModel.category,
      sortable: true,
    },
    {
      name: "Asientos",
      selector: (row) => row.car.carModel.seatingCapacity,
      sortable: true,
    },
    {
      name: "Conductor principal",
      cell: (row) => (
        <div className="py-1 p-1 flex items-center rounded bg-pink-100 text-pink-500 font-semibold">
          <span className="mr-1">
            <Icon icon="solar:bus-bold-duotone" />
          </span>
          <span>
            {row.mainDriver.person.names} {row.mainDriver.person.surnames}
          </span>
        </div>
      ),
      style: {
        width: "300px",
      },
    },
    {
      name: "Conductor auxiliar",
      cell: (row) => (
        <div className="py-1 p-1 flex items-center rounded bg-purple-100 text-purple-500 font-semibold">
          <span className="mr-1">
            <Icon icon="solar:bus-bold-duotone" />
          </span>
          <span>
            {row.auxiliaryDriver.person.names}{" "}
            {row.auxiliaryDriver.person.surnames}
          </span>
        </div>
      ),
      style: {
        width: "300px",
      },
    },
    {
      name: "Activo",
      sortable: true,
      cell: (row) => (
        <div
          className={`py-1 p-1 flex items-center rounded ${
            row.isActive
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          } font-semibold`}
        >
          <p className="mr-1">
            {row.isActive ? (
              <Icon
                icon="fa-solid:check-circle"
                style={{ color: row.isActive ? "#10B981" : "#EF4444" }}
              />
            ) : (
              <Icon
                icon="fa-solid:times-circle"
                style={{ color: row.isActive ? "#10B981" : "#EF4444" }}
              />
            )}
          </p>
          <span>{row.isActive ? "Sí" : "No"}</span>
        </div>
      ),
    },
  ];

  return (
    <section className="border rounded p-4 my-4 bg-white">
      <h2 className="text-lg bg-tm40 rounded p-1 text-white text-center">
        Asignaciones de vehículos
      </h2>
      {error && <div>Error: {error}</div>}
      <div className="m-3"></div>
      <div className="grid grid-col-1 border rounded">
        <DataTable
          columns={columns}
          data={filteredAllocations}
          pagination
          onChangePage={(page) => setCurrentPage(page)}
          progressPending={loading}
          progressComponent={<Loading />}
        />
      </div>
    </section>
  );
};

export default AllocationTable;
