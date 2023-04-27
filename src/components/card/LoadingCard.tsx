export default function LoadingCard() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-blue-900 rounded w-3/4"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-blue-900 rounded"></div>
                        <div className="h-4 bg-blue-900 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
