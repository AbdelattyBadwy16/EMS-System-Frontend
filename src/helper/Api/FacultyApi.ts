const Base_Url = 'https://localhost:44331/api'

export async function GetFacultyData(id: number) {
    const res = await fetch(`${Base_Url}/Faculty/GetFaculty/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
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
    const res = await fetch(`${Base_Url}/Faculty/subjects?BylawId=${Data.BylawId}&PhaseId=${Data.PhaseId}&FacultyId=${Data.FacultyId}&FacultyNodeId=${Data.FacultyNodeId}&FacultySemesterId=${Data.FacultySemesterId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    const data = await res.json();
    return data;
}
