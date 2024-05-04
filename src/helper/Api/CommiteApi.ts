import { useSelector } from "react-redux";
import Cookies from "universal-cookie";

const Base_Url = 'https://localhost:44331/api'

interface commiteDto {
    day: string,
    lawInput: string,
    termInput: string,
    studyMethodInput: string,
    departInput: string,
    levelInput: string,
    commDate: Date,
    periodInput: string,
    stateInput: string,
    placeInput: string,
    commName: string,
    from: string,
    to: string,
    subjectName: string,
    subjectId: number
}

export async function AddNewCommite(Data: commiteDto) {
    const Cookie = new Cookies();
    const token = Cookie.get("Bearer");
    let day = 0;
    switch (Data.day) {
        case "السبت":
            day = 1
            break;
        case "الاحد":
            day = 2
            break;
        case "الاثنين":
            day = 3
            break;
        case "الثلاثاء":
            day = 4
            break;
        case "الاربعاء":
            day = 5
            break;
        case "الخميس":
            day = 6
            break;
        case "الجمعة":
            day = 7
            break;
    }
    const res = await fetch(`${Base_Url}/Committee/AddCommittee`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "name": Data.commName,
            "studyMethod": Data.studyMethodInput,
            "byLaw": Data.lawInput,
            "facultyNode": Data.departInput,
            "facultyPhase": Data.levelInput,
            "subjectsName": Data.subjectName,
            "day": day,
            "date": Data.commDate,
            "interval": Data.periodInput,
            "from": Data.from,
            "to": Data.to,
            "place": Data.placeInput,
            "status": Data.stateInput,
            "subjectID": Data.subjectId
        }),
    });
    const data = await res.json();
    return data;
}

export async function DeleteCommite(id: number) {
    const Cookie = new Cookies();
    const token = Cookie.get("Bearer");
    const res = await fetch(`${Base_Url}/Committee/DeleteCommitee?CommiteeId=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}

export async function GetAllCommite(id: number) {
    const Cookie = new Cookies();
    const token = Cookie.get("Bearer");
    const res = await fetch(`${Base_Url}/Committee/Schedule?Id=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    console.log(data);
    return data;
}


export async function DeleteAllCommite(id: number) {
    const Cookie = new Cookies();
    const token = Cookie.get("Bearer");
    const res = await fetch(`${Base_Url}/Committee/DeleteAllFacultyCommitee?FacultyID=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    console.log(data);
    return data;
}


export async function GetCommitesStaticForLevels(id: number) {
    const Cookie = new Cookies();
    const token = Cookie.get("Bearer");
    const res = await fetch(`${Base_Url}/Faculty/FacultyCommitteesDetails?FacultyID=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    console.log(data);
    return data;
}


export async function GetCommitesStaticForLevelsForCurrentDay(id: number) {
    const Cookie = new Cookies();
    const token = Cookie.get("Bearer");
    const res = await fetch(`${Base_Url}/Faculty/FacultyCommitteesForCurrentDay?FacultyID=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    console.log(data);
    return data;
}

