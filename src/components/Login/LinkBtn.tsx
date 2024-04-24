import { Link } from 'react-router-dom'

interface BtnDetail {
    title: string,
    color: string,
    link: string,
    icon: string
}

const LinkBtn = (Detail: BtnDetail) => {
    return (
        <div className="mr-3">
            <Link to={Detail.link} className={`text-white bg-${Detail.color} font-bold text-xl font-gesstwo`}>
                {Detail.title}
                <i className={`bx bxs-${Detail.icon} text-white  text-base font-bold font-gesstwo m-2`}></i>
            </Link>
        </div>
    )
}

export default LinkBtn