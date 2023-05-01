import './App.css';
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from "@apollo/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {useState} from 'react';
import PlayerDetail from "./pages/PlayerDetail";
import Search from "./pages/Search";
import Home from "./pages/Home";
import All from "./pages/All";
import {AuthContext} from "./lib/context/AccountContext";
import {CurrentUser, login, logout} from "./lib/controller/AccountController";
import {Favorites} from "./pages/Favorites";

const httpLink = new HttpLink({
    uri: "https://backef.stormznet.com/graphql"
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
});

function App() {
    const [user, setUser] = useState<CurrentUser | null>(() => {
        const localUser = localStorage.getItem("currentUser");
        if (localUser) {
            return JSON.parse(localUser);
        }

        return null;
    });

    const loginFunction = (username: string, password: string) => {
        let newUser = login(username, password)
        if (newUser === null) {
            return false;
        }

        setUser(newUser);
        return true;
    };

    const logoutFunction = () => {
        logout();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, login: loginFunction, logout: logoutFunction}}>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/all" element={<All/>}/>
                        <Route path="/search" element={<Search/>}/>
                        <Route path="/player/:playerId" element={<PlayerDetail/>}/>
                        <Route path="/favorites" element={<Favorites/>}/>
                    </Routes>
                </BrowserRouter>
            </ApolloProvider>
        </AuthContext.Provider>
    );
}

export default App;
