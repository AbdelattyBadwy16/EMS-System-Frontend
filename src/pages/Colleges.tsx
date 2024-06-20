import Sidebar from "../components/FacultyHome/Sidebar";
import { Link } from 'react-router-dom';
import FacultyBars from "../components/FacultyHome/FacultyBars";
const Colleges =() => {
    return(
        <div>
            <div className='flex  items-center justify-center   min-w-[1400px] m-auto grid-cols-2 sm:grid-cols-4 gap-4 my-2' style={{padding: ' 10px 60px' }}>
                <button style={{ height: '45px',width:'15%'}}   className="bg-btnColor text-white rounded-lg p-2.5 w-full  h-full	font-bold text-18">
                    بحث       
                </button>
                <div className='w-full' style= {{ height: '45px',width:'85%'}}>
                    <input className='border border-gray-400 outline-none rounded-lg text-end w-full h-full p-3 outline-none border-2 border-solid border-gray-500'  type='text' placeholder='ابحث باسم الكلية'></input>
                </div>
            </div>
            <div className="w-full  sm:px-6 lg:px-8 " style={{ height: 'calc(100vh - 180px)', overflowX: 'auto' }}>
                <div className="flex h-full justify-between  min-w-[1400px] m-auto">
                    <div className="flex h-full justify-between  w-full">
                        <div className="flex-grow min-w-[1060px]" style={{overflowY: 'auto' }}>
                            <FacultyBars data={'abc'} title="كلية الحاسبات والمعلومات" number={0} />
                            <FacultyBars data={'abc'} title="كلية الحاسبات والمعلومات" number={0} />
                            <FacultyBars data={'abc'} title="كلية الحاسبات والمعلومات" number={0} />
                            <FacultyBars data={'abc'} title="كلية الحاسبات والمعلومات" number={0} />
                            <FacultyBars data={'abc'} title="كلية الحاسبات والمعلومات" number={0} />
                            <FacultyBars data={'abc'} title="كلية الحاسبات والمعلومات" number={0} />
                            <FacultyBars data={'abc'} title="كلية الحاسبات والمعلومات" number={0} />
                            <FacultyBars data={'abc'} title="كلية الحاسبات والمعلومات" number={0} />
                            <FacultyBars data={'abc'} title="كلية الحاسبات والمعلومات" number={0} />
                            <FacultyBars data={'abc'} title="كلية الحاسبات والمعلومات" number={0} />
                        </div>
                        <div className="min-w-[260px] h-full">
                            <Sidebar />
                        </div>
                    </div>
            </div>

            </div>
            
        </div>
        
    )
}


export default Colleges;