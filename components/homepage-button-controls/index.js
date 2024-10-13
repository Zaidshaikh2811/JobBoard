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
            <Button onClick={() => router.push('jobs')}>
                {user ? (profileInfo?.role === "candidate" ? "Browse Jobs" : "Jobs Dashboard") : "Find Jobs"}
            </Button>
            <Button onClick={() => {
                router.push(user ? (profileInfo?.role === "candidate" ? "/activity" : "/jobs") : "/jobs")
            }}>
                {user ? (profileInfo?.role === "candidate" ? "Your Activity" : "Post New Job") : "Post New Job"}
            </Button>
        </>
    );
};

export default HomePageButtonControls;
