import Sidebar from "../components/FacultyHome/Sidebar";
import { Link } from 'react-router-dom';
import FacultyBars from "../components/FacultyHome/FacultyBars";
const Colleges =() => {
    return(
        <div className="w-full pt-10 sm:px-6 lg:px-8" style={{ height: 'calc(100vh - 110px)', overflowX: 'auto' }}>
            <div className="flex h-full justify-between px-6 min-w-[1400px]">
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
    )
}


export default Colleges;