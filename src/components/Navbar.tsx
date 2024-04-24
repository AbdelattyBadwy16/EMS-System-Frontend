import React, { useState } from "react";

import uniLogo from "../assets/uniLogo.png";
import { Link } from "react-router-dom";




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
            {/* Drop down */}
            <div className=" relative inline-block text-left xl:hidden mr-6">
              <div>
                <button
                  type="button"
                  className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  id="menu-button"
                  aria-expanded={isOpen} /* Use isOpen state to control aria-expanded */
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
{ isOpen && (    <div
                className="absolute left-0 z-10 mt-2 w-44  rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
              >
                <div className="grid justify-items-center">
                  {/* Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" */}

                  <div className="hover:bg-gray-500 hover:text-white m-3 py-2 px-6 rounded">
                    <Link
                      to="/StudentHome"
                      className="  text-xl font-bold font-gesstwo"
                    >
                      الرئيسية
                      <i className="bx bxs-home hover:text-white text-base font-bold font-gesstwo m-2"></i>
                    </Link>
                  </div>

                  <div className="hover:bg-gray-500 hover:text-white  py-2 px-5 rounded">
                    <Link to="/" className="font-bold text-xl font-gesstwo">
                      اضافة لجنة
                      <i className="bx bxs-plus-square hover:text-white  text-base font-bold font-gesstwo m-2"></i>
                    </Link>
                  </div>

                  <div className="hover:bg-gray-500 hover:text-white m-3 py-2 px-5 rounded">
                    <Link to="/" className=" text-xl font-bold font-gesstwo">
                      تغيير كلمة السر
                    </Link>
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

            {/*  ---------------------*/}
            <div className="flex flex-1 items-center justify-center  sm:justify-center sm:ml-12 lg:justify-start">
              <h2 className="text-white text-4xl font-futura text-normal">
                |EMS|
              </h2>

              <div className="flex  ml-60 sm:hidden xl:flex">
                <div className="mr-3">
                  <Link
                    to="/"
                    className="text-white  font-bold text-xl font-gesstwo"
                  >
                    اضافة لجنة
                    <i className="bx bxs-plus-square text-white  text-base font-bold font-gesstwo m-2"></i>
                  </Link>
                </div>

                <div className="mr-2">
                  <Link
                    to="/StudentHome"
                    className="text-white  text-xl font-gesstwo"
                  >
                    الرئيسية
                    <i className="bx bxs-home text-white  text-base font-bold font-gesstwo m-2"></i>
                  </Link>
                </div>
              </div>
            </div>

            {/*right hand side*/}
            <div className="mx-auto flex flex-1 items-center justify-center sm:justify-end">
              <div className="flex ml-44 sm:hidden xl:flex">
                <div className="mr-3.5">
                  <Link
                    to="/"
                    className="text-white text-base font-bold font-gesstwo"
                  >
                    تغيير كلمة السر
                  </Link>
                </div>
                <div>
                  <Link
                    to="/Login"
                    className="text-white font-bold font-geDinkum bg-logoutBtnColor rounded-md px-1 py-1 gap-2"
                  >
                    <i className="bx bx-log-out ml-0.5 font-bold font-geDinkum"></i>{" "}
                    تسجيل الخروج
                  </Link>
                </div>
              </div>

              <div className="flex flex-1 items-center justify-end">
                <h2 className="text-white sm:text-lg xl:text-2xl  font-gesstwo font-medium ">
                  جامعة جنوب الوادي
                </h2>
                <img
                  className="size-24 flex justify-end"
                  src={uniLogo}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
