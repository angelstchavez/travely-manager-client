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
      { title: "Registrar venta", path: "/processes/register-sale" },
      { title: "Registrar reserva", path: "/processes/register-reservation" },
    ],
  },
  {
    title: "Registros",
    path: "/registers",
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Viajes", path: "/registers/trips" },
      { title: "Rutas", path: "/registers/routes" },
      { title: "Vehiculos", path: "/registers/vehicles" },
      { title: "Clientes", path: "/registers/customers" },
      { title: "Terminales", path: "/registers/transport-terminals" },
    ],
  },
  {
    title: "Administrador",
    path: "/administrator",
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Conduductores", path: "/administrator/drivers" },
      { title: "Vendedores", path: "/administrator/sellers" },
      { title: "Usuarios", path: "/administrator/users" },
    ],
  },
  {
    title: "Configuración",
    path: "/settings",
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Cuenta", path: "/settings/account" },
      { title: "Privacidad", path: "/settings/privacy" },
    ],
  },
  {
    title: "Cerrar sesión",
    path: "/admin/logout",
    icon: <Icon icon="ri:logout-circle-r-line" width="24" height="24" />,
  },
];
