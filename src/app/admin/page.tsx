import Header from "@/components/header";
import HeaderMobile from "@/components/header-mobile";
import MarginWidthWrapper from "@/components/margin-width-wrapper";
import SideNav from "@/components/side-nav";

function Page() {
  return (
    <>
      <div className="flex">
        <SideNav />
        <main className="flex-1">
          <MarginWidthWrapper>
            <Header />
            <HeaderMobile />
          </MarginWidthWrapper>
        </main>
      </div>
    </>
  );
}

export default Page;
