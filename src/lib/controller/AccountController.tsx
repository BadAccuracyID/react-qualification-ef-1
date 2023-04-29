interface CurrentUser {
    username: string;
    favoritePlayers: string[];
}

interface StoredCredentials {
    username: string;
    password: string;
    favoritePlayers: string[];
}

const dummyAccounts: StoredCredentials[] = [
    {username: "user1@gmail.com", password: "password1", favoritePlayers: []},
    {username: "user2@gmail.com", password: "password2", favoritePlayers: []},
    {username: "user3@gmail.com", password: "password3", favoritePlayers: []},
];

function login(username: string, password: string): CurrentUser | null {
    // Look up the stored credentials for the given username
    const storedCredentials = dummyAccounts.find(
        (credentials) => credentials.username === username
    );

    // If the user does not exist or the password is incorrect, return null
    if (!storedCredentials || storedCredentials.password !== password) {
        return null;
    }

    // If the user exists and the password is correct, create a new CurrentUser object
    const user: CurrentUser = {
        username: storedCredentials.username,
        favoritePlayers: storedCredentials.favoritePlayers
    };

    // Load the user's favorite players from localStorage
    user.favoritePlayers = JSON.parse(localStorage.getItem('favoritePlayers_' + user.username) || '[]');

    // Save the user to localStorage
    saveUser(user);

    // Return the user object
    return user;
}

function logout() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    localStorage.setItem('favoritePlayers_' + user.username, JSON.stringify(user.favoritePlayers || []));
    localStorage.removeItem('currentUser');
}


function saveUser(user: CurrentUser) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('favoritePlayers_' + user.username, JSON.stringify(user.favoritePlayers || []));
}


export {login, logout, saveUser};
export type {CurrentUser};

