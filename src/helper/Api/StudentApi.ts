const Base_Url = 'https://localhost:44331/api'

export async function GetStudentData(NID: string) {
    console.log(NID);
    const res = await fetch(`${Base_Url}/Student/GetStudent/${NID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await res.json();
    return data;
}

