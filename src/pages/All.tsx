import React, {useState} from "react";
import NavBarCard from "../components/card/NavBarCard";
import {useQuery} from "@apollo/client";
import {GET_ALL_PLAYERS} from "../lib/queries/GetAllPlayers";
import LoadingCard from "../components/card/LoadingCard";
import ErrorCard from "../components/card/ErrorCard";
import FooterCard from "../components/card/FooterCard";
import {PlayerStatsCard} from "../components/card/PlayerDataCard";

export default function All() {
    const [page, setPage] = useState(0);
    const {loading, error, data} = useQuery(GET_ALL_PLAYERS, {
        variables: {
            pageNumber: page,
            limit: 10,
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

    console.log(data.players.items)

    return (
        <div className="bg-blue-900 text-white">
            {/* Navigation */}
            <NavBarCard/>

            <section className="grid grid-cols-1 gap-6 justify-items-center h-max p-8">
                {
                    data.players.items.map((player: any) => {
                        return (
                            <div key={player.id}>
                                <PlayerStatsCard
                                    id={player.id}
                                    name={player.name}
                                    image={""}
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
            </section>


            {/* Footer */}
            <FooterCard/>
        </div>
    )
}
