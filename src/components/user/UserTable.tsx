"use client";
import useFech, { useDelete } from "@/hooks/useFetch";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { ActiveIcon, RoleIcon } from "../utils/icons/iconComponent";
import Loading from "../utils/loading";
import ConfirmationModal from "../modals/confirmation-modal";
import { InputSearchComponent } from "../ui";

interface User {
  id: number;
  username: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

const UserTable = () => {
  
  const [userToDelete, setUserToDelete] = useState<{
    id: number;
    username: string;
  } | null>(null);

  const [User, setUser] = useState<User[]>([]);
  const { data, isLoading: fetchIsLoading } = useFech<User>("/user/get-all");

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
        width: "560px",
      },
      selector: (row) => row.role,
      cell: (row) => <RoleIcon role={row.role} />,
    },
    {
      name: "Activo",
      sortable: true,
      style: {
        fontSize: 14,
      },
      cell: (row) => <ActiveIcon active={row.isActive} />,
    },
    {
      name: "Creado",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
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
            // onClick={() => handleUpdate(row)}
          >
            <Icon icon="lets-icons:edit-fill" className="text-xl" />
          </button>
          <button
            className="bg-red-600 rounded text-white p-1"
            onClick={() => { setUserToDelete({id: row.id, username: row.username})}}
          >
            <Icon icon="mdi:delete" className="text-xl" />
          </button>
        </>
      ),
    },
  ];

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setUser(data);
    });
    console.log("Esta es mi data,", data);

    return () => clearTimeout(timeOut);
  }, [data]);



  const { deleteItem } = useDelete("/user/delete?", userToDelete?.id || 0);

  const confirmation = () => {
    if (userToDelete) {
      // Llama a deleteItem directamente
      const uptadeUser = User.filter((user)=> user.id != userToDelete.id);
      setUser(uptadeUser);
      deleteItem();
      setUserToDelete(null);
    }
  }

  return (
    <>
      <section className="border rounded-lg p-4 my-4 bg-white">
        <h2 className="text-lg bg-tm40 rounded p-1.5 text-white text-center mb-2">
          Usuarios
        </h2>

        <InputSearchComponent
          type="text"
          placeholder="Buscar"
          data={data}
          setRecord={setUser}
          columnToSearch={"role"}
        />

        <div className="grid grid-cols-1 border rounded-lg mt-2">
          <DataTable
            columns={columns}
            data={User}
            pagination
            fixedHeader
            progressPending={fetchIsLoading}
            progressComponent={<Loading />}
          />
        </div>


        {userToDelete && (
          <>
            <ConfirmationModal
              processText={`eliminar al usuario "${userToDelete.username}"`}
              onAccept={() => confirmation()}
              onCancel={() => setUserToDelete(null)}
              actionType="delete"
            />
            <pre>{JSON.stringify(userToDelete?.id)}</pre>

          </>
        )}


      </section>

    </>
  );
};

export default UserTable;
