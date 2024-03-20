import Footer from "@/components/utils/Footer";
import Header from "@/components/utils/header";
import JumbotronSection from "@/components/utils/jumbotron-section";
import StaticHome from "@/components/utils/static-home";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 relative bg-tm80 flex justify-center items-center">
        <div className="mx-auto max-w-2xl py-16 sm:py-50 lg:py-20 px-4 lg:px-8 text-center">
          {/* Contenido aquí */}
          <JumbotronSection />
          <div className="my-4"></div>
          <StaticHome></StaticHome>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-tm90 via-transparent to-transparent"></div>
      </div>
      <Footer />
    </div>
  );
}
