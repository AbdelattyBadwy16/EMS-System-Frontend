import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaPrint } from 'react-icons/fa'; // Import the print icon

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

const StudentHome: React.FC = () => {
  const [studentData, setStudentData] = useState<StudentData>({});
  const [subjectData, setSubjectData] = useState<SubjectData[]>([]);
  
  useEffect(() => {
    fetchStudentAndSubjectData();
  }, []);

  const fetchStudentAndSubjectData = async () => {
    // end point for student information
    const studentResponse = await fetch('end1');
    const studentJson: StudentData = await studentResponse.json();
    setStudentData(studentJson);
    // end point for table of exam
    const subjectResponse = await fetch('end2');
    const subjectJson: SubjectData[] = await subjectResponse.json();
    setSubjectData(subjectJson);
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
          اسم الطالب : {studentData.name}
        </li>
        <li className='mb-2'>
          المستوي : {studentData.level}
        </li>
        <li className='mb-2'>
          كود الطالب : {studentData.code}
        </li>
        <li className='mb-2'>
          البرنامج / القسم : {studentData.department}
        </li>
        <li>
          حالة الطالب : {studentData.status}
        </li>
      </ul>
      <div className='shadow rounded-2xl mt-10 p-7'>
        <DataTable
          title="جدول الامتحانات"
          columns={columns}
          data={subjectData}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15]}
          direction="rtl"
        />
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
