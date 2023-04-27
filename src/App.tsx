import React from 'react';
import './App.css';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import All from "./pages/All";

const client = new ApolloClient({
    uri: "http://localhost:8080",
    cache: new InMemoryCache(),
})

function App() {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/all" element={<All/>}/>
                </Routes>
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
