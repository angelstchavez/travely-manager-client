import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

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
    brandId: "",
  });
  const [error, setError] = useState<string | null>(null);

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
        setError(error.message as string);
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
  };

  const handleSubmit = async () => {
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
      // Lógica adicional según sea necesario, como redirigir a una página diferente
    } catch (error: any) {
      setError(error.message as string);
    }
  };

  return (
    <section className="border rounded p-4 my-4 bg-white">
      <h2 className="text-lg font-semibold">Gestor de Modelos de Vehículos</h2>
      {/* Inputs adicionales */}
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
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-mdml-1 relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            placeholder="Ingrese el nombre del modelo"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
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
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-mdml-1 relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
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
            {/* Opciones de categoría */}
          </select>
        </div>
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
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-mdml-1 relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            value={formData.fuelType}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Diésel">Diésel</option>
            <option value="Eléctrico">Eléctrico</option>
            <option value="Híbrido">Híbrido</option>
            {/* Opciones de tipo de gasolina */}
          </select>
        </div>
        <div>
          <label
            htmlFor="seatingCapacity"
            className="block text-sm font-medium text-gray-700"
          >
            Capacidad de Asientos
          </label>
          <input
            type="text"
            id="seatingCapacity"
            name="seatingCapacity"
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-mdml-1 relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            placeholder="Ingrese la cantidad de asientos"
            value={formData.seatingCapacity}
            onChange={handleInputChange}
            required
          />
        </div>
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
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-mdml-1 relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            value={formData.transmissionType}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione</option>
            <option value="Manual">Manual</option>
            <option value="Automático">Automático</option>
            <option value="Semi-automático">Semi-automático</option>
            {/* Opciones de tipo de transmisión */}
          </select>
        </div>
        <div>
          <label
            htmlFor="brandId"
            className="block text-sm font-medium text-gray-700"
          >
            Marca
          </label>
          <select
            id="brandId"
            name="brandId"
            className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-mdml-1 relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            value={formData.brandId}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
            {/* Opciones de marca */}
          </select>
        </div>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-end">
        <div className="relative flex-grow flex items-center">
          <button
            type="button"
            className="relative inline-flex items-center space-x-2 px-6 py-2 border text-sm font-medium rounded-md text-customGreen bg-customBlueLigth hover:bg-customerSuperLigth"
            onClick={handleSubmit}
          >
            <span>Crear</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default ModelForm;
