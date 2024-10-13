
import { fetchProfileAction } from '@/actions'
import AccountInfo from '@/components/accountInfo/page'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const AccountPage = async () => {
    const user = await currentUser()
    const profileInfo = await fetchProfileAction(user?.id)
    if (!profileInfo) redirect("/onboard")



    return (
        <AccountInfo profileInfo={profileInfo} />
    )
}

export default AccountPage
