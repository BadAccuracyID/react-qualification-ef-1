import React, {useContext, useState} from "react";
import FooterCard from "../components/card/FooterCard";
import ParticleBackground from "../components/background/ParticleBackground";
import NavBarCard from "../components/card/NavBarCard";
import {AuthContext} from "../lib/context/AccountContext";
import {useQuery} from "@apollo/client";
import {GET_PLAYER_DETAILS_BY_NAME} from "../lib/queries/GetPlayerDetails";
import {PlayerStatsCard} from "../components/card/PlayerDataCard";
import {ArrowSmallLeftIcon, ArrowSmallRightIcon} from "@heroicons/react/20/solid";

export const Favorites = () => {
    const {user} = useContext(AuthContext);
    const [page, setPage] = useState(0);

    if (user === null) {
        return (
            <div className="bg-transparent text-white">
                {/* Particle Background */}
                <ParticleBackground/>

                {/* Navigation */}
                <NavBarCard/>

                {/* Main Section */}
                <section className="flex flex-col items-center justify-center min-h-screen h-max px-6 sm:px-0 py-8">
                    <h1 className="text-4xl sm:text-6xl font-bold mb-8 text-center">Favorites</h1>
                    <p className="text-xl sm:text-2xl font-bold mb-8 text-center">You must be logged in to view your
                        favorites.</p>
                </section>

                {/* Footer */}
                <FooterCard/>
            </div>
        )
    }

    let data = user.favoritePlayers
    if (data.length === 0) {
        return (
            <div className="bg-transparent text-white">
                {/* Particle Background */}
                <ParticleBackground/>

                {/* Navigation */}
                <NavBarCard/>

                {/* Main Section */}
                <section className="flex flex-col items-center justify-center min-h-screen h-max px-6 sm:px-0 py-8">
                    <h1 className="text-4xl sm:text-6xl font-bold mb-8 text-center">Favorites</h1>
                    <p className="text-xl sm:text-2xl font-bold mb-8 text-center">You have no favorite players.</p>
                </section>

                {/* Footer */}
                <FooterCard/>
            </div>
        )
    }

    let shownData = data.slice(page * 10, page * 10 + 10)
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

    return (
        <div className="bg-transparent text-white">
            {/* Particle Background */}
            <ParticleBackground/>

            {/* Navigation */}
            <NavBarCard/>

            {/* Main Section */}
            <section className="grid grid-cols-1 gap-6 justify-items-center min-h-screen h-max p-8">
                <div
                    className="relative flex flex-col justify-center justify-items-center items-center h-max">
                    <h1 className="text-4xl font-bold pb-4 text-center">Favorite Players</h1>
                    <div
                        className="bg-blue-950 rounded-md flex flex-row justify-center items-center gap-4 w-max">
                        <button
                            className="hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-l"
                            onClick={prevPage}>
                            <ArrowSmallLeftIcon className="h-8 w-8"/>
                        </button>
                        <p className="text-l font-bold">Page: {page + 1} / {data.length < 10 ? 1 : data.length % 10 + 1}</p>
                        <button
                            className="hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-r"
                            onClick={nextPage}>
                            <ArrowSmallRightIcon className="h-8 w-8"/>
                        </button>
                    </div>
                </div>

                <div
                    className="flex flex-col gap-6">
                    {shownData.map((name: string) => {
                        count++;
                        return (<FavoritePlayerDetailsCard key={name} name={name}/>)
                    })}
                </div>
            </section>

            {/* Footer */}
            <FooterCard/>
        </div>
    )
}

const FavoritePlayerDetailsCard = ({name}: { name: string }) => {
    const {loading, error, data} = useQuery(GET_PLAYER_DETAILS_BY_NAME, {
        variables: {name: name},
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    let player = data.playerByName
    return (
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
    )

}
