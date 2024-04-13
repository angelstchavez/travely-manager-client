import React, { ChangeEvent, FormEvent, useState } from "react";
import usePost from "@/hooks/usePost";
import {
  ButtonComponent,
  InputComponent,
  SelectComponent,
} from "@/components/ui";
import { opcionesRol, opcionesTI, FormData } from "@/types";

function EmployeeForm() {
  const [formData, setFormData] = useState<FormData>({
    person: {
      names: "",
      surnames: "",
      identificationType: "",
      identificationNumber: "",
      gender: "Masculino",
      birthdate: "",
      email: "",
      mobilePhone: "",
      createdAt: "2024-03-27T06:33:46.337Z",
    },
    role: "",
    createdAt: "2024-03-27T06:33:46.337Z",
  });

  const { data, isLoading, sendPostRequest } = usePost();

  // const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     person: {
  //       ...prevState.person,
  //       [name]: value,
  //     },
  //   }));
  // };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name in formData.person) {
      setFormData((prevState) => ({
        ...prevState,
        person: {
          ...prevState.person,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  console.log("Que valor esta tomando los input:", formData);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendPostRequest("/employee/create", formData);
  };

  console.log("Esto es lo que me devuelve,", data);

  return (
    <section className="border rounded p-4 my-4 bg-white">
      <h2 className="text-lg font-semibold">Registro de Empleados</h2>

      <form onSubmit={handleSubmit}>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <InputComponent
              name="names"
              label="Nombres"
              type="text"
              placeholder="Ingrese los nombres"
              onChange={handleChange}
            />
          </div>

          <div>
            <InputComponent
              name="surnames"
              label="Apellidos"
              type="text"
              placeholder="Ingrese los apellidos"
              onChange={handleChange}
            />
          </div>

          <div>
            <InputComponent
              name="identificationNumber"
              label="Identificación"
              type="text"
              placeholder="Ingrese la identificacion"
              onChange={handleChange}
            />
          </div>

          <div>
            <SelectComponent
              name="identificationType"
              label="Tipo de indentificación"
              options={opcionesTI}
              onChange={handleChange}
            />
          </div>

          <div>
            <InputComponent
              name="email"
              label="Correo Electrónico"
              type="email"
              placeholder="example@travely.com"
              onChange={handleChange}
            />
          </div>

          <div>
            <InputComponent
              name="birthdate"
              label="Fecha de Naciemiento"
              type="date"
              onChange={handleChange}
            />
          </div>

          <div>
            <InputComponent
              name="mobilePhone"
              label="Numero de Contacto"
              type="text"
              placeholder="Ingrese un numero"
              onChange={handleChange}
            />
          </div>

          <div>
            <SelectComponent
              name="role"
              label="Rol"
              options={opcionesRol}
              onChange={handleChange}
            />
          </div>

          <div>
            <ButtonComponent type="submit">
              <span>Crear</span>
            </ButtonComponent>
          </div>
        </div>
      </form>
    </section>
  );
}

export default EmployeeForm;
