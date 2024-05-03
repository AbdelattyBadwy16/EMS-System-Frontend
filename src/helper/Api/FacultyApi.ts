const Base_Url = 'https://localhost:44331/api'

export async function GetFacultyData(id: number) {
    console.log(id);
    const res = await fetch(`${Base_Url}/Faculty/GetFaculty/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    console.log(res);
    const data = await res.json();

    return data;
}

