export interface STATUS_DATA {
    activity_type: STATUS_TYPE,
    created_on: string,
    details: string,
    editable: boolean,
    large_image: string,
    large_text: string,
    favorite: boolean,
    name: string,
    small_image: string | null,
    state: string,
    status_id: number
}

export type STATUS_TYPE = "PLAYING" | "LISTENING" | "WATCHING" | "COMPETING";
export type  PAGES = "all" | "favorites";

export const EMPTY_STATUS_DATA: STATUS_DATA = {
    name: "",
    details: "",
    state: "",
    large_image: "",
    large_text: "",
    favorite: false,
    small_image: null,
    activity_type: "PLAYING",
    created_on: new Date().toISOString(),
    editable: true,
    status_id: 0
}