import React, {useState} from "react";
import NavBarCard from "../components/card/NavBarCard";
import {useQuery} from "@apollo/client";
import {GET_ALL_PLAYERS} from "../lib/queries/GetAllPlayers";
import LoadingCard from "../components/card/LoadingCard";
import ErrorCard from "../components/card/ErrorCard";
import FooterCard from "../components/card/FooterCard";
import {PlayerStatsCard} from "../components/card/PlayerDataCard";
import ParticleBackground from "../components/background/ParticleBackground";
import PaginationCard from "../components/card/PaginationCard";

export default function All() {
    const [page, setPage] = useState(0);
    const {loading, error, data} = useQuery(GET_ALL_PLAYERS, {
        variables: {
            pageNumber: page,
            limit: 10,
        }
    })

    let count = 0;

    const nextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (count < 10) {
            return;
        }
        setPage(page + 1);
    }

    const prevPage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (page === 0) {
            return;
        }
        setPage(page - 1);
    }

    if (loading) {
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

                    <PaginationCard page={page}
                                    totalCount={data.players.totalCount}
                                    mod={10}
                                    prevPage={prevPage}
                                    nextPage={nextPage}
                    />
                </div>

                <div
                    className="flex flex-col gap-6">
                    {
                        data.players.items.map((player: any) => {
                            count++;
                            return (
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
                            )
                        })
                    }
                </div>

                <PaginationCard page={page}
                                totalCount={data.players.totalCount}
                                mod={10}
                                prevPage={prevPage}
                                nextPage={nextPage}
                />
            </section>

            {/* Footer */}
            <FooterCard/>
        </div>
    )
}
