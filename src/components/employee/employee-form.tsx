import React, { ChangeEvent, FormEvent, useState } from "react";
import InputComponent from "../utils/InputComponent";
import SelectComponent from "../utils/SelectComponent";
import usePost from "@/hooks/usePost";

const opcionesRol = [
  { value: "Conductor", label: "Conductor" },
  { value: "Vendedor", label: "Vendedor" },
];

const opcionesTI = [
  { value: "Cédula de Ciudadanía", label: "Cédula" },
  { value: "Cédula de Extranjería", label: "Pasaporte" },
];

interface FormData {
  person: {
    names: string;
    surnames: string;
    identificationNumber: string;
    identificationType: string;
    gender: string;
    birthdate: string;
    email: string;
    mobilePhone: string;
    createdAt: string;
  };
  role: string;
  createdAt: string;
}

function EmployeeForm() {
  const [formData, setFormData] = useState<FormData>({
    person: {
      names: "",
      surnames: "",
      identificationType: "",
      identificationNumber: "",
      gender: "Masculino",
      birthdate: "",
      email: "",
      mobilePhone: "",
      createdAt: "2024-03-27T06:33:46.337Z",
    },
    role: "",
    createdAt: "2024-03-27T06:33:46.337Z",
  });

  const { data, isLoading, sendPostRequest } = usePost();

  // const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     person: {
  //       ...prevState.person,
  //       [name]: value,
  //     },
  //   }));
  // };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name in formData.person) {
      setFormData((prevState) => ({
        ...prevState,
        person: {
          ...prevState.person,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  console.log("Que valor esta tomando los input:", formData);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendPostRequest("/employee/create", formData);
  };

  return (
    <section className="border rounded p-4 my-4 bg-white">
      <h2 className="text-lg font-semibold">Registro de Empleados</h2>

      <form onSubmit={handleSubmit}>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <InputComponent
              name="names"
              label="Nombres"
              type="text"
              placeholder="Ingrese los nombres"
              onChange={handleChange}
            />
          </div>

          <div>
            <InputComponent
              name="surnames"
              label="Apellidos"
              type="text"
              placeholder="Ingrese los apellidos"
              onChange={handleChange}
            />
          </div>

          <div>
            <InputComponent
              name="identificationNumber"
              label="Identificación"
              type="text"
              placeholder="Ingrese la identificacion"
              onChange={handleChange}
            />
          </div>

          <div>
            <SelectComponent
              name="identificationType"
              label="Tipo de indentificación"
              options={opcionesTI}
              onChange={handleChange}
            />
          </div>

          <div>
            <InputComponent
              name="email"
              label="Correo Electrónico"
              type="email"
              placeholder="example@travely.com"
              onChange={handleChange}
            />
          </div>

          <div>
            <InputComponent
              name="birthdate"
              label="Fecha de Naciemiento"
              type="date"
              onChange={handleChange}
            />
          </div>

          <div>
            <InputComponent
              name="mobilePhone"
              label="Numero de Contacto"
              type="text"
              placeholder="Ingrese un numero"
              onChange={handleChange}
            />
          </div>

          <div>
            <SelectComponent
              name="role"
              label="Rol"
              options={opcionesRol}
              onChange={handleChange}
            />
          </div>

          <div className="relative flex-grow flex items-center">
            <button
              type="submit"
              className="ml-1 relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <span>Crear</span>
            </button>
          </div>
        </div>
      </form>
      {/* Inputs formularios JP */}

      {/* 
      Inputs del formulario
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            Nombres
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            placeholder="Ingrese los nombres"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Apellidos
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            placeholder="Ingrese los apellidos"
          />
        </div>
        <div>
          <label
            htmlFor="identification"
            className="block text-sm font-medium text-gray-700"
          >
            Identificación
          </label>
          <input
            type="text"
            id="identification"
            name="identification"
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            placeholder="Ingrese la identificación"
          />
        </div>
        <div>
          <label
            htmlFor="idType"
            className="block text-sm font-medium text-gray-700"
          >
            Tipo de Identificación
          </label>
          <select
            id="idType"
            name="idType"
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <option value="">Seleccione</option>
            <option value="cédula">Cédula</option>
            <option value="pasaporte">Pasaporte</option>
            <option value="tarjeta de identidad">Tarjeta de Identidad</option>
            Agrega más opciones según sea necesario
          </select>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            placeholder="example@travely.com"
          />
        </div>

        <div>
          <label
            htmlFor="birthDate"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={birthDate}
            onChange={handleDateChange}
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          />
        </div>
        <div>
          <label
            htmlFor="contactNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Número de Contacto
          </label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            value={contactNumber}
            onChange={handleContactNumberChange}
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            placeholder="Ingrese un número"
          />
        </div>
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Rol
          </label>
          <select
            id="role"
            name="role"
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-nonesm:text-sm rounded-mdml-1 relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <option value="">Seleccione</option>
            <option value="Conductor">Conductor</option>
            <option value="Vendedor">Vendedor</option>
            Opciones de marca
          </select>
        </div>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-end">
        <div className="relative flex-grow flex items-center">
          <button
            type="button"
            className="ml-1 relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <span>Crear</span>
          </button>
        </div>
      </div> */}
    </section>
  );
}

export default EmployeeForm;
