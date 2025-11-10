import React from "react";
import { Button } from "../../uui/base/buttons/button";

interface DesktopSectionProps {
  requestDesktopApplication: () => void;
}

const DesktopSection: React.FC<DesktopSectionProps> = (props) => {

  return (
    <div className="border border-[#ccd0ff] bg-[#5865F2]/10 mt-2 p-1 rounded-lg">
      <div className="flex items-center pp-1 px-2 gap-1 ">
        <p className="text-[12.8px] text-[#5865F2] mt-1">Download our App to activate your custom activities on Discord </p>
      </div>
      <Button color="discord" onClick={props.requestDesktopApplication} className="text-[12.8px] mt-2 w-full font-medium">Download</Button>
    </div>
  )
};

export default DesktopSection