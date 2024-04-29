import React from "react";
import FacultyBars from "./FacultyBars";
import FacultyFlowcharts from "./FacultyFlowcharts";

const FacultyHome = () => {

  return (
    <>
      <div className="container mx-auto my-2 text-right">
        {/*flow cahrts */}
        <div className="">
       
       <FacultyFlowcharts/>


        </div>

        {/*اللجان المضافة */}
        <div className="w-full grid mt-9 p-9" >
          <div className="float-end mb-4 ">
            <h2 className="text-red text-5xl leading-10 font-bold ">
              اللجان المضافة <span className="text-gray-500">|</span>
            </h2>
          </div>

        <FacultyBars title="المستوى الاول " number={1}/> 
        <FacultyBars title="المستوى الثاني " number={2}/> 
        <FacultyBars  title="المستوى الثالث " number={3}/> 
        <FacultyBars title="المستوى الرابع " number={4}/> 
          
        </div>
      </div>
    </>
  );
};

export default FacultyHome;
