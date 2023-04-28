import React from 'react';
import './App.css';
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from "@apollo/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import All from "./pages/All";
import PlayerDetail from "./pages/PlayerDetail";
import Search from "./pages/Search";

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
    return (
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
    );
}

export default App;
