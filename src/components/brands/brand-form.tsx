import React, { useState } from "react";
import Cookies from "js-cookie";
import SuccessModal from "../modals/success-modal";

interface Brand {
  id: number;
  name: string;
}

function BrandForm() {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorDescription, setErrorDescription] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> // Cambiamos el tipo de evento aquí
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Limpiamos el mensaje de error al empezar a escribir en el input
    setErrorDescription("");
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/car-brand/create`,
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

      const responseData = await response.json();

      if (!response.ok || !responseData.success) {
        throw new Error(
          responseData.data || "Error al crear la marca de vehículo."
        );
      }

      // Si la solicitud fue exitosa, mostramos el modal de éxito
      setSuccessMessage("La marca de vehículo se creó satisfactoriamente.");
    } catch (error: any) {
      setErrorDescription(
        error.message || "Error al crear la marca de vehículo."
      );
    }
  };

  return (
    <section className="border rounded p-4 my-4 bg-white">
      <h2 className="text-lg font-semibold">Crear Marca de Vehículo</h2>
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
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.name ? "border-red-500" : "border"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            placeholder="Ingrese el nombre del modelo"
            value={formData.name}
            onInput={handleInputChange} // Usamos onInput en lugar de onChange
            required
            maxLength={50}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
      </div>
      {errorDescription && (
        <p className="text-red-500 text-sm mt-2 font-bold">{errorDescription}</p>
      )}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-end">
        <div className="relative flex-grow flex items-center">
          <button
            type="button"
            className="relative inline-flex items-center space-x-2 px-6 py-2 border text-sm font-medium rounded-md text-white bg-tm10 hover:bg-customerSuperLigth"
            onClick={handleSubmit}
          >
            <span>Crear</span>
          </button>
        </div>
      </div>
      {successMessage && <SuccessModal successMessage={successMessage} />}
    </section>
  );
}

export default BrandForm;
