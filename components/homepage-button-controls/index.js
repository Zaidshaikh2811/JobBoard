"use client";

import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const HomePageButtonControls = ({ profileInfo, user }) => {
    const router = useRouter();

    useEffect(() => {
        router.refresh()
    }, [])

    return (
        <>
            <Button
                className="relative overflow-hidden rounded-lg px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold tracking-wide shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
                onClick={() => router.push('jobs')}
            >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></span>
                <span className="relative z-10">
                    {user ? (profileInfo?.role === "candidate" ? "Browse Jobs" : "Jobs Dashboard") : "Find Jobs"}
                </span>
            </Button>

            <Button
                className="relative overflow-hidden rounded-lg px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold tracking-wide shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl ml-4"
                onClick={() => {
                    router.push(user ? (profileInfo?.role === "candidate" ? "/activity" : "/jobs") : "/jobs")
                }}
            >
                <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-700 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></span>
                <span className="relative z-10">
                    {user ? (profileInfo?.role === "candidate" ? "Your Activity" : "Post New Job") : "Post New Job"}
                </span>
            </Button>

        </>
    );
};

export default HomePageButtonControls;
