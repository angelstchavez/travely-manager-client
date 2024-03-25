"use client";

import React, { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SIDENAV_ITEMS } from "@/app/constants";
import { SideNavItem } from "@/app/types";
import { Icon } from "@iconify/react";

const SideNav = () => {
  return (
    <div className="md:w-60 h-screen flex-1 fixed hidden md:flex">
      <div className="flex flex-col space-y-6 w-full bg-white">
        <Link
          href="/"
          className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 h-12 w-full"
        >
          <span className="border rounded bg-tm60 px-2 py-2"></span>
          <span className="font-bold text-xl hidden md:flex text-tm20">Travely Manager</span>
        </Link>

        <div className="flex flex-col space-y-2  md:px-6 ">
          {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between ${
              pathname.includes(item.path) ? "bg-tm20 text-white" : "hover:bg-zinc-100"
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-sm flex">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-4 flex text-sm flex-col space-y-2 text-tm">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname ? "p-1 font-semibold text-tm40 bg-zinc-100 rounded border" : "p-1"
                    }`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg ${
            item.path === pathname ? "bg-tm20 text-white" : "hover:bg-zinc-100"
          }`}
        >
          {item.icon}
          <span className="font-semibold text-sm flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
