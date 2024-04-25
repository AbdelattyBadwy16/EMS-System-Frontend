import { useState } from "react";

import uniLogo from "../../assets/uniLogo.png";
import { Link } from "react-router-dom";
import LinkBtn from "../Navbar/LinkBtn";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="bg-navColor">
        <div className="my-auto  px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/*left hand side*/}

            {/*DropDown*/}
            <div className=" relative inline-block text-left xl:hidden mr-6">
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
                  <svg
                    className="-mr-1 h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
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
                  <div className="flex flex-col items-center justify-center text-center border-2 shadow-lg rounded-md ">
                    {/* Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" */}
                    <LinkBtn title="الرئيسية" color="black" icon="home" link="/studenthome" />
                    <LinkBtn title="اضافة لجنة" color="black" icon="plus-square" link="/" />
                    <LinkBtn title="تغيير كلمة السر" color="black" icon="" link="/" />
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

            <div className="flex flex-1 items-center   sm:justify-start">
              <h2 className="text-white text-4xl font-futura text-normal">
                |EMS|
              </h2>

              <div className="flex flex-1 sm:hidden xl:flex ml-48 ">
                <LinkBtn title="اضافة لجنة" color="white" icon="plus-square" link="/"  />
                <LinkBtn title="الرئيسية" color="white" icon="home" link="/studenthome" />
              </div>
            </div>

            {/*right hand side*/}
            <div className="flex  items-center justify-end">


              <div className="flex  items-center">
                <div className="flex flex-1 sm:hidden xl:flex mr-48 items-center ">
                  <LinkBtn title="تغيير كلمة السر" color="white" icon="" link="/" />
                  <div className="">
                    <Link
                      to="/Login"
                      className="text-white font-bold font-geDinkum bg-logoutBtnColor rounded-md px-2 py-2 gap-2"
                    >
                      <i className="bx bx-log-out ml-0.5 font-bold font-geDinkum mr-2"></i>
                      تسجيل الخروج
                    </Link>
                  </div>
                </div>
                <div>
                  <h2 className="text-white text-2xl font-gesstwo font-medium">
                    جامعة جنوب الوادي
                  </h2>
                </div>
                <div>
                  <img
                    className="size-24 flex sm:justify-end"
                    src={uniLogo}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
