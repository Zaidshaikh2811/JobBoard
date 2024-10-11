import { fetchJobApplicationsForCandidate, fetchJobApplicationsForRecruiter, fetchJobsForCandidateACtion, fetchJobsForRecruiterAction, fetchProfileAction } from '@/actions';
import JobListing from '@/components/JobListing'
import { currentUser } from '@clerk/nextjs/server';
import React from 'react'

const JobsPage = async () => {
    const user = await currentUser();
    const profileInfo = await fetchProfileAction(user?.id)
    const jobList = profileInfo?.role == 'candidate' ? await fetchJobsForCandidateACtion() : await fetchJobsForRecruiterAction(user?.id)

    const getJobApplicationList = profileInfo?.role == 'candidate' ? await fetchJobApplicationsForCandidate(user?.id) : await fetchJobApplicationsForRecruiter(user?.id)



    return (
        <div>
            <JobListing
                profileInfo={profileInfo}
                user={JSON.parse(JSON.stringify(user))}
                jobList={jobList}
                getJobApplicationList={getJobApplicationList}
            />
        </div>
    )
}

export default JobsPage
