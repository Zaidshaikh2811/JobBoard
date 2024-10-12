"use client";

import CandidateActivityCard from "../candidate-activity-carf";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

function CandidateActivity({ jobList, jobApplications }) {
    const uniqueStatus = [...new Set(jobApplications.map(jobApplicationItem => jobApplicationItem.status).flat(1))];

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="Applied" className="w-full">
                <div className="flex flex-col sm:flex-row items-baseline justify-between border-b pb-6 pt-10 sm:pt-24">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Candidate Activity</h2>

                    <TabsList className="mt-4 sm:mt-0">
                        {uniqueStatus.map((status, index) => (
                            <TabsTrigger
                                key={index}
                                value={status}
                                className="px-4 py-2 font-medium text-sm rounded-md transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {status}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                <div className="pb-24 pt-6">
                    <div className="container mx-auto space-y-8">
                        {uniqueStatus.map((status, index) => (
                            <TabsContent key={index} value={status}>
                                {/* Updated grid layout here */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {jobList
                                        .filter(jobItem =>
                                            jobApplications.some(
                                                jobApplication =>
                                                    jobApplication.jobID === jobItem._id &&
                                                    jobApplication.status.includes(status)
                                            )
                                        )
                                        .map(filteredJob => (
                                            <CandidateActivityCard
                                                key={filteredJob._id}
                                                jobItem={filteredJob}
                                                status={status}
                                            />
                                        ))}
                                </div>
                            </TabsContent>
                        ))}
                    </div>
                </div>
            </Tabs>
        </div>
    );
}

export default CandidateActivity;
