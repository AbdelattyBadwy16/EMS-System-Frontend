import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default function RequireAuth() {
    // const cookie = new Cookies();
    // const token = cookie.get("bearer");
    // check if token found or not
    const token = 1;
    return !token ? <Outlet></Outlet> : <Navigate to="/login"></Navigate>
}
