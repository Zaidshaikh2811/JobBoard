import { fetchJobsForRecruiterAction, fetchProfileAction } from '@/actions';
import JobListing from '@/components/JobListing'
import { currentUser } from '@clerk/nextjs/server';
import React from 'react'

const JobsPage = async () => {
    const user = await currentUser();
    const profileInfo = await fetchProfileAction(user?.id)
    const jobList = await fetchJobsForRecruiterAction(user?.id)




    return (
        <div>
            <JobListing
                profileInfo={profileInfo}
                user={JSON.parse(JSON.stringify(user))}
                jobList={jobList}
            />
        </div>
    )
}

export default JobsPage
