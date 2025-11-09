import axios from "axios";
import React from "react";
import { BASE_URL, getCookie } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { Button } from "../../uui/base/buttons/button";
import { Input } from "../../uui/base/input/input";

interface StepProps {
  onNext: () => void;
}

const CreateApplicationStep: React.FC<StepProps> = (props) => {

  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="bg-[#5865F2] p-2 w-7 h-7 flex items-center justify-around font-semibold rounded-full text-[white]">
          <p>1</p>
        </div>
        <h1 className="text-[16px] font-medium">Connect Application</h1>
      </div>
      <p className="mt-2 text-[14.4px] text-[#353535]">
        To connect your Discord application, you must go to your <a 
          href="https://discord.com/developers/applications"
          target="_blank"
          className="underline text-[#5865F2] font-medium"
          rel="noopener noreferrer">
            Discord Developer Portal
        </a>, create a developer app by clicking the button below and give it a name
      </p>
      <img className="w-[400px] mt-2 rounded-lg object-contain" src="/na.PNG" alt="" />
      <Button color="discord" className="text-sm w-full mt-4" onClick={props.onNext}>
        Next Step
      </Button>
    </div>
  )
};


const GetApplicationIDStep: React.FC<StepProps> = (props) => {

  return (
    <div>
      <div className="flex items-center mt-6 gap-2">
        <div className="bg-[#5865F2] p-2 w-7 h-7 flex items-center justify-around font-semibold rounded-full text-[white]">
          <p>2</p>
        </div>
        <h1 className="text-[16px] font-medium">Get the Application ID</h1>
      </div>
      <p className="mt-2 text-[14.4px] text-[#353535]">
        You will be redirected to the application settings page. 
        Copy the Application ID from like in the image below.
      </p>
      <img className="w-[400px] mt-2 rounded-lg object-contain" src="/ca.PNG" alt="" />
      <Button color="discord" className="text-sm w-full mt-4" onClick={props.onNext}>
        Next Step
      </Button>
    </div>
  )
}

const ConnectApplicationStep: React.FC<StepProps> = (props) => {

  const [isAppLoading, setIsAppLoading] = React.useState(false);
  const [applicationId, setApplicationId] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const connectApp = async () => {
    setIsAppLoading(true);
    await axios.post(BASE_URL + "/users/app/connect", {
      application_id: applicationId
    }, {
      headers: {
        Authorization: "Bearer " + getCookie("jwt-token")
      }
    })
    .then(() => {
      props.onNext();
    })
    .catch((err) => {
      setError(err.response.data.error.message || "An error occurred");
      console.log(err);
    })
    .finally(() => {
      setIsAppLoading(false);
    });
  };

  return (
    <div>
      <div className="flex mt-6 items-center gap-2">
        <div className="bg-[#5865F2] p-2 w-7 h-7 flex items-center justify-around font-semibold rounded-full text-[white]">
          <p>3</p>
        </div>
        <h1 className="text-[16px] font-medium">Connect the Application</h1>
      </div>
      <p className="mt-2 text-[14.4px] text-[#353535]">Paste the Application ID into the field below and click "Connect".</p>
      <div className="mt-4 flex w-full gap-2">
        <Input wrapperClassName="w-[248px] h-[38px]" value={applicationId} onChange={(e) => setApplicationId(e)} isRequired placeholder="Application ID" tooltip="Enter your Application ID" />
        <Button 
          color="discord"
          isDisabled={isAppLoading || applicationId.length === 0}
          className="text-sm w-full"
          onClick={connectApp}
        >
          Connect
        </Button>
      </div>
      <p className="text-[red] text-sm mt-2">{error}</p>
    </div>
  )
}

const StepperIndicator: React.FC<{currentStep: number}> = (props) => {

  return (
    <div className="flex items-center gap-2 mt-4">
      {[1,2,3].map((step) => (
        <div 
          key={step}
          className={`${props.currentStep >= step ? "bg-[#5865F2]" : "bg-[#b3b3b3]"} w-full h-1 rounded-full`}
        ></div>
      ))}
    </div>
  )
}


const DDAModal = () => {

  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const navigate = useNavigate();

  return (
    <div>
      <StepperIndicator currentStep={currentStep} />
      <div className="mt-6"></div>
      {currentStep === 1 && <CreateApplicationStep onNext={() => setCurrentStep(2)} />}
      {currentStep === 2 && <GetApplicationIDStep onNext={() => setCurrentStep(3)} />}
      {currentStep === 3 && <ConnectApplicationStep onNext={() => navigate(0)} />}
    </div>
  )
}

export default DDAModal;