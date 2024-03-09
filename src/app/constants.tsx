import { Icon } from "@iconify/react";

import { SideNavItem } from "./types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Inicio",
    path: "/",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: "Procesos",
    path: "/processes",
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Registrar venta", path: "/admin/processes/register-sale" },
      { title: "Registrar reserva", path: "/admin/processes/register-reservation" },
    ],
  },
  {
    title: "Registros",
    path: "/registers",
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Viajes", path: "/admin/registers/trips" },
      { title: "Rutas", path: "/admin/registers/routes" },
      { title: "Vehiculos", path: "/admin/registers/vehicles" },
      { title: "Clientes", path: "/admin/registers/customers" },
      { title: "Terminales", path: "/admin/registers/transport-terminals" },
    ],
  },
  {
    title: "Administrador",
    path: "/administrator",
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Conductores", path: "/admin/administrator/drivers" },
      { title: "Vendedores", path: "/admin/administrator/sellers" },
      { title: "Usuarios", path: "/admin/administrator/users" },
    ],
  },
  {
    title: "Configuración",
    path: "/admin/settings",
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
  },
  {
    title: "Cerrar sesión",
    path: "/admin/logout",
    icon: <Icon icon="ri:logout-circle-r-line" width="24" height="24" />,
  },
];
