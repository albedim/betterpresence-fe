import { Container } from "@untitledui/icons";
import { Dropdown } from "../uui/base/dropdown/dropdown";
import { Button } from "../uui/base/buttons/button";
import { IoMdAdd } from "react-icons/io";
import { IoGameController } from "react-icons/io5";
import { BsTv } from "react-icons/bs";
import { FaMusic } from "react-icons/fa";

interface DropdownButtonProps {
  onStatusSet: (statusType: string) => void;
  disabled?: boolean;
}

export const DropdownButton: React.FC<DropdownButtonProps> = (props) => (
  <Dropdown.Root>
    <Button isDisabled={props.disabled} color="discord" className="default:bg-[#5865F2] px-4 disabled:bg-[#5865F2]/80 h-10 border-none outline-none gap-1 text-[white] flex items-center text-sm rounded-[10px]">
      <div className="flex items-center gap-2">
        <IoMdAdd size={18}/>
        <p className="font-medium">Add New Activity</p>
      </div>
    </Button>
    <Dropdown.Popover>
      <Dropdown.Menu>
        <Dropdown.Section>
          <Dropdown.Item className="cursor-pointer" icon={IoGameController}>
            <button className="cursor-pointer" onClick={() => props.onStatusSet("PLAYING")}>
              Playing
            </button>
          </Dropdown.Item>
          <Dropdown.Item className="cursor-pointer" icon={BsTv}>
            <button className="cursor-pointer" onClick={() => props.onStatusSet("WATCHING")}>
              Watching
            </button>
          </Dropdown.Item>
          <Dropdown.Item className="cursor-pointer" icon={FaMusic}>
            <button className="cursor-pointer" onClick={() => props.onStatusSet("LISTENING")}>
              Listening
            </button>
          </Dropdown.Item>
          <Dropdown.Item className="cursor-pointer" icon={Container}>
            <button className="cursor-pointer" onClick={() => props.onStatusSet("COMPETING")}>
              Competing
            </button>
          </Dropdown.Item>
        </Dropdown.Section>
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown.Root>
);