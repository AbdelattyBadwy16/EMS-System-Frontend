import { useSelector } from "react-redux";
import Cookies from "universal-cookie";

const Base_Url = 'https://localhost:44331/api'

interface loginDto {
    username: string,
    password: string
}

export async function UserLogin({ username, password }: loginDto) {
    const res = await fetch(`${Base_Url}/Account/LogIn`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "userName": username,
            "password": password,
        }),
    });
    const data = await res.json();
    return data;
}


export async function Refresh(RefreshToken : any) {
    console.log(RefreshToken)
    if (RefreshToken == null) {
        return;
    }
    const res = await fetch(`${Base_Url}/Account/RefreshToken`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "token": RefreshToken,
        }),
    });

    const data = await res.json();
    
    return data;
}