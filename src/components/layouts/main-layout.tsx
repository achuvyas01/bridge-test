"use client";
import React from "react";
import Header from "./header";
import { usePathname } from "next/navigation";
import { SideNavbar } from "./sidenavbar";
// import ChatHistorySidebar from "./chat-history-sidebar";
import { cn } from "@/lib/utils";
// import FooterMobile from "./footer-mobile";
// import MoreLinks from "./more-links";

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  if (pathname === "/") {
    return children;
  }

  const isChatPage = pathname.includes("chat");
  return (
    <>
      <Header />
      <div
        className={cn(
          "lg:grid lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] h-[calc(100svh-73px)]",
          isChatPage &&
            "grid-cols-1 lg:grid-cols-[minmax(0,240px)_minmax(0,288px)_minmax(0,1fr)]"
        )}
      >
        <SideNavbar />
        {pathname === "/chat" && <div></div>}
        <main className='relative bg-[url("/img/chat-bg.png")] bg-contain bg-repeat bg-center h-full w-full overflow-y-auto'>
          {children}
        </main>
        {/* <MoreLinks />
        <FooterMobile /> */}
      </div>
    </>
  );
};

export default MainLayout;
