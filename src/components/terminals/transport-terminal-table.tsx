import React, { useState, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import ErrorModal from "../modals/error-modal";
import Cookies from "js-cookie";
import Loading from "../utils/loading";

interface City {
  id: number;
  name: string;
  departmentId: number;
  department: any; // Tipo de datos del departamento, si es necesario
}

interface TransportTerminal {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  city: City;
  isActive: boolean;
}

const TableTransportTerminal: React.FC = () => {
  const [terminals, setTerminals] = useState<TransportTerminal[]>([]);
  const [filteredTerminals, setFilteredTerminals] = useState<
    TransportTerminal[]
  >([]);
  const [error, setError] = useState<Error | null>(null);
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

        setTerminals(responseData.data);
        setFilteredTerminals(responseData.data);
        setLoading(false); // Carga completada
      } catch (error: any) {
        setError(error);
        setLoading(false); // Carga completada aunque haya errores
      }
    };

    fetchData();
  }, []);

  const columns: TableColumn<TransportTerminal>[] = [
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontSize: 14,
      },
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
  ];

  useEffect(() => {
    const filtered = terminals.filter(
      (terminal) =>
        terminal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        terminal.city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        terminal.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        terminal.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTerminals(filtered);
  }, [terminals, searchTerm]);

  return (
    <section className="border rounded p-4 my-4 bg-white">
      <h2 className="text-lg bg-tm40 rounded p-1 text-white text-center">
        Terminales de Transporte
      </h2>
      <div className="m-2"></div>
      <input
        type="text"
        placeholder="Buscar por terminal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-3 pr-12 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      />
      {error && <ErrorModal errorDescription={(error as Error).message} />}
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
    </section>
  );
};

export default TableTransportTerminal;
