import React from "react";

import uniLogo from "../assets/uniLogo.png";

const Login = () => {
  return (
    <>
      <div className="navbar">
        <nav className="bg-navColor">
          <div className="my-auto  px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center  sm:justify-start">
                <h2 className="text-white text-4xl font-futura font-normal">
                  |EMS|
                </h2>
              </div>
              <div className="mx-auto flex flex-1 items-center justify-center sm:justify-end">
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
        </nav>
      </div>

      <div>Login</div>
    </>
  );
};

export default Login;
