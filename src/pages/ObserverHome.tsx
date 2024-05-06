import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaPrint } from 'react-icons/fa';
import { GetStaffCommite, GetStaffData } from '../helper/Api/StaffApi';
import { useDispatch, useSelector } from 'react-redux';
import { getId, getRole } from '../Redux/Slices/userSlice';
import { useNavigate } from 'react-router';
import { addFacultyData } from '../Redux/Slices/FacultySlice';
import { GetCommiteDate } from '../helper/Constant';





const ObserverHome = () => {
    const [observerData, setObserverData] = useState<any>([]);
    const [examData, setExamData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const userId = useSelector(getId);
    const dispath = useDispatch();
    const role = useSelector(getRole);
    const componentRef = useRef<any>();

    const nav = useNavigate();
    if (role == "FacultyAdmin") {
       
        nav("/facultyhome")
    }
    useEffect(() => {
        const fetch = async () => {
            let res2;
            try {
                setIsLoading(true);
                const res = await GetStaffData(userId);
                res2 = await GetStaffCommite(userId);
                const Data: any = {
                    name: res.model[0].name,
                    degree: res.model[0].degree,
                };
                setObserverData(Data);
                dispath(addFacultyData(
                    {
                        id: res.model[0].facultyId,
                        name: res.model[0].facultyName
                    }
                ))
            } catch {
                throw new Error("Faild To Fetch");
            } finally {
                for (let i = 0; i < res2.length; i++) {
                    const date = new Date(res2[i].date);
                    res2[i].date = `${date.getDate()}-${date.getUTCMonth() + 1}-${date.getFullYear()}`;
                    res2[i].day = GetCommiteDate(res2[i].day);
                }
                setExamData(res2);
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
                <React.Fragment>
                    <li className='mb-3'>
                        اسم  المراقب/الملاحظ  : {observerData.name}
                    </li>
                    <li className='mb-3'>
                        الدرجة العلمية : {observerData.degree}
                    </li>

                </React.Fragment>
            </ul>
            <div className='shadow rounded-xl mt-10 p-7 overflow-y-auto'>
                {
                    examData.length ?
                        <table ref={componentRef} className='w-full border border-navColor rounded-md font-gesstwo '>
                            <thead className='text-21 bg-stone-800 text-neutral-200 text-center rounded'>
                                <tr>
                                    <td className='w-1/8 p-1  td-table'>المقرر</td>
                                    <td className='w-1/8 p-1 td-table' >التاريخ</td>
                                    <td className='w-1/8 p-1 td-table'>اليوم</td>
                                    <td className='w-1/8 p-1 td-table'>الفترة</td>
                                    <td className='w-1/8 p-1 td-table'>التوقيت</td>
                                    <td className='w-1/8 p-1 td-table'>المكان</td>
                                    <td className='w-1/8 p-1 td-table' >اللجنة</td>
                                    <td className='w-1/8 p-1 td-table'>عدد الطلاب</td>
                                </tr>
                            </thead>
                            <tbody className='text-18 text-center'>
                                {
                                    examData.map((exam: any, index: any) => (
                                        <tr key={index} className={index % 2 !== 0 ? ' bg-neutral-200' : ''}>
                                            <td className='w-1/8 p-2  td-table'>{exam.subjectsName}</td>
                                            <td className='w-1/8 p-2 td-table'>{exam.date}</td>
                                            <td className='w-1/8 p-2 td-table'>{exam.day}</td>
                                            <td className='w-1/8 p-2 td-table'>{exam.interval}</td>
                                            <td className='w-1/8 p-2 td-table'>{`${exam.from} - ${exam.to}`}</td>
                                            <td className='w-1/8 p-2 td-table'>{exam.place}</td>
                                            <td className='w-1/8 p-2 td-table'>{exam.name}</td>
                                            <td className='w-1/8 p-2 td-table'>{exam.studentNumber}</td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                        :
                        <h1 className='text-center text-[50px] font-bold'>لا يوجد لجان بعد.</h1>
                }
                
            </div>
            <div className="flex justify-end mt-5">
                    <button className="no-print  btn-print bg-black text-white flex items-center px-4 py-1 rounded hover:bg-gray-800 "
                    onClick={()=> {window.print()}}
                    >
                        طباعة
                        <FaPrint className="mr-2" />
                    </button>
            </div>

        </div>
    );
};












export default ObserverHome;