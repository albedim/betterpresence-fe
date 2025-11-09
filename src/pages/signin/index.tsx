import axios from "axios";
import { use, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BASE_URL, setCookie } from "../../utils";

const Signin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const codeParam = searchParams.get("code");
    if (codeParam) {
      signin(codeParam);
    }
  }, [searchParams]);


  const signin = async (code: string) => {
    console.log("Signing in with code:", code);
    await axios.post(`${BASE_URL}/users/signin`, {
      code: code
    })
    .then((res) => {
      console.log("Signin successful:", res.data);
      setCookie("jwt-token", res.data.param.token, 7);
      navigate("/dashboard");
      navigate(0)
    })
    .catch((err) => {
      console.error("Signin failed:", err);
    });
  }

  return (
    <div>
      AA
    </div>
  )
};

export default Signin;