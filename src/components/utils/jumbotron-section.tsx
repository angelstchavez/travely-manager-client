"use client";

import { Icon } from "@iconify/react/dist/iconify.js";

const JumbotronSection = () => {
  return (
    <div className="bg-customBlueDarkPro flex-grow p-4 relative rounded-lg">
      <div className="py-2 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
          Bienvenido a <br></br>
          <span className="bg-clip-text text-transparent bg-gradient-to-r to-customGreen from-customSuperLigth">
            Travely Manager
          </span>{" "}
        </h1>
        <div className="my-8"></div>
        <a
          href="/login"
          className="inline-flex justify-between items-center py-1 px-1 pe-4 text-sm text-customGreen rounded-full bg-customBlue hover:bg-customBlueLigth"
        >
          <span className="text-xs bg-customGreen rounded-full text-customBlueDarkPro px-4 py-1.5 me-3">
            <div className="text-xl">
              <Icon icon="solar:bus-bold-duotone" />
            </div>
          </span>
          <span className="text-sm font-medium">Ingresar</span>
          <svg
            className="w-2.5 h-2.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default JumbotronSection;
