import React, { useEffect, useState } from "react";
import FacultyBars from "../components/FacultyHome/FacultyBars";
import FacultyFlowcharts from "../components/FacultyHome/FacultyFlowcharts";
import { Helmet } from "react-helmet-async";
import { GetStaffData } from "../helper/Api/StaffApi";
import { addFacultyData, getgetFacultyId } from "../Redux/Slices/FacultySlice";
import { getId, getRole } from "../Redux/Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { GetAllCommite } from "../helper/Api/CommiteApi";

const FacultyHome = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const userId = useSelector(getId);
  const dispath = useDispatch();
  const [Committes, setCommittes] = useState<any>({});
  const facultyID = useSelector(getgetFacultyId);
  const role = useSelector(getRole);
  const [phaseLen, setPhaseLen] = useState(0);
  if (role == "Student") {
    const nav = useNavigate();
    nav("/studenthome")
  }
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

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const res = await GetAllCommite(facultyID);
        setPhaseLen(res?.len);
        setCommittes(res);
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
        <div className='student-information bg-neutral-200 p-5 rounded-xl w-full mt-10  list-disc list-inside text-21 font-medium text-neutral-900'>
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
          {
            phaseLen >= 1 ?
              Committes?.level1?.length ?
                <FacultyBars data={Committes.level1} title="المستوى الاول " number={1} />
                :
                <p className="m-6 Font-bold text-[35px] mt-10 bg-neutral-200  text-gray-600 p-5 rounded-lg">.لا يوجد لجان للمستوى الاول بعد</p>
              : ""

          }
          {
            phaseLen >= 2 ?
              Committes?.level2?.length ?
                <FacultyBars data={Committes.level2} title="المستوى الثاني " number={2} />
                :
                <p className="m-6 Font-bold text-[35px] mt-10 bg-neutral-200 text-gray-600 p-5 rounded-lg">.لا يوجد لجان للمستوى الثانى بعد</p>
              : ""
          }
          {
            phaseLen >= 3 ?
              Committes?.level3?.length ?
                <FacultyBars data={Committes.level3} title="المستوى الثالث " number={3} />
                :
                <p className="m-6 Font-bold text-[35px] mt-10 bg-neutral-200 text-gray-600 p-5 rounded-lg">.لا يوجد لجان للمستوى الثالث بعد</p>
              : ""
          }
          {
            phaseLen >= 4 ?
              Committes?.level4?.length ?
                <FacultyBars data={Committes.level4} title="المستوى الرابع " number={4} />
                :
                <p className="m-6 Font-bold text-[35px] mt-10 bg-neutral-200 text-gray-600 p-5 rounded-lg">.لا يوجد لجان للمستوى الرابع بعد</p>
              : ""
          }

          {
            phaseLen >= 5 ?
              Committes?.level5?.length ?
                <FacultyBars data={Committes.level5} title="المستوى الخامس " number={4} />
                :
                <p className="m-6 Font-bold text-[35px] mt-10 bg-neutral-200 text-gray-600 p-5 rounded-lg">.لا يوجد لجان للمستوى الخامس بعد</p>
              : ""
          }

          {
            phaseLen >= 6 ?
              Committes?.level6?.length ?
                <FacultyBars data={Committes.level6} title="المستوى السادس " number={4} />
                :
                <p className="m-6 Font-bold text-[35px] mt-10 bg-neutral-200 text-gray-600 p-5 rounded-lg">.لا يوجد لجان للمستوى السادس بعد</p>
              : ""
          }

          {
            phaseLen >= 7 ?
              Committes?.level7?.length ?
                <FacultyBars data={Committes.level7} title="المستوى السابع " number={4} />
                :
                <p className="m-6 Font-bold text-[35px] mt-10 bg-neutral-200 text-gray-600 p-5 rounded-lg">.لا يوجد لجان للمستوى السابع بعد</p>
              : ""
          }

        </div>
      </div>
    </>
  );
};

export default FacultyHome;
