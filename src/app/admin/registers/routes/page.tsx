"use client";

import RouteReport from "@/components/routes/route-report";
import TableRoute from "@/components/routes/route-table";
import React, { useState } from "react";

interface RoutePageProps {}

interface Department {
  name: string;
  cities: string[];
}

const RoutePage: React.FC<RoutePageProps> = () => {
  const [departments] = useState<Department[]>([
    {
      name: "Amazonas",
      cities: ["Leticia", "Puerto Nariño"],
    },
    {
      name: "Antioquia",
      cities: ["Medellín", "Bello", "Envigado", "Itagüí", "Rionegro"],
    },
    {
      name: "Atlántico",
      cities: ["Barranquilla", "Soledad", "Malambo", "Sabanalarga", "Galapa"],
    },
    {
      name: "Bogotá D.C.",
      cities: ["Bogotá"],
    },
    {
      name: "Bolívar",
      cities: [
        "Cartagena",
        "Soledad",
        "Malambo",
        "Barrancabermeja",
        "Magangué",
      ],
    },
    {
      name: "Boyacá",
      cities: ["Tunja", "Duitama", "Sogamoso", "Chiquinquirá", "Paipa"],
    },
    {
      name: "Caldas",
      cities: [
        "Manizales",
        "La Dorada",
        "Chinchiná",
        "Villamaría",
        "Risaralda",
      ],
    },
    {
      name: "Caquetá",
      cities: [
        "Florencia",
        "Albania",
        "Solano",
        "Solita",
        "Belén de los Andaquíes",
      ],
    },
    // Agrega más departamentos y ciudades según sea necesario
  ]);

  const [selectedOriginDepartment, setSelectedOriginDepartment] =
    useState<string>("");
  const [selectedOriginCity, setSelectedOriginCity] = useState<string>("");
  const [selectedDestinationDepartment, setSelectedDestinationDepartment] =
    useState<string>("");
  const [selectedDestinationCity, setSelectedDestinationCity] =
    useState<string>("");

  const handleOriginDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDepartment = event.target.value;
    setSelectedOriginDepartment(selectedDepartment);
    setSelectedOriginCity("");
  };

  const handleDestinationDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDepartment = event.target.value;
    setSelectedDestinationDepartment(selectedDepartment);
    setSelectedDestinationCity("");
  };

  return (
    <div>
      {/* Sección del formulario */}
      <section className="border rounded p-4 my-4 bg-white">
        <h2 className="text-lg font-semibold">Gestor de Rutas</h2>
        {/* Inputs del formulario */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="originDepartment"
              className="block text-sm font-medium text-gray-700"
            >
              Departamento Origen
            </label>
            <select
              id="originDepartment"
              name="originDepartment"
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              onChange={handleOriginDepartmentChange}
              value={selectedOriginDepartment}
            >
              <option value="">Seleccione</option>
              {departments.map((department) => (
                <option key={department.name} value={department.name}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="originCity"
              className="block text-sm font-medium text-gray-700"
            >
              Ciudad Origen
            </label>
            <select
              id="originCity"
              name="originCity"
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              value={selectedOriginCity}
              disabled={!selectedOriginDepartment}
              onChange={(e) => setSelectedOriginCity(e.target.value)}
            >
              <option value="">Seleccione</option>
              {selectedOriginDepartment &&
                departments
                  .find((dep) => dep.name === selectedOriginDepartment)
                  ?.cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="destinationDepartment"
              className="block text-sm font-medium text-gray-700"
            >
              Departamento Destino
            </label>
            <select
              id="destinationDepartment"
              name="destinationDepartment"
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              onChange={handleDestinationDepartmentChange}
              value={selectedDestinationDepartment}
            >
              <option value="">Seleccione</option>
              {departments.map((department) => (
                <option key={department.name} value={department.name}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="destinationCity"
              className="block text-sm font-medium text-gray-700"
            >
              Ciudad Destino
            </label>
            <select
              id="destinationCity"
              name="destinationCity"
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              value={selectedDestinationCity}
              disabled={!selectedDestinationDepartment}
              onChange={(e) => setSelectedDestinationCity(e.target.value)}
            >
              <option value="">Seleccione</option>
              {selectedDestinationDepartment &&
                departments
                  .find((dep) => dep.name === selectedDestinationDepartment)
                  ?.cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="tripDuration"
              className="block text-sm font-medium text-gray-700"
            >
              Duración del Viaje
            </label>
            <input
              type="text"
              id="tripDuration"
              name="tripDuration"
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              placeholder="Ingrese la duración del viaje"
            />
          </div>
          <div>
            <label
              htmlFor="distance"
              className="block text-sm font-medium text-gray-700"
            >
              Distancia
            </label>
            <input
              type="text"
              id="distance"
              name="distance"
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              placeholder="Ingrese la distancia"
            />
          </div>
        </div>
      </section>

      <TableRoute></TableRoute>              
      <RouteReport></RouteReport>
    </div>
  );
};

export default RoutePage;
