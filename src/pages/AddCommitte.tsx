import React, { useEffect, useState } from 'react';
import SelectBtn from '../components/Committe/SelectBtn';
import { Helmet } from 'react-helmet-async';
import { FaPrint } from 'react-icons/fa';

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
  const law = ["اللائحة", "ساعات معتمده", "نظام عادى"]
  const studyMethod = ["نظام الدراسه", "انتظام", "انتساب"]
  const time = ["الفترة", "صباحية", "مسائية"]
  const depart = ["القسم", "علوم حاسب", "تكنولوجيا معلومات"]
  const level = ["المستوى/الفرقة", "اول", "ثانى", "ثالث", "رابع"]
  const sub = ["المقرر", "برمجة مرئية", "مفاهيم برمجيه", "تشفير"]
  const [lawdto, setLaw] = useState("");

  const [examData, setExamData] = useState<ExamData[]>([]);
  useEffect(() => {
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
  })
  return (
    <>
      <div
        className=" px-2 sm:px-6 lg:px-20 w-full font-gesstwo "
        style={{ direction: "rtl" }}
      >
        <Helmet>
          <title>اضافة لجنة</title>
        </Helmet>
        <form className="shadow rounded-xl mt-10 p-7 grid grid-cols-1 lg:grid-cols-3 gap-5 ">

          <SelectBtn option={law}></SelectBtn>
          <SelectBtn option={studyMethod}></SelectBtn>
          <SelectBtn option={depart}></SelectBtn>
          <SelectBtn option={level}></SelectBtn>
          <SelectBtn option={sub}></SelectBtn>

          <select
            className="p-3 border-2	 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
            name=""
            id=""
          >
            <option>اليوم</option>
          </select>
          <select
            className="p-3 border-2	 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
            name=""
            id=""
          >
            <option>التاريخ</option>
          </select>
          <SelectBtn option={time}></SelectBtn>
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
            className="col-span-2 p-3 border-2 rounded-xl border-borderColor text-gray-700 font-gesstwo font-bold text-lg"
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
    </>
  );
};

export default AddCommitte;
