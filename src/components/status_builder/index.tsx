// StatusBuilder.tsx
import React from "react";
import type { STATUS_DATA } from "../../types";
import ActivityStatusEditor from "./activity_status_editor";

interface StatusBuilderProps {
  statusData: STATUS_DATA;
  onStatusDelete: () => void;
  onStatusChange: (newStatus: STATUS_DATA) => void;
}

const StatusBuilder: React.FC<StatusBuilderProps> = (props) => {
  return (
    <ActivityStatusEditor
      statusData={props.statusData}
      onStatusDelete={props.onStatusDelete}
      onStatusChange={props.onStatusChange}
    />
  );
};

export default StatusBuilder;