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

