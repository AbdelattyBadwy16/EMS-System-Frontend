import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaPrint } from 'react-icons/fa';
import { GetStaffData } from '../helper/Api/StaffApi';
import { useSelector } from 'react-redux';
import { getId } from '../Redux/Slices/userSlice';

interface ObserverData {
    name: string;
    degree: string;
}

interface ExamData {
    Course: string;
    Date: string;
    Day: string;
    Period: string;
    Time: string;
    Location: string;
    Committee: string;
    numberOfStudents: string;
}




const ObserverHome = () => {
    const [observerData, setObserverData] = useState<ObserverData[]>([]);
    const [examData, setExamData] = useState<ExamData[]>([]); 
    const [isLoading ,setIsLoading] = useState(false);
    const userId = useSelector(getId);
    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);
                const res = await GetStaffData(userId);
                const Data = {
                    name: res.model,
                    degree: "استاذ مساعد",
                };
                setObserverData([Data]);
                console.log(res);
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
            numberOfStudents: "23"
        };
        setExamData([examData, examData, examData, examData]);

    }, []);



return (
    <div className='student-page dir-rtl px-2 sm:px-6 lg:px-20 w-full font-gesstwo f' style={{ direction: 'rtl' }}>
        <Helmet>
        <title>الصفحة الرئيسية</title>
        </Helmet>
        <ul className='student-information bg-neutral-200 rounded-xl w-full mt-10  p-5 list-disc list-inside text-21 font-medium text-neutral-900 grid grid-cols-1 lg:grid-cols-2'>

            {
                observerData.map((observer, index) => (
                    <React.Fragment key={index}>
                        <li className='mb-3'>
                            اسم  المراقب/الملاحظ  : {observer.name}
                        </li>
                        <li className='mb-3'>
                            الدرجة العلمية : {observer.degree}
                        </li>

                    </React.Fragment>
                ))
            }
        </ul>
        <div className='shadow rounded-xl mt-10 p-7'>
            <table className='w-full border border-navColor rounded-md font-gesstwo '>
                <thead className='text-21 bg-stone-800 text-neutral-200 text-center rounded'>
                    <tr>
                        <td className='w-1/8 p-1 '>المقرر</td>
                        <td className='w-1/8 p-1' >التاريخ</td>
                        <td className='w-1/8 p-1'>اليوم</td>
                        <td className='w-1/8 p-1'>الفترة</td>
                        <td className='w-1/8 p-1'>التوقيت</td>
                        <td className='w-1/8 p-1'>المكان</td>
                        <td className='w-1/8 p-1' >اللجنة</td>
                        <td className='w-1/8 p-1'>عدد الطلاب</td>
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
                                <td className='w-1/8 p-2'>{exam.numberOfStudents}</td>
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
);
};












export default ObserverHome;