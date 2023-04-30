import React, {useCallback, useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {GET_ALL_PLAYERS} from "../lib/queries/GetAllPlayers";
import NavBarCard from "../components/card/NavBarCard";
import LoadingCard from "../components/card/LoadingCard";
import ErrorCard from "../components/card/ErrorCard";
import FooterCard from "../components/card/FooterCard";
import {PlayerStatsCard} from "../components/card/PlayerDataCard";
import ParticleBackground from "../components/background/ParticleBackground";

export default function All() {
    const [players, setPlayers] = useState<any[]>([]);
    const limit = 10;
    const {loading, error, data, fetchMore} = useQuery(GET_ALL_PLAYERS, {
        variables: {
            pageNumber: 0,
            limit: limit,
        }
    })

    useEffect(() => {
        if (data) {
            setPlayers([...players, ...data.players.items]);
        }
    }, [data]);

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight)
            return;

        console.log("Loading more players...")
        fetchMore({
            variables: {
                pageNumber: Math.floor(players.length / limit),
            }
        })
    }, [players, fetchMore, limit]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    if (loading && players.length === 0) {
        return (
            <div className="bg-transparent text-white">
                {/* Particle Background */}
                <ParticleBackground/>

                {/* Navigation */}
                <NavBarCard/>

                {/* Loading */}
                <LoadingCard/>

                {/* Footer */}
                <FooterCard/>
            </div>
        )
    } else if (error) {
        return (
            <div className="bg-transparent text-white">
                {/* Particle Background */}
                <ParticleBackground/>

                {/* Navigation */}
                <NavBarCard/>

                {/* Error */}
                <ErrorCard message={error.message}/>

                {/* Footer */}
                <FooterCard/>
            </div>
        )
    }

    return (
        <div className="bg-transparent text-white">
            {/* Particle Background */}
            <ParticleBackground/>

            {/* Navigation */}
            <NavBarCard/>

            {/* Main Section */}
            <section className="grid grid-cols-1 gap-6 justify-items-center min-h-screen h-max p-8">
                <div
                    className="flex flex-col justify-center justify-items-center items-center h-max">
                    <h1 className="text-4xl font-bold pb-4 text-center">All Players</h1>
                </div>

                <div
                    className="flex flex-col gap-6">
                    {
                        players.map((player: any) => (
                            <div key={player.id}>
                                <PlayerStatsCard
                                    id={player.id}
                                    name={player.name}
                                    image={player.avatar}
                                    wins={player.stats.wins}
                                    losses={player.stats.losses}
                                    kills={player.stats.kills}
                                    deaths={player.stats.deaths}
                                    assists={player.stats.assists}
                                    money={player.stats.money}
                                />
                            </div>
                        ))
                    }
                </div>
            </section>

            {/* Footer */}
            <FooterCard/>
        </div>
    )
}
