import { useEffect, useState } from 'react'
import { Outlet } from 'react-router';
import { useDispatch } from 'react-redux';
import { addData } from "../Redux/Slices/userSlice";
import { Refresh } from './Api/AuthApi';
import Cookies from 'universal-cookie';
import Spinner from '../components/shared/Spinner';
import { addFacultyData } from '../Redux/Slices/FacultySlice';
import { GetStaffData } from './Api/StaffApi';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const Cookie = new Cookies();
    const RefreshToken = Cookie.get("Refresh");
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
                if (res.response.roles[0] == 'FacultyAdmin') {
                    const newRes = await GetStaffData(res.response.userName);
                    dispatch(addFacultyData(
                        {
                            id: newRes.model[0].facultyId,
                            name: newRes.model[0].facultyName
                        }
                    ))
                }
                Cookie.set("Refresh", res.response.refreshToken);
                Cookie.set("Bearer", res.response.token);
            } finally {
                setIsLoading(false);
            }
        }
        fetch();
    }, [])

    return isLoading ? <Spinner></Spinner> : <Outlet></Outlet>
}

export default PersistLogin