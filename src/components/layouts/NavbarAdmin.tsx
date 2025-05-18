"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome } from "react-icons/fi";
import { GoInbox, GoSignOut } from "react-icons/go";
import { RiLoopLeftFill } from "react-icons/ri";

//TODO: What to do on Logout
export default function NavbarAdmin() {
    const pathname = usePathname();

    const isActive = (path: string) =>
        pathname === path
            ? "bg-[#EAF5F9] text-black"
            : "text-black hover:bg-gray-100";

    return (
        <div className="fixed z-50 top-0 h-screen w-60 bg-white border-r flex flex-col justify-between py-10 px-3">
            <div>
                <h2 className="font-bold text-3xl py-5 px-3">Admin</h2>
                <nav className="flex flex-col gap-2">
                    <Link
                        href="/admin/home"
                        className={`no-underline flex items-center gap-2 px-3 py-2 rounded-md ${isActive(
                            "/admin/home"
                        )}`}
                    >
                        <FiHome />
                        <span>Home</span>
                    </Link>
                    <Link
                        href="/admin/history"
                        className={`no-underline flex items-center gap-2 px-3 py-2 rounded-md ${isActive(
                            "/admin/history"
                        )}`}
                    >
                        <GoInbox />
                        <span>History</span>
                    </Link>
                    <Link
                        href="/user/home"
                        className="no-underline flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-black"
                    >
                        <RiLoopLeftFill />
                        <span>Switch to user</span>
                    </Link>
                </nav>
            </div>
            <div>
                <Link
                    href="/admin/home"
                    className="no-underline flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-200 text-black"
                >
                    <GoSignOut size={18} />
                    <span>Logout</span>
                </Link>
            </div>
        </div>
    );
}
