import { useState } from "react";

import uniLogo from "../../assets/uniLogo.png";
import { Link } from "react-router-dom";
import LinkBtn from "../Login/LinkBtn";

const Navbar = () => {
  // set isLogin attribute to know the user in app already or in the login page 
  // const isLogin = from redux store;

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
                <LinkBtn title="اضافة لجنة" link="/" color="" icon="plus-square" />
                <LinkBtn title="الرئيسية" link="/" color="" icon="home" />
              </div>
            </div>
            {/*right hand side*/}
            <div className="mx-auto flex flex-1 items-center justify-center sm:justify-end">
              <div className="flex ml-44">
                <LinkBtn title="تغيير كلمة السر" link="/" color="" icon="" />
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
