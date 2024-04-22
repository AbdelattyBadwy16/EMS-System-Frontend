import { Outlet } from 'react-router'

export default function AppLayout() {
    return (
        <div className='flex'>
            <Outlet></Outlet>
        </div>
    )
}
