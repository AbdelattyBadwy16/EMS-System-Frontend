import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaPrint } from 'react-icons/fa'; 

interface StudentData {
    name: string;
    level: string;
    code: string;
    department: string;
    status: string;
}

interface SubjectData {
    committee: string;
    location: string;
    time: string;
    period: string;
    day: string;
    date: string;
    course: string;
}

const StudentHome = () => {
    const [studentData, setStudentData] = useState<StudentData[]>([{ name:"ahmed",level:"بسش",code:"ahda",department : "fdsfs",status :"fda" }]);
    // const [subjectData, setSubjectData] = useState<SubjectData[]>([]);


    useEffect(() => {
        fetchStudentAndSubjectData();
    }, []);

    const fetchStudentAndSubjectData = async () => {
        // fetch data here
    };

    const columns = [
        {
            name: 'اللجنة',
            selector: 'committee',
            sortable: true,
        },
        {
            name: 'المكان',
            selector: 'location',
            sortable: true,
        },
        {
            name: 'التوقيت',
            selector: 'time',
            sortable: true,
        },
        {
            name: 'الفترة',
            selector: 'period',
            sortable: true,
        },
        {
            name: 'اليوم',
            selector: 'day',
            sortable: true,
        },
        {
            name: 'التاريخ',
            selector: 'date',
            sortable: true,
        },
        {
            name: 'المقرر',
            selector: 'course',
            sortable: true,
        },
    ];


    return (
        <div className='student-page dir-rtl px-2 sm:px-6 lg:px-20 w-full' style={{ direction: 'rtl' }}>
            <ul className='student-information bg-neutral-200 rounded-2xl w-full mt-10  p-7 list-disc list-inside text-lg text-neutral-600 grid grid-cols-1 lg:grid-cols-2'>
                <li className='mb-2'>
                    اسم الطالب : {studentData[0].name}
                </li>
                <li className='mb-2'>
                    المستوي : {studentData[0].level}
                </li>
                <li className='mb-2'>
                    كود الطالب : {studentData[0].code}
                </li>
                <li className='mb-2'>
                    البرنامج / القسم : {studentData[0].department}
                </li>
                <li>
                    حالة الطالب : {studentData[0].status}
                </li>
            </ul>
            <div className='shadow rounded-2xl mt-10 p-7'>

                <div className="flex justify-end mt-10">
                    <button className="btn-print bg-black text-white flex items-center px-4 py-2 rounded hover:bg-gray-800">
                        طباعة
                        <FaPrint className="mr-2" />
                    </button>
                </div>


            </div>

        </div>
    );
};

export default StudentHome;
