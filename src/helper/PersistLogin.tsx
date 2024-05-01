import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addData, getRefreshToken, getToken } from "../Redux/Slices/userSlice";
import { getRefresh } from './Api/AuthApi';
import Cookies from 'universal-cookie';
import Login from '../pages/Login';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const cookie = new Cookies();
    const RefreshToken = cookie.get("Bearer");
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetch() {
            try {
                setIsLoading(true);
                const res = await getRefresh(RefreshToken);

                if (res.response.isAuthenticated) {
                    dispatch(addData(
                        {
                            id: res.response.userName,
                            token: res.response.token,
                            refreshToken: res.response.refreshToken,
                            role: res.response.roles,
                        }
                    ))
                }
                cookie.set("Bearer", res.response.refreshToken);
            } finally {
                setIsLoading(false);
            }
        }
        fetch();
    }, [])
    return <Outlet></Outlet>
}

export default PersistLogin