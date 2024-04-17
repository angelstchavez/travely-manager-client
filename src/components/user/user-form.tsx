import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import SuccessModal from "../modals/success-modal";

interface User {
  id: number;
  username: string;
  password: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

function UserForm() {
  const [formData, setFormData] = useState<User>({
    id: 0,
    username: "",
    password: "",
    role: "",
    isActive: true,
    createdAt: new Date().toISOString().split("T")[0],
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorDescription, setErrorDescription] = useState<string>("");

  useEffect(() => {
    // Validar la coincidencia de contraseñas en cada cambio
    if (formData.password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Las contraseñas no coinciden.",
      }));
    } else {
      setErrors((prevErrors) => {
        const { confirmPassword, ...rest } = prevErrors;
        return rest;
      });
    }
  }, [formData.password, confirmPassword]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });

      setErrorDescription("");
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: value.trim() === "" ? "Este campo es obligatorio." : "",
      }));
    }
  };

  const handleSubmit = async () => {
    const formErrors: Record<string, string> = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === "string" && value.trim() === "") {
        formErrors[key] = "Este campo es obligatorio.";
      }
    });

    // Validación de coincidencia de contraseña
    if (formData.password !== confirmPassword) {
      formErrors["confirmPassword"] = "Las contraseñas no coinciden.";
    }

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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
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
        throw new Error(responseData.data || "Error al registrar el usuario.");
      }

      setSuccessMessage("El usuario se registró satisfactoriamente.");
    } catch (error: any) {
      setErrorDescription(error.message || "Error al registrar el usuario.");
    }
  };

  return (
    <section className="border rounded p-4 my-4 bg-white">
      <h2 className="text-lg font-semibold">Registrar Usuario</h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre de Usuario
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.username ? "border-red-500" : "border"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            placeholder="Ingrese el nombre de usuario"
            value={formData.username}
            onChange={handleInputChange}
            required
            maxLength={50}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.password ? "border-red-500" : "border"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            placeholder="Ingrese la contraseña"
            value={formData.password}
            onChange={handleInputChange}
            required
            maxLength={50}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirmar Contraseña
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.confirmPassword ? "border-red-500" : "border"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            placeholder="Confirme la contraseña"
            value={confirmPassword}
            onChange={handleInputChange}
            required
            maxLength={50}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Rol
          </label>
          <select
            id="role"
            name="role"
            className={`w-full pl-3 pr-10 mt-1 border focus:outline-none sm:text-sm rounded-md ${
              errors.role ? "border-red-500" : "border"
            } relative inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
            value={formData.role}
            onChange={handleInputChange}
            required
          >
            <option value="">Seleccione</option>
            <option value="Administrador">Administrador</option>
            <option value="Conductor">Conductor</option>
            <option value="Vendedor">Vendedor</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-xs mt-1">{errors.role}</p>
          )}
        </div>
      </div>
      {errorDescription && (
        <p className="text-red-500 text-sm mt-2 font-bold">
          {errorDescription}
        </p>
      )}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-end">
        <div className="relative flex-grow flex items-center">
          <button
            type="button"
            className="relative inline-flex items-center space-x-2 px-6 py-2 border text-sm font-medium rounded-md text-white bg-tm10 hover:bg-customerSuperLigth"
            onClick={handleSubmit}
          >
            <span>Registrar</span>
          </button>
        </div>
      </div>
      {successMessage && <SuccessModal successMessage={successMessage} />}
    </section>
  );
}

export default UserForm;
