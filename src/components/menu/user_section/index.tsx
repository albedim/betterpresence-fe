import React, { useEffect } from "react";
import { Button } from "../../uui/base/buttons/button";
import { BASE_URL, eraseCookie, getCookie, getUser } from "../../../utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style.css"

const UserSection = () => {

  const [userData, setUserData] = React.useState<any>(null);
  const navigate = useNavigate();

  const getUserData = async () => {
    const user = await getUser();
    setUserData(user);
  };

  const logout = async () => {
    await axios.post(BASE_URL + "/users/logout", {}, {
      headers: {
        Authorization: "Bearer " + getCookie("jwt-token")
      }
    })
    .then(() => {
      eraseCookie("jwt-token");
      navigate(0)
    })
    .catch((err) => {
      console.log(err);
    })
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (!userData) {
    return (
      <div className="flex items-center justify-between p-1 mt-2">
        <div className="flex gap-2">
          <div className="w-9 h-9">
            <div className="w-full slow-color-pulse rounded-full h-full"></div>
          </div>
          <div>
            <div className="w-14 h-3 slow-color-pulse mt-1 rounded-full font-medium"></div>
            <div className="w-14 h-3 slow-color-pulse mt-1 rounded-full font-medium"></div>
          </div>
        </div>
        <div className="w-12 h-[26.4px] slow-color-pulse rounded-md"></div>
      </div>
    )
  };

  return (
    <div className="flex items-center justify-between p-1 mt-2">
      <div className="flex gap-2">
        <div className="w-9 h-9">
          <img className="w-full rounded-full h-full" src={userData?.avatar_url} alt="" />
        </div>
        <div>
          <p className="text-[14.4px] font-medium">{userData?.name}</p>
          <p className="text-[12.4px] -mt-1">@{userData?.username}</p>
        </div>
      </div>
      <Button color="discord" onClick={logout} className="text-xs p-1 font-medium text-[white]">Log Out</Button>
    </div>
  )
};

export default UserSection;