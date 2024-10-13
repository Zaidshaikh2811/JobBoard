import { fetchProfileAction } from '@/actions'
import MemberShip from '@/components/memberShip'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'


export const metadata = {
    title: "Membership Plans - Upgrade Your Experience",
    description: "Explore our membership plans to unlock premium features. Choose the plan that suits your needs and enhance your experience today.",
};


const MemberShipPage = async () => {
    const user = await currentUser()
    const profileInfo = await fetchProfileAction(user?.id);

    if (!profileInfo) redirect("/onboard")

    return (

        <MemberShip profileInfo={profileInfo} />
    )
}

export default MemberShipPage
