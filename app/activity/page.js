import { fetchJobApplicationsForCandidate, fetchJobsForCandidateACtion } from '@/actions'
import CandidateActivity from '@/components/candidate-activity'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const ActivityPage = async () => {
    const user = await currentUser()
    const jobList = await fetchJobsForCandidateACtion()
    const jobApplications = await fetchJobApplicationsForCandidate(user?.id)

    return (
        <CandidateActivity
            jobList={jobList}
            jobApplications={jobApplications}
        />
    )
}

export default ActivityPage
