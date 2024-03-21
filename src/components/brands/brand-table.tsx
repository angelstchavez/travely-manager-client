import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import DataTable, { TableColumn } from "react-data-table-component";
import Loading from "../utils/loading";
import ConfirmationModal from "../modals/confirmation-modal";
import UpdateBrandModal from "./brand-update";
import SuccessModal from "../modals/success-modal";
import { Icon } from "@iconify/react/dist/iconify.js";

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
  const [brandToDelete, setBrandToDelete] = useState<Brand | null>(null);
  const [brandToUpdate, setBrandToUpdate] = useState<Brand | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");

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
        setFilteredBrands(responseData.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  const handleDeleteConfirmation = async () => {
    if (brandToDelete) {
      try {
        const cookieValue = decodeURIComponent(Cookies.get("authTokens") || "");
        const cookieData = JSON.parse(cookieValue);
        const token = cookieData?.data?.token;

        if (!token) {
          throw new Error("No se encontró el token en el cookie.");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/car-brand/delete?carBrandId=${brandToDelete.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (response.ok) {
          const updatedBrands = brands.filter(
            (brand) => brand.id !== brandToDelete.id
          );
          setBrands(updatedBrands);
          setFilteredBrands(updatedBrands);
          setBrandToDelete(null);
        } else {
          throw new Error("Error al eliminar la marca de vehículo.");
        }
      } catch (error) {
        setError("Error al eliminar la marca de vehículo.");
      }
    }
  };

  const handleUpdate = (brand: Brand) => {
    setBrandToUpdate(brand);
  };

  const handleUpdateModalClose = () => {
    setBrandToUpdate(null);
  };

  const handleUpdateConfirmation = async (updatedBrandData: Brand) => {
    setBrandToUpdate(null);
    setSuccessMessage("La marca de vehículo se actualizó satisfactoriamente.");

    // Limpiar el mensaje de éxito después de 3 segundos
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleDeleteCancel = () => {
    setBrandToDelete(null);
  };

  const handleDelete = (brand: Brand) => {
    setBrandToDelete(brand);
  };

  const columns: TableColumn<Brand>[] = [
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontSize: 14,
      },
    },
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <button
            className="bg-orange-600 rounded text-white mr-2 p-1"
            onClick={() => handleUpdate(row)}
          >
            <Icon icon="lets-icons:edit-fill" className="text-xl" />
          </button>
          <button
            className="bg-red-600 rounded text-white p-1"
            onClick={() => handleDelete(row)}
          >
            <Icon icon="mdi:delete" className="text-xl" />
          </button>
        </>
      ),
    },
  ];

  useEffect(() => {
    const filtered = brands.filter((brand) =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBrands(filtered);
  }, [brands, searchTerm]);

  const totalPages = Math.ceil(filteredBrands.length / itemsPerPage);

  return (
    <>
      <section className="border rounded p-4 my-4 bg-white">
        <h2 className="text-lg bg-tm40 rounded p-1 text-white text-center">
          Marcas de vehículos
        </h2>
        <div className="m-2"></div>
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-3 pr-10 mt-1 border-gray-300 focus:outline-none sm:text-sm rounded-md relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        />
        {error && <div>Error: {error}</div>}
        <div className="m-3"></div>
        <div className="grid grid-col-1 border rounded">
          <DataTable
            columns={columns}
            data={filteredBrands}
            pagination
            paginationPerPage={itemsPerPage}
            paginationTotalRows={brands.length}
            onChangePage={(page) => setCurrentPage(page)}
            progressPending={loading}
            progressComponent={<Loading />}
          />
        </div>
        {brandToDelete && (
          <ConfirmationModal
            processText={`eliminar la marca de vehículo "${brandToDelete.name}"`}
            onAccept={handleDeleteConfirmation}
            onCancel={handleDeleteCancel}
            actionType="delete"
          />
        )}
      </section>
      {brandToUpdate && (
        <UpdateBrandModal
          brand={brandToUpdate}
          onClose={handleUpdateModalClose}
          onConfirm={handleUpdateConfirmation}
        />
      )}
      {successMessage && <SuccessModal successMessage={successMessage} />}
    </>
  );
};

export default BrandList;
