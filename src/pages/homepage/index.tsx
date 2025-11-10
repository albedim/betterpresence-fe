import { useEffect, useState } from "react";
import { isLoggedIn } from "../../utils";
import { Button } from "../../components/uui/base/buttons/button";
import { useNavigate } from "react-router-dom";

const Homepage = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    handleLogin();
  }, []);

  const handleLogin = async () => {
    const loggedIn_ = await isLoggedIn();
    setLoggedIn(loggedIn_);
    setIsLoading(false);
  }

  const handleSignin = () => {
    if (loggedIn) {
      navigate("/dashboard");
      return;
    }
    window.location.href = "https://discord.com/oauth2/authorize?client_id=1430291316528648253&redirect_uri=http://localhost:5173/signin&response_type=code&scope=identify%20email";
  }

  return (
    <div className="p-14">
      <h1 className="text-7xl leading-21 font-semibold">Customize Activities like <br /> Rich Custom presence <br />but waaaay better!</h1>
      <Button color="discord" onClick={handleSignin} className="text-xl p-4 rounded-2xl w-2/4 mt-10" isDisabled={isLoading}>
        Signin
      </Button>
    </div>
  )
};

export default Homepage;