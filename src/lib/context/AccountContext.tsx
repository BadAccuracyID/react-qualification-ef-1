import {createContext} from 'react';
import {CurrentUser} from "../controller/AccountController";

interface AuthContextProps {
    user: CurrentUser | null;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    login: () => {
        throw new Error('login() not implemented');
    },
    logout: () => {
        throw new Error('logout() not implemented');
    },
});

export {AuthContext};
