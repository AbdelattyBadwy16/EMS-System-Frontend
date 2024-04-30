import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addData, getRefreshToken } from "../Redux/Slices/userSlice";
import { getRefresh } from './Api/AuthApi';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const RefreshToken = useSelector(getRefreshToken);
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetch() {
            try {
                setIsLoading(true);
                const res = await getRefresh(RefreshToken);
                console.log(res);
                if (res.isAuthenticated) {
                    dispatch(addData(
                        {
                            id: res.userName,
                            token: res.token,
                            refreshToken: res.refreshToken,
                            role: res.roles
                        }
                    ))
                }
            } finally {
                setIsLoading(false);
            }
        }
        fetch();
    }, [])

    return <Outlet></Outlet>
}

export default PersistLogin