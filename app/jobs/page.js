import { createFilterCategoryAction, fetchJobApplicationsForCandidate, fetchJobApplicationsForRecruiter, fetchJobsForCandidateACtion, fetchJobsForRecruiterAction, fetchProfileAction } from '@/actions';
import JobListing from '@/components/JobListing'
import { currentUser } from '@clerk/nextjs/server';
import React from 'react'

const JobsPage = async ({ searchParams }) => {
    const user = await currentUser();
    console.log(searchParams);

    const profileInfo = await fetchProfileAction(user?.id)
    const jobList = profileInfo?.role == 'candidate' ? await fetchJobsForCandidateACtion(searchParams) : await fetchJobsForRecruiterAction(user?.id)

    const getJobApplicationList = profileInfo?.role == 'candidate' ? await fetchJobApplicationsForCandidate(user?.id) : await fetchJobApplicationsForRecruiter(user?.id)

    const fetchFilteredCategory = await createFilterCategoryAction();





    return (
        <div>
            <JobListing
                profileInfo={profileInfo}
                user={JSON.parse(JSON.stringify(user))}
                jobList={jobList}
                getJobApplicationList={getJobApplicationList}
                fetchFilteredCategory={fetchFilteredCategory}

            />
        </div>
    )
}

export default JobsPage
