import React, { useState, useEffect } from 'react';
import { FaPrint } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getId, getRole } from '../Redux/Slices/userSlice';
import { GetStudentData } from '../helper/Api/StudentApi';
import Spinner from '../components/shared/Spinner';
import { Helmet } from 'react-helmet-async';
import { addFacultyData } from '../Redux/Slices/FacultySlice';
import { useNavigate } from 'react-router';


interface StudentData {
    name: string;
    facultyCode: string;
    level: string;
    status: string;
    department: string;
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



const StudentHome = () => {
    const [studentData, setStudentData] = useState<StudentData[]>([]);
    const [examData, setExamData] = useState<ExamData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const userId = useSelector(getId);
    const dispath = useDispatch();
    const role = useSelector(getRole);
    const nav = useNavigate();
    if(role == "FacultyAdmin"){
        nav("/facultyhome")
    }
    useEffect(() => {
        const fetch = async () => {
            try {
                setIsLoading(true);
                const res = await GetStudentData(userId);
                const Data = {
                    name: res.name,
                    facultyCode: res.facultyCode,
                    level: res.level,
                    status: res.status,
                    department: res.department,
                };
                dispath(addFacultyData(
                    {
                        id : res.facultyId,
                        name : res.facultyName
                    }
                ))
                setStudentData([Data]);
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

    }, []);



    return (
        isLoading ? <Spinner></Spinner> :
            <div className='student-page dir-rtl px-2 sm:px-6 lg:px-20 w-full font-gesstwo f' style={{ direction: 'rtl' }}>
                <Helmet>
                    <title>الصفحة الرئيسية</title>
                </Helmet>
                <ul className='student-information bg-neutral-200 rounded-xl w-full mt-10  p-5 list-disc list-inside text-21 font-medium text-neutral-900 grid grid-cols-1 lg:grid-cols-2 '>

                    {
                        studentData.map((student, index) => (
                            <React.Fragment key={index}>
                                <li className='mb-3'>
                                    اسم الطالب : {student.name}
                                </li>
                                <li className='mb-3'>
                                    المستوي : {student.level}
                                </li>
                                <li className='mb-3'>
                                    كود الطالب : {student.facultyCode}
                                </li>
                                <li className='mb-3'>
                                    البرنامج / القسم : {student.department}
                                </li>
                                <li>
                                    حالة الطالب : {student.status}
                                </li>
                            </React.Fragment>
                        ))
                    }
                </ul>
                <div className='shadow rounded-xl mt-10 p-7 overflow-y-auto'>
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
                                <td className='w-1/8 p-1 td-table'>رقم المقعد</td>
                            </tr>
                        </thead>
                        <tbody className='text-18 text-center'>
                            {
                                examData.map((exam, index) => (
                                    <tr key={index} className={index % 2 !== 0 ? ' bg-neutral-200' : ''}>
                                        <td className='w-1/8 p-2  td-table'>{exam.Course}</td>
                                        <td className='w-1/8 p-2 td-table'>{exam.Date}</td>
                                        <td className='w-1/8 p-2 td-table'>{exam.Day}</td>
                                        <td className='w-1/8 p-2 td-table'>{exam.Period}</td>
                                        <td className='w-1/8 p-2 td-table'>{exam.Time}</td>
                                        <td className='w-1/8 p-2 td-table'>{exam.Location}</td>
                                        <td className='w-1/8 p-2 td-table'>{exam.Committee}</td>
                                        <td className='w-1/8 p-2 td-table'>{exam.seatNumber}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>

                   
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

export default StudentHome;
