import React, { useEffect, useState } from 'react';
import SelectBtn from '../components/Committe/SelectBtn';
import { Helmet } from 'react-helmet-async';
import { FaPrint } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { getgetFacultyId } from '../Redux/Slices/FacultySlice';
import { GetFacultyData } from '../helper/Api/FacultyApi';
import Spinner from '../components/shared/Spinner';

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
  const time = ["الفترة", "صباحية", "مسائية"]
  const sub = ["المقرر", "برمجة مرئية", "مفاهيم برمجيه", "تشفير"]
  const [lawdto, setLaw] = useState([]);
  const [term, setTerm] = useState([]);
  const [studyMethod, setStudyMethod] = useState([]);
  const [depart, setDepart] = useState([]);
  const [level, setLevel] = useState([]);
  const facultyID = useSelector(getgetFacultyId)
  const [isLoading, setIsLoading] = useState(false);
  const [day, setDay] = useState("");
  const [examData, setExamData] = useState<ExamData[]>([]);


  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const res = await GetFacultyData(facultyID);
        setLaw(res.bYlaw);
        setStudyMethod(res.studyMethod);
        setDepart(res.facultyNode);
        setLevel(res.facultyPhase);
        setTerm(res.facultysemster);
      } catch {
        throw new Error("Faild To Fetch");
      } finally {
        setIsLoading(false);
      }
    }
    fetch();




    const examData = {
      Course: "أنظمة تشغيل",
      Date: "20/5/2024",
      Day: "الأحد",
      Period: "الصباحية",
      Time: "13:00 - 16:00",
      Location: "مبني الفصول - فصل2",
      Committee: "لجنة 4",
      seatNumber: "23"
    };
    setExamData([examData, examData, examData, examData]);
  }, [])


  const GetDay = (e: any) => {

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
        default : setDay("");
    }
  }
  return (
    <>
      {
        isLoading ? <Spinner></Spinner> :
          <div
            className=" px-2 sm:px-6 lg:px-20 w-full font-gesstwo "
            style={{ direction: "rtl" }}
          >
            <Helmet>
              <title>اضافة لجنة</title>
            </Helmet>
            <form className="shadow rounded-xl mt-10 p-7 grid grid-cols-1 lg:grid-cols-3 gap-5 ">
              <div className='flex flex-col'>
                <label className='font-bold text-[20px]'>اللائحة :</label>
                <SelectBtn option={lawdto}></SelectBtn>
              </div>

              <div className='flex flex-col'>
                <label className='font-bold text-[20px]'>نظام الدراسة :</label>
                <SelectBtn option={studyMethod}></SelectBtn>
              </div>
              <div className='flex flex-col'>
                <label className='font-bold text-[20px]'>القسم :</label>
                <SelectBtn option={depart}></SelectBtn>
              </div>
              <div className='flex flex-col'>
                <label className='font-bold text-[20px]'>المستوى :</label>
                <SelectBtn option={level}></SelectBtn>
              </div>
              <div className='flex flex-col'>
                <label className='font-bold text-[20px]'>الفصل الدراسى :</label>
                <SelectBtn option={term}></SelectBtn>
              </div>
              <div className='flex flex-col'>
                <label className='font-bold text-[20px]'>المقرر :</label>
                <SelectBtn option={sub}></SelectBtn>
              </div>
              <div className='flex flex-col'>
                <label className='font-bold text-[20px]'>التاريخ :</label>
                <input onChange={(e) => GetDay(e)} className="p-3 border-2 rounded-xl w-full  border-borderColor text-gray-700 font-gesstwo font-bold text-lg" type='date' />
              </div>

              <div className='flex flex-col'>
                <label className='font-bold text-[20px]'>اليوم :</label>
                <input value={day} className="p-3 border-2 rounded-xl w-full  border-borderColor text-gray-700 font-gesstwo font-bold text-lg" disabled type='text' />
              </div>
              <div className='flex flex-col'>
                <label className='font-bold text-[20px]'>الفترة :</label>
                <SelectBtn option={time}></SelectBtn>
              </div>
              <div className="flex flex-1">
                <input
                  className=" border-2 rounded-xl border-borderColor text-center text-fontColor font-medium	ml-3	"
                  type="number"
                  name=""
                  id=""
                  placeholder="من"
                />
                <input
                  className=" border-2 rounded-xl border-borderColor text-center mr-5 text-fontColor font-medium	"
                  type="number"
                  name=""
                  id=""
                  placeholder="الي"
                />
              </div>

              <select
                className="p-3 border-2 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
                name=""
                id=""
              >
                <option className="text-fontColor">مكان اللجنة</option>
              </select>

              <div className="flex flex-1">
                <input
                  className=" border-2 rounded-xl border-borderColor text-center text-fontColor font-medium	ml-3 	"
                  type="number"
                  name=""
                  id=""
                  placeholder="رقم اللجنة"
                />
                <input
                  className="border-2 rounded-xl border-borderColor text-center text-fontColor font-medium mr-5  "
                  type=""
                  name=""
                  id=""
                  placeholder="حالة اللجنة"
                />
              </div>


              <button className="bg-btnColor text-white rounded-lg p-2.5 w-28 mt-8	">
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
                    <td className='w-1/8 p-1'>رقم المقعد</td>
                  </tr>
                </thead>
                <tbody className='text-18 text-center'>
                  {
                    examData.map((exam, index) => (
                      <tr key={index} className={index % 2 !== 0 ? ' bg-neutral-200' : ''}>
                        <td className='w-1/8 p-2 '>{exam.Course}</td>
                        <td className='w-1/8 p-2'>{exam.Date}</td>
                        <td className='w-1/8 p-2'>{exam.Day}</td>
                        <td className='w-1/8 p-2'>{exam.Period}</td>
                        <td className='w-1/8 p-2'>{exam.Time}</td>
                        <td className='w-1/8 p-2'>{exam.Location}</td>
                        <td className='w-1/8 p-2'>{exam.Committee}</td>
                        <td className='w-1/8 p-2'>{exam.seatNumber}</td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <div className="flex justify-end mt-5">
                <button className="btn-print bg-black text-white flex items-center px-4 py-1 rounded hover:bg-gray-800 ">
                  طباعة
                  <FaPrint className="mr-2" />
                </button>
              </div>
            </div>
          </div>
      }
    </>
  );
};

export default AddCommitte;
