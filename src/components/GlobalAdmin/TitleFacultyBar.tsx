
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router';
import Cookies from 'universal-cookie';

interface BarDetails {
    title: string,
    id: number
}
export default function TitleFacultyBar(Detail: BarDetails) {
    const nav = useNavigate();
    const Cookie = new Cookies;
    function handelClick() {
        Cookie.set("facultyId",Detail.id);
        nav("/facultyhome")
    }
    return (
        <div onClick={() => handelClick()} className='cursor-pointer'>
            <motion.div variants={{
                hidden: { x: "-100vw", opacity: 0 },
                visible: {
                    x: 0,
                    opacity: 1,
                    transition: {
                        delay: 0.5,
                        duration: 0.5,
                    },
                },
            }}
                initial="hidden"
                animate="visible" className="m-6">
                <div className="bg-customGray rounded-2xl py-6 ">
                    <h2 className="mr-5 font-gesstwo text-gray-500 font-medium text-3xl text-end">
                        {Detail.title}
                    </h2>
                    <div
                        className="relative float-left bottom-10 left-12 "
                    >
                        <i className="bx bx-chevron-down text-gray-500 text-5xl "></i>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
