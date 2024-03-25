import React, { useState } from "react";
import Cookies from "js-cookie";
import ErrorModal from "../modals/error-modal";

function EmployeeReport() {
  const [error, setError] = useState<Error | null>(null); // Estado para controlar el error

  const downloadPDF = async () => {
    try {
      // Obtener el valor del cookie y decodificarlo
      const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");

      // Convertir el valor del cookie a objeto JSON
      const cookieData: { data: { token?: string } } = JSON.parse(cookieValue);

      // Obtener el token del objeto JSON
      const token = cookieData.data.token;

      if (!token) {
        throw new Error("No se encontró el token en el cookie.");
      }

      // Realizar la solicitud GET para descargar el PDF
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/employee/get-all-report`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        }
      );

      // Procesar la respuesta para descargar el archivo PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
      setError(error instanceof Error ? error : new Error(String(error))); // Actualizar el estado del error si ocurre un error
    }
  };

  const handleCloseErrorModal = () => {
    setError(null); // Establecer el error como nulo para cerrar el modal
  };

  return (
    <section className="border rounded p-4 my-4 flex justify-end bg-white">
      {error && <ErrorModal errorDescription={error.message} />}{" "}
      {/* Renderizar el ErrorModal si hay un error */}
      <button
        type="button"
        className="relative inline-flex items-center space-x-2 px-6 py-2 border text-sm font-medium rounded-md text-white bg-tm60 hover:bg-tm40"
        onClick={downloadPDF}
      >
        <span>Descargar PDF</span>
      </button>
    </section>
  );
}

export default EmployeeReport;
