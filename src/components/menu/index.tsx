import React from "react";
import type { PAGES } from "../../types";
import DesktopSection from "./desktop_section";
import AppSection from "./app_section";
import UserSection from "./user_section";

interface MenuProps {
  selectedPage: PAGES;
  onRequestDesktopApplication: () => void;
  onDDAConnect: () => void;
  onDDADisconnect: () => void;
  setSelectedPage: (page: PAGES) => void;
}

const Menu: React.FC<MenuProps> = (props) => {
  
  return (
    <div className="border-l h-screen pl-1 pr-4 border-[#d8d8d8] border-r w-94">
      <div className="h-24 p-6">
        <h2 className="text-lg">Menu</h2>
      </div>
      <div className="pl-6">
        <div className="mt-6">
          <p className="text-sm mt-6 text-[#afafaf]">Developer App</p>
          <AppSection onDDADisconnect={props.onDDADisconnect} onDDAConnect={props.onDDAConnect} />
        </div>
        <DesktopSection requestDesktopApplication={props.onRequestDesktopApplication} />
        <div className="mt-6">
          <p className="text-sm text-[#afafaf]">Discord account</p>
          <UserSection/>
        </div>
      </div>
    </div>
  )
};

export default Menu;