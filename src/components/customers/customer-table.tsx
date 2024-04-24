"use client";

import React, { useState, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import ErrorModal from "../modals/error-modal";
import Cookies from "js-cookie";
import Loading from "../utils/loading";
import GenderIcon from "../utils/icons/gender-icon";
import DocumentTypeIcon from "../utils/icons/document-type-icon";
import { Icon } from "@iconify/react/dist/iconify.js";
import SuccessModal from "../modals/success-modal";
import ConfirmationModal from "../modals/confirmation-modal";
import CustomTitleIcon from "../utils/icons/custom-title-icon";

interface Person {
  id: number;
  names: string;
  surnames: string;
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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(
    null
  );
  const [customerToUpdate, setCustomerToUpdate] = useState<Customer | null>(
    null
  ); // Nuevo estado para el vehículo a actualizar
  const [successMessage, setSuccessMessage] = useState<string>("");

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
        setLoading(false);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const calculateAge = (birthdate: string): string => {
    const birthDate = new Date(birthdate);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const birthMonth = birthDate.getMonth();
    const currentMonth = currentDate.getMonth();

    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return `${age} años`;
  };

  const handleDeleteConfirmation = async () => {
    if (customerToDelete) {
      try {
        const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
        const cookieData = JSON.parse(cookieValue);
        const token = cookieData?.data?.token;

        if (!token) {
          throw new Error("No se encontró el token en el cookie.");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/delete?carId=${customerToDelete.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (response.ok) {
          const updatedCustomers = customers.filter(
            (customer) => customer.id !== customerToDelete.id
          );
          setCustomers(updatedCustomers);
          setFilteredCustomers(updatedCustomers);
          setCustomerToDelete(null);
        } else {
          throw new Error("Error al eliminar el vehículo.");
        }
      } catch (error) {
        setError("Error al eliminar el vehículo.");
      }
    }
  };

  const handleDeleteCancel = () => {
    setCustomerToDelete(null);
  };

  const handleDelete = (customer: Customer) => {
    setCustomerToDelete(customer);
  };

  const handleUpdate = (customer: Customer) => {
    setCustomerToUpdate(customer);
  };

  const handleUpdateModalClose = () => {
    setCustomerToUpdate(null);
  };

  const handleUpdateConfirmation = async (updatedCustomerData: Customer) => {
    // Lógica para enviar los datos actualizados al servidor y manejar la respuesta
    setCustomerToUpdate(null);
    setSuccessMessage("El cliente se actualizó satisfactoriamente.");
  };

  const columns: TableColumn<Customer>[] = [
    {
      name: "Nombre",
      selector: (row) => `${row.person.names} ${row.person.surnames}`,
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
    {
      name: "Género",
      sortable: true,
      cell: (row) => (
        <>
          <GenderIcon gender={row.person.gender} />
        </>
      ),
    },
    {
      name: "Fecha de nacimiento",
      selector: (row: Customer) => formatDate(row.person.birthdate),
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
    {
      name: "Edad",
      selector: (row: Customer) => calculateAge(row.person.birthdate),
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
    {
      name: "Tipo de Identificación",
      sortable: true,
      style: {
        width: "700px",
      },
      cell: (row) => (
        <>
          <DocumentTypeIcon documentType={row.person.identificationType} />
        </>
      ),
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
    const filtered = customers.filter(
      (customer) =>
        customer.person.names
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        customer.person.surnames
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
      <CustomTitleIcon icon="f7:person-2-alt" text="Clientes registrados" />
      <div className="m-2"></div>
      {error && <div>Error: {error}</div>}
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
      {customerToDelete && (
        <ConfirmationModal
          processText={`eliminar el cliente "${customerToDelete.person.names} ${customerToDelete.person.surnames}"`}
          onAccept={handleDeleteConfirmation}
          onCancel={handleDeleteCancel}
          actionType="delete"
        />
      )}
      {successMessage && <SuccessModal successMessage={successMessage} />}
    </section>
  );
};

export default TableCustomer;
