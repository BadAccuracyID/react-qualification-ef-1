import './App.css';
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from "@apollo/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {useState} from 'react';
import PlayerDetail from "./pages/PlayerDetail";
import Search from "./pages/Search";
import Home from "./pages/Home";
import All from "./pages/All";
import {AuthContext} from "./lib/context/AccountContext";
import {CurrentUser, login} from "./lib/controller/AccountController";

const httpLink = new HttpLink({
    uri: "http://localhost:8080/graphql", // Replace with your GraphQL API endpoint
    headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000/", // Replace with your frontend application URL
    },
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
});

function App() {
    const [user, setUser] = useState<CurrentUser | null>(() => {
        const localUser = localStorage.getItem("user");
        if (localUser) {
            return JSON.parse(localUser);
        }

        return null;
    });

    const loginFunction = (username: string, password: string) => {
        let success = login(username, password)
        if (!success) {
            return false;
        }

        let newUser = {
            username,
        };

        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        return true;
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, login: loginFunction, logout}}>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/all" element={<All/>}/>
                        <Route path="/search" element={<Search/>}/>
                        <Route path="/player/:playerId" element={<PlayerDetail/>}/>
                    </Routes>
                </BrowserRouter>
            </ApolloProvider>
        </AuthContext.Provider>
    );
}

export default App;
