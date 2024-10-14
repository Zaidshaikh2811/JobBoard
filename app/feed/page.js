

import { fetchAllFeedPostAction, fetchProfileAction } from '@/actions';
import Feed from '@/components/feed'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

export const metadata = {
    title: "Stay Connected with Your Network - Explore and Share",
    description: "Engage with your community by sharing updates, discovering new posts, and staying connected. Share your thoughts, explore content, and be part of the conversation.",
};


const FeedPage = async () => {
    const user = await currentUser();
    const profileInfo = await fetchProfileAction(user?.id)
    if (!profileInfo) redirect("/onboard")


    const allFeedPost = await fetchAllFeedPostAction();

    return (
        <Feed
            allFeedPost={allFeedPost}
            profileInfo={profileInfo}
            user={JSON.parse(JSON.stringify(user))} />
    )
}

export default FeedPage
