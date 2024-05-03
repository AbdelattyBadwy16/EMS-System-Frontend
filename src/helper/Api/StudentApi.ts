import { useSelector } from "react-redux";
import { getToken } from "../../Redux/Slices/userSlice";
import Cookies from "universal-cookie";

const Base_Url = 'https://localhost:44331/api'

export async function GetStudentData(NID: string) {
    const Cookie = new Cookies();
    const token  = Cookie.get("Bearer");
    const res = await fetch(`${Base_Url}/Student/GetStudent/${NID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        }
    });
    const data = await res.json();
    return data;
}

