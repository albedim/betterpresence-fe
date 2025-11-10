import { BsSave2, BsThreeDots } from "react-icons/bs";
import { Button } from "../../../uui/base/buttons/button";
import { Dropdown } from "../../../uui/base/dropdown/dropdown";
import { BiTime, BiTrash } from "react-icons/bi";
import { LogOut01, RefreshCw02 } from "@untitledui/icons";
import { IoIosArrowDown } from "react-icons/io";
import React, { useEffect } from "react";
import { CgTimer } from "react-icons/cg";
import { IoTimer } from "react-icons/io5";

interface AccountMenuProps {
  account: any
  onRefresh: () => void;
  onLogout: () => void;
}

const AccountMenu: React.FC<AccountMenuProps> = (props) => {

  const [timer, setTimer] = React.useState<number>(props.account.refresh.remaining_seconds);

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

  return (
    <Dropdown.Root>
      <Button color="white" className="p-1 hover:bg-[#f3f3f3] rounded-lg">
        <div className="flex p-1 w-[234px] justify-between">
          <div className="flex gap-2">
            <div className="w-9 h-9">
              <img className="w-full rounded-full h-full" src={props.account?.avatar_url} alt="" />
            </div>
            <div className="text-left">
              <p className="text-[14.4px] font-semibold text-[black]">{props.account?.name}</p>
              <p className="text-[12.4px] font-normal -mt-1 text-[black]">@{props.account?.username}</p>
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
            {props.account.refresh.is_refreshable ? (
              <Dropdown.Item onClick={props.onRefresh} icon={RefreshCw02}>Refresh</Dropdown.Item>
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
            <Dropdown.Item onClick={props.onLogout} icon={LogOut01}>Log Out</Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  )
}

export default AccountMenu;