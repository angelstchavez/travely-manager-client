import { Icon } from "@iconify/react/dist/iconify.js";

const GenderIcon = ({ gender }: { gender: string }) => {
  return (
    <div
      className={`pl-2 py-1 flex items-center rounded ${
        gender === "Masculino" ? "bg-blue-100 text-blue-900" : "bg-pink-100 text-pink-900"
      }`}
    >
      {gender === "Masculino" && (
        <Icon icon="fa:male" className="text-lg text-blue-600" />
      )}
      {gender === "Femenino" && (
        <Icon icon="fa:female" className="text-lg text-pink-600" />
      )}
      <span className="px-2">{gender}</span>
    </div>
  );
};

export default GenderIcon;
