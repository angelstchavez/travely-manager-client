"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/authContext";
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
      return;
    }

    const tokens = await response.json();
    login(tokens);

    return router.push("/admin");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen px-6 py-8 mx-auto md:h-screen lg:py-0 bg-tm80">
        <a
          href="/"
          className="flex items-center mb-6 text-4xl font-bold text-white"
        >
          Travely Manager
        </a>
        <div className="w-full bg-tm60 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-tm00 md:text-2xl">
              Iniciar sesión en tu cuenta
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleForm}>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Nombre de usuario:
                </label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  type="text"
                  name="username"
                  id="username"
                  className="text-white w-full pl-3 pr-10 mt-1 focus:outline-none sm:text-sm ml-1 relative inline-flex items-center space-x-2 px-4 py-2 rounded-md bg-tm80"
                  placeholder="username"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Contraseña:
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••••"
                  className="text-white w-full pl-3 pr-10 mt-1 focus:outline-none sm:text-sm ml-1 relative inline-flex items-center space-x-2 px-4 py-2 rounded-md bg-tm80"
                />
              </div>
              <button
                type="submit"
                className="w-full ml-1 flex justify-center items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md text-white bg-tm20 hover:bg-tm10"
              >
                Iniciar sesión
              </button>
              <p className="text-sm font-light text-zinc-200">
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
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-tm90 via-transparent to-transparent"></div>
    </>
  );
}

export default Page;
