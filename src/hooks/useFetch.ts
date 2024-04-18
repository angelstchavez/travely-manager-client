import { useAuthToken } from "@/contexts/authContext";
import { useEffect, useState } from "react";

type UseFetchState<T> = {
  isLoading: boolean,
  data: T[],
  hasError: null | Error;
}


const useFech=<T>(url: string) => {

  const [fetchState, setFetchState] = useState<UseFetchState<T>>({
    data:[],
    isLoading: true,
    hasError: null,
  });


const token = useAuthToken();

  const getFetch = async () => {
    try {
      setFetchState((oldValue) => ({
        ...oldValue,
        isLoading: true,
      }));


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

      const {data} = await response.json();

      setFetchState({
        data,
        isLoading: false,
        hasError: null,
      });
    } catch (error: any) {
      setFetchState({
        data:[],
        isLoading: false,
        hasError: error.message,
      });
    }
  };

  useEffect(() => {
    if (token) {
      getFetch();      
    }
  }, [token,url]); // Ejecutar el efecto cuando token cambie

  return {
    data: fetchState.data,
    isLoading: fetchState.isLoading,
    hasError: fetchState.hasError,
  };
};

export default useFech;

export const usePost=(url: string) =>{

}



export interface UseDeleteResult {
  deleteItem: () => Promise<boolean>;
}

export const useDelete = (url: string, id: number ): UseDeleteResult => {  
  
  const token = useAuthToken();

  const deleteItem = async () => {
    if (id === null) {
      console.log("El ID es nulo");
      return false;
    }

    try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}userId=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el elemento.');
      }


      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    deleteItem
  };
};


