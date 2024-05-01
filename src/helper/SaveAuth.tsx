import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getToken } from '../Redux/Slices/userSlice';
import Cookies from 'universal-cookie';

export default function SaveAuth() {
    const Cookie = new Cookies();
    const loc = useLocation();
    const token = Cookie.get("Bearer");

    return token ? <Navigate to=""></Navigate>  : <Navigate to="/login"></Navigate> 
}
