import { useAuthToken } from "@/contexts/authContext";
import { useEffect, useState } from "react";

const useFech = (url: string) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: null,
  });

  const token = useAuthToken();

  const getFetch = async () => {
    try {
      setState((oldValue) => ({
        ...oldValue,
        isLoading: true,
      }));

      console.log("Este es el token", token);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setState({
        data,
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
    getFetch();
  }, [token]); // Ejecutar el efecto cuando token cambie

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};

export default useFech;
