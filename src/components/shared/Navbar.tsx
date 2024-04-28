import { useState } from "react";

import uniLogo from "../../assets/uniLogo.png";
import menuIcon from "../../assets/menu.png"
import { Link } from "react-router-dom";
import LinkBtn from "../Navbar/LinkBtn";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-navColor w-[100%] my-auto  px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        {/*DropDown*/}
        <div className="relative inline-block text-left xl:hidden mr-6">
          <div>
            <button
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              id="menu-button"
              aria-expanded={
                isOpen
              } /* Use isOpen state to control aria-expanded */
              aria-haspopup="true"
              onClick={toggleMenu}
            >
              <img src={menuIcon} width="20"></img>
            </button>
          </div>
          {isOpen && (
            <div
              className="absolute bg-white left-0 z-10 mt-2 w-44  rounded-md  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex={-1}
            >
              <div className="grid items-center justify-center text-center border-2 shadow-lg rounded-md gap-3 p-3">
                {/* Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" */}
                <div>
                  <LinkBtn title="الرئيسية" color="black" icon="home" link="/studenthome" />
                </div>
                <div>
                  <LinkBtn title="اضافة لجنة" color="black" icon="plus-square" link="/" />
                </div>
                <div>
                  <LinkBtn title="تغيير كلمة السر" color="black" icon="lock-alt" link="/" />
                </div>
                <div className="m-3">
                  <Link
                    to="/Login"
                    className=" font-bold text-white hover:text-black font-geDinkum bg-logoutBtnColor rounded-md px-2 py-2 gap-2"
                  >
                    <i className="bx bx-log-out ml-0.5 font-bold font-geDinkum"></i>
                    تسجيل الخروج
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/*------------------------------*/}

        <div className="flex flex-1 items-center sm:justify-between justify-center">
          <h2 className="text-white text-4xl font-futura text-normal hidden sm:block">
            |EMS|
          </h2>
          <div className="lg:grid xl:grid-cols-6 grid-cols-4 m-auto items-center xl:mr-10 mr-25 gap-1 hidden">
            <div className="">
              <LinkBtn title="اضافة لجنة" color="white" icon="plus-square" link="/" />
            </div>
            <div className="">
              <LinkBtn title="الرئيسية" color="white" icon="home" link="/studenthome" />
            </div>
            <div className="xl:block hidden">

            </div>
            <div className="">
              <LinkBtn title="تغيير كلمة السر" color="white" icon="lock-alt" link="/" />
            </div>
            <Link
              to="/Login"
              className="text-white font-bold font-geDinkum  bg-logoutBtnColor rounded-md px-2 py-2 gap-2"
            >
              <i className="bx bx-log-out ml-0.5 font-bold font-geDinkum mr-2"></i>
              تسجيل الخروج
            </Link>
          </div>
          <div className="flex justify-center items-center ">
            <h2 className="text-white text-2xl font-gesstwo  text-end font-medium">
              جامعة جنوب الوادي
            </h2>
            <img
              className="size-24 sm:justify-end"
              src={uniLogo}
              alt=""
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
