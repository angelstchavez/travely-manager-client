import React, { useState } from "react";

interface Brand {
  brand: string;
  models: Model[];
}

interface Model {
  name: string;
  seats: number;
}

const VehicleTab: React.FC = () => {
  const [vehicleBrands] = useState<Brand[]>([
    {
      brand: "Mercedes-Benz",
      models: [
        { name: "Citaro", seats: 40 },
        { name: "Tourismo", seats: 50 },
      ],
    },
    {
      brand: "Volvo",
      models: [
        { name: "9700", seats: 45 },
        { name: "9900", seats: 55 },
      ],
    },
    {
      brand: "Scania",
      models: [
        { name: "Interlink", seats: 50 },
        { name: "Touring", seats: 60 },
      ],
    },
    {
      brand: "MAN",
      models: [
        { name: "Lion's Coach", seats: 50 },
        { name: "Ecolife", seats: 45 },
      ],
    },
    {
      brand: "Neoplan",
      models: [
        { name: "Cityliner", seats: 45 },
        { name: "Skyliner", seats: 60 },
      ],
    },
    // Agrega más marcas y modelos según sea necesario
  ]);

  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [seatsCount, setSeatsCount] = useState<number | "">("");

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBrand = event.target.value;
    setSelectedBrand(selectedBrand);
    setSelectedModel("");
    setSeatsCount("");
  };

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedModel = event.target.value;
    setSelectedModel(selectedModel);
    const brand = vehicleBrands.find((brand) => brand.brand === selectedBrand);
    const model = brand?.models.find((model) => model.name === selectedModel);
    setSeatsCount(model?.seats ?? "");
  };

  return (
    <div>
      <section className="border rounded p-4 my-4 bg-white">
        <h2 className="text-lg font-semibold">Gestor de Vehículos</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="licensePlate"
              className="block text-sm font-medium text-gray-700"
            >
              Placa
            </label>
            <input
              type="text"
              id="licensePlate"
              name="licensePlate"
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              placeholder="Ingrese la placa del vehículo"
            />
          </div>
          <div>
            <label
              htmlFor="color"
              className="block text-sm font-medium text-gray-700"
            >
              Color
            </label>
            <select
              id="color"
              name="color"
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <option value="">Seleccione</option>
              <option value="rojo">Rojo</option>
              <option value="azul">Azul</option>
              <option value="verde">Verde</option>
              <option value="amarillo">Rojo</option>
              <option value="blanco">Blanco</option>
              <option value="negro">Negro</option>
              {/* Agrega más opciones de colores según sea necesario */}
            </select>
          </div>
          <div>
            <label
              htmlFor="manufactureYear"
              className="block text-sm font-medium text-gray-700"
            >
              Año de Fabricación
            </label>
            <input
              type="number"
              id="manufactureYear"
              name="manufactureYear"
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              placeholder="Ingrese el año de fabricación"
            />
          </div>
          <div>
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700"
            >
              Marca
            </label>
            <select
              id="brand"
              name="brand"
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              onChange={handleBrandChange}
              value={selectedBrand}
            >
              <option value="">Seleccione</option>
              {vehicleBrands.map((brand) => (
                <option key={brand.brand} value={brand.brand}>
                  {brand.brand}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="model"
              className="block text-sm font-medium text-gray-700"
            >
              Modelo
            </label>
            <select
              id="model"
              name="model"
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              onChange={handleModelChange}
              value={selectedModel}
              disabled={!selectedBrand}
            >
              <option value="">Seleccione</option>
              {selectedBrand &&
                vehicleBrands
                  .find((brand) => brand.brand === selectedBrand)
                  ?.models.map((model) => (
                    <option key={model.name} value={model.name}>
                      {model.name}
                    </option>
                  ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="seatsCount"
              className="block text-sm font-medium text-gray-700"
            >
              Cantidad de Asientos
            </label>
            <input
              type="text"
              id="seatsCount"
              name="seatsCount"
              className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              value={seatsCount}
              readOnly
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
        <h2 className="text-lg font-semibold">Lista de Vehículos</h2>
        {/* Aquí irá la tabla */}
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

export default VehicleTab;
