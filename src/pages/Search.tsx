import FooterCard from "../components/card/FooterCard";
import NavBarCard from "../components/card/NavBarCard";
import {useQuery} from "@apollo/client";
import React, {useContext, useState} from "react";
import {GET_PLAYER_DETAILS_BY_NAME} from "../lib/queries/GetPlayerDetails";
import {PlayerDetailsCard} from "../components/card/PlayerDataCard";
import ParticleBackground from "../components/background/ParticleBackground";
import {AuthContext} from "../lib/context/AccountContext";
import {saveUser} from "../lib/controller/AccountController";

export default function Search() {
    const {user} = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');

    const [actualSearchTerm, setActualSearchTerm] = useState('');
    const {loading, error, data} = useQuery(GET_PLAYER_DETAILS_BY_NAME, {
        variables: {name: actualSearchTerm},
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // Call your search function here with the current search term
            setActualSearchTerm(searchTerm);

            // save to ls
            user?.addFavoritePlayer(searchTerm);
            saveUser(user!);
            console.log(user)
        }
    }

    return (
        <div className="bg-transparent text-white">
            {/* Particle Background */}
            <ParticleBackground/>

            {/* Navigation */}
            <NavBarCard/>

            {/* Main section */}
            <section
                className="flex flex-col items-center justify-center min-h-screen h-max px-6 sm:px-0 py-8">
                <h1 className="text-4xl sm:text-6xl font-bold mb-8 text-center">
                    Search for a Player
                </h1>
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        onKeyDown={handleKeyDown}
                        className="w-full h-12 px-4 text-lg rounded-full bg-gray-800 text-white focus:outline-none"
                        placeholder="Search for a player..."
                    />
                    <button
                        className="absolute top-0 right-0 flex items-center justify-center h-full w-12 text-gray-500 focus:outline-none"
                        onClick={() => {
                            setActualSearchTerm(searchTerm);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 absolute top-3 right-3 text-gray-500 mr-2"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                    </button>
                </div>
                {error && <p>Error: {error.message}</p>}
                {data && data.playerByName && (
                    <div className="p-8">
                        <PlayerDetailsCard
                            id={data.playerByName.id}
                            name={data.playerByName.name}
                            image={data.playerByName.avatar}
                            motto={data.playerByName.motto}
                            instagram={data.playerByName.instagram}
                            wins={data.playerByName.stats.wins}
                            losses={data.playerByName.stats.losses}
                            kills={data.playerByName.stats.kills}
                            deaths={data.playerByName.stats.deaths}
                            assists={data.playerByName.stats.assists}
                            money={data.playerByName.stats.money}
                        />
                    </div>
                )}
            </section>

            {/* Footer */}
            <FooterCard/>
        </div>
    )
}
