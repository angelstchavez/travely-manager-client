import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import SuccessModal from "../modals/success-modal";
import CustomTitleIcon from "../utils/icons/custom-title-icon";

interface RoutePageProps {}

interface Department {
  id: number;
  name: string;
}

interface City {
  id: string;
  name: string;
}

const RouteForm: React.FC<RoutePageProps> = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [originCities, setOriginCities] = useState<City[]>([]);
  const [destinationCities, setDestinationCities] = useState<City[]>([]);
  const [selectedOriginDepartment, setSelectedOriginDepartment] =
    useState<number>(0);
  const [selectedOriginCity, setSelectedOriginCity] = useState<string>("");
  const [selectedDestinationDepartment, setSelectedDestinationDepartment] =
    useState<number>(0);
  const [selectedDestinationCity, setSelectedDestinationCity] =
    useState<string>("");
  const [tripDuration, setTripDuration] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string>("");

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
      } catch (error: any) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: error.message,
        }));
      }
    };

    fetchData();
  }, []);

  const fetchCities = async (departmentId: number, isOrigin: boolean) => {
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
        throw new Error("Error al obtener las ciudades.");
      }

      const responseData = await response.json();

      if (!responseData.success || !responseData.data) {
        throw new Error("La respuesta no contiene datos válidos.");
      }

      if (isOrigin) {
        setOriginCities(responseData.data);
        setSelectedOriginCity(""); // Reiniciamos la ciudad seleccionada
      } else {
        setDestinationCities(responseData.data);
        setSelectedDestinationCity(""); // Reiniciamos la ciudad seleccionada
      }
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: error.message,
      }));
    }
  };

  const handleOriginDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDepartment = parseInt(event.target.value);
    setSelectedOriginDepartment(selectedDepartment);
    fetchCities(selectedDepartment, true);
    // Limpiar el error del departamento de origen cuando cambia
    setErrors((prevErrors) => ({
      ...prevErrors,
      originDepartment: "",
    }));
  };

  const handleDestinationDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDepartment = parseInt(event.target.value);
    setSelectedDestinationDepartment(selectedDepartment);
    fetchCities(selectedDepartment, false);
    // Limpiar el error del departamento de destino cuando cambia
    setErrors((prevErrors) => ({
      ...prevErrors,
      destinationDepartment: "",
    }));
  };

  const handleOriginCityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCity = event.target.value;
    setSelectedOriginCity(selectedCity);
    if (selectedDestinationCity !== selectedCity) {
      // Limpiar los errores de las ciudades cuando cambia la ciudad de origen
      setErrors((prevErrors) => ({
        ...prevErrors,
        originCity: "",
        destinationCity: "",
      }));
    }
  };

  const handleDestinationCityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCity = event.target.value;
    setSelectedDestinationCity(selectedCity);
    if (selectedOriginCity !== selectedCity) {
      // Limpiar los errores de las ciudades cuando cambia la ciudad de destino
      setErrors((prevErrors) => ({
        ...prevErrors,
        originCity: "",
        destinationCity: "",
      }));
    }
  };

  const handleTripDurationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setTripDuration(value);
    // Limpiar el error de la duración del viaje cuando cambia
    setErrors((prevErrors) => ({
      ...prevErrors,
      tripDuration: "",
    }));
  };

  const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDistance(value);
    // Limpiar el error de la distancia cuando cambia
    setErrors((prevErrors) => ({
      ...prevErrors,
      distance: "",
    }));
  };

  const handleSubmit = async () => {
    const formErrors: { [key: string]: string } = {};

    if (selectedOriginDepartment === 0) {
      formErrors.originDepartment = "Seleccione un departamento de origen.";
    }

    if (selectedOriginCity === "") {
      formErrors.originCity = "Seleccione una ciudad de origen.";
    }

    if (selectedDestinationDepartment === 0) {
      formErrors.destinationDepartment =
        "Seleccione un departamento de destino.";
    }

    if (selectedDestinationCity === "") {
      formErrors.destinationCity = "Seleccione una ciudad de destino.";
    }

    if (selectedOriginCity === selectedDestinationCity) {
      formErrors.originCity =
        "La ciudad de origen no puede ser la misma que la ciudad de destino.";
      formErrors.destinationCity =
        "La ciudad de destino no puede ser la misma que la ciudad de origen.";
    }

    if (tripDuration.trim() === "") {
      formErrors.tripDuration = "Ingrese la duración del viaje.";
    }

    if (distance.trim() === "") {
      formErrors.distance = "Ingrese la distancia del viaje.";
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/travel-route/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: JSON.stringify({
            departureCityId: selectedOriginCity,
            destinationCityId: selectedDestinationCity,
            durationHours: parseInt(tripDuration),
            distanceKilometers: parseInt(distance),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear la ruta de viaje.");
      }

      const responseData = await response.json();

      if (!responseData.success) {
        throw new Error(
          responseData.message || "Error al crear la ruta de viaje."
        );
      }

      setSelectedOriginDepartment(0);
      setSelectedOriginCity("");
      setSelectedDestinationDepartment(0);
      setSelectedDestinationCity("");
      setTripDuration("");
      setDistance("");

      setSuccessMessage("La ruta de viaje se creó satisfactoriamente.");
    } catch (error: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: error.message,
      }));
    }
  };

  return (
    <div>
      <section className="border rounded p-4 my-4 bg-white">
        <CustomTitleIcon icon="lucide:route" text="Registrar ruta de viaje" />
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="originDepartment"
              className="block text-sm font-medium text-gray-700"
            >
              Departamento Origen
            </label>
            <select
              id="originDepartment"
              name="originDepartment"
              className={`w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
                errors.originDepartment ? "border-red-500" : ""
              }`}
              onChange={handleOriginDepartmentChange}
              value={selectedOriginDepartment}
            >
              <option value={0}>Seleccione</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
            {errors.originDepartment && (
              <p className="text-red-500 text-xs mt-1">
                {errors.originDepartment}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="originCity"
              className="block text-sm font-medium text-gray-700"
            >
              Ciudad Origen
            </label>
            <select
              id="originCity"
              name="originCity"
              className={`w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
                errors.originCity ? "border-red-500" : ""
              }`}
              value={selectedOriginCity}
              disabled={!selectedOriginDepartment}
              onChange={handleOriginCityChange}
            >
              <option value="">Seleccione</option>
              {originCities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.originCity && (
              <p className="text-red-500 text-xs mt-1">{errors.originCity}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="destinationDepartment"
              className="block text-sm font-medium text-gray-700"
            >
              Departamento Destino
            </label>
            <select
              id="destinationDepartment"
              name="destinationDepartment"
              className={`w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
                errors.destinationDepartment ? "border-red-500" : ""
              }`}
              onChange={handleDestinationDepartmentChange}
              value={selectedDestinationDepartment}
            >
              <option value={0}>Seleccione</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
            {errors.destinationDepartment && (
              <p className="text-red-500 text-xs mt-1">
                {errors.destinationDepartment}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="destinationCity"
              className="block text-sm font-medium text-gray-700"
            >
              Ciudad Destino
            </label>
            <select
              id="destinationCity"
              name="destinationCity"
              className={`w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${
                errors.destinationCity ? "border-red-500" : ""
              }`}
              value={selectedDestinationCity}
              disabled={!selectedDestinationDepartment}
              onChange={handleDestinationCityChange}
            >
              <option value="">Seleccione</option>
              {destinationCities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.destinationCity && (
              <p className="text-red-500 text-xs mt-1">
                {errors.destinationCity}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="tripDuration"
              className="block text-sm font-medium text-gray-700"
            >
              Duración del Viaje (Horas)
            </label>
            <input
              type="number"
              id="tripDuration"
              name="tripDuration"
              className={`w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
                errors.tripDuration ? "border-red-500" : ""
              }`}
              placeholder="Ingrese la duración del viaje"
              value={tripDuration}
              onChange={handleTripDurationChange}
              min="0"
              step="1"
            />
            {errors.tripDuration && (
              <p className="text-red-500 text-xs mt-1">{errors.tripDuration}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="distance"
              className="block text-sm font-medium text-gray-700"
            >
              Distancia (km)
            </label>
            <input
              type="number"
              id="distance"
              name="distance"
              className={`w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
                errors.distance ? "border-red-500" : ""
              }`}
              placeholder="Ingrese la distancia"
              value={distance}
              onChange={handleDistanceChange}
            />
            {errors.distance && (
              <p className="text-red-500 text-xs mt-1">{errors.distance}</p>
            )}
          </div>
        </div>
        {errors.general && (
          <p className="text-red-500 text-xs mt-4">{errors.general}</p>
        )}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-end">
          <div className="relative flex-grow flex items-center">
            <button
              type="button"
              className="relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-white bg-tm10"
              onClick={handleSubmit}
            >
              <span>Crear</span>
            </button>
          </div>
        </div>
      </section>
      {successMessage && <SuccessModal successMessage={successMessage} />}
    </div>
  );
};

export default RouteForm;
