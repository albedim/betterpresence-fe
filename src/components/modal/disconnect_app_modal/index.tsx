import axios from "axios";
import { Button } from "../../uui/base/buttons/button";
import { BASE_URL, getCookie } from "../../../utils";
import React from "react";
import { FaTrash } from "react-icons/fa";

interface DeleteModalProps {
  onClose: (deleted: boolean) => void;
  onDDADisconnected: () => void;
}

const DisconnectAppModal: React.FC<DeleteModalProps> = (props) => {

  const [isLoading, setIsLoading] = React.useState(false);

  const disconnectApp = async () => {
    setIsLoading(true);
    await axios.post(BASE_URL + "/users/app/disconnect", {}, {
      headers: {
        Authorization: "Bearer " + getCookie("jwt-token")
      }
    })
    .then(() => {
      setIsLoading(false);
      props.onDDADisconnected();
    })
    .catch((err) => {
      console.log(err);
    })
  };
  
  return (
    <div>
      <div className="flex items-center gap-2">
        <h1 className="text-[18px] font-medium">Disconnect Your Developer App</h1>
      </div>
      <p className="mt-2 text-[14.4px] text-[#353535] gap-2">
        If you disconnect your developer app your custom activites will stop working 
        and you will need to reconnect one to restore functionality. 
      </p>
      <div className="mt-4 flex gap-2">
        <Button 
          color="discord-outline"
          className="w-[184px] text-sm"
          onClick={() => props.onClose(false)}
        >
          Back
        </Button>
        <Button
          color="primary-destructive"
          isLoading={isLoading}
          className="text-sm w-[184px]"
          onClick={disconnectApp}
        >
          Disconnect App
        </Button>
      </div>
    </div>
  )
}

export default DisconnectAppModal;