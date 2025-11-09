import { DEFAULT_AVATAR_URL } from "../../../utils";
import { Button } from "../../uui/base/buttons/button";
import { Input } from "../../uui/base/input/input";

interface AvatarEditorProps {
  isEditingAvatar: {
    largeImage: boolean;
    smallImage: boolean;
  };
  editingAvatar: {
    large_image: string;
    small_image: string;
  };
  onEditingAvatarChange: (newEditingAvatar: { large_image: string; small_image: string }) => void;
  isEditingAvatarChange: (newIsEditingAvatar: { largeImage: boolean; smallImage: boolean }) => void;
  changeEditingAvatar: () => void;
  closeAvatarEditing: () => void;
}

const AvatarEditor: React.FC<AvatarEditorProps> = (props) => {

  return(
    <>
      {props.isEditingAvatar.largeImage ? (
        <div className="absolute z-10 border border-[#d4d4d4] bg-[#f7f7f7] backdrop-blur-md rounded-xl p-4 flex flex-col gap-2">
          <label className="text-black text-sm font-medium">Large Image URL:</label>
          <Input
            wrapperClassName="h-9"
            placeholder={DEFAULT_AVATAR_URL}
            inputClassName=""
            value={props.editingAvatar.large_image || ""}
            onChange={(e) => props.onEditingAvatarChange({ ...props.editingAvatar, large_image: e })}
          />
          <div className="flex gap-2">
            <Button color="discord" className="text-xs w-full" onClick={props.changeEditingAvatar}>Save</Button>
            <Button color="discord-outline" className="text-xs w-full" onClick={props.closeAvatarEditing}>Cancel</Button>
          </div>
        </div>
      ) : null}
      {props.isEditingAvatar.smallImage ? (
        <div className="absolute z-10 border border-[#d4d4d4] bg-[#f7f7f7] backdrop-blur-md rounded-xl p-4 flex flex-col gap-2">
          <label className="text-black text-sm font-medium">Small Image URL:</label>
          <Input
            wrapperClassName="h-9"
            placeholder={DEFAULT_AVATAR_URL}
            inputClassName=""
            value={props.editingAvatar.small_image || ""}
            onChange={(e) => props.onEditingAvatarChange({ ...props.editingAvatar, small_image: e })}
          />
          <div className="flex gap-2">
            <Button color="discord" className="text-xs w-full" onClick={props.changeEditingAvatar}>Save</Button>
            <Button color="discord-outline" className="text-xs w-full" onClick={props.closeAvatarEditing}>Cancel</Button>
          </div>
        </div>
      ) : null}
    </>
  )

};

export default AvatarEditor;
