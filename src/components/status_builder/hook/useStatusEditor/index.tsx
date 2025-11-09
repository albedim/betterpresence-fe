// hooks/useStatusEditor.ts
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BASE_URL, getCookie } from "../../../../utils"; // Assuming BASE_URL and getCookie are here
import type { STATUS_DATA } from "../../../../types";

interface UseStatusEditorProps {
  initialStatusData: STATUS_DATA;
  onStatusChange: (newStatus: STATUS_DATA) => void;
}

export const useStatusEditor = ({ initialStatusData, onStatusChange }: UseStatusEditorProps) => {
  const [statusData, setStatusData] = useState<STATUS_DATA>(initialStatusData);
  const [edited, setEdited] = useState(false);
  const [timer, setTimer] = useState(1);
  const [isChangeLoading, setIsChangeLoading] = useState(false);
  const [isEditingAvatar, setIsEditingAvatar] = useState({
    largeImage: false,
    smallImage: false,
  });
  const [editingAvatar, setEditingAvatar] = useState({
    large_image: initialStatusData.large_image,
    small_image: initialStatusData.small_image || "",
  });

  const formatTimer = useCallback(() => {
    const hrs = Math.floor(timer / 3600);
    const mins = Math.floor((timer % 3600) / 60);
    const secs = timer % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, [timer]);

  const closeAvatarEditing = useCallback(() => {
    setIsEditingAvatar({ largeImage: false, smallImage: false });
  }, []);


  const changeStatus = useCallback(async (newStatusData: STATUS_DATA) => {
    setIsChangeLoading(true);
    try {
      await axios.put(`${BASE_URL}/statuses/`, newStatusData, {
        headers: {
          Authorization: `Bearer ${getCookie("jwt-token")}`
        }
      });
      setEdited(false);
      onStatusChange(newStatusData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsChangeLoading(false);
    }
  }, [onStatusChange]);

  const changeStatusData = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStatusData(prev => ({ ...prev, [name]: value }));
    setEdited(true);
  }, []);

  const changeEditingAvatar = useCallback(() => {
    const largeImage = editingAvatar.large_image || "https://sb.kaleidousercontent.com/67418/1920x1100/15a1437b21/checkered-bg.png";
    const smallImage = editingAvatar.small_image || "https://sb.kaleidousercontent.com/67418/1920x1100/15a1437b21/checkered-bg.png";
    const newStatusData = { ...statusData, large_image: largeImage, small_image: smallImage };
    setStatusData(newStatusData);
    closeAvatarEditing();
    changeStatus(newStatusData);
  }, [editingAvatar, statusData, closeAvatarEditing, changeStatus]);

  const handleAddToFavorites = useCallback(() => {
    const newStatusData = { ...statusData, favorite: true };
    setStatusData(newStatusData);
    changeStatus(newStatusData);
  }, [statusData, changeStatus]);

  const handleRemoveFromFavorites = useCallback(() => {
    const newStatusData = { ...statusData, favorite: false };
    setStatusData(newStatusData);
    changeStatus(newStatusData);
  }, [statusData, changeStatus]);


  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev + 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setStatusData(initialStatusData);
    setEditingAvatar({
        large_image: initialStatusData.large_image,
        small_image: initialStatusData.small_image || "",
    });
  }, [initialStatusData]);

  return {
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
  };
};