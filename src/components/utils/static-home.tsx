import React from "react";

function StaticHome() {
  return (
    <section className="bg-tm60/40 rounded-lg">
      <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
        <dl className="grid max-w-screen-md gap-8 mx-auto text-tm00 sm:grid-cols-3">
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
              73M+
            </dt>
            <dd className=" text-white">
              Viajes realizados
            </dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
              100M+
            </dt>
            <dd className=" text-white">
              Clientes satisfechos
            </dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
              4M+
            </dt>
            <dd className="text-white">
              Empresas asociadas
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export default StaticHome;
