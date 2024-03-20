import Footer from "@/components/utils/Footer";
import Header from "@/components/utils/header";
import JumbotronSection from "@/components/utils/JumbotronSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 relative bg-customBlue">
        <div className="mx-auto max-w-2xl py-16 sm:py-16 lg:py-20 px-6 lg:px-8">
          
        </div>
        <JumbotronSection />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-customBlue via-transparent to-transparent"></div>
      </div>
      <Footer />
    </div>
  );
}
