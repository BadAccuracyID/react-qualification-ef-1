import React, {useState} from "react";
import NavBarCard from "../components/card/NavBarCard";
import {useQuery} from "@apollo/client";
import {GET_ALL_PLAYERS} from "../lib/queries/GetAllPlayers";

export default function All() {
    const [page, setPage] = useState(1);
    const {loading, error, data} = useQuery(GET_ALL_PLAYERS, {})

    return (
        <div className="bg-blue-900 text-white">
            {/* Navigation */}
            <NavBarCard/>


            <section className="flex flex-col items-center justify-center h-screen">
            </section>


            {/* Footer */}
            <footer className="bg-blue-950 py-6 text-center">
                <p className="text-gray-400 text-sm">&copy; 2023 My Website. All rights reserved.</p>
            </footer>
        </div>
    )
}
