import Sidebar from "../components/FacultyHome/Sidebar";
import TitleFacultyBar from "../components/GlobalAdmin/TitleFacultyBar";
import { GetAllFacultiesName, SearchInFacultiesNames } from "../helper/Api/FacultyApi";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
const Colleges = () => {
    const [facultyNames, setFacultyNames] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [allFaculty, setAllFac] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            let allFaculty = await GetAllFacultiesName();
            setFacultyNames(allFaculty);
            setAllFac(allFaculty);
        }
        fetch();
    }, [])

    useEffect(() => {
        const fetch = async () => {
            if (searchTerm != "") {
                const search = await SearchInFacultiesNames(searchTerm);
                setFacultyNames(search);
            } else setFacultyNames(allFaculty)
        }
        fetch();
    }, [searchTerm])
    return (
        <div className="flex pt-10 w-full mb-10 justify-center">
            <Helmet>
                <title>لجان جميع كليات جنوب الوادى</title>
            </Helmet>
            <div className="w-[70%]">
                <div className='flex items-center justify-center m-auto grid-cols-2 sm:grid-cols-4 gap-4 my-2 w-[50%]' style={{ padding: ' 10px 60px' }}>
                    <div className='w-full' style={{ height: '45px', width: '85%' }}>
                        <input onChange={(e) => setSearchTerm(e.target.value)} className='outline-none rounded-lg text-end w-full h-full p-3  border-2 border-solid border-gray-500' type='text' placeholder='ابحث باسم الكلية'></input>
                    </div>
                </div>
                <div className="w-full  sm:px-6 lg:px-8 " style={{ height: 'calc(100vh - 180px)', overflowX: 'auto' }}>
                    <div className="flex h-full justify-between  m-auto">
                        <div className="flex h-full justify-between  w-full">
                            <div className="flex-grow" style={{ overflowY: 'auto' }}>

                                {
                                    facultyNames.length ?
                                        facultyNames.map((item :any) => <TitleFacultyBar id={item?.id} title={item?.facultyName} />) : <h1 className="font-bold text-center text-[50px] mt-10">لا يوجد كليات بهذا الاسم</h1>
                                }   
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="h-full w-[15%]">
                <Sidebar />
            </div>
        </div>

    )
}


export default Colleges;