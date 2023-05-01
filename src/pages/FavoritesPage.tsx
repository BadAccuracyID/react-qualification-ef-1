import React, {useContext, useState} from "react";
import {useQuery} from "@apollo/client";
import {AuthContext} from "../lib/context/AccountContext";
import {GET_PLAYER_DETAILS_BY_NAME} from "../lib/queries/GetPlayerDetailsQuery";
import FooterCard from "../components/card/global/FooterCard";
import ParticleBackground from "../components/background/ParticleBackground";
import NavBarCard from "../components/card/global/NavBarCard";
import {PlayerStatsCard} from "../components/card/PlayerDataCard";
import PaginationCard from "../components/card/PaginationCard";

export const FavoritesPage = () => {
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

                    <PaginationCard page={page}
                                    totalCount={data.length}
                                    mod={10}
                                    prevPage={prevPage}
                                    nextPage={nextPage}
                    />
                </div>

                <div
                    className="flex flex-col gap-6">
                    {shownData.map((name: string) => {
                        count++;
                        return (<FavoritePlayerDetailsCard key={name} name={name}/>)
                    })}
                </div>

                <PaginationCard page={page}
                                totalCount={data.length}
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

const FavoritePlayerDetailsCard = ({name}: { name: string }) => {
    const {loading, error, data} = useQuery(GET_PLAYER_DETAILS_BY_NAME, {
        variables: {name: name},
    });

    if (loading) return (
        <div
            className="relative grid grid-cols-1 sm:grid-cols-3 gap-2 bg-blue-950 bg-opacity-90 rounded-md shadow-lg text-white h-max">
            <div
                className="rounded-t-md rounded-b-md p-8 flex items-center justify-center">
                <img
                    className="h-[180px] max-h-60 sm:max-h-full max-w-full object-cover"
                    src="https://luckynet.work/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmain-logo.e22b7a94.png&w=640&q=75"
                />
            </div>

            <div className="p-8 flex flex-col justify-center w-[300px]">
                <h1 className="text-2xl font-bold">Loading...</h1>
                <p className="text-xl">Loading...</p>
            </div>
        </div>
    );
    if (error) return (
        <div
            className="relative grid grid-cols-1 sm:grid-cols-3 gap-2 bg-blue-950 bg-opacity-90 rounded-md shadow-lg text-white h-max">
            <div
                className="rounded-t-md rounded-b-md p-8 flex items-center justify-center">
                <img
                    className="h-[180px] max-h-60 sm:max-h-full max-w-full object-cover"
                    src="https://luckynet.work/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmain-logo.e22b7a94.png&w=640&q=75"
                />
            </div>

            <div className="p-8 flex flex-col justify-center w-[300px]">
                <h1 className="text-2xl font-bold">Error</h1>
                <p className="text-xl">{error.message}</p>
            </div>
        </div>
    );


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
