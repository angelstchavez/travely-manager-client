import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import DataTable, { TableColumn } from "react-data-table-component";

interface Brand {
  id: number;
  name: string;
}

const BrandList: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
        const cookieData: { data: { token?: string } } =
          JSON.parse(cookieValue);
        const token = cookieData.data.token;

        if (!token) {
          throw new Error("No se encontró el token en el cookie.");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/car-brand/get-all?page=${currentPage}&perPage=${itemsPerPage}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener las marcas de vehículos.");
        }

        const responseData = await response.json();

        if (!responseData.success || !responseData.data) {
          throw new Error("La respuesta no contiene datos válidos.");
        }

        setBrands(responseData.data);
        setFilteredBrands(responseData.data); // Inicialmente, mostrar todas las marcas
        setLoading(false); // Se establece la carga como completada
      } catch (error: any) {
        setError(error.message);
        setLoading(false); // Se establece la carga como completada aunque haya errores
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  const columns: TableColumn<Brand>[] = [
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Eliminar",
      cell: (row) => (
        <button onClick={() => handleDelete(row)}>Eliminar</button>
      ),
    },
  ];

  useEffect(() => {
    const filtered = brands.filter((brand) =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBrands(filtered);
  }, [brands, searchTerm]);

  const handleDelete = async (brand: Brand) => {
    try {
      const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
      const cookieData: { data: { token?: string } } = JSON.parse(cookieValue);
      const token = cookieData.data.token;

      if (!token) {
        throw new Error("No se encontró el token en el cookie.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/car-brand/delete?carBrandId=${brand.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        const updatedBrands = brands.filter((b) => b.id !== brand.id);
        setBrands(updatedBrands);
        setSearchTerm(""); // Limpiar el término de búsqueda
      } else {
        throw new Error("Error al eliminar la marca de vehículo.");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const totalPages = Math.ceil(filteredBrands.length / itemsPerPage);

  return (
    <section className="border rounded p-4 my-4 bg-white grid grid-col-1">
      {error && <div>Error: {error}</div>}
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      />
      <DataTable
        columns={columns}
        data={filteredBrands}
        pagination
        paginationPerPage={itemsPerPage}
        paginationTotalRows={brands.length}
        onChangePage={(page) => setCurrentPage(page)}
        progressPending={loading}
      />
    </section>
  );
};

export default BrandList;
