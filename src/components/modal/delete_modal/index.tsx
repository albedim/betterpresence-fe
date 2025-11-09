import axios from "axios";
import { Button } from "../../uui/base/buttons/button";
import { BASE_URL, getCookie } from "../../../utils";
import React from "react";
import { FaTrash } from "react-icons/fa";

interface DeleteModalProps {
  activityId: number;
  onClose: (deleted: boolean) => void;
}

const DeleteModal: React.FC<DeleteModalProps> = (props) => {

  const [isLoading, setIsLoading] = React.useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    await axios.delete(BASE_URL + "/statuses/" + props.activityId, {
      headers: {
        Authorization: "Bearer " + getCookie("jwt-token")
      }
    })
    .then(() => {
      props.onClose(true);
    })
    .catch((err) => {
      console.log(err);
    })
    setIsLoading(false);
  }
  
  return (
    <div>
      <div className="flex items-center gap-2">
        <h1 className="text-[18px] font-medium">Delete Activity</h1>
      </div>
      <p className="mt-2 text-[14.4px] text-[#353535] gap-2">
        Are you sure you want to delete this activity? 
        You can't undo this action.
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
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

export default DeleteModal;