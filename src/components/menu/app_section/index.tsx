import React, { useEffect } from "react";
import { Button } from "../../uui/base/buttons/button";
import axios from "axios";
import { BASE_URL, getCookie } from "../../../utils";
import { CgDanger } from "react-icons/cg";
import { BsCheck } from "react-icons/bs";
import { InfoCircle } from "@untitledui/icons";
import "../style.css"

interface AppSectionProps {
  onDDAConnect: () => void;
  onDDADisconnect: () => void;
}

const InfoBox = () => {
  return(
    <div className="border border-[#dddddd] bg-[#b9b9b9]/20 mt-2 p-1 rounded-lg">
      <div className="flex items-center gap-2">
        <InfoCircle size={54} className="text-[#000000]"/>
        <p className="text-xs text-[#000000] mt-1">We need your <a className="underline font-medium decoration-[black]" target="__blank" href="https://discord.com/developers/docs/rich-presence/overview">Discord Developer Application</a> to make your custom activities work</p>
      </div>
    </div>
  )
};

const AppSection: React.FC<AppSectionProps> = (props) => {

  const [app, setApp] = React.useState<any>(null);
  const [isAppLoading, setIsAppLoading] = React.useState(true);

  const getApp = async () => {
    await axios.get(BASE_URL + "/users/app", {
      headers: {
        Authorization: "Bearer " + getCookie("jwt-token")
      }
    })
    .then((res) => {
      setApp(res.data.param);
      setIsAppLoading(false);
    })
    .catch((err) => {
      console.log(err);
    })
  };

  useEffect(() => {
    getApp();
  }, []);

  if (isAppLoading) {
    return (
      <div>
        <InfoBox />
        <div className="h-[92px] w-full slow-color-pulse mt-2 p-1 rounded-lg"></div>
      </div>
    )
  };

  if (app) {
    return (
      <div>
        <InfoBox />
        <div className="border border-[#ccd0ff] bg-[#5865F2]/10 mt-2 p-1 rounded-lg">
          <div className="flex items-center gap-1 ">
            <BsCheck size={34} className="text-[#5865F2]"/>
            <p className="text-[12.8px] text-[#5865F2] mt-1">Connected to: <br /> <span className="font-semibold">{app.application_name}</span></p>
          </div>
          <Button color="discord" className="text-[12.8px] mt-2 w-full font-medium" onClick={props.onDDADisconnect}>Disconnect App</Button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <InfoBox />
      <div className="border border-[#ffc934] bg-[#ffc934]/20 mt-2 p-[8.4px] rounded-lg">
        <div className="flex items-center gap-2">
          <CgDanger size={58} className="text-[#c97200]"/>
          <p className="text-xs text-[#c97200] mt-1">You must connect a discord developer application to create custom activities.</p>
        </div>
        <Button color="caution" className="text-xs mt-2 w-full font-medium" onClick={props.onDDAConnect}>Connect App</Button>
      </div>
    </div>
  )
};

export default AppSection;