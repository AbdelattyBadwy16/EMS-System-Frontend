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


export async function Refresh(RefreshToken: any) {

    if (RefreshToken == null) {
        return;
    }
    const Cookie = new Cookies();
    const token = Cookie.get("Bearer");
    const res = await fetch(`${Base_Url}/Account/RefreshToken`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "token": RefreshToken,
        }),
    });

    const data = await res.json();

    return data;
}

interface changePass{
    oldPassword : string,
    newPassword : string,
    confirmPassword : string
}

export async function ChangePasswordAsync(pass : changePass) {

    if(pass.oldPassword == undefined)return;
    console.log(pass);
    const Cookie = new Cookies();
    const token = Cookie.get("Bearer");
    const user = Cookie.get("user").toString();
    const res = await fetch(`${Base_Url}/Account/ChangePassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(
            {
                "nid" : user,
                "currentPassword": pass.oldPassword,
                "newPassword": pass.newPassword,
                "confirmPassword": pass.confirmPassword
            }),
    });

    const data = await res.text();

    return data;
}


export async function SendEmail(nid : string) {
    const Cookie = new Cookies();
    const res = await fetch(`${Base_Url}/Account/SendEmail?NID=${nid}`, {
        method: "POST",
    });
    const data = await res.text();

    return data;
}
interface resetPass{
    nid : string,
    newPassword : string,
    confirmPassword : string
}
export async function ResetPasswordOTP(pass : resetPass) {
    if(pass.newPassword == undefined)return;
    const Cookie = new Cookies();
    const nid = pass.nid.toString();
    
    const res = await fetch(`${Base_Url}/Account/ResetPassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
              {
                "nid": nid,
                "newPassword": pass.newPassword,
                "confirmPassword": pass.confirmPassword
              }),
    });

    const data = await res.json();

    return data;
}