import React from "react";
import {Link} from "react-router-dom";
import NavBarCard from "../components/card/NavBarCard";

export default function Home() {
    return (
        <div className="bg-blue-900 text-white">
            {/* Navigation */}
            <NavBarCard/>

            {/* Main section */}
            <section className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-6xl font-bold mb-8">Welcome to Stats Viewer</h1>
                <p className="text-xl">You can check your stats or other player's stats here</p>
                <section className="flex items-center justify-center space-x-6">
                    <Link to={'/all'}>
                        <button
                            className="px-8 py-3 mt-8 text-xl font-medium bg-purple-600 hover:bg-purple-500 rounded-full transition-colors duration-300">
                            View All Stats
                        </button>
                    </Link>
                    <Link to={'/player'}>
                        <button
                            className="px-8 py-3 mt-8 text-xl font-medium bg-purple-600 hover:bg-purple-500 rounded-full transition-colors duration-300">
                            View Player Stats
                        </button>
                    </Link>
                </section>
            </section>

            {/* Footer */}
            <footer className="bg-blue-950 py-6 text-center">
                <p className="text-gray-400 text-sm">&copy; 2023 My Website. All rights reserved.</p>
            </footer>
        </div>
    );
}
