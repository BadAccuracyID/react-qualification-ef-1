import React, {useState} from "react";
import {useQuery} from "@apollo/client";
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import {GET_PLAYER_DETAILS_BY_NAME} from "../lib/queries/GetPlayerDetailsQuery";
import FooterCard from "../components/card/global/FooterCard";
import NavBarCard from "../components/card/global/NavBarCard";
import {PlayerDetailsCard} from "../components/card/PlayerDataCard";
import ParticleBackground from "../components/background/ParticleBackground";

export default function SearchPage() {
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
                        placeholder="SearchPage for a player..."
                    />
                    <button
                        className="absolute top-0 right-0 flex items-center justify-center h-full w-12 text-gray-500 focus:outline-none"
                        onClick={() => {
                            setActualSearchTerm(searchTerm);
                        }}>
                        <MagnifyingGlassIcon className="h-6 w-6 absolute top-3 right-3 text-gray-500 mr-2"/>
                    </button>
                </div>
                {error && (
                    <div className="p-8">
                        <p className="text-xl sm:text-2xl font-bold mb-8 text-center text-red-600">Error: {error.message}</p>
                    </div>
                )}
                {loading && (
                    <div className="p-8">
                        <p className="text-xl sm:text-2xl font-bold mb-8 text-center text-gray-600">Loading...</p>
                    </div>
                )}
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
