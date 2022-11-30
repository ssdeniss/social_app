import React, { useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { client } from "../client";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import facebookIcon from "../assets/facebook.svg";
import { googleAuth } from "../constants/API";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  console.log(googleAuth);
  const responseGoogle = (response) => {
    console.log(response);
    localStorage.setItem("user", JSON.stringify(response.clientId));
    const { name, goggleId, imageUrl } = response.clientId;
    const doc = {
      _id: goggleId,
      _type: "user",
      user: name,
      Image: imageUrl,
    };
    if (response.clientId) {
      navigate("/", { replace: true });
    }
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          autoPlay
          controls={false}
          muted
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 w-full h-full bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div style={{ flexDirection: "column" }} className="shadow-2xl flex">
            <GoogleOAuthProvider
              clientId={googleAuth}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            >
              <GoogleLogin
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                type="button"
                className="bg-mainColor flex justify-center items-center p-3 cursor-pointer outline-none"
              />
            </GoogleOAuthProvider>
            <FacebookLogin
              appId="544143500469475"
              autoLoad={true}
              fields="name,email,picture"
              icon={facebookIcon}
              buttonStyle={{
                backgroundColor: "#3b5998",
                height: "40px",
                color: "#fff",
                marginTop: "10px",
                borderRadius: "5px",
              }}
              cssClass="flex justify-center items-center p-3 cursor-pointer outline-none w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
