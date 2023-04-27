import {Link} from "react-router-dom";
import React from "react";

export default function NavBarCard() {
    return (
        <nav className="flex items-center justify-between px-6 py-4">
            <ul className="flex items-center space-x-8">
                <li><img src="https://i.imgur.com/8LrZ4xM.png" alt="logo" className="w-10 h-10"/></li>
                <Link to={'/'}>
                    <li><a className="font-medium hover:text-gray-300">Home</a></li>
                </Link>
                <Link to={'/all'}>
                    <li><a className="font-medium hover:text-gray-300">All Stats</a></li>
                </Link>
                <Link to={'/player'}>
                    <li><a className="font-medium hover:text-gray-300">Player Stats</a></li>
                </Link>
            </ul>
        </nav>
    )
}
