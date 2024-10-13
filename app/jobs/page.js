import { createFilterCategoryAction, fetchJobApplicationsForCandidate, fetchJobApplicationsForRecruiter, fetchJobsForCandidateACtion, fetchJobsForRecruiterAction, fetchProfileAction } from '@/actions';
import JobListing from '@/components/JobListing'
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

export const metadata = {
    title: "Job Listings - Explore Opportunities and Manage Applications",
    description: "Browse through a wide range of job listings tailored for candidates and recruiters. Find the perfect job or manage your job applications effortlessly.",
};


const JobsPage = async ({ searchParams }) => {
    const user = await currentUser();



    const profileInfo = await fetchProfileAction(user?.id)
    if (!profileInfo) redirect("/onboard")
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
