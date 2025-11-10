import React, { useEffect } from "react";
import { Button } from "../../uui/base/buttons/button";
import { BASE_URL, eraseCookie, getCookie, getUser } from "../../../utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style.css"
import AccountMenu from "./menu";
import { Dropdown } from "../../uui/base/dropdown/dropdown";
import { IoIosArrowDown } from "react-icons/io";
import { LogOut01, RefreshCw02 } from "@untitledui/icons";
import { BiTime } from "react-icons/bi";

const UserSection = () => {

  const [userData, setUserData] = React.useState<any>(null);
  const [timer, setTimer] = React.useState<number>(0);
  const navigate = useNavigate();

  const getUserData = async () => {
    const user: any = await getUser();
    setUserData(user);
    setTimer(user.refresh.remaining_seconds);
  };
  
  const formatTimer = (timer: number) => {
    const hrs = Math.floor(timer / 3600);
    const mins = Math.floor((timer % 3600) / 60);
    const secs = timer % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const refresh = async () => {
    await axios.post(BASE_URL + "/users/refresh", {}, {
      headers: {
        Authorization: "Bearer " + getCookie("jwt-token")
      }
    })
    .then((res) => {
      setUserData(res.data.param);
      setTimer(24 * 60 * 60)
    })
    .catch((err) => {
      console.log(err);
    })
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
      <div className="h-[54px] ml-1 rounded-lg w-[247px] slow-color-pulse mt-7">
        
      </div>
    )
  };

  return (
    <div className="flex items-center justify-between p-1 mt-2">
      <Dropdown.Root>
        <Button color="white" className="p-1 hover:bg-[#f3f3f3] rounded-lg">
          <div className="flex p-1 w-[234px] justify-between">
            <div className="flex gap-2">
              <div className="w-9 h-9">
                <img className="w-full rounded-full h-full" src={userData?.avatar_url} alt="" />
              </div>
              <div className="text-left">
                <p className="text-[14.4px] font-semibold text-[black]">{userData?.name}</p>
                <p className="text-[12.4px] font-normal -mt-1 text-[black]">@{userData?.username}</p>
              </div>
            </div>
            <div className="flex items-center">
              <IoIosArrowDown size={20} color="gray" />
            </div>
          </div>
        </Button>
        <Dropdown.Popover>
          <Dropdown.Menu>
            <Dropdown.Section>
              {userData.refresh.is_refreshable ? (
                <Dropdown.Item onClick={refresh} icon={RefreshCw02}>Refresh</Dropdown.Item>
              ):(
                <Dropdown.Item isDisabled icon={RefreshCw02}>
                  <div className="w-full justify-between flex">
                    <p>Refresh</p>
                    <div className="flex items-center">
                      <p className="text-[#ffb937]">- {formatTimer(timer)}</p>
                      <BiTime className="ml-1 inline-block" size={18} color="#ffb937" />
                    </div>
                  </div>
                </Dropdown.Item>
              )}
            </Dropdown.Section>
            <Dropdown.Separator />
            <Dropdown.Section>
              <Dropdown.Item onClick={logout} icon={LogOut01}>Log Out</Dropdown.Item>
            </Dropdown.Section>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown.Root>
    </div>
  )
};

export default UserSection;