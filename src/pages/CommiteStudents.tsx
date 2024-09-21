import React, { useEffect, useState } from 'react';
import './info.css';
import { Helmet } from 'react-helmet-async';
import { GetCommiteDeltails, GetCommiteStudents } from '../helper/Api/CommiteApi';
import { GetCommiteDate } from '../helper/Constant';

function CommiteStudents() {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await GetCommiteStudents();
      setData(res);
      console.log(res);
    }
    fetch();
  }, []);
  const printInvoice = () => {
    window.print();
  };



  return (


    <div className="container m-12 p-8">
      <Helmet>
        <title>كل الطلبة</title>
      </Helmet>
      <h1 className='text-center font-bold text-[35px]'>اسماء الطلبة</h1>
      <div>
        {
          data.map((item: any, idx: any) => <h1 className='font-bold text-[20px]'>{idx + 1} - {item}</h1>)
        }
      </div>
    </div>



  );
}

export default CommiteStudents;
