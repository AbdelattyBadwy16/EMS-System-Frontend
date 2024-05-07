import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { getgetFacultyId } from '../Redux/Slices/FacultySlice';
import { GetFacultyData, GetPlaces, GetSubjects } from '../helper/Api/FacultyApi';
import Spinner from '../components/shared/Spinner';
import { AddNewCommite, DeleteAllCommite, DeleteCommite, SearchForCommite, UpdateCommitte } from '../helper/Api/CommiteApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { subjectDto } from '../helper/Api/FacultyApi';
import { GetCommiteDate } from '../helper/Constant';
import { GetFacultyInvigilators, GetFacultyObservers } from '../helper/Api/StaffApi';

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
  subjectId: number,
  studentNumber: number
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
  const [observ, setObserv] = useState<any>([]);
  const [invi, setInvi] = useState<any>([]);

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
  const [observInp, setObservInp] = useState<any>();
  const [idInviInp, setIdInviInp] = useState<any>([]);
  const [listinvi, setListInvi] = useState<any>([]);
  const [inviInp, setInviInp] = useState<any>();
  const [studentNum, setStudentNum] = useState<any>();
  // subject filter
  let lawID = 0;
  let facultyNodeID = 0;
  let facultySemesterID = 0;
  let phaseID = 0;

  const [committe, setCommitte] = useState([]);
  const facultyID = useSelector(getgetFacultyId)
  const [isLoading, setIsLoading] = useState(false);
  const [searchterm, setSearchterm] = useState("");
  const [subjectSearch, setSubjectSearch] = useState("");
  const [searchLevel, setSearchLevel] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);
  // Get Data For DropDowns
  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const res = await GetFacultyData(facultyID);
        const res2 = await GetPlaces();
        const res3 = await GetFacultyInvigilators(facultyID);
        const res4 = await GetFacultyObservers(facultyID);
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
        setPLace(res2);
        setPlaceInput(res2[0].name);
        setInvi(res3);
        setObserv(res4);
      } catch {
        throw new Error("Faild To Fetch");
      } finally {
        setIsLoading(false);
      }

    }
    fetch();
  }, [])


  // Filter Subjects
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
        if (!isUpdate) {
          setSubject(res[0].name);
        }
      } catch {
        setSub([{ id: 1, name: "لا يوجد مقررات" }]);
      }
    }
    fetch();
  }, [facultyID, termInput, departInput, levelInput, lawInput])

  // Search in Committe
  useEffect(() => {
    async function fetch() {
      let res2 = [];
      try {
        res2 = await SearchForCommite(facultyID, searchLevel, searchterm, subjectSearch);
      } finally {
        for (let i = 0; i < res2.length; i++) {
          const date = new Date(res2[i].date);
          res2[i].date = `${date.getDate()}-${date.getUTCMonth() + 1}-${date.getFullYear()}`;
          res2[i].day = GetCommiteDate(res2[i].day);
        }
        setCommitte(res2);
      }
    }
    fetch();
  }, [searchterm, searchLevel, subjectSearch])


  // Add Observer
  useEffect(() => {
    console.log(inviInp);
    for (let i = 0; i < idInviInp.length; i++) {
      if (idInviInp[i] == inviInp) return;
    }
    if (inviInp != undefined && inviInp != '0')
      setIdInviInp([...idInviInp, +inviInp]);
    else return;
    let data = "";
    for (let i = 0; i < invi.length; i++) {
      if (invi[i].id == +inviInp) data = invi[i].name;
    }
    setListInvi([...listinvi, data]);
  }, [inviInp])

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

  // Add Commite
  const handelSubmit = async (e: any) => {
    e.preventDefault()
    if (day == "" || lawInput == "" || termInput == "" || placeInput == "" || commDate == "" || levelInput == "" || stateInput == "" || from == "" || to == ""
      || commName == "" || stateInput == "" || subject == "" || !idInviInp.length || observInp == "" || studentNum == 0 || periodInput == ""
    ) {
      toast.warning("من فضلك لا تترك حقل فارغ");
      return;
    }
    let res;
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
        subjectId: subId,
        studentNumber: +studentNum
      }

      res = await AddNewCommite(data, observInp, idInviInp);
      console.log(res);
    } finally {
      if (+res >= 0 && +res <= 1000) {
        let mess = ' من فضلك تاكد من عدد الطلاب فاللجنة لا يزيد عن عدد الطلاب المتاحين وهو';
        mess += " ";
        mess += res
        toast.warning(mess);
      } else
        toast.success("تم اضافة اللجنة بنجاح")
      setFrom("");
      setTo("");
      setCommName("");
      let res2;
      try {
        // Fetch Again
        res2 = await SearchForCommite(facultyID, searchLevel, searchterm, subjectSearch);
        setCommitte(res2);
      } finally {
        for (let i = 0; i < res2.length; i++) {
          const date = new Date(res2[i].date);
          res2[i].date = `${date.getDate()}-${date.getUTCMonth() + 1}-${date.getFullYear()}`;
          res2[i].day = GetCommiteDate(res2[i].day);
        }
        setCommitte(res2);
        setIsLoading(false);
      }
    }
  }

  // Delete Committe
  async function handelDelete(id: number, e: any) {
    // DELETE
    e.preventDefault()
    try {
      const res = await DeleteCommite(id);
    } finally {
      let res2 = []
      try {
        res2 = await SearchForCommite(facultyID, searchLevel, searchterm, subjectSearch);
      } finally {
        for (let i = 0; i < res2.length; i++) {
          const date = new Date(res2[i].date);
          res2[i].date = `${date.getDate()}-${date.getUTCMonth() + 1}-${date.getFullYear()}`;
          res2[i].day = GetCommiteDate(res2[i].day);
        }
        setCommitte(res2);
        setIsLoading(false);
      }
    }

  }
  // DELETE All Commite
  async function handelDeleteAll(e: any) {
    try {
      const res = await DeleteAllCommite(facultyID);
    } finally {
      setCommitte([]);
    }
  }


  // From Invi List
  function handelDeleteItem(item: any) {
    let newData: any = [];
    let id = 0;
    for (let i = 0; i < invi.length; i++) {
      if (invi[i].name == item) {
        id = invi[i].id;
        break;
      }
    }
    for (let i = 0; i < listinvi.length; i++) {
      if (listinvi[i] != item) newData = [...newData, listinvi[i]];
    }
    setListInvi(newData);
    newData = [];
    for (let i = 0; i < idInviInp.length; i++) {
      if (idInviInp[i] != id) newData = [...newData, idInviInp[i]];
    }
    setIdInviInp(newData);
  }


  // handel Update
  const [comId, setCommeId] = useState(0);
  function handelUpdate(com: any) {
    setIsUpdate(true);
    setLawInput(com.byLaw)
    setCommeId(com.id);
    setStudyMethodInput(com.studyMethod)
    setDepartInput(com.facultyNode);
    setLevelInput(com.facultyPhase);
    setPlaceInput(com.place);
    setDay(com.day);
    let curDate = new Date().getMonth() + 1;
    if (curDate < 3) setTermInput("ترم اول");
    else setTermInput("ترم ثانى");
    setSubject(com.subjectName);
    setCommName(com.name);
    setperiodInput(com.interval);
    setFrom(com.from);
    setTo(com.to);
  }


  // Update
  async function addUpdate(e: any) {
    e.preventDefault();

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
      subjectId: 0,
      studentNumber: studentNum
    }
    let res2 = [];
    try {
      const res = await UpdateCommitte(comId, data);
    } finally {
      try {
        res2 = await SearchForCommite(facultyID, searchLevel, searchterm, subjectSearch);
      } finally {
        for (let i = 0; i < res2.length; i++) {
          const date = new Date(res2[i].date);
          res2[i].date = `${date.getDate()}-${date.getUTCMonth() + 1}-${date.getFullYear()}`;
          res2[i].day = GetCommiteDate(res2[i].day);
        }
        setCommitte(res2);
      }
      setIsUpdate(false);
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


              <form className="shadow rounded-xl mt-10 p-7 grid grid-cols-1 lg:grid-cols-3 gap-5  ">
                <div className='flex flex-col'>
                  <label className='font-bold text-[20px]'>اللائحة :</label>
                  {
                    !isUpdate ?
                      <select
                        className="p-3 border-2 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
                        name=""
                        id=""
                        style={{ height: '52px' }}
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
                      :
                      <input type='text' value={lawInput} disabled></input>
                  }
                </div>

                <div className='flex flex-col'>
                  <label className='font-bold text-[20px]'>نظام الدراسة :</label>
                  {
                    !isUpdate ?
                      <select
                        className="p-3 border-2 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
                        name=""
                        id=""
                        value={studyMethodInput}
                        onChange={(e) => setStudyMethodInput(e.target.value)}
                        style={{ height: '52px' }}
                      >
                        {
                          studyMethod.map((title: any) =>
                            <option key={title.id} className=" text-fontColor font-medium bg-black  text-white ">{title.name}</option>
                          )
                        }
                      </select>
                      :
                      <input type='text' value={studyMethodInput} disabled></input>
                  }
                </div>

                <div className='flex flex-col'>
                  <label className='font-bold text-[20px]'>القسم :</label>
                  {
                    !isUpdate ?
                      <select
                        className="p-3 border-2 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
                        name=""
                        id=""
                        value={departInput}
                        onChange={(e) => setDepartInput(e.target.value)}
                        style={{ height: '52px' }}
                      >
                        {
                          depart.map((title: any) =>
                            <option key={title.id} className=" text-fontColor font-medium bg-black  text-white ">{title.name}</option>
                          )
                        }
                      </select>
                      :
                      <input type='text' value={departInput} disabled></input>
                  }
                </div>
                <div className='flex flex-col'>
                  <label className='font-bold text-[20px]'>المستوى :</label>
                  {
                    !isUpdate ?
                      <select
                        className="p-3 border-2 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
                        name=""
                        id=""
                        value={levelInput}
                        onChange={(e) => setLevelInput(e.target.value)}
                        style={{ height: '52px' }}
                      >
                        {
                          level.map((title: any) =>
                            <option key={title.id} className=" text-fontColor font-medium bg-black  text-white ">{title.name}</option>
                          )
                        }
                      </select>
                      :
                      <input type='text' value={levelInput} disabled></input>
                  }
                </div>
                <div className='flex flex-col'>
                  <label className='font-bold text-[20px]'>الفصل الدراسى :</label>
                  {
                    !isUpdate ?
                      <select
                        className="p-3 border-2 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
                        name=""
                        id=""
                        value={termInput}
                        onChange={(e) => setTermInput(e.target.value)}
                        style={{ height: '52px' }}
                      >
                        {
                          term.map((title: any) =>
                            <option key={title.id} className=" text-fontColor font-medium bg-black  text-white ">{title.name}</option>
                          )
                        }
                      </select>
                      :
                      <input type='text' value={termInput} disabled></input>
                  }
                </div>
                <div className='flex flex-col'>
                  <label className='font-bold text-[20px]'>المقرر :</label>
                  {
                    !isUpdate ?
                      <select
                        className="p-3 border-2 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
                        name=""
                        id=""
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        style={{ height: '52px' }}
                      >
                        {
                          sub.map((title: any) =>
                            <option key={title.id} className=" text-fontColor font-medium bg-black  text-white ">{title.name}</option>
                          )
                        }
                      </select>
                      :
                      <input type='text' value={subject} disabled></input>
                  }
                </div>
                <div className='flex flex-col'>
                  <label className='font-bold text-[20px]'>التاريخ :</label>
                  <input style={{ height: '52px' }} value={commDate} onChange={(e) => GetDay(e)} className="p-3 border-2 rounded-xl w-full  border-borderColor text-gray-700 font-gesstwo font-bold text-lg" type='date' />
                </div>

                <div className='flex flex-col'>
                  <label className='font-bold text-[20px]'>اليوم :</label>
                  <input value={day} style={{ height: '52px' }} className="p-3 border-2 rounded-xl w-full   border-borderColor text-gray-600 font-gesstwo font-bold text-lg" disabled type='text' />
                </div>
                <div className='flex flex-col'>
                  <label className='font-bold text-[20px]'>الفترة :</label>
                  <select
                    className="p-3 border-2 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
                    name=""
                    id=""
                    value={periodInput}
                    onChange={(e) => setperiodInput(e.target.value)}
                    style={{ height: '52px' }}
                  >
                    {
                      time.map((title: any, index) =>
                        <option key={index} className=" text-fontColor font-medium bg-black  text-white ">{title}</option>
                      )
                    }
                  </select>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-x-4">
                  <div className='flex flex-col w-full'>
                    <label className='font-bold text-[20px]'>من :</label>
                    <input
                      className=" border-2 rounded-xl border-borderColor text-center text-fontColor font-medium	p-3 "
                      type="number"
                      name=""
                      id=""
                      placeholder="من"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      style={{ height: '52px' }}
                    />
                  </div>
                  <div className='flex flex-col w-full'>
                    <label className='font-bold text-[20px]'>إلي :</label>
                    <input
                      className=" border-2 rounded-xl border-borderColor text-center  text-fontColor font-medium	p-3"
                      type="number"
                      name=""
                      id=""
                      placeholder="الي"
                      value={to}
                      style={{ height: '52px' }}
                      onChange={(e) => setTo(e.target.value)}
                    />
                  </div>
                </div>

                <div className='flex flex-col'>
                  <label className='font-bold text-[20px]'>مكان اللجنة :</label>
                  <select
                    className="p-3 border-2 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
                    name=""
                    id=""
                    value={placeInput}
                    onChange={(e) => setPlaceInput(e.target.value)}
                    style={{ height: '52px' }}
                  >
                    {
                      place.map((item: any, index: any) =>
                        <option key={index} className=" text-fontColor font-medium bg-black  text-white ">{item.name}</option>
                      )
                    }
                  </select>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-x-4">
                  <div className='flex flex-col w-full'>
                    <label className='font-bold text-[20px]'>اسم اللجنة :</label>
                    <input
                      className=" border-2 rounded-xl border-borderColor text-center text-fontColor font-medium 	p-3"
                      type="text"
                      name=""
                      id=""
                      placeholder="اسم اللجنة"
                      value={commName}
                      onChange={(e) => setCommName(e.target.value)}
                      style={{ height: '52px' }}
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
                      style={{ height: '52px' }}
                    >
                      {
                        state.map((title: any, index) =>
                          <option key={index} className=" text-fontColor font-medium bg-black  text-white ">{title}</option>
                        )
                      }
                    </select>
                  </div>
                </div>

                <div className='flex flex-col'>
                  <label className='font-bold text-[20px]'>عدد الطلاب فاللجنة :</label>
                  <input value={studentNum} onChange={(e) => setStudentNum(e.target.value)} className="p-3 border-2 rounded-xl w-full  border-borderColor text-gray-700 font-gesstwo font-bold text-lg" type='text' />
                </div>
                {
                  !isUpdate ?
                    <>
                      <div className='flex flex-col w-full'>
                        <label className='font-bold text-[20px]'>المراقبين :</label>
                        <select
                          className="p-3 border-2 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
                          name=""
                          id=""
                          value={observInp}
                          style={{ height: '52px' }}
                          onChange={(e) => setObservInp(e.target.value)}
                        >
                          <option value={0}>اختر مراقب</option>
                          {
                            observ.map((title: any, index: any) =>
                              <option value={title.id} key={index} className=" text-fontColor font-medium bg-black  text-white ">{title.name}</option>
                            )
                          }
                        </select>
                      </div>

                      <div className='flex flex-col w-full'>
                        <label className='font-bold text-[20px]'>الملاحظين :</label>
                        <select
                          className="p-3 border-2 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
                          name=""
                          id=""
                          onChange={(e) => setInviInp(e.target.value)}
                        >
                          <option value={0}>اختر ملاحظ</option>

                          {
                            invi.map((title: any, index: any) =>
                              <option key={index} value={title.id} className=" text-fontColor font-medium bg-black  text-white ">{title.name}</option>
                            )
                          }
                        </select>
                      </div></> : ""
                }

                <div className='flex justify-between items-center lg:col-span-3'>
                  <div className='flex flex-col '>
                    {
                      !isUpdate ?
                        <button onClick={(e) => handelSubmit(e)} className="bg-btnColor text-white rounded-lg p-2.5 w-full mt-5 px-5	">
                          اضافة
                          <span className="mr-1 text-iconColor text-base">
                            <i className="bx bx-bookmark"></i>
                          </span>
                        </button>
                        :
                        <button onClick={(e) => addUpdate(e)} className="bg-yellow-600 text-white rounded-lg p-2.5 w-full	mt-5 px-5">
                          تعديل
                          <span className="mr-1 text-iconColor text-base">
                            <i className="bx bx-bookmark"></i>
                          </span>
                        </button>
                    }

                  </div>

                  <div className='cols-span-2 grid-cols-2 text-start'>
                    {
                      listinvi.length ?
                        <>
                          <p>الملاحظين :</p>
                          {
                            listinvi.map((item: any) => <p className='border-2 p-2 text-center rounded-md font-bold'>{item}<span className='mr-2 text-red-500 cursor-pointer hover:scale-150' onClick={() => handelDeleteItem(item)}>X</span></p>)
                          } </> : ""
                    }
                  </div>
                </div>
              </form>

              {/* Table */}
              <div className='shadow rounded-xl mt-10 p-7 '>
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 my-5 mb-10'>

                  <div className='w-full'>
                    <input style={{ height: '52px' }} className='w-full p-3 outline-none border-2 border-solid border-gray-500' onChange={(e) => setSearchterm(e.target.value)} value={searchterm} type='text' placeholder='ابحث باسم اللجنة'></input>
                  </div>
                  <div className='w-full'>
                    <input style={{ height: '52px' }} className='w-full p-3 outline-none border-2 border-solid border-gray-500 ' onChange={(e) => setSubjectSearch(e.target.value)} value={subjectSearch} type='text' placeholder='ابحث باسم المادة'></input>
                  </div>
                  <div className='w-full'>
                    <select style={{ height: '52px' }} onChange={(e) => setSearchLevel(+e.target.value)} className='w-full bg-[#e5e5e5] p-3 rounded-md'>
                      <option value={0}>المستوى</option>
                      {
                        level.map((item: any) => <option key={item.id} value={item.id}>{item.name}</option>)
                      }
                    </select>
                  </div>


                  <button onClick={(e) => handelDeleteAll(e)} className="bg-logoutBtnColor text-white rounded-lg p-2.5 w-full p-3 ">
                    ازالة
                    <span className="mr-1">
                      <i className="bx bx-trash"></i>
                    </span>
                  </button>
                </div>
                <div className='overflow-x-auto'>
                  {
                  committe.length ?
                    <table className='w-full border border-navColor rounded-md font-gesstwo overflow-x-auto'>
                      <thead className='text-21 bg-stone-800 text-neutral-200 text-center rounded'>
                        <tr>
                          <td className='w-1/8 p-1 td-table'>المقرر</td>
                          <td className='w-1/8 p-1 td-table' >التاريخ</td>
                          <td className='w-1/8 p-1 td-table'>اليوم</td>
                          <td className='w-1/8 p-1 td-table'>الفترة</td>
                          <td className='w-1/8 p-1 td-table'>التوقيت</td>
                          <td className='w-1/8 p-1 td-table'>المكان</td>
                          <td className='w-1/8 p-1 td-table' >اللجنة</td>
                          <td className='w-1/8 p-1 td-table' >اعدادات</td>
                        </tr>
                      </thead>
                      <tbody className='text-18 text-center'>
                        {
                          committe.map((com: any, index) => (
                            <tr key={index} className={index % 2 !== 0 ? ' bg-neutral-200' : ''}>
                              <td className='w-1/8 p-2 td-table'>{com.subjectName}</td>
                              <td className='w-1/8 p-2 td-table'>{com.date}</td>
                              <td className='w-1/8 p-2 td-table'>{com.day}</td>
                              <td className='w-1/8 p-2 td-table'>{com.interval}</td>
                              <td className='w-1/8 p-2 td-table'>{`${com.from} - ${com.to}`}</td>
                              <td className='w-1/8 p- td-table'>{com.place}</td>
                              <td className='w-1/8 p-2 td-table'>{com.name}</td>
                              <td className='w-1/8 p-2 text-center cursor-pointer flex  justify-center items-center gap-5  td-table'  ><p className='bg-green-500 text-white p-1 px-3 rounded-lg ' onClick={(e) => handelUpdate(com)}>تعديل</p><p className='bg-red-500 p-1 px-3 text-white rounded-lg' onClick={(e) => handelDelete(com.id, e)}>حذف</p></td>
                            </tr>
                          ))}
                      </tbody>
                    </table> : <p className='text-center font-bold text-[30px]'>لا يوجد بيانات لعرضها</p>
                }
                </div>

                
              </div>
            </>
        }
      </div>
    </>
  );
};

export default AddCommitte;
