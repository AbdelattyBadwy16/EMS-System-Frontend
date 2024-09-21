import { Outlet } from 'react-router'
import Navbar from './Navbar'

export default function AppLayout() {
    return (
        <div>
            <Navbar />
            <div className='flex'>
                <Outlet></Outlet>
            </div>
        </div>
    )
}
