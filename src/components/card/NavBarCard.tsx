import {Link} from 'react-router-dom';
import React, {useContext, useState} from "react";
import {AuthContext} from "../../lib/context/AccountContext";

export default function NavBarCard() {
    const {user, logout} = useContext(AuthContext);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const handleProfileClick = () => {
        setIsLoginModalOpen(true);
    }

    const handleLoginModalClose = () => {
        setIsLoginModalOpen(false);
    }

    const handleLogout = () => {
        logout();
    }

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-blue-950">
            <ul className="flex items-center space-x-8 max-h-56 overflow-y-auto">
                <img
                    src="https://luckynet.work/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmain-logo.e22b7a94.png&w=640&q=75"
                    alt="logo"
                    className="w-12 h-auto object-contain"
                />
                <Link to={'/'}>
                    <li><a className="font-medium hover:text-gray-300">Home</a></li>
                </Link>
                <Link to={'/all'}>
                    <li><a className="font-medium hover:text-gray-300">All Stats</a></li>
                </Link>
                <Link to={'/search'}>
                    <li><a className="font-medium hover:text-gray-300">Check Stats</a></li>
                </Link>
                <Link to={'/favorites'}>
                    <li><a className="font-medium hover:text-gray-300">Favorites</a></li>
                </Link>
            </ul>

            <div>
                {
                    user ?
                        <div>
                            <button
                                className="font-medium hover:text-gray-300"
                                onClick={handleLogout}>
                                {user.username}
                            </button>
                        </div>
                        :
                        <button
                            className="font-medium hover:text-gray-300"
                            onClick={handleProfileClick}>
                            Login
                        </button>
                }
            </div>

            <LoginModal isOpen={isLoginModalOpen} onClose={handleLoginModalClose}/>
        </nav>

    )
}

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({isOpen, onClose}) => {
    const {login} = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let success = login(username, password);
        if (!success) {
            alert('Invalid username or password');
        } else {
            setUsername('');
            setPassword('');
            onClose();
        }
    }

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="bg-white text-black rounded-lg shadow-lg p-4">
                <h2 className="text-2xl font-bold mb-4 text-center ">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-gray-700 font-medium mb-2">
                            Username
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={username}
                            onChange={handleEmailChange}
                            className="w-full border border-gray-400 p-2 rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-full border border-gray-400 p-2 rounded-lg"
                            required
                        />
                    </div>

                    <div
                        className="flex flex-row justify-center">
                        <button type="submit"
                                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors duration-300">
                            Submit
                        </button>
                        <button type="button"
                                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300 ml-4"
                                onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


