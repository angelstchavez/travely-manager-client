import DataTable, { TableColumn } from "react-data-table-component";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Loading from "../utils/loading";
import CustomTitleIcon from "../utils/icons/custom-title-icon";
import DocumentTypeIcon from "../utils/icons/document-type-icon";

interface GetPassengersByTripIdModel {
  names: string;
  surnames: string;
  identificationNumber: string;
  identificationType: string;
  seatNumber: number;
  saleDate: Date;
}

interface PassengerSaleFormProps {
  tripId: number;
}

const PassengerSaleForm: React.FC<PassengerSaleFormProps> = ({ tripId }) => {
  const [passengers, setPassengers] = useState<GetPassengersByTripIdModel[]>(
    []
  );
  const [filteredPassengers, setFilteredPassengers] = useState<
    GetPassengersByTripIdModel[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showPassengers, setShowPassengers] = useState<boolean>(false);
  const [showReservations, setShowReservations] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
    const cookieData = cookieValue ? JSON.parse(cookieValue) : null;
    const token = cookieData?.data?.token;

    const fetchData = async () => {
      try {
        if (!token) {
          throw new Error("No se encontró el token en el cookie.");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/passenger/trip/${tripId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos de los pasajeros.");
        }

        const responseData = await response.json();

        if (!responseData.success || !responseData.data) {
          throw new Error("La respuesta no contiene datos válidos.");
        }

        setPassengers(responseData.data);
        setFilteredPassengers(responseData.data);
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
  }, [tripId]);

  useEffect(() => {
    const filteredData = passengers.filter((passenger) =>
      Object.values(passenger).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredPassengers(filteredData);
  }, [searchTerm, passengers]);

  const handleShowPassengers = () => {
    setShowPassengers(true);
    setShowReservations(false);
  };

  const handleShowReservations = () => {
    setShowPassengers(false);
    setShowReservations(true);
  };

  const handleHideTable = () => {
    setShowPassengers(false);
    setShowReservations(false);
  };

  const handleDownloadPDF = () => {
    // Aquí iría la lógica para descargar el PDF
    // Por ejemplo:
    alert("Descargando PDF...");
  };

  const columns: TableColumn<GetPassengersByTripIdModel>[] = [
    {
      name: "Nombres",
      selector: (row: GetPassengersByTripIdModel) => row.names,
      sortable: true,
    },
    {
      name: "Apellidos",
      selector: (row: GetPassengersByTripIdModel) => row.surnames,
      sortable: true,
    },
    {
      name: "Número de Identificación",
      selector: (row: GetPassengersByTripIdModel) => row.identificationNumber,
      sortable: true,
    },
    {
      name: "Tipo de Identificación",
      sortable: true,
      style: {
        width: "700px",
      },
      cell: (row) => (
        <>
          <DocumentTypeIcon documentType={row.identificationType} />
        </>
      ),
    },
    {
      name: "Número de Asiento",
      sortable: true,
      cell: (row) => (
        <>
          <p className="bg-tm20 text-white rounded-md p-1 font-bold h-6 w-6 flex items-center justify-center">
            {row.seatNumber}
          </p>
        </>
      ),
    },
    {
      name: "Fecha de Venta",
      cell: (row) => (
        <p className="bg-zinc-100 rounded-md p-1 font-bold flex items-center justify-center">
          {new Date(row.saleDate).toLocaleDateString()}
        </p>
      ),
      sortable: true,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl rounded-lg border p-4">
      <div className="flex mb-4">
        <button
          className="px-4 py-2 mr-2  bg-sky-700 text-white rounded hover:bg-sky-600 focus:outline-none"
          onClick={handleShowPassengers}
        >
          Mostrar Pasajeros
        </button>
        <button
          className="px-4 py-2 mr-2 bg-sky-700 text-white rounded hover:bg-sky-600 focus:outline-none"
          onClick={handleShowReservations}
        >
          Mostrar Reservas
        </button>
        {showPassengers || showReservations ? (
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
            onClick={handleHideTable}
          >
            Ocultar
          </button>
        ) : null}
      </div>

      {showPassengers && (
        <>
          <div className="flex flex-col md:flex-row md:items-center mb-4">
            <div className="mb-4 md:mb-0 md:mr-2 flex-grow">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border rounded w-full"
              />
            </div>
            <div>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                onClick={handleDownloadPDF}
              >
                Descargar PDF
              </button>
            </div>
          </div>
          <div className="mt-1">
            <h2 className="font-bold text-zinc-800">Pasajeros registrados</h2>
          </div>
          <div className="mt-3 grid grid-cols-1 border rounded">
            <DataTable
              columns={columns}
              data={filteredPassengers}
              pagination
              paginationPerPage={10}
              fixedHeader
              progressPending={loading}
              progressComponent={<Loading />}
            />
          </div>
        </>
      )}
      {showReservations && <div>{/* Lógica para mostrar reservas */}</div>}
    </div>
  );
};

export default PassengerSaleForm;
