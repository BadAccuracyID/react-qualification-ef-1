interface CurrentUser {
    username: string;
}

interface StoredCredentials {
    username: string;
    password: string;
}

const accounts: StoredCredentials[] = [
    {username: "user1@gmail.com", password: "password1"},
    {username: "user2@gmail.com", password: "password2"},
    {username: "user3@gmail.com", password: "password3"},
];

function login(username: string, password: string): boolean {
    const account = accounts.find((account) => account.username === username);
    return account ? account.password === password : false;
}

export {login};
export type {CurrentUser};

