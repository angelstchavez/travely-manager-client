import { Icon } from "@iconify/react/dist/iconify.js";


export const RoleIcon = ({ role }: { role: string }) => {
    return (
        <div
      className={`pl-2 py-1 flex items-center rounded w-[82%] ${
         role === "Administrador"
          ? "bg-green-100 text-green-800"
          : role === "Vendedor"
          ? "bg-blue-100 text-blue-800"
          : role === "Conductor"
          && "bg-yellow-100 text-yellow-800" // Default color for unknown roles
      }`}
    >
      {role === "Administrador" && (
        <Icon
          icon="bi:person-fill"
          style={{ color: "#059669"}}
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
          style={{ color: "#fbbf24"}}
          className="text-lg"
        />
      )}
      <span className="px-2">{role}</span>
    </div>
    );
};



export const ActiveIcon = ({ active }: { active: boolean }) => {
    return (
      <div
        className={`py-1 p-1 flex items-center rounded font-semibold ${active? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"}`}
      >
        <div className="mr-1">
          {active ? (
            <div className={`${active ? "#10B981" : "#EF4444" }`}>
                <span className="text-yellow-300">
                    <Icon
                    icon="fa-solid:check-circle"
                    />
                </span>
            </div>
          ) : (
            <Icon
              icon="fa-solid:times-circle"
              className={`${active ? "#10B981" : "#EF4444" }`} //Cambiar los estilos acá, tiene los estilos de colores igual al true
                                                               //Deberias usar reactIcon para evitar tanta linea de codigo
            />
          )}
        </div>
        <span>{active ? "Sí" : "No"}</span>
      </div>
    );
  };
  