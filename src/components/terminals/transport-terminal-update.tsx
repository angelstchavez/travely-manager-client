/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import SuccessModal from "../modals/success-modal";

interface TransportTerminal {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  department: {
    id: string;
    name: string;
  };
  city: {
    id: number;
    name: string;
  };
}

interface City {
  id: number;
  name: string;
}

interface Department {
  id: string;
  name: string;
}

interface TransportTerminalUpdatePros {
  terminal: TransportTerminal;
  onClose: () => void;
  onConfirm: (updatedTransportTerminalData: TransportTerminal) => Promise<void>;
}

function TransportTerminalUpdate({
  terminal,
  onClose,
}: TransportTerminalUpdatePros) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [formData, setFormData] = useState({
    name: terminal.name,
    address: terminal.address,
    phoneNumber: terminal.phoneNumber,
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/deparment/get-all`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los departamentos.");
      }

      const responseData = await response.json();

      if (!responseData.success || !responseData.data) {
        throw new Error("La respuesta no contiene datos válidos.");
      }

      setDepartments(responseData.data);

      if (terminal.city) {
        setSelectedDepartment(terminal.department.id);
        setSelectedCity(terminal.city.id.toString());
        fetchCities(terminal.department.id.toString()); // Assuming fetchCities expects a string parameter
      }
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: error.message,
      }));
    }
  };

  const fetchCities = async (departmentId: string) => {
    try {
      const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
      const cookieData = JSON.parse(cookieValue);
      const token = cookieData.data.token;

      if (!token) {
        throw new Error("No se encontró el token en el cookie.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/city/get-cities-by-deparment-id/${departmentId}`,
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

      setCities(responseData.data);
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: error.message,
      }));
    }
  };

  const handleDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDepartment = event.target.value;
    setSelectedDepartment(selectedDepartment);
    setSelectedCity("");
    if (selectedDepartment) {
      fetchCities(selectedDepartment);
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    let errorMessage = "";
    if (e.target.name === "phoneNumber") {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(e.target.value)) {
        errorMessage = "El número de teléfono debe tener 10 dígitos.";
      }
    } else {
      errorMessage =
        e.target.value.trim() === "" ? "Este campo es obligatorio." : "";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: errorMessage,
    }));
  };

  const handleSubmit = async () => {
    const formErrors: { [key: string]: string } = {};

    // Validar campos requeridos
    Object.entries(formData).forEach(([key, value]) => {
      let errorMessage = "";
      if (value.trim() === "") {
        errorMessage = "Este campo es obligatorio.";
      }
      if (key === "phoneNumber") {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(value)) {
          errorMessage = "El número de teléfono debe tener 10 dígitos.";
        }
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
        id: terminal.id,
        name: formData.name,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        isActive: true,
        CityId: parseInt(selectedCity),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/transport-terminal/update`,
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
        throw new Error("Error al actualizar el terminal de transporte.");
      }

      const responseData = await response.json();

      if (!responseData.success) {
        throw new Error(
          responseData.message ||
            "Error al actualizar el terminal de transporte."
        );
      }

      setSuccessMessage(
        "El terminal de transporte se actualizó satisfactoriamente."
      );
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
        <h2 className="text-lg font-semibold">
          Información de Terminal de Transporte
        </h2>
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
              className={`w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Ingrese el nombre de la terminal"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Dirección
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className={`w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
                errors.address ? "border-red-500" : ""
              }`}
              placeholder="Ingrese la dirección de la terminal"
              value={formData.address}
              onChange={handleInputChange}
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700"
            >
              Departamento
            </label>
            <select
              id="department"
              name="department"
              value={selectedDepartment}
              onChange={handleDepartmentChange}
              className={`w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${
                errors.department ? "border-red-500" : ""
              }`}
            >
              <option value="">Seleccione</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="text-red-500 text-xs mt-1">{errors.department}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              Ciudad
            </label>
            <select
              id="city"
              name="city"
              value={selectedCity}
              onChange={handleCityChange}
              disabled={!selectedDepartment}
              className={`w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${
                errors.city ? "border-red-500" : ""
              }`}
            >
              <option value="">Seleccione</option>
              {cities.length > 0 &&
                cities.map((city) => (
                  <option key={city.id} value={city.id.toString()}>
                    {city.name}
                  </option>
                ))}
            </select>
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Número de Teléfono
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              className={`w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
                errors.phoneNumber ? "border-red-500" : ""
              }`}
              placeholder="Ingrese el número de teléfono de la terminal"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
            )}
          </div>
        </div>
        {errors.general && (
          <p className="text-red-500 text-xs mt-4">{errors.general}</p>
        )}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-end">
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
        {successMessage && <SuccessModal successMessage={successMessage} />}
      </div>
    </div>
  );
}

export default TransportTerminalUpdate;
