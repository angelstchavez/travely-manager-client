"use client";

import React, { useState, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import ErrorModal from "../modals/error-modal";
import Cookies from "js-cookie";
import Loading from "../utils/loading";

interface Person {
  id: number;
  firstName: string;
  middleName: string | null;
  lastName: string;
  secondLastName: string | null;
  identificationNumber: string;
  identificationType: string;
  gender: string;
  birthdate: string;
  email: string;
  mobilePhone: string;
  createdAt: string;
}

interface Customer {
  id: number;
  person: Person;
  createdAt: string;
}

const TableCustomer: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchTerm, setSearchTerm] = useState<string>("");

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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/get-all`,
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

        setCustomers(responseData.data);
        setFilteredCustomers(responseData.data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns: TableColumn<Customer>[] = [
    {
      name: "Nombre",
      selector: (row) => `${row.person.firstName} ${row.person.lastName}`,
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
    {
      name: "Tipo de Identificación",
      selector: (row) => row.person.identificationType,
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
    {
      name: "Número de Identificación",
      selector: (row) => row.person.identificationNumber,
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
    {
      name: "Correo Electrónico",
      selector: (row) => row.person.email,
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
    {
      name: "Teléfono Móvil",
      selector: (row) => row.person.mobilePhone,
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
  ];

  useEffect(() => {
    const filtered = customers.filter(
      (customer) =>
        customer.person.firstName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        customer.person.lastName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        customer.person.identificationNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        customer.person.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        customer.person.mobilePhone
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [customers, searchTerm]);

  return (
    <section className="border rounded p-4 my-4 bg-white">
      <h2 className="text-lg bg-tm40 rounded p-1 text-white text-center">
        Cientes
      </h2>
      <div className="m-2"></div>
      {error && <ErrorModal errorDescription={(error as Error).message} />}
      <input
        type="text"
        placeholder="Buscar por cliente"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-3 pr-12 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      />
      <div className="m-3"></div>
      <div className="grid grid-col-1 border rounded">
        <DataTable
          columns={columns}
          data={filteredCustomers}
          pagination
          progressPending={loading}
          progressComponent={<Loading />}
        />
      </div>
    </section>
  );
};

export default TableCustomer;
