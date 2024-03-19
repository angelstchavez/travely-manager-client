"use client";

import Header from "@/components/utils/header";
import HeaderMobile from "@/components/utils/header-mobile";
import MarginWidthWrapper from "@/components/utils/margin-width-wrapper";
import PageWrapper from "@/components/utils/page-wrapper";
import SideNav from "@/components/utils/side-nav";
import { useAuthContext } from "@/contexts/authContext";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {" "}
      <div className="flex">
        <SideNav />
        <main className="flex-1">
          <MarginWidthWrapper>
            <Header />
            <HeaderMobile />
            <PageWrapper>{children}</PageWrapper>
          </MarginWidthWrapper>
        </main>
      </div>
    </div>
  );
}

export default Layout;
