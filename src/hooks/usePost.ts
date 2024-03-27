import { useAuthToken } from "@/contexts/authContext";
import React, { useEffect, useState } from "react";

const usePost = () => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: null,
  });

  const token = useAuthToken();

  const sendPostRequest = async (url: string, data: any) => {
    try {
      setState({
        ...state,
        isLoading: true,
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("La respuesta de la red no fue correcta");
      }

      const jsonData = await response.json();

      setState({
        data: jsonData,
        isLoading: false,
        hasError: null,
      });
    } catch (error: any) {
      setState({
        data: null,
        isLoading: false,
        hasError: error.message,
      });
    }
  };

  useEffect(() => {
    // Llamar a sendPostRequest solo cuando el token cambie
    sendPostRequest;
  }, [token]); // Ejecutar el efecto cuando token cambie

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
    sendPostRequest, // Exportar la función sendPostRequest para su uso externo
  };
};

export default usePost;
