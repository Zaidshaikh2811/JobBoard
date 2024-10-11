'use client'

import Link from "next/link"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { AlignJustify } from "lucide-react"
import { UserButton } from "@clerk/nextjs"


const Header = ({ user, profileInfo }) => {



    const menuItems = [
        {
            label: "Home",
            path: '/',
            show: true
        },
        {
            label: "login",
            path: '/sign-in',
            show: user == 'null'
        },
        {
            label: "Register",
            path: '/sign-up',
            show: user == 'null'
        },
        {
            label: "Jobs",
            path: '/jobs',
            show: user != 'null'
        },
        {
            label: "Activity",
            path: '/activity',
            show: profileInfo?.role == "candidate"
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
    ]


    return (
        <div>
            <header className="flex h-16 w-full shrink-0 items-center">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className="lg:hidden">
                            <AlignJustify className="h-6 w-6" />
                            <span className="sr-only">Toggle Navigation Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <Link className="mr-6 hidden lg:flex" href={"#"}>
                            <h3>JOBSCO</h3>
                        </Link>
                        <div className="grid gap-2 py-6">
                            {menuItems.map((menuItem, index) => {
                                return (
                                    menuItem.show ? (
                                        <Link key={index} className="flex w-full items-center py-2 text-lg font-semibold" href={menuItem.path}>{menuItem.label}</Link>
                                    ) : null
                                )
                            })}
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </SheetContent>
                </Sheet>
                <Link href={"/"} className="hidden lg:flex ml-6">JOBSCO</Link>
                <nav className="ml-auto hidden lg:flex gap-6">
                    {
                        menuItems.map((menuItems, index) => menuItems.show ? (
                            <Link key={index}
                                className="group inline-flex h-9 w-max items-center rounded-md bg-white px-4 py-2 text-sm font-medium"
                                href={menuItems.path}
                            >
                                {menuItems.label}
                            </Link>
                        ) : null)
                    }
                    <UserButton afterSignOutUrl="/" />
                </nav>
            </header>

        </div>
    )
}

export default Header
