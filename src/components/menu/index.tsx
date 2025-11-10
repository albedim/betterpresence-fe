import React from "react";
import type { PAGES } from "../../types";
import DesktopSection from "./desktop_section";
import AppSection from "./app_section";
import UserSection from "./user_section";
import { Button } from "../uui/base/buttons/button";
import { InfoCircle } from "@untitledui/icons";
import { Tooltip } from "../uui/base/tooltip/tooltip";

interface MenuProps {
  selectedPage: PAGES;
  onRequestDesktopApplication: () => void;
  onDDAConnect: () => void;
  onDDADisconnect: () => void;
}

const Menu: React.FC<MenuProps> = (props) => {
  
  const downloadApp = () => {
    window.open("https://betterpresence.app/download", "_blank");
  };

  return (
    <div className="border-l fixed h-screen pr-4 border-[#d8d8d8] border-r w-74">
      <div className="pl-6 mt-6">
        <UserSection/>
      </div>
      <div className="pl-6 mt-8">
        <div className="mt-6">
          <div className="flex mb-4 items-center gap-2">
            <div className="bg-[#5865F2] text-sm p-1 w-6 h-6 flex items-center justify-around font-medium rounded-full text-[white]">
              <p>1</p>
            </div>
            <p className="text-md text-[#000000]">Developer App</p>
          </div>
          <div className="flex ml-[11px] gap-6">
            <div className="h-46 w-[4.4px] bg-[#d1d1d1]"></div>
            <AppSection onDDADisconnect={props.onDDADisconnect} onDDAConnect={props.onDDAConnect} />
          </div>
        </div>
        <div className="mt-6">
          <div className="flex mb-4 items-center gap-2">
            <div className="bg-[#5865F2] text-sm p-1 w-6 h-6 flex items-center justify-around font-medium rounded-full text-[white]">
              <p>2</p>
            </div>
            <p className="text-md text-[#000000]">Download Client</p>
          </div>
          <div className="flex ml-[11px] gap-6">
            <div className="h-32 w-[4px] bg-[#d1d1d1]"></div>
            <div>
              <Button color="discord" className="text-sm w-full" onClick={downloadApp}>
                Download for Windows
              </Button>
              <Tooltip title={"Available Soon..."}>
                <Button color="discord-disabled" className="text-sm cursor-default mt-2 w-full">
                  Download for MacOS
                </Button>
              </Tooltip>
              <Tooltip title={"Available Soon..."}>
                <Button color="discord-disabled" className="text-sm cursor-default mt-2 w-full">
                  Download for Linux
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex mb-4 items-center gap-2">
            <div className="bg-[#5865F2] text-sm p-1 w-6 h-6 flex items-center justify-around font-medium rounded-full text-[white]">
              <p>3</p>
            </div>
            <p className="text-md text-[#000000]">Configure Client</p>
          </div>
          <div className="flex ml-[11px] gap-6">
            <div className="h-10 w-[2.4px] bg-[#d1d1d1]"></div>
            <Button color="discord" className="text-sm w-full" onClick={props.onRequestDesktopApplication}>
              Configure Client
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Menu;