export function PlayerStatsCard({id, name, wins, losses, kills, deaths, assists, money}: {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-blue-950 rounded-md shadow-lg text-white">
            <div
                className="bg-blue-950 rounded-t-md sm:rounded-l-md sm:rounded-t-none sm:rounded-b-md p-8 flex items-center justify-center sm:justify-start">
                <img
                    className="w-full h-full object-cover rounded-t-md sm:rounded-l-md sm:rounded-t-none sm:rounded-b-none"
                    src={
                        "https://media.istockphoto.com/id/1220104375/id/vektor/ikon-semangka-piksel-ilustrasi-vektor-32x32.jpg?s=170667a&w=0&k=20&c=47WxoTKXi65dTKvghJ9fNaUdxT-CwD1LUdHatU01qyw="
                    }
                    alt={name}
                />
            </div>
            <div className="p-8 flex flex-col justify-center">
                <h2 className="text-2xl font-bold mb-2 break-words">{name}</h2>
                <ul className="text-lg sm:text-xl break-words">
                    <li>Wins: {wins}</li>
                    <li>Losses: {losses}</li>
                    <li>Kills: {kills}</li>
                    <li>Deaths: {deaths}</li>
                    <li>Assists: {assists}</li>
                    <li>Money: {money}</li>
                </ul>
            </div>
        </div>
    );
}
