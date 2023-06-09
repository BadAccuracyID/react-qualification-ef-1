import React from "react";
import {Link} from "react-router-dom";
import NavBarCard from "../components/card/global/NavBarCard";
import FooterCard from "../components/card/global/FooterCard";
import ParticleBackground from "../components/background/ParticleBackground";

export default function HomePage() {
    return (
        <div className="bg-transparent text-white">
            {/* Particle Background */}
            <ParticleBackground/>

            {/* Navigation */}
            <NavBarCard/>

            {/* Main Section */}
            <section className="flex flex-col items-center justify-center h-screen px-6 sm:px-0">
                <h1 className="text-4xl sm:text-6xl font-bold mb-8 text-center">
                    Welcome to InsightEFul Stats
                </h1>
                <p className="text-lg sm:text-xl text-center">
                    An insightEFul website for viewing Player Stats
                </p>
                <section
                    className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                    <Link to={'/all'}>
                        <button
                            className="w-full sm:w-auto px-8 py-3 text-base sm:text-xl font-medium bg-blue-950 hover:bg-purple-700 rounded-full transition-colors duration-300">
                            View All Stats
                        </button>
                    </Link>
                    <Link to={'/search'}>
                        <button
                            className="w-full sm:w-auto px-8 py-3 text-base sm:text-xl font-medium bg-blue-950 hover:bg-purple-700 rounded-full transition-colors duration-300">
                            Check Player Stats
                        </button>
                    </Link>
                    <Link to={'/favorites'}>
                        <button
                            className="w-full sm:w-auto px-8 py-3 text-base sm:text-xl font-medium bg-blue-950 hover:bg-purple-700 rounded-full transition-colors duration-300">
                            View Favorites
                        </button>
                    </Link>
                </section>
            </section>

            {/* Footer */}
            <FooterCard/>
        </div>
    );
}
