import { BsSave2, BsThreeDots } from "react-icons/bs";
import { Button } from "../../uui/base/buttons/button";
import { Dropdown } from "../../uui/base/dropdown/dropdown";
import { BiTrash } from "react-icons/bi";

interface MenuProps {
  favorite: boolean;
  onAddToFavorites: () => void;
  onDelete: () => void;
  onRemoveFromFavorites: () => void;
}

const Menu: React.FC<MenuProps> = (props) => (
  <Dropdown.Root>
    <Button color="empty" className="p-0">
      <BsThreeDots color="black" size={18.4}/>
    </Button>
    <Dropdown.Popover>
      <Dropdown.Menu>
        <Dropdown.Section>
          {props.favorite ? (
            <Dropdown.Item icon={BsSave2} onClick={props.onRemoveFromFavorites}>
              Remove From Favorites
            </Dropdown.Item>
          ):(
            <Dropdown.Item icon={BsSave2} onClick={props.onAddToFavorites}>
              Add To Favorites
            </Dropdown.Item>
          )}
        </Dropdown.Section>
        <Dropdown.Separator />
        <Dropdown.Section>
          <Dropdown.Item onClick={props.onDelete} icon={BiTrash}>Delete</Dropdown.Item>
        </Dropdown.Section>
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown.Root>
);

export default Menu;