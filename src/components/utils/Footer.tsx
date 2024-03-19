const Footer = () => {
  return (
    <footer className="p-2 md:p-4 lg:p-6 bg-customBlueDarkPro">
      <div className="mx-auto max-w-screen-xl text-center">
        <a
          href="#"
          className="flex justify-center items-center text-lg font-bold text-white"
        >
          Travely Manager
        </a>
        <p className="my-2 text-zinc-200">
          Plataforma para la gestión de venta de tickets
        </p>

        <span className="text-xs text-zinc-100 sm:text-center">
          © 2023{" "}
          <a href="#" className="hover:underline">
            Travely Manager™
          </a>
          . Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
