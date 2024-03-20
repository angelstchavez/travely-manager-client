import React, { useState } from "react";
import Cookies from "js-cookie";
import SuccessModal from "../modals/success-modal";

interface Brand {
  id: number;
  name: string;
}

interface UpdateBrandModalProps {
  brand: Brand;
  onClose: () => void;
  onConfirm: (updatedBrandData: Brand) => void;
}

const UpdateBrandModal: React.FC<UpdateBrandModalProps> = ({
  brand,
  onClose,
  onConfirm,
}) => {
  const [updatedName, setUpdatedName] = useState<string>(brand.name);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedName(e.target.value);
  };

  const handleSubmit = async () => {
    if (updatedName.trim() === "") {
      setError("El nombre de la marca es obligatorio.");
      return;
    }

    try {
      const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
      const cookieData = JSON.parse(cookieValue);
      const token = cookieData?.data?.token;

      if (!token) {
        throw new Error("No se encontró el token en el cookie.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/car-brand/update`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: brand.id,
            name: updatedName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar la marca de vehículo.");
      }

      const responseData = await response.json();

      if (!responseData.success) {
        throw new Error(
          responseData.message || "Error al actualizar la marca de vehículo."
        );
      }

      onConfirm({ ...brand, name: updatedName });

      setSuccessMessage(
        "La marca de vehículo se actualizó satisfactoriamente."
      );
    } catch (error) {
      setError("Error al actualizar la marca de vehículo.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-tm90 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 mx-5 max-w-md border">
        <div className="text-center">
          <h2 className="mt-4 text-lg font-semibold">Actualizar Marca</h2>
        </div>
        <div className="mt-6">
          <label
            htmlFor="updatedName"
            className="block text-sm font-medium text-gray-700"
          >
            Nuevo Nombre
          </label>
          <input
            type="text"
            id="updatedName"
            name="updatedName"
            value={updatedName}
            onChange={handleInputChange}
            className="w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
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
            className="ml-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
      {/* Renderizamos el modal de éxito fuera del div del modal de actualización */}
      {successMessage && <SuccessModal successMessage={successMessage} />}
    </div>
  );
};

export default UpdateBrandModal;
