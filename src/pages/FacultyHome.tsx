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
import { motion } from 'framer-motion'
import Cookies from "universal-cookie";


const FacultyHome = () => {
  const Cookie = new Cookies;
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const userId = useSelector(getId);
  const dispath = useDispatch();
  const [Committes, setCommittes] = useState<any>({});
  let facultyID = useSelector(getgetFacultyId);

  const role = useSelector(getRole);

  const [phaseLen, setPhaseLen] = useState(0);
  const nav = useNavigate();
  useEffect(() => {
    if (role == "Student") {
      nav("/studenthome")
    } else if (role == "Observers" || role == "Invigilators") {
      nav("/staffhome")
    }
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
    if (role != "GlobalAdmin")
      fetch();
  }, [])

  useEffect(() => {
    if (role == "GlobalAdmin") facultyID = Cookie.get("facultyId");
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
      <div className="px-2 sm:px-6 lg:px-20 w-full  text-right">
        <Helmet>
          <title>الصفحة الرئيسية</title>
        </Helmet>
        {
          role == "GlobalAdmin" ? "" :
            <motion.div
              variants={{
                hidden: { y: "-100vw", opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    delay: 0.3,
                    duration: 0.5,
                  },
                },
              }}
              initial="hidden"
              animate="visible" className='student-information bg-neutral-200 p-5 rounded-xl w-full mt-10  list-disc list-inside text-21 font-medium text-neutral-900'>

              <p className="font-bold text-center w-full text-[30px] ">
                مرحبا د/ {name}
              </p>

            </motion.div>
        }
        {/*flow cahrts */}
        <div className="shadow rounded-xl mt-10 p-7  ">
          <FacultyFlowcharts />
        </div>

        {/*اللجان المضافة */}
        <div className="w-full grid mt-9" >
          <div className="float-end mb-4 ">
            <h2 className="text-red text-[32px] leading-10 font-bold ">
              اللجان المضافة <span className="text-gray-500">|</span>
            </h2>
          </div>
          {
            phaseLen >= 1 ?
              Committes?.level1?.length ?
                <FacultyBars data={Committes.level1} title="المستوى الاول " number={1} />
                :
                <motion.p variants={{
                  hidden: { x: "100vw", opacity: 0 },
                  visible: {
                    x: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.5,
                      duration: 0.5,
                    },
                  },
                }}
                  initial="hidden"
                  animate="visible" className="m-6 Font-bold text-[35px] mt-10 bg-neutral-200  text-gray-600 p-5 rounded-lg">.لا يوجد لجان للمستوى الاول بعد</motion.p>
              : ""

          }
          {
            phaseLen >= 2 ?
              Committes?.level2?.length ?
                <FacultyBars data={Committes.level2} title="المستوى الثاني " number={2} />
                :
                <motion.p variants={{
                  hidden: { x: "-100vw", opacity: 0 },
                  visible: {
                    x: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.5,
                      duration: 0.5,
                    },
                  },
                }}
                  initial="hidden"
                  animate="visible" className="m-6 Font-bold text-[35px] mt-10 bg-neutral-200 text-gray-600 p-5 rounded-lg">.لا يوجد لجان للمستوى الثانى بعد</motion.p>
              : ""
          }
          {
            phaseLen >= 3 ?
              Committes?.level3?.length ?
                <FacultyBars data={Committes.level3} title="المستوى الثالث " number={3} />
                :
                <motion.p variants={{
                  hidden: { x: "100vw", opacity: 0 },
                  visible: {
                    x: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.5,
                      duration: 0.5,
                    },
                  },
                }}
                  initial="hidden"
                  animate="visible" className="m-6 Font-bold text-[35px] mt-10 bg-neutral-200 text-gray-600 p-5 rounded-lg">.لا يوجد لجان للمستوى الثالث بعد</motion.p>
              : ""
          }
          {
            phaseLen >= 4 ?
              Committes?.level4?.length ?
                <FacultyBars data={Committes.level4} title="المستوى الرابع " number={4} />
                :
                <motion.p variants={{
                  hidden: { x: "-100vw", opacity: 0 },
                  visible: {
                    x: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.5,
                      duration: 0.5,
                    },
                  },
                }}
                  initial="hidden"
                  animate="visible" className="m-6 Font-bold text-[35px] mt-10 bg-neutral-200 text-gray-600 p-5 rounded-lg">.لا يوجد لجان للمستوى الرابع بعد</motion.p>
              : ""
          }

          {
            phaseLen >= 5 ?
              Committes?.level5?.length ?
                <FacultyBars data={Committes.level5} title="المستوى الخامس " number={4} />
                :
                <motion.p variants={{
                  hidden: { x: "100vw", opacity: 0 },
                  visible: {
                    x: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.5,
                      duration: 0.5,
                    },
                  },
                }}
                  initial="hidden"
                  animate="visible" className="m-6 Font-bold text-[35px] mt-10 bg-neutral-200 text-gray-600 p-5 rounded-lg">.لا يوجد لجان للمستوى الخامس بعد</motion.p>
              : ""
          }

          {
            phaseLen >= 6 ?
              Committes?.level6?.length ?
                <FacultyBars data={Committes.level6} title="المستوى السادس " number={4} />
                :
                <motion.p variants={{
                  hidden: { x: "-100vw", opacity: 0 },
                  visible: {
                    x: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.5,
                      duration: 0.5,
                    },
                  },
                }}
                  initial="hidden"
                  animate="visible" className="m-6 Font-bold text-[35px] mt-10 bg-neutral-200 text-gray-600 p-5 rounded-lg">.لا يوجد لجان للمستوى السادس بعد</motion.p>
              : ""
          }

          {
            phaseLen >= 7 ?
              Committes?.level7?.length ?
                <FacultyBars data={Committes.level7} title="المستوى السابع " number={4} />
                :
                <motion.p variants={{
                  hidden: { x: "-100vw", opacity: 0 },
                  visible: {
                    x: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.5,
                      duration: 0.5,
                    },
                  },
                }}
                  initial="hidden"
                  animate="visible" className="m-6 Font-bold text-[35px] mt-10 bg-neutral-200 text-gray-600 p-5 rounded-lg">.لا يوجد لجان للمستوى السابع بعد</motion.p>
              : ""
          }

        </div>
      </div>
    </>
  );
};

export default FacultyHome;
