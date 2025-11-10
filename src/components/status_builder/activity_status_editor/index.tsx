// components/ActivityStatusEditor.tsx
import React from "react";
import { IoGameController } from "react-icons/io5";
import { FaMusic } from "react-icons/fa";
import { BsTvFill } from "react-icons/bs";
import type { STATUS_DATA, STATUS_TYPE } from "../../../types";
import AvatarEditor from "../avatar_editor";
import { Button } from "../../uui/base/buttons/button";
import Menu from "../menu";
import { useStatusEditor } from "../hook/useStatusEditor";

interface ActivityStatusEditorProps {
  statusData: STATUS_DATA;
  onStatusDelete: () => void;
  onStatusChange: (newStatus: STATUS_DATA) => void;
}

const ActivityStatusEditor: React.FC<ActivityStatusEditorProps> = (props) => {
  const {
    statusData,
    edited,
    isChangeLoading,
    isEditingAvatar,
    editingAvatar,
    formatTimer,
    changeStatusData,
    changeEditingAvatar,
    closeAvatarEditing,
    setIsEditingAvatar,
    setEditingAvatar,
    changeStatus,
    handleAddToFavorites,
    handleRemoveFromFavorites,
  } = useStatusEditor({
    initialStatusData: props.statusData,
    onStatusChange: props.onStatusChange,
  });

  const activityType = statusData.activity_type as STATUS_TYPE;

  const StatusConfig: Record<STATUS_TYPE, { text: string, icon: React.ReactNode, nameInput: boolean }> = {
    PLAYING: {
      text: "Playing",
      icon: <IoGameController color="#53ac66" size={16} />,
      nameInput: true,
    },
    LISTENING: {
      text: "Listening to",
      icon: <FaMusic color="#53ac66" size={14} />,
      nameInput: false,
    },
    WATCHING: {
      text: "Watching",
      icon: <BsTvFill color="#53ac66" size={14} />,
      nameInput: false,
    },
    COMPETING: {
      text: "Competing in",
      icon: <IoGameController color="#53ac66" size={14} />,
      nameInput: false,
    },
  };

  const config = StatusConfig[activityType];
  if (!config) return null;

  const showNameInHeader = activityType === "COMPETING" || activityType === "LISTENING" || activityType === "WATCHING";
  const showLargeText = activityType === "COMPETING" || activityType === "LISTENING";
  const showStateAsDetail = activityType === "PLAYING" || activityType === "WATCHING";

  let titleInput = null;
  let detailInput = null;
  let stateInput = null;
  

  if (activityType === "PLAYING") {
    titleInput = <input className="text-[black] text-[15.4px] font-medium outline-none p-0 border-none" type="text" name="name" value={statusData.name} onChange={changeStatusData} />;
    detailInput = <input className="text-[black] text-[12.4px] font-normal outline-none p-0 border-none" type="text" name="details" value={statusData.details} onChange={changeStatusData} />;
    stateInput = <input className="text-[black] outline-none text-[12.4px] font-sm" type="text" name="state" value={statusData.state} onChange={changeStatusData} />;
  } else {
    titleInput = <input className="text-[black] text-[15.4px] font-medium outline-none p-0 border-none" type="text" name="details" value={statusData.details} onChange={changeStatusData} />;
    detailInput = <input className="text-[black] text-[12.4px] font-normal outline-none p-0 border-none" type="text" name="state" value={statusData.state} onChange={changeStatusData} />;
    
    if (showLargeText) {
        stateInput = <input className="text-[black] text-[12.4px] font-normal outline-none p-0 border-none" type="text" name="large_text" value={statusData.large_text} onChange={changeStatusData} />;
    } else if (activityType === "WATCHING") {
        
        stateInput = null;
    }
  }


  return (
    <div className="bg-[#fcfcfc] border lg:mt-0 mt-4 border-[#d1d5db] p-2 pb-3 rounded-xl">
      <AvatarEditor
        editingAvatar={editingAvatar}
        onEditingAvatarChange={setEditingAvatar}
        isEditingAvatar={isEditingAvatar}
        isEditingAvatarChange={setIsEditingAvatar}
        changeEditingAvatar={changeEditingAvatar}
        closeAvatarEditing={closeAvatarEditing}
      />
      
      <div className="flex justify-between">
        <div className="flex gap-1">
          <p className="text-[black] text-[12.4px]">{config.text}</p>
          {showNameInHeader && (
            <input
              className="text-[black] text-[12.4px] outline-none p-0 border-none"
              type="text"
              name="name"
              value={statusData.name}
              onChange={changeStatusData}
            />
          )}
        </div>
        <Menu
          onDelete={props.onStatusDelete}
          favorite={statusData.favorite}
          onAddToFavorites={handleAddToFavorites}
          onRemoveFromFavorites={handleRemoveFromFavorites}
        />
      </div>

      <div className="flex mt-3 gap-2">
        <div className="w-18 h-18">
          {statusData.small_image && (
            <div className="w-8 mt-12 ml-11 absolute rounded-full border-3 border-[#f5f5f5] h-8">
              <img
                className="w-full cursor-pointer h-full rounded-xl object-cover"
                src={statusData.small_image}
                alt=""
                onClick={() => setIsEditingAvatar({ ...isEditingAvatar, smallImage: true })}
              />
            </div>
          )}
          <img
            className="w-full cursor-pointer h-full rounded-xl object-cover"
            src={statusData.large_image}
            alt=""
            onClick={() => setIsEditingAvatar({ ...isEditingAvatar, largeImage: true })}
          />
        </div>
        
        <div>
          <div className={activityType === "PLAYING" ? "" : "-mb-px"}>
            {titleInput}
          </div>
          <div className={activityType === "PLAYING" ? "-mt-1" : ""}>
            {detailInput}
          </div>
          {(showLargeText || showStateAsDetail) && (
            <div className="-mt-[5.4px]">
                {stateInput}
            </div>
          )}
          
          <div className="mt-1 flex items-center gap-2">
            {config.icon}
            <span className="text-[#53ac66] font-bold text-sm">{formatTimer()}</span>
          </div>
        </div>
      </div>

      {edited && (
        <Button
          color="discord"
          isLoading={isChangeLoading}
          className="text-xs w-full mt-2"
          onClick={() => changeStatus(statusData)}
        >
          Edit Activity
        </Button>
      )}
    </div>
  );
};

export default ActivityStatusEditor;