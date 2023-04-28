import {Link} from "react-router-dom";

export function PlayerStatsCard({id, name, image, wins, losses, kills, deaths, assists, money}: {
    id: string,
    name: string,
    image: string,
    wins: number,
    losses: number,
    kills: number,
    deaths: number,
    assists: number,
    money: number
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-blue-950 rounded-md shadow-lg text-white">
            <div
                className="bg-blue-950 rounded-t-md rounded-b-md p-8 flex items-center justify-center">
                <img
                    className="h-auto max-h-60 sm:max-h-full max-w-full object-cover"
                    src={image}
                    alt={name}
                />
            </div>

            <div className="p-8 flex flex-col justify-center w-[300px]">
                <h2 className="text-2xl font-bold mb-2 break-words text-center">{name}</h2>
                <table className="text-lg">
                    <tbody>
                    <tr>
                        <td className="pr-4 text-right">Wins</td>
                        <td>{wins}</td>
                    </tr>
                    <tr>
                        <td className="pr-4 text-right">Losses</td>
                        <td>{losses}</td>
                    </tr>
                    <tr>
                        <td className="pr-4 text-right">Kills</td>
                        <td>{kills}</td>
                    </tr>
                    <tr>
                        <td className="pr-4 text-right">Deaths</td>
                        <td>{deaths}</td>
                    </tr>
                    <tr>
                        <td className="pr-4 text-right">KDR</td>
                        <td>{(kills / deaths).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="pr-4 text-right">Assists</td>
                        <td>{assists}</td>
                    </tr>
                    <tr>
                        <td className="pr-4 text-right">Money</td>
                        <td>{money}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <button>
                <Link to={`/player/${id}`}>
                    <div
                        className="bg-blue-950 rounded-b-md sm:rounded-r-md sm:rounded-b-none p-8 flex items-center justify-center sm:justify-end">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                        </svg>
                    </div>
                </Link>
            </button>
        </div>
    );
}

export function PlayerDetailsCard({id, name, image, motto, instagram, wins, losses, kills, deaths, assists, money}: {
    id: string,
    name: string,
    motto: string,
    instagram: string,
    image: string,
    wins: number,
    losses: number,
    kills: number,
    deaths: number,
    assists: number,
    money: number
}) {
    return (
        <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-blue-950 rounded-md shadow-lg text-white justify-center justify-items-center">
            <div
                className="bg-blue-950 rounded-t-md sm:rounded-l-md sm:rounded-t-none sm:rounded-b-md p-8 pb-2 sm:pb-8 flex items-center justify-center sm:justify-start">
                <img
                    className="h-auto w-full object-cover rounded-t-md sm:rounded-l-md sm:rounded-t-none sm:rounded-b-none"
                    src={image}
                    alt={name}
                />
            </div>

            <div className="p-8 pb-2 sm:pb-8 flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-2 break-words text-center">{name}</h2>
                <p className="text-lg break-words text-center">{motto}</p>
                <div className="mt-4 flex justify-center sm:justify-center">
                    <a href={instagram} target="_blank" rel="noreferrer">
                        <img
                            src="https://www.edigitalagency.com.au/wp-content/uploads/new-Instagram-logo-white-glyph.png"
                            alt="Instagram"
                            className="w-10 h-10"
                        />
                    </a>
                </div>
            </div>

            <div className="p-8 pt-2 sm:pt-8 flex flex-col justify-center w-[300px]">
                <h2 className="text-2xl font-bold mb-2 break-words text-center">Stats</h2>
                <table className="text-lg">
                    <tbody>
                    <tr>
                        <td className="pr-4 text-right">Wins</td>
                        <td>{wins}</td>
                    </tr>
                    <tr>
                        <td className="pr-4 text-right">Losses</td>
                        <td>{losses}</td>
                    </tr>
                    <tr>
                        <td className="pr-4 text-right">Kills</td>
                        <td>{kills}</td>
                    </tr>
                    <tr>
                        <td className="pr-4 text-right">Deaths</td>
                        <td>{deaths}</td>
                    </tr>
                    <tr>
                        <td className="pr-4 text-right">KDR</td>
                        <td>{(kills / deaths).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td className="pr-4 text-right">Assists</td>
                        <td>{assists}</td>
                    </tr>
                    <tr>
                        <td className="pr-4 text-right">Money</td>
                        <td>{money}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

