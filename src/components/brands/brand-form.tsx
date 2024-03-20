import React, { useState } from "react";
import ConfirmationModal from "../modals/confirmation-modal";
import ErrorModal from "../modals/error-modal";
import Cookies from "js-cookie";
import SuccessModal from "../modals/success-modal";

function BrandForm() {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [brandName, setBrandName] = useState<string>("");
  const [isBrandNameValid, setIsBrandNameValid] = useState<boolean>(false);
  const handleConfirm = async () => {
    try {
      if (!brandName) {
        throw new Error("El nombre de la marca es obligatorio.");
      }

      const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
      const cookieData: { data: { token?: string } } = JSON.parse(cookieValue);
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
          },
          body: JSON.stringify({ name: brandName }),
        }
      );

      if (response.ok) {
        console.log("Marca de vehículo creada");
        setShowConfirmation(false);
        setShowSuccess(true);
      } else {
        const errorData = await response.json();
        const errorMessageFromBackend =
          errorData.message || "Error al crear la marca de vehículo";
        throw new Error(errorMessageFromBackend);
      }
    } catch (error: any) {
      console.error("Error al crear la marca de vehículo:", error.message);
      setShowError(true);
      setErrorMessage(error.message);
    }
  };

  // Función para validar el campo de nombre de marca
  const validateBrandName = (name: string) => {
    const isValid = name.trim() !== ""; // Verifica si el campo no está vacío
    setIsBrandNameValid(isValid);
  };

  const handleCancel = () => {
    console.log("Creación de marca de vehículo cancelada");
    setShowConfirmation(false);
  };

  return (
    <section className="border rounded p-4 my-4 bg-white">
      <h2 className="text-lg font-semibold">Crear Marca de Vehículo</h2>
      <div className="mt-4 flex items-center">
        <input
          type="text"
          id="brandName"
          name="brandName"
          className="block w-full sm:w-40 rounded-md border-0 py-1.5 pl-3 pr-10 sm:pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          placeholder="Nombre"
          value={brandName}
          onChange={(e) => {
            setBrandName(e.target.value);
            validateBrandName(e.target.value); // Validar el campo de nombre
          }}
        />
        <button
          type="button"
          className={`m-2 relative inline-flex items-center space-x-2 px-6 py-2 border text-sm font-medium rounded-md text-white bg-customBlueLigth hover:bg-customerSuperLigth ${!isBrandNameValid && "opacity-50 cursor-not-allowed"}`}
          onClick={() => setShowConfirmation(true)}
          disabled={!isBrandNameValid}
        >
          <span>Crear</span>
        </button>
      </div>
      {!isBrandNameValid && (
        <p className="text-red-500 text-xs">El nombre es obligatorio.</p>
      )}
      {showConfirmation && (
        <ConfirmationModal
          processText="crear la marca de vehículo"
          onAccept={handleConfirm}
          onCancel={handleCancel}
          actionType="register"
        />
      )}
      {showSuccess && (
        <SuccessModal successMessage="Marca de vehículo creada con éxito" />
      )}
      {showError && <ErrorModal errorDescription={errorMessage} />}
    </section>
  );
}

export default BrandForm;
