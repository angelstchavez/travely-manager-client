/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import SuccessModal from "../modals/success-modal";

interface Vehicle {
  id: number;
  plate: string;
  color: string;
  manufacturingYear: number;
  carModel: {
    id: number;
    name: string;
    carBrand: {
      id: string;
      name: string;
    };
  };
}

interface Brand {
  id: string;
  name: string;
}

interface Model {
  id: number;
  name: string;
}

interface UpdateCarModalProps {
  vehicle: Vehicle;
  onClose: () => void;
  onConfirm: (updatedVehicleData: Vehicle) => Promise<void>;
}

function UpdateCarModal({ vehicle, onClose }: UpdateCarModalProps) {
  const [vehicleBrands, setVehicleBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [formData, setFormData] = useState({
    licensePlate: vehicle.plate,
    color: vehicle.color,
    manufactureYear: vehicle.manufacturingYear.toString(),
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
      const cookieData = JSON.parse(cookieValue);
      const token = cookieData.data.token;

      if (!token) {
        throw new Error("No se encontró el token en el cookie.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/car-brand/get-all`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener las marcas de vehículos.");
      }

      const responseData = await response.json();

      if (!responseData.success || !responseData.data) {
        throw new Error("La respuesta no contiene datos válidos.");
      }

      setVehicleBrands(responseData.data);

      if (vehicle.carModel.carBrand) {
        setSelectedBrand(vehicle.carModel.carBrand.id);
        setSelectedModel(vehicle.carModel.id.toString());
        fetchModels(vehicle.carModel.carBrand.id);
      }
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: error.message,
      }));
    }
  };

  const fetchModels = async (brandId: string) => {
    try {
      const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
      const cookieData = JSON.parse(cookieValue);
      const token = cookieData.data.token;

      if (!token) {
        throw new Error("No se encontró el token en el cookie.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/car-model/get-by-brand/${brandId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los modelos de vehículos.");
      }

      const responseData = await response.json();

      if (!responseData.success || !responseData.data) {
        throw new Error("La respuesta no contiene datos válidos.");
      }

      setModels(responseData.data);
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: error.message,
      }));
    }
  };

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBrand = event.target.value;
    setSelectedBrand(selectedBrand);
    setSelectedModel("");
    if (selectedBrand) {
      fetchModels(selectedBrand);
    } else {
      setModels([]);
    }
  };

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedModel = event.target.value;
    setSelectedModel(selectedModel);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let value = e.target.value;

    if (e.target.name === "licensePlate") {
      value = value.toUpperCase();
    }

    setFormData({
      ...formData,
      [e.target.name]: value,
    });

    let errorMessage = "";
    if (e.target.name === "licensePlate") {
      const plateRegex = /^[A-Za-z]{3}\d{3}$/;
      if (!plateRegex.test(value)) {
        errorMessage =
          "La placa debe tener el formato correcto (tres letras seguidas de tres números).";
      }
    } else if (e.target.name === "manufactureYear") {
      const currentYear = new Date().getFullYear();
      const minYear = 1900;
      if (parseInt(value) > currentYear || parseInt(value) < minYear) {
        errorMessage =
          "El año de fabricación debe estar entre 1900 y el año actual.";
      }
    } else {
      errorMessage = value.trim() === "" ? "Este campo es obligatorio." : "";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: errorMessage,
    }));
  };

  const handleSubmit = async () => {
    const formErrors: { [key: string]: string } = {};

    if (!formData.manufactureYear.trim()) {
      formErrors["manufactureYear"] = "Este campo es obligatorio.";
    }

    if (!selectedBrand) {
      formErrors["selectedBrand"] = "Debe seleccionar al menos una marca.";
    }

    if (selectedBrand && !selectedModel) {
      formErrors["selectedModel"] = "Debe seleccionar al menos un modelo.";
    }

    Object.entries(formData).forEach(([key, value]) => {
      let errorMessage = "";
      if (key === "licensePlate") {
        const plateRegex = /^[A-Za-z]{3}\d{3}$/;
        if (!plateRegex.test(value)) {
          errorMessage =
            "La placa debe tener el formato correcto (tres letras seguidas de tres números).";
        }
      } else if (key === "manufactureYear") {
        const currentYear = new Date().getFullYear();
        const minYear = 1900;
        if (parseInt(value) > currentYear || parseInt(value) < minYear) {
          errorMessage =
            "El año de fabricación debe estar entre 1900 y el año actual.";
        }
      } else {
        errorMessage = value.trim() === "" ? "Este campo es obligatorio." : "";
      }
      if (errorMessage) {
        formErrors[key] = errorMessage;
      }
    });

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
      const cookieData = JSON.parse(cookieValue);
      const token = cookieData.data.token;

      if (!token) {
        throw new Error("No se encontró el token en el cookie.");
      }

      const currentDate = new Date();

      const requestData = {
        id: vehicle.id,
        plate: formData.licensePlate.toUpperCase(),
        color: formData.color,
        manufacturingYear: parseInt(formData.manufactureYear),
        isActive: true,
        carModelId: parseInt(selectedModel),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/car/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar el vehículo.");
      }

      const responseData = await response.json();

      if (!responseData.success) {
        throw new Error(
          responseData.message || "Error al actualizar el vehículo."
        );
      }

      setSuccessMessage("El vehículo se actualizó satisfactoriamente.");
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: error.message,
      }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-tm90 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 mx-5 max-w-md border">
        <div className="text-center">
          <h2 className="mt-4 text-lg font-semibold">Actualizar Vehículo</h2>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
                errors.licensePlate ? "border-red-500" : "border"
              }`}
              placeholder="Ingrese la placa del vehículo"
              value={formData.licensePlate}
              onChange={handleInputChange}
              required
              maxLength={6}
            />
            {errors.licensePlate && (
              <p className="text-red-500 text-xs mt-1">{errors.licensePlate}</p>
            )}
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
              className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
                errors.color ? "border-red-500" : "border"
              }`}
              value={formData.color}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione</option>
              <option value="rojo">Rojo</option>
              <option value="azul">Azul</option>
              <option value="verde">Verde</option>
              <option value="amarillo">Amarillo</option>
              <option value="blanco">Blanco</option>
              <option value="negro">Negro</option>
            </select>
            {errors.color && (
              <p className="text-red-500 text-xs mt-1">{errors.color}</p>
            )}
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
              className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
                errors.manufactureYear ? "border-red-500" : "border"
              }`}
              placeholder="Ingrese el año de fabricación"
              value={formData.manufactureYear}
              onChange={handleInputChange}
              required
            />
            {errors.manufactureYear && (
              <p className="text-red-500 text-xs mt-1">
                {errors.manufactureYear}
              </p>
            )}
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
              className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
                errors.selectedBrand ? "border-red-500" : "border"
              }`}
              onChange={handleBrandChange}
              value={selectedBrand}
              required
            >
              <option value="">Seleccione</option>
              {vehicleBrands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            {errors.selectedBrand && (
              <p className="text-red-500 text-xs mt-1">
                {errors.selectedBrand}
              </p>
            )}
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
              className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
                errors.selectedModel ? "border-red-500" : "border"
              }`}
              onChange={handleModelChange}
              value={selectedModel}
              disabled={!selectedBrand}
              required
            >
              <option value="">Seleccione</option>
              {models.map((model) => (
                <option key={model.id} value={model.id.toString()}>
                  {model.name}
                </option>
              ))}
            </select>
            {errors.selectedModel && (
              <p className="text-red-500 text-xs mt-1">
                {errors.selectedModel}
              </p>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleSubmit}
          >
            Confirmar
          </button>
          <button
            type="button"
            className="ml-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border
            -transparent rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
      {errors.general && (
        <p className="text-red-500 text-xs mt-4">{errors.general}</p>
      )}
      {successMessage && <SuccessModal successMessage={successMessage} />}
    </div>
  );
}

export default UpdateCarModal;
