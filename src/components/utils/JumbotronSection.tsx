const JumbotronSection = () => {
  return (
    <div className="bg-customBlueDarkPro flex-grow p-4 relative">
      <div className="py-2 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-zinc-950 md:text-5xl lg:text-6xl dark:text-white">
          Bienvenido a{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r to-customGreen from-customSuperLigth">
            Travely Manager
          </span>{" "}
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
          Adquiere tu ticket de viaje en cuestión de minutos
        </p>
        <a
          href="/login"
          className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-customGreen rounded-full bg-customBlue hover:bg-customBlueLigth"
        >
          <span className="text-xs bg-customGreen rounded-full text-customBlueDarkPro px-4 py-1.5 me-3">
            Accede
          </span>
          <span className="text-sm font-medium">Travely Manager</span>
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
      <div className="bg-gradient-to-b from-green-50 to-transparentw-full h-full absolute top-0 left-0 z-0"></div>
    </div>
  );
};

export default JumbotronSection;
