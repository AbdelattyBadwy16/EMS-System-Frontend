import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default function RequireAuth() {

    const Cookie = new Cookies();
    const token = Cookie.get("Bearer");    
    
    return token ? <Outlet></Outlet> : <Navigate to="/login"></Navigate>
}
