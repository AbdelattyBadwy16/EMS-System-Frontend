import { useEffect, useState } from 'react'
import { Outlet } from 'react-router';
import { useDispatch } from 'react-redux';
import { addData } from "../Redux/Slices/userSlice";
import { Refresh } from './Api/AuthApi';
import Cookies from 'universal-cookie';
import Spinner from '../components/shared/Spinner';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const cookie = new Cookies();
    const RefreshToken = cookie.get("Bearer");
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetch() {
            try {
                setIsLoading(true);
                const res = await Refresh(RefreshToken);

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

    return isLoading ? <Spinner></Spinner> : <Outlet></Outlet>
}

export default PersistLogin