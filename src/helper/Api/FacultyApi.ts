import Cookies from "universal-cookie";

const Base_Url = 'https://localhost:44331/api'

export async function GetFacultyData(id: number) {
    const Cookie = new Cookies();
    const token = Cookie.get("Bearer");
    const res = await fetch(`${Base_Url}/Faculty/GetFaculty/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();
    return data;
}


export interface subjectDto {
    BylawId: number,
    PhaseId: number,
    FacultyId: number,
    FacultyNodeId: number,
    FacultySemesterId: number
}


export async function GetSubjects(Data: subjectDto) {
    const Cookie = new Cookies();
    const token = Cookie.get("Bearer");

    const res = await fetch(`${Base_Url}/Faculty/subjects?BylawId=${Data.BylawId}&PhaseId=${Data.PhaseId}&FacultyId=${Data.FacultyId}&FacultyNodeId=${Data.FacultyNodeId}&FacultySemesterId=${Data.FacultySemesterId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();
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
    return data;
}


export async function GetPlaces() {
    const Cookie = new Cookies();
    const token = Cookie.get("Bearer");
    const res = await fetch(`${Base_Url}/Faculty/Places`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}


export async function GetAllFacultiesName() {
    const Cookie = new Cookies();
    const token = Cookie.get("Bearer");
    const res = await fetch(`${Base_Url}/GlobalAdmin/GetAllFaculties`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}



export async function SearchInFacultiesNames(name :string) {
    const Cookie = new Cookies();
    const token = Cookie.get("Bearer");
    const res = await fetch(`${Base_Url}/GlobalAdmin/GetFacultyByName?FacultyName=${name}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    const data = await res.json();
    return data;
}
