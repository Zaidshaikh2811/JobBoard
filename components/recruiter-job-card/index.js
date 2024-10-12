import { useState } from "react";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import JobApplicants from "../job-applicants";

const RecruiterJobCard = ({ jobItem, getJobApplicationList }) => {
    const [showApplicationsDrawer, setShowApplicationsDrawer] = useState(false)
    const [currentCandidateDetails, setCurrentCandidateDEtails] = useState(null)
    const [showCurrrentCandidateDeatilsModal, setShowCurrentCandidateDetailsModal] = useState(false)


    return (
        <div className="transition-transform transform hover:scale-105 duration-200 ease-in-out">
            <CommonCard
                icon={<JobIcon />}
                title={jobItem?.title}
                description={jobItem?.description}
                details={{
                    companyName: jobItem?.companyName,
                    location: jobItem?.location,
                    type: jobItem?.type,
                    experience: jobItem?.experience,
                    skills: jobItem?.skills,
                }}
                footerContent={
                    <div className="flex justify-between items-center w-full">
                        <p className="text-gray-500 text-sm">

                            {getJobApplicationList?.filter(item => item.jobID == jobItem._id).length} Applicants

                        </p>
                        <Button onClick={() => setShowApplicationsDrawer(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                            View Details
                        </Button>
                    </div>
                }
                className="p-6 border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out"
            />
            <JobApplicants
                showApplicationsDrawer={showApplicationsDrawer}
                setShowApplicationsDrawer={setShowApplicationsDrawer}
                jobItem={jobItem}
                getJobApplicationList={getJobApplicationList.filter(jobApplicantItem => jobApplicantItem.jobID == jobItem?._id)}
                currentCandidateDetails={currentCandidateDetails}
                setCurrentCandidateDEtails={setCurrentCandidateDEtails}
                showCurrrentCandidateDeatilsModal={showCurrrentCandidateDeatilsModal}
                setShowCurrentCandidateDetailsModal={setShowCurrentCandidateDetailsModal}
            />
        </div>
    );
};

export default RecruiterJobCard;
