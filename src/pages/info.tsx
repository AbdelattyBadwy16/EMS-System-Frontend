import React, { useEffect, useState } from 'react';
import './info.css';
import { Helmet } from 'react-helmet-async';
import { GetCommiteDeltails } from '../helper/Api/CommiteApi';
import { GetCommiteDate } from '../helper/Constant';
import { useNavigate } from 'react-router';

function Info() {
  const [data, setData] = useState<any>({});
  const [newDate, setDate] = useState("");
  const [newDay, setDay] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const res = await GetCommiteDeltails();
      setData(res);
      const date = new Date(res.date);
      const newDate = `${date.getDate()}-${date.getUTCMonth() + 1}-${date.getFullYear()}`;
      const newDay = GetCommiteDate(res?.day);
      setDate(newDate);
      setDay(newDay);
    }
    fetch();
  }, []);
  const printInvoice = () => {
    window.print();
  };



  return (


    <div className="container m-12 p-8">
      <Helmet>
        <title>بيانات اللجنة</title>
      </Helmet>
      <h2 className=' text-3xl font-bold'>بيانات اللجنة</h2>
      <div className="grid grid-cols-3">
        <div className="form-group grid">
          <label htmlFor="name">الاسم :</label>
          <input className='border-none' type="text" id="name" value={data.name} disabled />
        </div>
        <div className="form-group grid">
          <label htmlFor="date">التاريخ:</label>
          <input className='border-none' type="text" id="name" value={newDate} disabled />
        </div>

        <div className="form-group grid">
          <label htmlFor="day">اليوم:</label>
          <input type="text" id="day" value={newDay} disabled />
        </div>
        <div className="form-group grid">
          <label htmlFor="fatra">الفتره:</label>
          <input type="text" id="fatra" value={data.interval} disabled />
        </div>

        <div className="form-group grid">
          <label htmlFor="place">المكان:</label>
          <input type="text" id="place" value={data.place} disabled />
        </div>
        <div className="form-group grid">
          <label htmlFor="mada">الماده:</label>
          <input type="text" id="mada" value={data.subjectsName} disabled />
        </div>

        <div className="form-group grid">
          <label htmlFor="kesm">القسم:</label>
          <input type="text" id="kesm" value={data.facultyNode} disabled />
        </div>
        <div className="form-group grid">
          <label htmlFor="mostaoa">المستوى:</label>
          <input type="text" id="mostaoa" value={data.facultyPhase} disabled />
        </div>

        <div className="form-group grid">
          <label htmlFor="hala">الحاله :</label>
          <input type="text" id="hala" value={data.status} disabled />
        </div>
        <div className="form-group grid">
          <label htmlFor="wakt">الوقت:</label>
          <input type="text" id="wakt" value={`${data.to} - ${data.from}`} disabled />
        </div>

        <div className="form-group grid">
          <label htmlFor="num">عدد الطلاب:</label>
          <input type="text" id="num" value={data.studentNumber} disabled />
        </div>


        <div className="form-group grid">
          <label htmlFor="num">المراقب:</label>
          {
            data?.observers?.map((item: any) => <input type="text" id="num" value={item} disabled />)
          }
        </div>


        <div className="form-group grid">
          <label htmlFor="num">الملاحظين:</label>
          <div className='bg-gray-50 p-5 pb-10 rounded-lg'>{
            data?.invigilators?.map((item: any, idx: any) => <h1 className='mt-5 font-bold text-[20px]'>{idx + 1} - {item}</h1>)
          }
          </div>
        </div>
      </div>

      <div className='flex justify-between'>
        <button className="button" onClick={printInvoice}>طباعة</button>
        <button className="button" onClick={() => nav("/allstudents")}>عرض الطلاب</button>
      </div>
    </div>



  );
}

export default Info;
