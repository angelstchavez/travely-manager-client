// export interface InputProps {
//     label:string;
//     type: string; // Añadimos la propiedad type aquí
//     name: string;
//     placeholder?: string;
//     // required?: boolean;
//     value?: string;
//     disabled?:boolean;
//     onChange?: (e : ChangeEvent<HTMLInputElement>) => void;
// }

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

interface SelectOption {
  value: string;
  label: string;
}

export interface SelectPropss
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
}

// export interface SelectProps{
//     // id: string;
//     // name: string;
//     label: string;
//     options: SelectOption[];
//     // value?: string;
//     // onChange?: (e : ChangeEvent<HTMLSelectElement>) => void;
// }
