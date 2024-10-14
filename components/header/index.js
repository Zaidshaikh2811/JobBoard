'use client'

import Link from "next/link"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { AlignJustify, Moon } from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"

const Header = ({ user, profileInfo }) => {
    const { theme, setTheme } = useTheme()
    const pathname = usePathname();

    const menuItems = [
        {
            label: "Home",
            path: '/',
            show: true
        },
        {
            label: "Feed",
            path: '/feed',
            show: user != 'null'
        },
        {
            label: "Login",
            path: '/sign-in',
            show: user == 'null'
        },
        {
            label: "Register",
            path: '/sign-up',
            show: user == 'null'
        },
        {
            label: "Companies",
            path: '/companies',
            show: profileInfo?.role === "candidate"
        },
        {
            label: "Jobs",
            path: '/jobs',
            show: user != 'null'
        },
        {
            label: "Activity",
            path: '/activity',
            show: profileInfo?.role === "candidate"
        },
        {
            label: "Membership",
            path: '/membership',
            show: user != 'null'
        },
        {
            label: "Accounts",
            path: '/accounts',
            show: user != 'null'
        },
    ];

    return (
        <header className="flex h-16 w-full items-center border-b border-gray-200 shadow-md bg-white">
            <div className="container mx-auto flex justify-between items-center px-4 lg:px-8">
                {/* Mobile Menu Trigger */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="lg:hidden">
                            <AlignJustify className="h-6 w-6" />
                            <span className="sr-only">Toggle Navigation Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <div className="grid gap-4 py-6">
                            <Link className="text-2xl font-bold text-indigo-600" href="/">
                                JOBSCO
                            </Link>
                            {menuItems.map((menuItem, index) => (
                                menuItem.show ? (
                                    <Link
                                        key={index}
                                        className={`flex w-full items-center py-2 text-lg font-semibold ${pathname === menuItem.path ? 'text-indigo-600 underline' : 'text-gray-700'}`}
                                        href={menuItem.path}
                                    >
                                        {menuItem.label}
                                    </Link>
                                ) : null
                            ))}
                            <Moon
                                className={`h-6 w-6 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110 ${theme === 'dark' ? 'text-yellow-400' : 'text-gray-700 hover:text-indigo-600'
                                    }`}
                                fill={theme === 'dark' ? 'currentColor' : 'none'}
                                stroke={theme === 'dark' ? 'none' : 'currentColor'}
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            />
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </SheetContent>
                </Sheet>

                {/* Logo for Desktop */}
                <Link href="/" className="hidden lg:flex text-2xl font-bold text-indigo-600">
                    JOBSCO
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-6">
                    {menuItems.map((menuItem, index) => (
                        menuItem.show ? (
                            <Link
                                key={index}
                                className={`group  inline-flex h-9 items-center px-4 py-2 text-md font-medium rounded-md ${pathname === menuItem.path ? ' text-indigo-600 underline' : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'}`}
                                href={menuItem.path}
                                onClick={() => sessionStorage.removeItem("filterParams")}
                            >
                                {menuItem.label}
                            </Link>
                        ) : null
                    ))}
                    <Moon
                        className={`h-6 w-6 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110 ${theme === 'dark' ? 'text-yellow-400' : 'text-gray-700 hover:text-indigo-600'
                            }`}
                        fill={theme === 'dark' ? 'currentColor' : 'none'}
                        stroke={theme === 'dark' ? 'none' : 'currentColor'}
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    />

                    <UserButton afterSignOutUrl="/" />
                </nav>
            </div>
        </header>
    );
};

export default Header;
