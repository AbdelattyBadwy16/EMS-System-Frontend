import { useEffect, useState } from 'react'
import { Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import {getRefreshToken } from "../Redux/Slices/userSlice";
import { getRefresh } from './Api/AuthApi';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const RefreshToken = useSelector(getRefreshToken);
    useEffect(() => {

        async function fetch() {
            try {
                setIsLoading(true);
                console.log(RefreshToken)
                const res = await getRefresh(RefreshToken);
                console.log(res);
                
            } finally {
                setIsLoading(false);
            }
        }
        fetch();
    }, [])

    return <Outlet></Outlet>
}

export default PersistLogin