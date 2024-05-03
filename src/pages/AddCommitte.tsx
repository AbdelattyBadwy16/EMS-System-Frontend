import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaPrint } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { getgetFacultyId } from '../Redux/Slices/FacultySlice';
import { GetFacultyData, GetSubjects } from '../helper/Api/FacultyApi';
import Spinner from '../components/shared/Spinner';
import { AddNewCommite, DeleteCommite, GetAllCommite } from '../helper/Api/CommiteApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { subjectDto } from '../helper/Api/FacultyApi';

interface commiteDto {
  day: string,
  lawInput: string,
  termInput: string,
  studyMethodInput: string,
  departInput: string,
  levelInput: string,
  commDate: Date,
  periodInput: string,
  stateInput: string,
  placeInput: string,
  commName: string,
  from: string,
  to: string,
  subjectName: string,
  subjectId: number
}

interface ExamData {
  Course: string;
  Date: string;
  Day: string;
  Period: string;
  Time: string;
  Location: string;
  Committee: string;
  seatNumber: string;
}

const AddCommitte = () => {
  // drop down data
  const time = ["الفترة", "صباحية", "مسائية"]
  const state = ["عامة", "خاصة"]
  const [sub, setSub] = useState<any>([{ id: 1, name: "لا يوجد مقررات" }])
  const [lawdto, setLaw] = useState<any>([]);
  const [term, setTerm] = useState<any>([]);
  const [studyMethod, setStudyMethod] = useState<any>([]);
  const [depart, setDepart] = useState<any>([]);
  const [level, setLevel] = useState<any>([]);
  const [place, setPLace] = useState<any>(["مبنى الفندق", "مبنى كلية حاسبات", "مبنى الفصول"]);

  // selected data
  const [day, setDay] = useState("");
  const [lawInput, setLawInput] = useState<any>("");
  const [termInput, setTermInput] = useState<any>();
  const [studyMethodInput, setStudyMethodInput] = useState("");
  const [departInput, setDepartInput] = useState<any>("");
  const [levelInput, setLevelInput] = useState<any>("");
  const [commDate, setDate] = useState(Date);
  const [periodInput, setperiodInput] = useState("");
  const [stateInput, setStateInput] = useState("عامة");
  const [placeInput, setPlaceInput] = useState("");
  const [commName, setCommName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");


  // subject filter
  let lawID = 0;
  let facultyNodeID = 0;
  let facultySemesterID = 0;
  let phaseID = 0;

  const [committe, setCommitte] = useState([]);
  const facultyID = useSelector(getgetFacultyId)
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const res = await GetFacultyData(facultyID);
        setLaw(res.bYlaw);
        setLawInput(res.bYlaw[0].name)
        setStudyMethod(res.studyMethod);
        setStudyMethodInput(res.studyMethod[0].name)
        setDepart(res.facultyNode);
        setDepartInput(res.facultyNode[0].name);
        setLevel(res.facultyPhase);
        setLevelInput(res.facultyPhase[0].name);
        setTerm(res.facultysemster);
        setTermInput(res.facultysemster[0].name);
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
        const res2 = await GetAllCommite(facultyID);
        setCommitte(res2);
      } catch {
        throw new Error("Faild To Fetch");
      } finally {
        setIsLoading(false);
      }
    }
    fetch();

  }, [])

  useEffect(() => {
    async function fetch() {
      for (let i = 0; i < lawdto.length; i++) {
        if (lawInput == lawdto[i].name) {
          lawID = lawdto[i].id;
        }
      }
      for (let i = 0; i < term.length; i++) {
        if (termInput == term[i].name) {
          facultySemesterID = term[i].id;
        }
      }
      for (let i = 0; i < level.length; i++) {
        if (levelInput == level[i].name) {
          phaseID = level[i].id;
          break;
        }
      }
      for (let i = 0; i < depart.length; i++) {
        if (departInput == depart[i].name) {
          facultyNodeID = depart[i].id;
        }
      }
      const data: subjectDto = {
        BylawId: lawID,
        PhaseId: phaseID,
        FacultyId: facultyID,
        FacultyNodeId: facultyNodeID,
        FacultySemesterId: facultySemesterID
      }
      try {
        const res = await GetSubjects(data);
        setSub(res);
      } catch {
        setSub([{ id: 1, name: "لا يوجد مقررات" }]);
      }
    }
    fetch();
  }, [facultyID, termInput, departInput, levelInput, lawInput])


  const GetDay = (e: any) => {
    setDate(e.target.value)
    var dateEntered = new Date(e.target.value);
    switch (dateEntered.getDay()) {
      case 1:
        setDay("الاثنين")
        break;
      case 2:
        setDay("الثلاثاء")
        break;
      case 3:
        setDay("الاربعاء")
        break;
      case 4:
        setDay("الخميس")
        break;
      case 5:
        setDay("الجمعة")
        break;
      case 6:
        setDay("السبت")
        break;
      case 0:
        setDay("الاحد")
        break;
      default: setDay("");
    }
  }

  const handelSubmit = async (e: any) => {
    e.preventDefault()
    if (day == "" || lawInput == "" || termInput == "" || placeInput == "" || commDate == "" || levelInput == "" || stateInput == "" || from == "" || to == ""
      || commName == "" || stateInput == ""
    ) {
      toast.warning("من فضلك لا تترك حقل فارغ");
      return;
    }
    try {
      let subId = 0;
      for (let i = 0; i < sub.length; i++) {
        if (sub[i].name == subject) {
          subId = sub[i].id;
          break
        }
      }
      const data: commiteDto =
      {
        day: day,
        lawInput: lawInput,
        termInput: termInput,
        studyMethodInput: studyMethodInput,
        departInput: departInput,
        levelInput: levelInput,
        commDate: new Date(commDate),
        periodInput: periodInput,
        stateInput: stateInput,
        placeInput: placeInput,
        commName: commName,
        from: from,
        to: to,
        subjectName: subject,
        subjectId: subId
      }
      const res = await AddNewCommite(data);


    } finally {
      toast.success("تم اضافة اللجنة بنجاح")
      setFrom("");
      setTo("");
      setCommName("");
      try {
        // Fetch Again
        const res2 = await GetAllCommite(facultyID);
        setCommitte(res2);
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function handelDelete(id: number, e: any) {
    // DELETE
    try {
      const res = await DeleteCommite(id);
    } finally {
      try {
        const res2 = await GetAllCommite(facultyID);
        if (res2)
          setCommitte(res2);
        else setCommitte([]);
      } finally {
        setIsLoading(false);
      }
    }

  }

  return (
    <>

      <div
        className=" px-2 sm:px-6 lg:px-20 w-full font-gesstwo "
        style={{ direction: "rtl" }}
      >
        {
          isLoading ? <Spinner></Spinner> :
            <>
              <ToastContainer autoClose={1500} theme='dark' />
              <Helmet>
                <title>اضافة لجنة</title>
              </Helmet>

              <form className="shadow rounded-xl mt-10 p-7 grid grid-cols-1 lg:grid-cols-3 gap-5 ">
                <div className='flex flex-col'>
                  <label className='font-bold text-[20px]'>اللائحة :</label>
                  <select
                    className="p-3 border-2 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
                    name=""
                    id=""
                    value={lawInput}
                    onChange={(e) => {
                      setLawInput(e.target.value)
                    }
                    }
                  >
                    {
                      lawdto.map((title: any) =>
                        <option key={title.id} className=" text-fontColor font-medium bg-black  text-white ">{title.name}</option>
                      )
                    }
                  </select>
                </div>

                <div className='flex flex-col'>
                  <label className='font-bold text-[20px]'>نظام الدراسة :</label>
                  <select
                    className="p-3 border-2 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
                    name=""
                    id=""
                    value={studyMethodInput}
                    onChange={(e) => setStudyMethodInput(e.target.value)}
                  >
                    {
                      studyMethod.map((title: any) =>
                        <option key={title.id} className=" text-fontColor font-medium bg-black  text-white ">{title.name}</option>
                      )
                    }
                  </select>
                </div>

                <div className='flex flex-col'>
                  <label className='font-bold text-[20px]'>القسم :</label>
                  <select
                    className="p-3 border-2 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
                    name=""
                    id=""
                    value={departInput}
                    onChange={(e) => setDepartInput(e.target.value)}
                  >
                    {
                      depart.map((title: any) =>
                        <option key={title.id} className=" text-fontColor font-medium bg-black  text-white ">{title.name}</option>
                      )
                    }
                  </select>
                </div>
                <div className='flex flex-col'>
                  <label className='font-bold text-[20px]'>المستوى :</label>
                  <select
                    className="p-3 border-2 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
                    name=""
                    id=""
                    value={levelInput}
                    onChange={(e) => setLevelInput(e.target.value)}
                  >
                    {
                      level.map((title: any) =>
                        <option key={title.id} className=" text-fontColor font-medium bg-black  text-white ">{title.name}</option>
                      )
                    }
                  </select>
                </div>
                <div className='flex flex-col'>
                  <label className='font-bold text-[20px]'>الفصل الدراسى :</label>
                  <select
                    className="p-3 border-2 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
                    name=""
                    id=""
                    value={termInput}
                    onChange={(e) => setTermInput(e.target.value)}
                  >
                    {
                      term.map((title: any) =>
                        <option key={title.id} className=" text-fontColor font-medium bg-black  text-white ">{title.name}</option>
                      )
                    }
                  </select>
                </div>
                <div className='flex flex-col'>
                  <label className='font-bold text-[20px]'>المقرر :</label>
                  <select
                    className="p-3 border-2 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
                    name=""
                    id=""
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  >
                    {
                      sub.map((title: any) =>
                        <option key={title.id} className=" text-fontColor font-medium bg-black  text-white ">{title.name}</option>
                      )
                    }
                  </select>
                </div>
                <div className='flex flex-col'>
                  <label className='font-bold text-[20px]'>التاريخ :</label>
                  <input value={commDate} onChange={(e) => GetDay(e)} className="p-3 border-2 rounded-xl w-full  border-borderColor text-gray-700 font-gesstwo font-bold text-lg" type='date' />
                </div>

                <div className='flex flex-col'>
                  <label className='font-bold text-[20px]'>اليوم :</label>
                  <input value={day} className="p-3 border-2 rounded-xl w-full  border-borderColor text-gray-700 font-gesstwo font-bold text-lg" disabled type='text' />
                </div>
                <div className='flex flex-col'>
                  <label className='font-bold text-[20px]'>الفترة :</label>
                  <select
                    className="p-3 border-2 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
                    name=""
                    id=""
                    value={periodInput}
                    onChange={(e) => setperiodInput(e.target.value)}
                  >
                    {
                      time.map((title: any, index) =>
                        <option key={index} className=" text-fontColor font-medium bg-black  text-white ">{title}</option>
                      )
                    }
                  </select>
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <input
                    className=" border-2 rounded-xl border-borderColor text-center text-fontColor font-medium	ml-3 h-[80%]"
                    type="number"
                    name=""
                    id=""
                    placeholder="من"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                  <input
                    className=" border-2 rounded-xl border-borderColor text-center mr-5 text-fontColor font-medium	h-[80%]"
                    type="number"
                    name=""
                    id=""
                    placeholder="الي"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                </div>

                <div className='flex flex-col'>
                  <label className='font-bold text-[20px]'>مكان اللجنة :</label>
                  <select
                    className="p-3 border-2 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
                    name=""
                    id=""
                    value={placeInput}
                    onChange={(e) => setPlaceInput(e.target.value)}
                  >
                    {
                      place.map((title: any, index: any) =>
                        <option key={index} className=" text-fontColor font-medium bg-black  text-white ">{title}</option>
                      )
                    }
                  </select>
                </div>

                <div className="flex flex-1 gap-5 items-center">
                  <div className='flex flex-col w-full'>
                    <label className='font-bold text-[20px]'>اسم اللجنة :</label>
                    <input
                      className=" border-2 rounded-xl border-borderColor text-center text-fontColor font-medium	ml-3 	"
                      type="text"
                      name=""
                      id=""
                      placeholder="اسم اللجنة"
                      value={commName}
                      onChange={(e) => setCommName(e.target.value)}
                    />
                  </div>
                  <div className='flex flex-col w-full'>
                    <label className='font-bold text-[20px]'>حالة اللجنة :</label>
                    <select
                      className="p-3 border-2 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
                      name=""
                      id=""
                      value={stateInput}
                      onChange={(e) => setStateInput(e.target.value)}
                    >
                      {
                        state.map((title: any, index) =>
                          <option key={index} className=" text-fontColor font-medium bg-black  text-white ">{title}</option>
                        )
                      }
                    </select>
                  </div>
                </div>


                <button onClick={(e) => handelSubmit(e)} className="bg-btnColor text-white rounded-lg p-2.5 w-28 mt-8	">
                  اضافة
                  <span className="mr-1 text-iconColor text-base">
                    <i className="bx bx-bookmark"></i>
                  </span>
                </button>
                <div></div>
                <div className="mr-40 mt-8">
                  <button className="bg-btnColor text-white rounded-lg	p-2.5 w-28 ml-4 ">
                    حفظ الجدول
                    <span className="mr-1 text-iconColor text-base">
                      <i className="bx bx-save"></i>
                    </span>
                  </button>
                  <button className="bg-logoutBtnColor text-white rounded-lg	p-2.5 w-28">
                    ازالة
                    <span className="mr-1">
                      <i className="bx bx-trash"></i>
                    </span>
                  </button>
                </div>
              </form>


              <div className='shadow rounded-xl mt-10 p-7'>
                {
                  committe.length ?
                    <table className='w-full border border-navColor rounded-md font-gesstwo overflow-x-auto'>
                      <thead className='text-21 bg-stone-800 text-neutral-200 text-center rounded'>
                        <tr>
                          <td className='w-1/8 p-1 '>المقرر</td>
                          <td className='w-1/8 p-1' >التاريخ</td>
                          <td className='w-1/8 p-1'>اليوم</td>
                          <td className='w-1/8 p-1'>الفترة</td>
                          <td className='w-1/8 p-1'>التوقيت</td>
                          <td className='w-1/8 p-1'>المكان</td>
                          <td className='w-1/8 p-1' >اللجنة</td>
                          <td className='w-1/8 p-1' >حذف لجنة</td>
                        </tr>
                      </thead>
                      <tbody className='text-18 text-center'>
                        {
                          committe.map((com: any, index) => (
                            <tr key={index} className={index % 2 !== 0 ? ' bg-neutral-200' : ''}>
                              <td className='w-1/8 p-2 '>{com.subjectName}</td>
                              <td className='w-1/8 p-2'>{com.date}</td>
                              <td className='w-1/8 p-2'>{com.day}</td>
                              <td className='w-1/8 p-2'>{com.interval}</td>
                              <td className='w-1/8 p-2'>{`${com.from} - ${com.to}`}</td>
                              <td className='w-1/8 p-2'>{com.place}</td>
                              <td className='w-1/8 p-2'>{com.name}</td>
                              <td className='w-1/8 p-2 text-center cursor-pointer text-red-500 hover:scale-125' onClick={(e) => handelDelete(com.id, e)}>X</td>
                            </tr>
                          ))}
                      </tbody>
                    </table> : <p className='text-center font-bold text-[50px]'>لا يوجد بيانات لعرضها</p>
                }
                <div className="flex justify-end mt-5">
                  <button className="btn-print bg-black text-white flex items-center px-4 py-1 rounded hover:bg-gray-800 ">
                    طباعة
                    <FaPrint className="mr-2" />
                  </button>
                </div>
              </div>
            </>
        }
      </div>
    </>
  );
};

export default AddCommitte;
