import Sidebar from "../components/FacultyHome/Sidebar";
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Charts from '../components/FacultyHome/Cahrts';
import PieChart from '../components/FacultyHome/PieChart';
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { GetAllCommitesGlobal, GetAllCommitesGlobalToday, GetAllStudentToday, GetMostFacultyToday } from "../helper/Api/CommiteApi";

const GlobalAdmin = () => {
    const [committeeData, setCommitte] = useState([{
        facultyName: "",
        committeeCount: 0
    }]);
    const [chartData, setChartData] = useState<any>({
        labels: [],
        values: []
    })

    const nav = useNavigate();
    const [numStundent, setNum] = useState(0);
    const [mostFactulty, setFaculty] = useState("لا يوجد اليوم");
    useEffect(() => {
        const fetch = async () => {
            let res2;
            try {
                const res = await GetAllCommitesGlobal();
                res2 = await GetAllCommitesGlobalToday();
                const numSt = await GetAllStudentToday();
                setNum(numSt?.totalStudentCount);
                setCommitte(res);
                var mostFaculty = await GetMostFacultyToday();
            } finally {
                setFaculty(mostFaculty?.facultyName);
                let values = [];
                let labels = [];
                for (let i = 0; i < res2.length; i++) {
                    values.push(res2[i].committeeCount);
                    labels.push(res2[i].facultyName);
                }
                setChartData({ values, labels });
            }
        }
        fetch();

    }, [])

    return (
        <div className="w-full pt-10 sm:px-6 lg:px-8 " style={{ height: 'calc(100vh - 110px)', overflowX: 'auto' }}>
            <Helmet>
                <title>الصفحة الرئيسية</title>
            </Helmet>
            <div className="flex h-full justify-between px-6 min-w-[1400px]">
                    <div className="min-w-[530px]" >
                        <div style={{ height: '50%', marginBottom: '5%' }} className=" bg-gray-100 rounded-12px p-4" >
                            <h1 className="text-center font-bold text-[25px]">عدد اللجان المفعلة اليوم</h1>
                            <PieChart data={chartData} />
                        </div>
                        <div style={{ height: '46%' }} >
                            <div className=" h-1/2 mb-2 py-5 px-10 flex items-center justify-between border border-solid border-green-500 rounded-12px">
                                <svg style={{ height: '70px', width: '70px' }} className="h-12 w-12 text-green-600" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="9" cy="7" r="4" />  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />  <path d="M16 3.13a4 4 0 0 1 0 7.75" />  <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>
                                <div className="text-end">
                                    <h1 className="text-25 font-bold">{numStundent}</h1>
                                    <h3 className="text-21">عدد الطلاب اليوم</h3>
                                </div>
                            </div>
                            <div className=" bg-green-700 h-1/2 py-5 px-10 flex items-center justify-between border border-solid border-white rounded-12px">
                                <svg style={{ height: '70px', width: '70px' }} className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                                <div className="text-end">
                                    <h1 className="text-25 text-white font-bold">{mostFactulty}</h1>
                                    <h3 className="text-21 text-white ">أكبر عدد اللجان</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="min-w-[530px]   ">
                        <div className=" bg-gray-100 p-4 rounded-12px" style={{ height: '50%', marginBottom: '5%' }} >
                            <h1 className="text-center font-bold text-[25px]">عدد اللجان</h1>
                            <Charts data={committeeData} />
                        </div>
                        <div onClick={() => nav("/Colleges")} style={{ height: '47%' }} className="cursor-pointer">
                            <div className="border border-solid border-gray-500 h-full rounded-12px p-5">
                                <div className="flex items-center justify-between ">
                                    <svg style={{ height: '30px', width: '30px' }} className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <h2 className="text-21 font-bold">لجان و جداول الكليات</h2>
                                </div>
                                <div className="committe mt-8" style={{ minHeight: '130px' }}>
                                    <div className="flex items-center justify-between mt-3 text-18">
                                        <Link to="" className="font-geDinkum ">
                                            <svg style={{ height: '30px', width: '30px' }} className="h-12 w-12 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <polyline points="15 18 9 12 15 6" /></svg>
                                        </Link>
                                        <h2>كلية الحاسبات والمعلومات</h2>
                                    </div>
                                    <div className="flex items-center justify-between mt-3 text-18">
                                        <Link to="" className="font-geDinkum ">
                                            <svg style={{ height: '30px', width: '30px' }} className="h-12 w-12 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <polyline points="15 18 9 12 15 6" /></svg>
                                        </Link>
                                        <h2>كلية الطب</h2>
                                    </div>
                                    <div className="flex items-center justify-between mt-3 text-18">
                                        <Link to="" className="font-geDinkum ">
                                            <svg style={{ height: '30px', width: '30px' }} className="h-12 w-12 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <polyline points="15 18 9 12 15 6" /></svg>
                                        </Link>
                                        <h2>كلية الصيدلة</h2>
                                    </div>
                                </div>
                                <button className="w-full p-2 text-gray-700 bg-gray-300 rounded-6px text-18">
                                    المزيد
                                </button>
                            </div>
                        </div>
                    </div>
                <div className="min-w-[260px] h-full">
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}


export default GlobalAdmin;