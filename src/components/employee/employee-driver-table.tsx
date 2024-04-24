import React, { useState, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Loading from "../utils/loading";
import ErrorModal from "../modals/error-modal";
import GenderIcon from "../utils/icons/gender-icon";
import Cookies from "js-cookie";
import RoleIcon from "../utils/icons/role-icon";
import ConfirmationModal from "../modals/confirmation-modal";
import SuccessModal from "../modals/success-modal";
import { Icon } from "@iconify/react/dist/iconify.js";
import DocumentTypeIcon from "../utils/icons/document-type-icon";
import CustomTitleIcon from "../utils/icons/custom-title-icon";

interface Employee {
  id: string;
  role: string;
  person: {
    id: number;
    names: string;
    surnames: string;
    identificationType: string;
    identificationNumber: string;
    gender: string;
    birthdate: string;
    email: string;
    mobilePhone: string;
    createdAt: string;
  };
  createdAt: string;
}

const EmployeeDriverTable: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null
  );
  const [employeeToUpdate, setEmployeeToUpdate] = useState<Employee | null>(
    null
  );
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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/employee/get-all-by-role/Conductor`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error fetching employees");
        }

        const responseData = await response.json();
        console.log(responseData);
        setEmployees(responseData.data);
        setFilteredEmployees(responseData.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteConfirmation = async () => {
    if (employeeToDelete) {
      try {
        const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
        const cookieData = JSON.parse(cookieValue);
        const token = cookieData?.data?.token;

        if (!token) {
          throw new Error("No se encontró el token en el cookie.");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/employee/delete?employeeId=${employeeToDelete.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (response.ok) {
          const updatedEmployees = employees.filter(
            (employee) => employee.id !== employeeToDelete.id
          );
          setEmployees(updatedEmployees);
          setEmployeeToDelete(null);
        } else {
          throw new Error("Error al eliminar el empleado.");
        }
      } catch (error) {
        setError("Error al eliminar el empleado.");
      }
    }
  };

  const handleUpdate = (employee: Employee) => {
    setEmployeeToUpdate(employee);
  };

  const handleUpdateModalClose = () => {
    setEmployeeToUpdate(null);
  };

  const handleUpdateConfirmation = async (updatedEmployeeData: Employee) => {
    setEmployeeToUpdate(null);
    setSuccessMessage("El empleado se actualizó satisfactoriamente.");

    // Limpiar el mensaje de éxito después de 3 segundos
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleDeleteCancel = () => {
    setEmployeeToDelete(null);
  };

  const handleDelete = (employee: Employee) => {
    setEmployeeToDelete(employee);
  };

  const columns: TableColumn<Employee>[] = [
    {
      name: "Rol",
      sortable: true,
      style: {
        width: "200px",
      },
      cell: (row) => <RoleIcon role={row.role} />,
    },
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
      style: {
        fontSize: 14,
        width: "200px",
      },
      cell: (row) => (
        <>
          <GenderIcon gender={row.person.gender} />
        </>
      ),
    },
    {
      name: "Identificación",
      selector: (row) => row.person.identificationNumber,
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
          <DocumentTypeIcon documentType={row.person.identificationType} />
        </>
      ),
    },
    {
      name: "Email",
      selector: (row) => row.person.email,
      sortable: true,
    },
    {
      name: "Contacto",
      selector: (row) => row.person.mobilePhone,
      sortable: true,
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
    const filtered = employees.filter((employee) =>
      employee.person.names.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(filtered);
  }, [employees, searchTerm]);

  return (
    <div className="border rounded p-4 my-4 bg-white">
      <CustomTitleIcon icon="mdi:bus-multiple" text="Conductores registrados" />
      {error && <ErrorModal errorDescription={error} />}
      <div className="m-2"></div>
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      />
      <div className="m-3"></div>
      <div className="grid grid-col-1 border rounded">
        <DataTable
          columns={columns}
          data={filteredEmployees}
          pagination
          progressPending={loading}
          progressComponent={<Loading />}
        />
      </div>
      {employeeToDelete && (
        <ConfirmationModal
          processText={`eliminar al empleado con documento "${employeeToDelete.person.identificationNumber}"`}
          onAccept={handleDeleteConfirmation}
          onCancel={handleDeleteCancel}
          actionType="delete"
        />
      )}
      {successMessage && <SuccessModal successMessage={successMessage} />}
    </div>
  );
};

export default EmployeeDriverTable;
