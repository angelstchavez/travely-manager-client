interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

interface FormData {
  person: {
    names: string;
    surnames: string;
    identificationNumber: string;
    identificationType: string;
    gender: string;
    birthdate: string;
    email: string;
    mobilePhone: string;
    createdAt: string;
  };
  role: string;
  createdAt: string;
}

export type { ButtonProps, SelectProps, InputProps, FormData };

const opcionesRol = [
  { value: "Conductor", label: "Conductor" },
  { value: "Vendedor", label: "Vendedor" },
];

const opcionesTI = [
  { value: "Cédula de Ciudadanía", label: "Cédula de Ciudadanía" },
  { value: "Cédula de Extranjería", label: "Cédula de Extranjería" },
];

export { opcionesRol, opcionesTI };
