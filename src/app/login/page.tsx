"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/authContext";
import ErrorComponent from "@/components/utils/error-message";
import Header from "@/components/utils/header";

function Page() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { login } = useAuthContext();
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/${username}/${password}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      setErrorMessage(errorData.message);

      // Limpiar el temporizador existente si existe
      if (timerId) {
        clearTimeout(timerId);
      }

      // Establecer un nuevo temporizador para cerrar el mensaje después de 10 segundos
      const newTimerId = setTimeout(() => {
        clearErrorMessage();
      }, 10000);

      // Guardar el ID del nuevo temporizador en el estado
      setTimerId(newTimerId);

      return;
    }

    const tokens = await response.json();
    login(tokens);

    return router.push("/admin");
  };

  return (
    <>
      <Header></Header>
      <div className="flex flex-col items-center justify-center h-screen px-6 py-8 mx-auto md:h-screen lg:py-0 bg-gray-50">
        <a
          href="/"
          className="flex items-center mb-6 text-5xl font-bold text-gray-900"
        >
          Travely Manager
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Iniciar sesión en tu cuenta
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleForm}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Nombre de usuario
                </label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  type="text"
                  name="username"
                  id="username"
                  className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm ml-1 relative inline-flex items-center space-x-2 px-4 py-2 border text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  placeholder="username"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Contraseña
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  name="password"
                  id="password"
                  placeholder="•••••••••••"
                  className="w-full pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm ml-1 relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                />
              </div>
              {errorMessage && (
                <ErrorComponent
                  errorMessage={errorMessage}
                  onClose={clearErrorMessage}
                />
              )}
              <button
                type="submit"
                className="w-full ml-1 flex justify-center items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Iniciar sesión
              </button>
              <p className="text-sm font-light text-gray-500">
                ¿No tienes una cuenta aún?{" "}
                <a
                  href="/register"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Regístrate
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
