import { Icon } from "@iconify/react/dist/iconify.js";

const RoleIcon = ({ role }: { role: string }) => {
  return (
    <div
      className={`pl-2 py-1 flex items-center rounded ${
        role === "Administrador"
          ? "bg-green-100 text-green-800"
          : role === "Vendedor"
          ? "bg-blue-100 text-blue-800"
          : role === "Conductor"
          ? "bg-yellow-100 text-yellow-800"
          : "bg-gray-100 text-gray-800" // Default color for unknown roles
      }`}
    >
      {role === "Administrador" && (
        <Icon
          icon="bi:person-fill"
          style={{ color: "#059669" }}
          className="text-lg text-blue-700"
        />
      )}
      {role === "Vendedor" && (
        <Icon
          icon="fluent:person-support-24-filled"
          style={{ color: "#3b82f6" }}
          className="text-lg"
        />
      )}
      {role === "Conductor" && (
        <Icon
          icon="fa-solid:car"
          style={{ color: "#fbbf24" }}
          className="text-lg"
        />
      )}
      <span className="px-2">{role}</span>
    </div>
  );
};

export default RoleIcon;
