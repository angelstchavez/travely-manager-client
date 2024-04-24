import React, { useState, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Cookies from "js-cookie";
import Loading from "../utils/loading";
import ConfirmationModal from "../modals/confirmation-modal";
import TransportTerminalUpdate from "./transport-terminal-update";
import SuccessModal from "../modals/success-modal";
import { Icon } from "@iconify/react/dist/iconify.js";
import CustomTitleIcon from "../utils/icons/custom-title-icon";

interface TransportTerminal {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  department: Department;
  city: City;
}

interface City {
  id: number;
  name: string;
}

interface Department {
  id: string;
  name: string;
}

const TableTransportTerminal: React.FC = () => {
  const [transportTerminals, setTransportTerminals] = useState<
    TransportTerminal[]
  >([]);
  const [filteredTerminals, setFilteredTransportTerminals] = useState<
    TransportTerminal[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [transportTerminalToDelete, setTransportTerminalToDelete] =
    useState<TransportTerminal | null>(null);
  const [transportTerminalToUpdate, setTransportTerminalToUpdate] =
    useState<TransportTerminal | null>(null); // Nuevo estado para el vehículo a actualizar
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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/transport-terminal/get-all`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener los terminales de transporte.");
        }

        const responseData = await response.json();

        if (!responseData.success || !responseData.data) {
          throw new Error("La respuesta no contiene datos válidos.");
        }

        setTransportTerminals(responseData.data);
        setFilteredTransportTerminals(responseData.data);
        setLoading(false); // Carga completada
      } catch (error: any) {
        setError(error);
        setLoading(false); // Carga completada aunque haya errores
      }
    };

    fetchData();
  }, []);

  const handleDeleteConfirmation = async () => {
    if (transportTerminalToDelete) {
      try {
        const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
        const cookieData = JSON.parse(cookieValue);
        const token = cookieData?.data?.token;

        if (!token) {
          throw new Error("No se encontró el token en el cookie.");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/transport-terminal/delete?transportTerminalId=${transportTerminalToDelete.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (response.ok) {
          const updatedTransportTerminals = transportTerminals.filter(
            (transportTerminal) =>
              transportTerminal.id !== transportTerminalToDelete.id
          );
          setTransportTerminals(updatedTransportTerminals);
          setFilteredTransportTerminals(updatedTransportTerminals);
          setTransportTerminalToDelete(null);
        } else {
          throw new Error("Error al eliminar el vehículo.");
        }
      } catch (error) {
        setError("Error al eliminar el vehículo.");
      }
    }
  };

  const handleDeleteCancel = () => {
    setTransportTerminalToDelete(null);
  };

  const handleDelete = (transportTerminal: TransportTerminal) => {
    setTransportTerminalToDelete(transportTerminal);
  };

  const handleUpdate = (transportTerminal: TransportTerminal) => {
    setTransportTerminalToUpdate(transportTerminal);
  };

  const handleUpdateModalClose = () => {
    setTransportTerminalToUpdate(null);
  };

  const handleUpdateConfirmation = async (
    updatedTransportTerminalData: TransportTerminal
  ) => {
    // Lógica para enviar los datos actualizados al servidor y manejar la respuesta
    setTransportTerminalToUpdate(null);
    setSuccessMessage("El vehículo se actualizó satisfactoriamente.");
  };

  const columns: TableColumn<TransportTerminal>[] = [
    {
      name: "Nombre",
      sortable: true,
      style: {
        width: "500px",
      },
      cell: (row) => (
        <>
          <div className="py-1 p-1 flex items-center rounded bg-blue-100 text-tm20 font-semibold">
            <p className="mr-1 text-tm20 text-xl">
              {" "}
              <Icon icon="heroicons:building-office-20-solid" />
            </p>
            <span>{row.name}</span>
          </div>
        </>
      ),
    },
    {
      name: "Ciudad",
      selector: (row) => row.city.name,
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
    {
      name: "Dirección",
      selector: (row) => row.address,
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
    {
      name: "Teléfono",
      selector: (row) => row.phoneNumber,
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
    const filtered = transportTerminals.filter(
      (terminal) =>
        terminal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        terminal.city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        terminal.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        terminal.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransportTerminals(filtered);
  }, [transportTerminals, searchTerm]);

  return (
    <section className="border rounded p-4 my-4 bg-white">
      <CustomTitleIcon
        icon="fluent:building-people-20-filled"
        text="Terminales de transporte registradas"
      />
      <div className="m-2"></div>
      <input
        type="text"
        placeholder="Buscar por terminal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-3 pr-12 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      />
      {error && <div>Error: {error}</div>}
      <div className="m-3"></div>
      <div className="grid grid-col-1 border rounded">
        <DataTable
          columns={columns}
          data={filteredTerminals}
          pagination
          progressPending={loading}
          progressComponent={<Loading />}
        />
      </div>
      {transportTerminalToDelete && (
        <ConfirmationModal
          processText={`eliminar el el terminal "${transportTerminalToDelete.name}"`}
          onAccept={handleDeleteConfirmation}
          onCancel={handleDeleteCancel}
          actionType="delete"
        />
      )}
      {transportTerminalToUpdate && (
        <TransportTerminalUpdate
          terminal={transportTerminalToUpdate}
          onClose={handleUpdateModalClose}
          onConfirm={handleUpdateConfirmation}
        />
      )}
      {successMessage && <SuccessModal successMessage={successMessage} />}
    </section>
  );
};

export default TableTransportTerminal;
