import { Link } from 'react-router-dom'

interface BtnDetail {
    title: string,
    color: string,
    link: string,
    icon: string
}

const LinkBtn = (Detail: BtnDetail) => {
    return (
        <div className="mr-3 w-[100%]">
            <Link to={Detail.link} className={`text-${Detail.color} font-bold text-xl font-gesstwo grid grid-cols-3 items-center rounded-md hover:bg-gray-500 hover:text-white`}>
                <p className=' text-end col-span-2 text-[18px]'>{Detail.title}</p>
                <i className={`bx bxs-${Detail.icon} text-${Detail.color} text-base font-bold font-gesstwo m-2`}></i>
            </Link>
        </div>
    )
}

export default LinkBtn