import { fetchJobsForCandidateACtion, fetchProfileAction } from '@/actions'
import Companies from '@/components/companies'
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const CompaniesPage = async () => {
    const user = await currentUser();
    const profileInfo = await fetchProfileAction(user?.id);

    if (!profileInfo) redirect("/onboard")
    const fetchAllJobs = await fetchJobsForCandidateACtion({})

    return (

        <Companies fetchAllJobs={fetchAllJobs} />
    )
}

export default CompaniesPage
