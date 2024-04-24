"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/authContext";

function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuthContext();
  const [errorDescription, setErrorDescription] = useState<string>("");

  const handleInputChange = () => {
    // Limpiar el mensaje de error cuando el usuario comience a escribir en cualquier campo de entrada
    setErrorDescription("");
  };

  const handleForm = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/${username}/${password}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.data || "Error al iniciar sesión.");
      }

      const tokens = responseData; // Aquí deberías ajustar según la estructura de tu respuesta del servidor

      login(tokens);

      return router.push("/admin");
    } catch (error: any) {
      setErrorDescription(error.message || "Error al iniciar sesión.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen px-6 py-8 mx-auto md:h-screen lg:py-0 bg-tm80">
        <div className="w-full bg-white rounded-3xl shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="flex justify-center items-center p-2 shadow bg-tm40 rounded-2xl">
            <a
              href="/"
              className="flex items-center m-3 text-4xl font-bold text-white"
            >
              Travely <span className="text-blue-200">Manager</span>
            </a>
          </div>
          <div className="p-2 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-tm40 md:text-2xl">
              Iniciar sesión en tu cuenta
            </h1>
            <form className="space-y-4 md:space-y-4" onSubmit={handleForm}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium"
                >
                  Nombre de usuario:
                </label>
                <input
                  autoComplete="off"
                  onChange={(e) => {
                    setUsername(e.target.value);
                    handleInputChange(); // Limpiar el mensaje de error al escribir en el campo de usuario
                  }}
                  required
                  type="text"
                  name="username"
                  id="username"
                  className="w-full pl-3 pr-10 focus:outline-none sm:text-sm relative inline-flex items-center space-x-2 px-4 py-2 rounded-md bg-zinc-100"
                  placeholder="username"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium"
                >
                  Contraseña:
                </label>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                    handleInputChange(); // Limpiar el mensaje de error al escribir en el campo de contraseña
                  }}
                  required
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••••"
                  className="border w-full pl-3 pr-10 focus:outline-none sm:text-sm relative inline-flex items-center space-x-2 px-4 py-2 rounded-md bg-zinc-100"
                />
              </div>
              {errorDescription && (
                <p className="text-red-500 text-sm mt-2">{errorDescription}</p>
              )}
              <button
                type="submit"
                className="border w-full flex justify-center items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-tm20 hover:bg-tm10"
              >
                Iniciar sesión
              </button>
              <p className="text-sm font-normal text-zinc-700">
                ¿Olviaste tu contraseña?{" "}
                <a
                  href="/register"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Restablecer
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
