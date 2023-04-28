import {Link} from "react-router-dom";
import React from "react";

export default function NavBarCard() {
    return (
        <nav className="flex items-center justify-between px-6 py-4">
            <ul className="flex items-center space-x-8">
                <li>
                    <img
                        src="https://luckynet.work/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmain-logo.e22b7a94.png&w=640&q=75"
                        alt="logo"
                        className="w-12 h-auto"
                    />
                </li>
                <Link to={'/'}>
                    <li><a className="font-medium hover:text-gray-300">Home</a></li>
                </Link>
                <Link to={'/all'}>
                    <li><a className="font-medium hover:text-gray-300">All Stats</a></li>
                </Link>
                <Link to={'/search'}>
                    <li><a className="font-medium hover:text-gray-300">Check Stats</a></li>
                </Link>
            </ul>
        </nav>
    )
}
