import React, { useEffect, useState } from "react";
import FacultyBars from "../components/FacultyHome/FacultyBars";
import FacultyFlowcharts from "../components/FacultyHome/FacultyFlowcharts";
import { Helmet } from "react-helmet-async";
import { GetStaffData } from "../helper/Api/StaffApi";
import { addFacultyData } from "../Redux/Slices/FacultySlice";
import { getId } from "../Redux/Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const FacultyHome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name ,setName] = useState("");
  const userId = useSelector(getId);
  const dispath = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const res = await GetStaffData(userId);
        setName(res.model[0].name);
        dispath(addFacultyData(
          {
            id: res.model[0].facultyId,
            name: res.model[0].facultyName
          }
        ))
      } catch {
        throw new Error("Faild To Fetch");
      } finally {
        setIsLoading(false);
      }
    }
    fetch();
  }, [])

  return (
    <>
      <div className="container mx-auto my-2 text-right">
        <Helmet>
          <title>الصفحة الرئيسية</title>
        </Helmet>
        <div className='student-information bg-neutral-200 rounded-xl w-full mt-10 p-5 list-disc list-inside text-21 font-medium text-neutral-900'>
          <p className="font-bold text-center w-full text-[30px] ">
            مرحبا د/ {name}
          </p>
        </div>
        {/*flow cahrts */}
        <div className="">
          <FacultyFlowcharts />
        </div>

        {/*اللجان المضافة */}
        <div className="w-full grid mt-9 p-9" >
          <div className="float-end mb-4 ">
            <h2 className="text-red text-5xl leading-10 font-bold ">
              اللجان المضافة <span className="text-gray-500">|</span>
            </h2>
          </div>

          <FacultyBars title="المستوى الاول " number={1} />
          <FacultyBars title="المستوى الثاني " number={2} />
          <FacultyBars title="المستوى الثالث " number={3} />
          <FacultyBars title="المستوى الرابع " number={4} />

        </div>
      </div>
    </>
  );
};

export default FacultyHome;
