import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL, getCookie } from "../../../utils";
import { PinInput } from 'react-input-pin-code';
import { Button } from "../../uui/base/buttons/button";
import { CgDanger } from "react-icons/cg";


const RequestDesktopModal: React.FC = () => {

  const [requestCodeCopied, setRequestCodeCopied] = React.useState<boolean>(false);
  const [isRequestCodeLoading, setIsRequestCodeLoading] = React.useState(false);
  const [connectionCode, setConnectionCode] = React.useState<string>("");

  const requestDesktopApplication = async () => {
    setIsRequestCodeLoading(true);
    await axios.post(BASE_URL + "/users/desktop/request", {}, {
      headers: {
        Authorization: "Bearer " + getCookie("jwt-token")
      }
    })
    .then((res) => {
      setConnectionCode(res.data.param.connection_code);
      console.log(res.data.param.connection_code);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsRequestCodeLoading(false);
    });
  };

  useEffect(() => {
    requestDesktopApplication();
  }, []);

  const downloadApp = () => {
    window.open("https://desktop.kaleidoapp.com", "_blank");
  };

  const copyCode = () => {
    navigator.clipboard.writeText(connectionCode);
    setRequestCodeCopied(true);
    setTimeout(() => {
      setRequestCodeCopied(false);
    }, 2000);
  };

  return (
    <div>
      <div className="flex mt-6 items-center gap-2">
        <div className="bg-[#5865F2] p-2 w-7 h-7 flex items-center justify-around font-semibold rounded-full text-[white]">
          <p>1</p>
        </div>
        <h1 className="text-[16px] font-medium">Download the App</h1>
      </div>
      <div className="mt-4 flex gap-1">
        <Button color="discord" className="text-sm w-full" onClick={downloadApp}>
          Download
        </Button>
      </div>
      <div className="flex items-center mt-8 gap-2">
        <div className="bg-[#5865F2] p-2 w-7 h-7 flex items-center justify-around font-semibold rounded-full text-[white]">
          <p>2</p>
        </div>
        <h1 className="text-[16px] font-medium">Login to the App</h1>
      </div>
      <p className="mt-2 text-[14.4px] text-[#353535]">
        Once you have downloaded and opened the application, 
        the app will prompt you to log in using a code, use the one below.
      </p>
      <div className="border border-[#ffc934] bg-[#ffc934]/20 mt-2 p-1 rounded-lg">
        <div className="flex items-center gap-2">
          <CgDanger size={54} className="text-[#c97200]"/>
          <p className="text-sm text-[#c97200] mt-1">Note that this code is unique and is going to change every 
            time you open this section. <span className="font-semibold">Make sure to keep it secret</span>
          </p>
        </div>
      </div>
      <div className="mt-6">
        {isRequestCodeLoading ? (
          <div>
            <div className="flex justify-around items-center h-12">
              {new Array(8).fill("").map((char, index) => (
                <span 
                  key={index}
                  className="h-full px-3 w-[38px] bg-[#f8f8f8] text-xl flex justify-around 
                  items-center rounded-md border border-[#d4d4d4]"
                >{char}</span>
              ))}
            </div>
            <Button 
              color="discord" isDisabled={requestCodeCopied || isRequestCodeLoading}
              className="text-sm mt-4 w-full"
              onClick={copyCode}
            >
              {requestCodeCopied ? "Code Copied!" : "Copy Code"}
            </Button>      
          </div>
        ) : (
          <div>
            <div className="flex justify-around items-center h-12">
              {connectionCode.toString().split("").map((char, index) => (
                <span
                  key={index}
                  className="h-full w-[38px] px-3 text-xl flex justify-around 
                  items-center rounded-md border border-[#d4d4d4]"
                >{char}</span>
              ))}
            </div>
            <Button
              color="discord"
              isDisabled={requestCodeCopied}
              className="text-sm mt-4 w-full"
              onClick={copyCode}
            >
              {requestCodeCopied ? "Code Copied!" : "Copy Code"}
            </Button>      
          </div>
        )}
      </div>
    </div>
  )
}

export default RequestDesktopModal;