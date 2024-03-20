import React from "react";

function StaticHome() {
  return (
    <section className="bg-customBlueDark rounded-lg">
      <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
        <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl md:text-4xl font-extrabold dark: text-primary">
              73M+
            </dt>
            <dd className="font-bold text-white">
              Viajes realizados
            </dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl md:text-4xl font-extrabold dark: text-primary">
              1B+
            </dt>
            <dd className="font-bold text-white">
              Clientes satisfechos
            </dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl md:text-4xl font-extrabold dark: text-primary">
              4M+
            </dt>
            <dd className="font-bold text-white">
              Empresas asociadas
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export default StaticHome;
