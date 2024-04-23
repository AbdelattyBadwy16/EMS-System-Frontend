import React from "react";

import uniLogo from "../assets/uniLogo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-navColor">
        <div className="my-auto  px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            {/*left hand side*/}

            <div className="flex flex-1 items-center justify-center  sm:justify-start">
              <h2 className="text-white text-4xl font-futura text-normal">
                |EMS|
              </h2>

              <div className="flex  ml-60 ">

                <div className="mr-3">              
                  <Link to="/" className="text-white  font-bold text-xl font-gesstwo">
                    اضافة لجنة
                    <i className="bx bxs-plus-square text-white  text-base font-bold font-gesstwo m-2"></i>
                  </Link>
               
                </div>

                <div className="mr-2">
                  <Link to="/StudentHome" className="text-white  text-xl font-gesstwo">
                    الرئيسية
                    <i className="bx bxs-home text-white  text-base font-bold font-gesstwo m-2"></i>
                  </Link>
                
                </div>
              </div>
            </div>

            {/*right hand side*/}
            <div className="mx-auto flex flex-1 items-center justify-center sm:justify-end">
              <div className="flex ml-44">
                <div className="mr-3.5">
                  <Link to="/" className="text-white text-base font-bold font-gesstwo">
                    تغيير كلمة السر
                  </Link>
                </div>
                <div>
                  <Link to="/Login" className="text-white font-bold font-geDinkum bg-logoutBtnColor rounded-md px-1 py-1 gap-2">
                    <i className="bx bx-log-out ml-0.5 font-bold font-geDinkum"></i> تسجيل
                    الخروج
                  </Link>
                </div>
              </div>

              <div className="flex flex-1 items-center justify-center  sm:justify-end">
                <h2 className="text-white text-2xl font-gesstwo font-medium">
                  جامعة جنوب الوادي
                </h2>
                <img
                  className="size-24 flex sm:justify-end"
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
