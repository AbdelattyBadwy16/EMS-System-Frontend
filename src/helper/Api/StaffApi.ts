const Base_Url = 'https://localhost:44331/api'

export async function GetStaffData(NID: string) {
    const res = await fetch(`${Base_Url}/ObserversAndInvigilators/${NID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    const data = await res.json();

    return data;
}

