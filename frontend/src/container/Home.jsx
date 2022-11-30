import React, { useEffect, useRef, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, RouteConfig, Routes } from "react-router-dom";
import { client } from "../client";
import Sidebar from "../components/Sidebar";
import logo from "../assets/logo.png";
import { userQuery } from "../utils/data";
import UserProfile from "../components/UserProfile";
import Pins from "./Pins";

const Home = () => {
  const [togleSidebar, setTogleSidebar] = useState(false);
  const [userData, setUserData] = useState(null);
  const scrollRef = useRef(null);
  const user =
    localStorage.getItem("user") !== undefined
      ? localStorage.getItem("user")
      : "";
  useEffect(() => {
    const query = userQuery(user);
    client.fetch(query).then((data) => {
      setUserData(data);
    });
  }, [user]);
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out ">
        <div className="hidden md:flex h-screen flex-initial shadow-xl">
          <Sidebar user={user && user} />
        </div>
        <div className="flex md:hidden flex-row z-20">
          <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
            <HiMenu
              fontSize={40}
              className="cursor-pointer"
              onClick={() => setTogleSidebar(!togleSidebar)}
            />
            <Link to={`user-profile/${user}`}>
              <img src={logo} alt="" className="w-28" />
            </Link>
          </div>
          {togleSidebar && (
            <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
              <div className="absolute w-full flex justify-end items-center p-2">
                <AiFillCloseCircle
                  fontSize={30}
                  className="cursor-pointer"
                  onClick={() => setTogleSidebar(!togleSidebar)}
                />
              </div>
              <Sidebar user={user && user} closeToggle={setTogleSidebar} />
            </div>
          )}
        </div>
        <div className="pb-2 flex-1 h-screen overflow-y-auto" ref={scrollRef}>
          <Routes>
            <Route path="/user-profile:userId" element={<UserProfile />} />
            <Route path="/" element={<Pins user={user && user} />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Home;
