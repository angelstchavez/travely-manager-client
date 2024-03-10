"use client";

import React, { useState } from "react";

interface Department {
  id: number;
  name: string;
  cities: string[];
}

const TransportTerminalPage: React.FC = () => {
  const [departments] = useState<Department[]>([
    { id: 1, name: "Amazonas", cities: ["Leticia", "Puerto Nariño"] },
    { id: 2, name: "Antioquia", cities: ["Medellín", "Bello", "Envigado"] },
    { id: 3, name: "Arauca", cities: ["Arauca", "Saravena"] },
    {
      id: 4,
      name: "Atlántico",
      cities: ["Barranquilla", "Soledad", "Malambo"],
    },
    { id: 5, name: "Bogotá D.C.", cities: ["Bogotá"] },
    { id: 6, name: "Bolívar", cities: ["Cartagena", "Barrancabermeja"] },
    { id: 7, name: "Boyacá", cities: ["Tunja", "Duitama", "Sogamoso"] },
    { id: 8, name: "Caldas", cities: ["Manizales", "Pereira"] },
    { id: 9, name: "Caquetá", cities: ["Florencia"] },
    { id: 10, name: "Casanare", cities: ["Yopal"] },
    // Agregar más departamentos y ciudades según sea necesario
  ]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [cities, setCities] = useState<string[]>([]);

  const handleDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDepartment = event.target.value;
    setSelectedDepartment(selectedDepartment);
    const selectedCities = departments.find(
      (department) => department.name === selectedDepartment
    )?.cities;
    setCities(selectedCities || []);
  };

  return (
    <div>
      <section className="border rounded p-4 my-4 bg-white">
        <h2 className="text-lg font-semibold">
          Información de Terminal de Transporte
        </h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              placeholder="Ingrese el nombre de la terminal"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Dirección
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              placeholder="Ingrese la dirección de la terminal"
            />
          </div>
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700"
            >
              Departamento
            </label>
            <select
              id="department"
              name="department"
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              onChange={handleDepartmentChange}
              value={selectedDepartment}
            >
              <option value="">Seleccione</option>
              {departments.map((department) => (
                <option key={department.id} value={department.name}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              Ciudad
            </label>
            <select
              id="city"
              name="city"
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <option value="">Seleccione</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Número de Teléfono
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              placeholder="Ingrese el número de teléfono de la terminal"
            />
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
        </div>
      </section>

      <section className="border rounded p-4 my-4 bg-white">
        <h2 className="text-lg font-semibold">
          Lista de Terminales de Transporte
        </h2>
      </section>

      <section className="border rounded p-4 my-4 flex justify-end bg-white">
        <button
          type="button"
          className="ml-1 relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <span>Descargar PDF</span>
        </button>
      </section>
    </div>
  );
};

export default TransportTerminalPage;
