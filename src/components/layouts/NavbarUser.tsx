"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiHome } from "react-icons/fi";
import { GoInbox, GoSignOut } from "react-icons/go";
import { IoMenu } from "react-icons/io5";
import { RiLoopLeftFill } from "react-icons/ri";

//TODO: What to do on Logout
export default function NavbarUser() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path: string) =>
        pathname === path
            ? "bg-[#EAF5F9] text-black"
            : "text-black hover:bg-gray-100";

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-51 p-2 rounded bg-white shadow border"
            >
                <IoMenu size={24} />
            </button>
            <div
                className={`fixed z-50 top-0 h-screen w-60 bg-white border-r flex flex-col justify-between py-10 px-3 transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0`}
            >
                <div>
                    <h2 className="font-bold text-3xl py-5 px-3">User</h2>
                    <nav className="flex flex-col gap-2">
                        <Link
                            href="/user/home"
                            className={`no-underline flex items-center gap-2 px-3 py-2 rounded-md ${isActive(
                                "/user/home"
                            )}`}
                            onClick={() => setIsOpen(false)}
                        >
                            <FiHome />
                            <span>Home</span>
                        </Link>
                        <Link
                            href="/user/history"
                            className={`no-underline flex items-center gap-2 px-3 py-2 rounded-md ${isActive(
                                "/user/history"
                            )}`}
                            onClick={() => setIsOpen(false)}
                        >
                            <GoInbox />
                            <span>History</span>
                        </Link>
                        <Link
                            href="/admin/home"
                            className="no-underline flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-black"
                            onClick={() => setIsOpen(false)}
                        >
                            <RiLoopLeftFill />
                            <span>Switch to Admin</span>
                        </Link>
                    </nav>
                </div>
                <div>
                    <Link
                        href="/user/home"
                        className="no-underline flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-200 text-black"
                        onClick={() => setIsOpen(false)}
                    >
                        <GoSignOut size={18} />
                        <span>Logout</span>
                    </Link>
                </div>
            </div>
        </>
    );
}
