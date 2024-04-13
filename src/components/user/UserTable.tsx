"use client";
import useFech from "@/hooks/useFetch";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
// import RoleIcon from "../utils/icons/role-icon";
import { ActiveIcon,RoleIcon } from "../utils/icons/iconComponent";
import Loading from "../utils/loading";

interface User {
  id: number;
  username: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

const UserTable = () => {
  const columns: TableColumn<User>[] = [
    {
      name: "Nombre de usuario",
      selector: (row) => row.username,
      sortable: true,
      style:{
        fontSize:14,
      }
    },
    {
      name: "Rol",
      sortable: true,
      style:{
        fontSize:14,
        width: "560px",
      },
      cell: (row) => <RoleIcon role={row.role} />,
    },
    {
      name: "Activo",
      sortable: true,
      style:{
        fontSize:14,
      },
      cell: (row) => <ActiveIcon active={row.isActive}/>
    },
    {
      name: "Creado",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
      style:{
        fontSize:14,

      }
    },
    {
      name: "Acciones",
      style:{
      },
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
            // onClick={() => handleDelete(row)}
          >
            <Icon icon="mdi:delete" className="text-xl" />
          </button>
        </>
      ),
    },
  ];

  const { data,isLoading } = useFech<User>("/user/get-all");

  console.log("Esta es mi data,", data);

  const [record, setRecord] = useState<User[]>([]);


  useEffect(() => {
    const timeOut =   setTimeout(()=>{
      setRecord(data);
    });
  
    return () => clearTimeout(timeOut)
  }, [data])
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target

    const filteredRecord = data.filter((record)=> {
      return record.username.toLowerCase().includes(value.toLowerCase());
    });
    setRecord(filteredRecord);
  }

  return (
    <>
      <section className="border rounded-lg p-4 my-4 bg-white">
        
      <h2 className="text-lg bg-tm40 rounded p-1.5 text-white text-center mb-2">
          Usuarios
        </h2>
          <div className="text-right">
            <input type="text"
                   className="border border-gray-300 px-4 py-2 outline-none rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50/60 "
                   placeholder="Buscar"
                   onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 border rounded-lg mt-2">
            <DataTable 
                columns={columns} 
                data={record} 
                pagination
                fixedHeader
                progressPending={isLoading}
                progressComponent={<Loading/>}
                />
          </div>

        
      </section>
    </>
  );
};

export default UserTable;
