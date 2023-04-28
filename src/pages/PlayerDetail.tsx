import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {GET_PLAYER_DETAILS_BY_ID} from "../lib/queries/GetPlayerDetails";
import NavBarCard from "../components/card/NavBarCard";
import LoadingCard from "../components/card/LoadingCard";
import FooterCard from "../components/card/FooterCard";
import ErrorCard from "../components/card/ErrorCard";
import React from "react";
import {PlayerDetailsCard} from "../components/card/PlayerDataCard";

export default function PlayerDetail() {
    const {playerId} = useParams();
    console.log(playerId);
    const {loading, error, data} = useQuery(GET_PLAYER_DETAILS_BY_ID, {
        variables: {
            id: playerId,
        }
    })

    if (loading) {
        return (
            <div className="bg-blue-900 text-white">
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
            <div className="bg-blue-900 text-white">
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
        <div className="bg-blue-900 text-white">
            {/* Navigation */}
            <NavBarCard/>

            <section className="grid grid-cols-1 gap-6 justify-items-center h-max p-8">
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
