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
    subjectName : string,
    subjectId : number
}

export async function AddNewCommite(Data: commiteDto) {
    const res = await fetch(`${Base_Url}/Committee/AddCommittee`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "name": Data.commName,
            "studyMethod": Data.studyMethodInput,
            "byLaw": Data.lawInput,
            "facultyNode": Data.departInput,
            "facultyPhase": Data.levelInput,
            "subjectsName": Data.subjectName,
            "day": 1,
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

export async function DeleteCommite(id : number) {
    const res = await fetch(`${Base_Url}/Committee/DeleteCommitee?CommiteeId=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await res.json();
    return data;
}

export async function GetAllCommite(id : number) {
    const res = await fetch(`${Base_Url}/Committee/GetCommitteesForFaculty?FacultyID=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await res.json();
    console.log(data);
    return data;
}