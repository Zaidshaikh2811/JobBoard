"use client"

import React from 'react'
import PostNewJob from '../post-new-job'
import RecruiterJobCard from '../recruiter-job-card'
import CandidateJobCard from '../candidate-job-card'

const JobListing = ({ profileInfo, user, jobList, getJobApplicationList }) => {
    return (
        <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex items-baseline justify-between border-b border-gray-200 pt-24">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                        {profileInfo?.info === "candidate" ? "Explore All Jobs" : "Jobs Dashboard"}
                    </h1>
                    <div className="flex items-center">
                        {profileInfo?.role === "candidate" ? <p>Filter</p> : <PostNewJob profileInfo={profileInfo} user={user} />}
                    </div>
                </div>

                {/* Job Listing Section */}
                <div className="pt-6 pb-24">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                        <div className="lg:col-span-4">
                            <div className="container mx-auto p-0 space-y-8">
                                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                                    {jobList && jobList.length > 0 ? (
                                        jobList.map((jobItem, index) => (
                                            profileInfo?.role === "candidate" ? (
                                                <div key={index}>

                                                    <CandidateJobCard getJobApplicationList={getJobApplicationList} key={index} jobItem={jobItem} profileInfo={profileInfo} />
                                                    {/* Add other candidate job details here */}
                                                </div>
                                            ) : (
                                                <RecruiterJobCard getJobApplicationList={getJobApplicationList} key={index} jobItem={jobItem} />
                                            )
                                        ))
                                    ) : (
                                        <p>No jobs available</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobListing;
