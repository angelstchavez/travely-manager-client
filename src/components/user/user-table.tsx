/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import DataTable, { TableColumn } from "react-data-table-component";
import Loading from "../utils/loading";
import ConfirmationModal from "../modals/confirmation-modal";
import SuccessModal from "../modals/success-modal";
import { Icon } from "@iconify/react/dist/iconify.js";
import RoleIcon from "../utils/icons/role-icon";

interface User {
  id: number;
  username: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [itemsPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [userToUpdate, setUserToUpdate] = useState<User | null>(null);
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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get-all`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener los usuarios.");
        }

        const responseData = await response.json();

        if (!responseData.success || !responseData.data) {
          throw new Error("La respuesta no contiene datos válidos.");
        }

        setUsers(responseData.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteConfirmation = async () => {
    if (userToDelete) {
      try {
        const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
        const cookieData = JSON.parse(cookieValue);
        const token = cookieData?.data?.token;

        if (!token) {
          throw new Error("No se encontró el token en el cookie.");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/delete?userId=${userToDelete.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (response.ok) {
          const updatedUsers = users.filter(
            (user) => user.id !== userToDelete.id
          );
          setUsers(updatedUsers);
          setUserToDelete(null);
        } else {
          throw new Error("Error al eliminar el usuario.");
        }
      } catch (error) {
        setError("Error al eliminar el usuario.");
      }
    }
  };

  const handleUpdate = (user: User) => {
    setUserToUpdate(user);
  };

  const handleUpdateModalClose = () => {
    setUserToUpdate(null);
  };

  const handleUpdateConfirmation = async (updatedUserData: User) => {
    setUserToUpdate(null);
    setSuccessMessage("El usuario se actualizó satisfactoriamente.");

    // Limpiar el mensaje de éxito después de 3 segundos
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleDeleteCancel = () => {
    setUserToDelete(null);
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
  };

  const columns: TableColumn<User>[] = [
    {
      name: "Nombre de usuario",
      selector: (row) => row.username,
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
    {
      name: "Rol",
      sortable: true,
      style: {
        fontSize: 14,
        width: "400px",
      },
      cell: (row) => <RoleIcon role={row.role} />,
    },
    {
      name: "Activo",
      sortable: true,
      style: {
        fontSize: 14,
      
      },
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
    {
      name: "Creado en",
      selector: (row) => new Date(row.createdAt).toLocaleString(),
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
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filtered);
  }, []);

  return (
    <>
      <section className="border rounded p-4 my-4 bg-white">
        <h2 className="text-lg bg-tm40 rounded p-1 text-white text-center">
          Usuarios
        </h2>
        <div className="m-2 bg-red-400">Hola</div>
        <input
          type="text"
          placeholder="Buscar por nombre de usuario"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        />
        {error && <div>Error: {error}</div>}
        <div className="m-3"></div>
        <div className="grid grid-col-1 border rounded">
          <DataTable
            columns={columns}
            data={users}
            pagination
            progressPending={loading}
            progressComponent={<Loading />}
          />
        </div>
        {userToDelete && (
          <ConfirmationModal
            processText={`eliminar al usuario "${userToDelete.username}"`}
            onAccept={handleDeleteConfirmation}
            onCancel={handleDeleteCancel}
            actionType="delete"
          />
        )}
      </section>
      {successMessage && <SuccessModal successMessage={successMessage} />}
    </>
  );
};

export default UserTable;
