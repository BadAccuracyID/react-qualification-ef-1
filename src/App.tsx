import './App.css';
import React, {useState} from 'react';
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from "@apollo/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AllPage from "./pages/AllPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import {FavoritesPage} from "./pages/FavoritesPage";
import PlayerDetailPage from "./pages/PlayerDetailPage";
import {AuthContext} from "./lib/context/AccountContext";
import {CurrentUser, login, logout} from "./lib/controller/AccountController";

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
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/all" element={<AllPage/>}/>
                        <Route path="/search" element={<SearchPage/>}/>
                        <Route path="/player/:playerId" element={<PlayerDetailPage/>}/>
                        <Route path="/favorites" element={<FavoritesPage/>}/>
                    </Routes>
                </BrowserRouter>
            </ApolloProvider>
        </AuthContext.Provider>
    );
}

export default App;
