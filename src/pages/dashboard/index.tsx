import axios from "axios";
import StatusBuilder from "../../components/status_builder";
import { BASE_URL, getCookie, isLoggedIn } from "../../utils";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { PAGES, STATUS_DATA } from "../../types";
import { BiSearch } from "react-icons/bi";
import { CgDanger } from "react-icons/cg";
import Menu from "../../components/menu";
import { DropdownButton } from "../../components/dropdown";
import { Button } from "../../components/uui/base/buttons/button";
import Selector from "./selector";
import ModalWrapper from "../../components/modal";
import DDAModal from "../../components/modal/dda_modal";
import RequestDesktopModal from "../../components/modal/request_desktop_modal";
import DeleteModal from "../../components/modal/delete_modal";
import DisconnectAppModal from "../../components/modal/disconnect_app_modal";
import Loading from "../loading";


interface DashboardProps {
  selectedPage: PAGES;
}

const items = [
  { label: "Playing", value: "PLAYING" },
  { label: "Watching", value: "WATCHING" },
  { label: "Listening", value: "LISTENING" },
  { label: "Competing", value: "COMPETING" },
];

const Dashboard: React.FC<DashboardProps> = (props) => {

  const [isPageLoading, setIsPageLoading] = React.useState(true);
  const [isAppSet, setIsAppSet] = React.useState(false);
  const [isAppLoading, setIsAppLoading] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);

  const [DDAModalOpen, setDDAModalOpen] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState({open: false, statusId: 0});
  const [disconnectAppModalOpen, setDisconnectAppModalOpen] = React.useState(false);
  const [requestDesktopModalOpen, setRequestDesktopModalOpen] = React.useState(false);

  const [shownStatuses, setShownStatuses] = React.useState<STATUS_DATA[]>([]);
  const [statuses, setStatuses] = React.useState<STATUS_DATA[]>([]);

  const navigate = useNavigate();


  const handleStatusChange = (value: string) => {
    const selectedItem = items.find(item => item.value === value);
    if (selectedItem) {
      createStatus(selectedItem.value);
    }
  }

  const handleSelectedPage = (page: PAGES) => {
    if (page === "all") {
      navigate("/dashboard");
      getStatuses();
    } else if (page === "favorites") {
      navigate("/dashboard/favorites");
      getFavoriteStatuses();
    }
  }

  const connectApplication = () => {
    setDDAModalOpen(true);
  }

  useEffect(() => {
    handleLogin();
  }, []);
  
  const handleLogin = async () => {
    const loggedIn = await isLoggedIn();
    if (!loggedIn) {
      navigate("/");
    } else {
      setIsPageLoading(false);
    }
  };

  const updateStatusList = (newStatus: STATUS_DATA) => {
    const updatedStatuses = statuses.map((status) =>
      status.status_id === newStatus.status_id ? newStatus : status
    );
    setStatuses(updatedStatuses);
    setShownStatuses(updatedStatuses);
  }

  const getApp = async () => {
    await axios.get(BASE_URL + "/users/app", {
      headers: {
        Authorization: "Bearer " + getCookie("jwt-token")
      }
    })
    .then((res) => {
      setIsAppSet(res.data.param != null);
      setIsAppLoading(false);
    })
    .catch((err) => {
      console.log(err);
    })
  };

  const getStatuses = async () => {
    setIsLoading(true);
    await axios.get(BASE_URL + "/statuses/", {
      headers: {
        Authorization: "Bearer " + getCookie("jwt-token")
      }
    })
    .then((res) => {
      setStatuses(res.data.param);
      setShownStatuses(res.data.param);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
    })
  };

  const getFavoriteStatuses = async () => {
    setIsLoading(true);
    await axios.get(BASE_URL + "/statuses/favorites", {
      headers: {
        Authorization: "Bearer " + getCookie("jwt-token")
      }
    })
    .then((res) => {
      setStatuses(res.data.param);
      setShownStatuses(res.data.param);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
    })
  };

  const createStatus = async (statusType: string) => {
    await axios.post(BASE_URL + "/statuses/", {
      activity_type: statusType
    }, {
      headers: {
        Authorization: "Bearer " + getCookie("jwt-token")
      }
    })
    .then((res) => {
      const newStatuses = [res.data.param, ...statuses];
      setStatuses(newStatuses);
      setShownStatuses(newStatuses)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const handleSearch = (query: string) => {
    if (query.length === 0) {
      setShownStatuses(statuses);
      return
    }
    const filteredStatuses = statuses.filter((status) =>
      status.name.toLowerCase().includes(query.toLowerCase()) ||
      status.details.toLowerCase().includes(query.toLowerCase()) ||
      status.state.toLowerCase().includes(query.toLowerCase())
    );
    console.log(filteredStatuses);
    setShownStatuses(filteredStatuses);
  }

  useEffect(() => {
    getApp()
    getStatuses();
  }, []);

  const onStatusDelete = (deleted: boolean, statusId: number) => {
    setDeleteModal({open: false, statusId: 0});
    if (!deleted) {
      return;
    }
    const updatedStatuses = statuses.filter((status) => status.status_id !== statusId);
    setStatuses(updatedStatuses);
    setShownStatuses(updatedStatuses);
  }

  const handleAppDisconnect = () => {
    navigate("/dashboard");
    navigate(0)
  };

  if (isPageLoading) {
    return (
      <Loading/>
    )
  }

  return (
    <>
      {DDAModalOpen ? (
        <ModalWrapper closeModal={() => setDDAModalOpen(false)}>
          <DDAModal />
        </ModalWrapper>
      ) : null}
      {requestDesktopModalOpen ? (
        <ModalWrapper closeModal={() => setRequestDesktopModalOpen(false)}>
          <RequestDesktopModal />
        </ModalWrapper>
      ) : null}
      {deleteModal.open ? (
        <ModalWrapper closeModal={() => setDeleteModal({open: false, statusId: 0})}>
          <DeleteModal onClose={(deleted) => onStatusDelete(deleted, deleteModal.statusId)} activityId={deleteModal.statusId} />
        </ModalWrapper>
      ) : null}
      {disconnectAppModalOpen ? (
        <ModalWrapper closeModal={() => setDisconnectAppModalOpen(false)}>
          <DisconnectAppModal onDDADisconnected={handleAppDisconnect} onClose={() => setDisconnectAppModalOpen(false)} />
        </ModalWrapper>
      ) : null}
      <div className="w-screen flex h-screen bg-[#FFFFFF]">
        <Menu
          onRequestDesktopApplication={() => setRequestDesktopModalOpen(true)}
          onDDAConnect={() => setDDAModalOpen(true)}
          onDDADisconnect={() => setDisconnectAppModalOpen(true)}
          selectedPage={props.selectedPage}
          setSelectedPage={handleSelectedPage} 
        />
        <div className="p-14 w-screen">
          <div>
            <h1 className="text-[black] font-medium text-xl">Your custom activities</h1>
          </div>
          {!isAppSet && !isAppLoading ? (
            <div className="border w-84 border-[#ffc934] bg-[#ffc934]/20 mt-4 p-1 rounded-lg">
              <div className="flex gap-1 ">
                <CgDanger size={54} className="text-[#c97200]"/>
                <p className="text-sm text-[#c97200] mt-1">You must create and connect a discord developer application in order to create and customize custom activities.</p>
              </div>
              <Button className="text-xs mt-2 w-full bg-[#c97200] font-medium" onClick={connectApplication}>Connect App</Button>
            </div>
          ): null}
          <div className="flex mb-14 w-full mt-14 items-center justify-between">
            <Selector onSelect={(page) => handleSelectedPage(page)} selectedPage={props.selectedPage} />
            <div className="flex gap-8">
              <div className="rounded-[10px] h-10 w-74 items-center pl-2 pr-4 border border-[#d1d1d1] p-1 flex gap-2">
                <BiSearch color="#b3b3b3" size={18}/>
                <input onChange={(e) => handleSearch(e.target.value)} className="bg-transparent text-sm outline-none" placeholder="Search your statuses..." />
              </div>
              <div className="flex gap-4">
                <DropdownButton disabled={!isAppSet} onStatusSet={(status) => handleStatusChange(status)} />
              </div>
            </div>
          </div>
          <div className="z-1">
            {isLoading ? (
              <div>
                Loading...
              </div>
            ) : (
              shownStatuses.length === 0 ? (
                <div>
                  Nothing found
                </div>
              ) : (
                <div>
                  <div className="grid md:grid-cols-3 grid-cols-2 z-1 gap-4 mt-3">
                    {shownStatuses.map((status) => (
                      <StatusBuilder onStatusDelete={() => setDeleteModal({open: true, statusId: status.status_id})} onStatusChange={(newStatus) => updateStatusList(newStatus)} key={status.status_id} statusData={status} />
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  )
};

export default Dashboard;