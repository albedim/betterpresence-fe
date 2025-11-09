import React from "react";
import { Button } from "../../uui/base/buttons/button";

interface DesktopSectionProps {
  requestDesktopApplication: () => void;
}

const DesktopSection: React.FC<DesktopSectionProps> = (props) => {

  return (
    <div className="mt-6">
      <p className="text-sm text-[#afafaf]">Desktop App</p>
      <div className="border border-[#5865F2] bg-[#5865F2]/20 mt-2 p-1 rounded-lg">
        <div className="flex items-center gap-1 ">
          <p className="text-xs text-[#5865F2] mt-1">Download our App to activate your custom activities on Discord </p>
        </div>
        <Button color="discord" onClick={props.requestDesktopApplication} className="text-xs mt-2 w-full font-medium">Download</Button>
      </div>
    </div>
  )
};

export default DesktopSection