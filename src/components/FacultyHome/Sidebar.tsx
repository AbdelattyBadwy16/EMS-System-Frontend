import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    return (
        <div className='parent-sidebar h-full p-5 bg-gray-100 flex-col justify-between rounded-12px w-full flex items-center text-21'>
            <div className='links'>
                <div className={`my-2 text-center ${location.pathname === '/GlobalAdmin' ? 'active-link' : ''}`}>
                    <Link to="/GlobalAdmin" className={`py-2 block ${location.pathname === '/GlobalAdmin' ? 'active' : ''}`}>
                        لوحة التحكم
                    </Link>
                </div>
                <div className={`my-2 text-center ${location.pathname === '/Colleges' ? 'active-link' : ''}`}>
                    <Link to="/Colleges" className={`py-2 block ${location.pathname === '/Colleges' ? 'active' : ''}`}>
                        الكليات
                    </Link>
                </div>
                <div className={`my-2 text-center ${location.pathname === '/changepassword' ? 'active-link' : ''}`}>
                    <Link to="/changepassword" className={`py-2 block ${location.pathname === '/changepassword' ? 'active' : ''}`}>
                        تغيير كلمة السر
                    </Link>
                </div>
            </div>
            
            <div className='w-full'>
                <Link to="" className="text-white block w-full text-center  font-geDinkum bg-red-700 rounded-md px-2 py-1 gap-2 ">
                    <i className="bx bx-log-out ml-0.5  font-geDinkum mr-2"></i>
                    تسجيل الخروج
                </Link>
                <div className='flex items-center justify-center text-center'>
                    <div className='text-18 mt-4 text-end text-18 '>
                        <h2 >د.أحمد عكاوي</h2>
                        <p>أدمن</p>
                    </div>
                    <svg className="h-8 ms-5 w-8 text-gray-500 svg-admin text-25 mt-3"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
