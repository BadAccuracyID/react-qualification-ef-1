import React from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_PLAYER_DETAILS_BY_ID} from "../lib/queries/GetPlayerDetailsQuery";
import NavBarCard from "../components/card/global/NavBarCard";
import LoadingCard from "../components/card/LoadingCard";
import FooterCard from "../components/card/global/FooterCard";
import ErrorCard from "../components/card/ErrorCard";
import {PlayerDetailsCard} from "../components/card/PlayerDataCard";
import ParticleBackground from "../components/background/ParticleBackground";

export default function PlayerDetailPage() {
    const {playerId} = useParams();
    console.log(playerId);
    const {loading, error, data} = useQuery(GET_PLAYER_DETAILS_BY_ID, {
        variables: {
            id: playerId,
        }
    })

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

    let playerById = data.playerById;
    return (
        <div className="bg-transparent text-white">
            {/* Particle Background */}
            <ParticleBackground/>

            {/* Navigation */}
            <NavBarCard/>

            <section className="flex flex-col items-center justify-center min-h-screen h-max px-6 sm:px-0 py-8">
                {
                    <div key={playerById.id}>
                        <PlayerDetailsCard
                            id={playerById.id}
                            name={playerById.name}
                            image={playerById.avatar}
                            motto={playerById.motto}
                            instagram={playerById.instagram}
                            wins={playerById.stats.wins}
                            losses={playerById.stats.losses}
                            kills={playerById.stats.kills}
                            deaths={playerById.stats.deaths}
                            assists={playerById.stats.assists}
                            money={playerById.stats.money}
                        />
                    </div>
                }
            </section>


            {/* Footer */}
            <FooterCard/>
        </div>
    )
}
