export default function ErrorCard({message}: { message: string }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-6xl font-bold mb-8">Error</h1>
            <p className="text-xl">{message}</p>
        </div>
    )
}
