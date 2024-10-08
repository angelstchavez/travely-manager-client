import { Icon } from "@iconify/react";

import { SideNavItem } from "./types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Inicio",
    path: "/admin",
    icon: <Icon icon="typcn:home" width="24" height="24" />,
  },
  {
    title: "Procesos",
    path: "/processes",
    icon: <Icon icon="material-symbols:folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Registrar venta", path: "/admin/processes/register-sale" },
      { title: "Consultar histórico", path: "/admin/processes/register-reservation" },
    ],
  },
  {
    title: "Registros",
    path: "/registers",
    icon: <Icon icon="material-symbols:folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Viajes", path: "/admin/registers/trips" },
      { title: "Rutas de viaje", path: "/admin/registers/routes" },
      { title: "Clientes", path: "/admin/registers/customers" },
      { title: "Vehiculos", path: "/admin/registers/vehicles" },
      { title: "Terminales", path: "/admin/registers/transport-terminals" },
    ],
  },
  {
    title: "Administrador",
    path: "/administrator",
    icon: <Icon icon="material-symbols:folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Asignaciones", path: "/admin/administrator/assignments" },
      { title: "Empleados", path: "/admin/administrator/employees" },
      { title: "Usuarios", path: "/admin/administrator/users" },
    ],
  },
  {
    title: "Cerrar sesión",
    path: "/admin/logout",
    icon: <Icon icon="raphael:power" width="24" height="24" />,
  },
];
