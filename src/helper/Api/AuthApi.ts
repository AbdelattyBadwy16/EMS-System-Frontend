const Base_Url = 'https://localhost:44331/api'

interface loginDto {
    username: string,
    password: string
}

export async function login({ username, password }: loginDto) {
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