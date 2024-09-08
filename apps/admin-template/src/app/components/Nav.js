"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Nav() {
    const [activePath, setActivePath] = useState('/dashboard');
    const router = useRouter();

    const handleNavigation = (path) => {
        setActivePath(path);
        router.push(path);
    };

    const isActive = (path) => activePath === path;

    return (
        <nav className="flex min-h-[130px] justify-between items-start bg-black px-4 shadow-md">
            <img src="/parkLogo.svg" alt="logo" />
            <ul className="flex space-x-6 mt-4">
                <li
                    onClick={() => handleNavigation('/dashboard')}
                    className={`cursor-pointer px-3 py-2 rounded-md text-lg transition-colors ${isActive('/dashboard') ? 'bg-gray-700 text-white' : 'text-white hover:bg-gray-700 hover:text-white'}`}
                >
                    Dashboard
                </li>
                <li
                    onClick={() => handleNavigation('/systemFailures')}
                    className={`cursor-pointer px-3 py-2 rounded-md text-lg transition-colors ${isActive('/traffic') ? 'bg-gray-700 text-white' : 'text-white hover:bg-gray-700 hover:text-white'}`}
                >
                    System Failure
                </li>
            </ul>
        </nav>
    );
}
