import Header from "@/components/utils/header";

export default function Home() {
  return (
    <>
      <Header></Header>
      <div className="bg-white">
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Bienvenido
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                En Travely Manager, te ofrecemos la solución perfecta para
                administrar tu empresa de viajes con total seguridad y eficacia.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/login"
                  className="ml-1 flex justify-center items-center space-x-1 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Iniciar sesión
                </a>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          ></div>
        </div>
      </div>
    </>
  );
}
