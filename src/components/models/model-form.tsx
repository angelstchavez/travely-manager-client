import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import SuccessModal from "../modals/success-modal";

interface Brand {
  id: number;
  name: string;
}

function ModelForm() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    fuelType: "",
    seatingCapacity: "",
    transmissionType: "",
    carBrandId: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
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

        setBrands(responseData.data);
      } catch (error: any) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: error.message,
        }));
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]:
        e.target.value.trim() === "" ? "Este campo es obligatorio." : "",
    }));
  };

  const handleSubmit = async () => {
    const formErrors: Record<string, string> = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (value.trim() === "") {
        formErrors[key] = "Este campo es obligatorio.";
      } else if (parseInt(formData.seatingCapacity) < 2) {
        formErrors.seatingCapacity =
          "La cantidad de asientos debe ser al menos 2.";
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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/car-model/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear el modelo de vehículo.");
      }

      const responseData = await response.json();

      if (!responseData.success) {
        throw new Error(
          responseData.message || "Error al crear el modelo de vehículo."
        );
      }

      // Éxito al crear el modelo de vehículo
      setShowSuccessModal(true);
      // Lógica adicional según sea necesario, como redirigir a una página diferente
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: error.message,
      }));
    }
  };

  return (
    <section className="border rounded p-4 my-4 bg-white">
      <h2 className="text-lg font-semibold">Gestor de Modelos de Vehículos</h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Nombre */}
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
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.name ? "border-red-500" : "border"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            placeholder="Ingrese el nombre del modelo"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        {/* Categoría */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Categoría
          </label>
          <select
            id="category"
            name="category"
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.category ? "border-red-500" : "border"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione</option>
            <option value="Autobús">Autobús</option>
            <option value="Automóvil">Automóvil</option>
            <option value="Camioneta">Camioneta</option>
            <option value="Camión">Camión</option>
            <option value="Furgoneta">Furgoneta</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">{errors.category}</p>
          )}
        </div>
        {/* Tipo de Gasolina */}
        <div>
          <label
            htmlFor="fuelType"
            className="block text-sm font-medium text-gray-700"
          >
            Tipo de Gasolina
          </label>
          <select
            id="fuelType"
            name="fuelType"
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.fuelType ? "border-red-500" : "border"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            value={formData.fuelType}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Diésel">Diésel</option>
            <option value="Eléctrico">Eléctrico</option>
            <option value="Híbrido">Híbrido</option>
          </select>
          {errors.fuelType && (
            <p className="text-red-500 text-xs mt-1">{errors.fuelType}</p>
          )}
        </div>
        {/* Capacidad de Asientos */}
        <div>
          <label
            htmlFor="seatingCapacity"
            className="block text-sm font-medium text-gray-700"
          >
            Capacidad de Asientos
          </label>
          <input
            type="number"
            id="seatingCapacity"
            name="seatingCapacity"
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.seatingCapacity ? "border-red-500" : "border"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            placeholder="Ingrese la cantidad de asientos"
            value={formData.seatingCapacity}
            onChange={handleInputChange}
            required
          />
          {errors.seatingCapacity && (
            <p className="text-red-500 text-xs mt-1">
              {errors.seatingCapacity}
            </p>
          )}
        </div>
        {/* Tipo de Transmisión */}
        <div>
          <label
            htmlFor="transmissionType"
            className="block text-sm font-medium text-gray-700"
          >
            Tipo de Transmisión
          </label>
          <select
            id="transmissionType"
            name="transmissionType"
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.transmissionType ? "border-red-500" : "border"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            value={formData.transmissionType}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione</option>
            <option value="Manual">Manual</option>
            <option value="Automático">Automático</option>
            <option value="Semi-automático">Semi-automático</option>
          </select>
          {errors.transmissionType && (
            <p className="text-red-500 text-xs mt-1">
              {errors.transmissionType}
            </p>
          )}
        </div>
        {/* Marca */}
        <div>
          <label
            htmlFor="carBrandId"
            className="block text-sm font-medium text-gray-700"
          >
            Marca
          </label>
          <select
            id="carBrandId"
            name="carBrandId"
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.carBrandId ? "border-red-500" : "border"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            value={formData.carBrandId}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
          {errors.carBrandId && (
            <p className="text-red-500 text-xs mt-1">{errors.carBrandId}</p>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-end">
        <div className="relative flex-grow flex items-center">
          <button
            type="button"
            className="relative inline-flex items-center space-x-2 px-6 py-2 border text-sm font-medium rounded-md text-white bg-tm10"
            onClick={handleSubmit}
          >
            <span>Crear</span>
          </button>
        </div>
      </div>
      {errors.general && (
        <p className="text-red-500 text-xs mt-4">{errors.general}</p>
      )}
      {showSuccessModal && (
        <SuccessModal successMessage="El modelo de vehículo se creó exitosamente." />
      )}
    </section>
  );
}

export default ModelForm;
