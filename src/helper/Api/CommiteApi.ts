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
    subjectId: number,
    studentNumber : number
}

export async function AddNewCommite(Data: commiteDto ,observerID : number , invi : any) {
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
    let query = "";
    for(let i=0 ; i<invi.length ; i++){
        query += `noticers=${invi[i]}`
        if(i!=invi.length - 1)query += "&";
    }
    const res = await fetch(`${Base_Url}/Committee/AddCommittee?observerID=${observerID}&${query}`, {
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
            "subjectID": Data.subjectId,
            "placeID" : 1,
            "studentNumber" : Data.studentNumber
        }),
    });
    const data = await res.json();
    return data;
}

export async function DeleteCommite(id: number) {
    const Cookie = new Cookies();
    const token = Cookie.get("Bearer");
    const res = await fetch(`${Base_Url}/Committee/DeleteCommittee?CommitteeId=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
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
    return data;
}


export async function DeleteAllCommite(id: number) {
    const Cookie = new Cookies();
    const token = Cookie.get("Bearer");
    const res = await fetch(`${Base_Url}/Committee/DeleteAllFacultyCommittee?FacultyID=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}



export async function SearchForCommite(facultyId = 0, levelId = 0, term: string, subject: string) {
    const Cookie = new Cookies();
    const token = Cookie.get("Bearer");
    const res = await fetch(`${Base_Url}/Committee/FilteringForCommittees?FacultyID=${facultyId}&Level=${levelId}&CommitteeName=${term}&subjectName=${subject}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}




export async function UpdateCommitte(id: number, Data: commiteDto) {
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
    const res = await fetch(`${Base_Url}/Committee/UpdateCommitee?committeeID=${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }, body: JSON.stringify({
            "id": 0,
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




export async function GetAllCommitesGlobal() {
    const Cookie = new Cookies();
    const token = Cookie.get("Bearer");
    const res = await fetch(`${Base_Url}/GlobalAdmin/CommitteesCount`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}


export async function GetAllCommitesGlobalToday() {
    const Cookie = new Cookies();
    const token = Cookie.get("Bearer");
    const res = await fetch(`${Base_Url}/GlobalAdmin/CommitteesTodayCount`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}



export async function GetAllStudentToday() {
    const Cookie = new Cookies();
    const token = Cookie.get("Bearer");
    const res = await fetch(`${Base_Url}/GlobalAdmin/StudentCountInActiveCommitteesToday`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}



export async function GetMostFacultyToday() {
    const Cookie = new Cookies();
    const token = Cookie.get("Bearer");
    const res = await fetch(`${Base_Url}/GlobalAdmin/FacultyWithMostActiveCommitteesToday`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}



export async function GetCommiteDeltails() {
    const Cookie = new Cookies();
    const token = Cookie.get("Bearer");
    const comId = Cookie.get("commiteId");
    const res = await fetch(`${Base_Url}/Committee/CommitteeDetails?id=${comId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}


export async function GetCommiteStudents() {
    const Cookie = new Cookies();
    const token = Cookie.get("Bearer");
    const comId = Cookie.get("commiteId");
    const res = await fetch(`${Base_Url}/Committee/GetCommiteStudents?comId=${comId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}
