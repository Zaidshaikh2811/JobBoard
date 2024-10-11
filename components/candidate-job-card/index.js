"use client"
import React, { useState } from 'react';
import CommonCard from '../common-card';
import JobIcon from '../job-icon';
import { Button } from '../ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { createJobApplicationAction } from '@/actions';

const CandidateJobCard = ({ jobItem, profileInfo, getJobApplicationList }) => {
    const [showJobDetails, setShowJobDetails] = useState(false);


    // Log the state of the drawer
    const handleDrawerToggle = (isOpen) => {

        setShowJobDetails(isOpen);
    };

    const handleJobApply = async () => {
        await createJobApplicationAction({
            recruiterUserID: jobItem?.recruiterUserID,
            name: profileInfo?.candidateInfo?.name,
            email: profileInfo?.email,
            candidateUserId: profileInfo?.userId,
            status: ["Applied"],
            jobID: jobItem?._id,
            jobAppliedDate: new Date().toLocaleDateString(),
        }, "/jobs")
        setShowJobDetails(false);
    }

    return (
        <div className="transition-transform transform hover:scale-105 duration-200 ease-in-out">
            {/* Debug log for rendering */}
            {console.log('Rendering CandidateJobCard with jobItem:', jobItem)}

            <Drawer open={showJobDetails} onOpenChange={handleDrawerToggle}>
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
                                {jobItem?.applicants.length} Applicants
                            </p>
                            {/* Log when the 'View Details' button is clicked */}
                            {console.log('Button rendered: View Details')}

                            <DrawerTrigger>
                                <Button
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                                    onClick={() => console.log('View Details button clicked')}
                                >
                                    View Details
                                </Button>
                            </DrawerTrigger>
                        </div>
                    }
                    className="p-6 border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out"
                />
                <DrawerContent className="p-8 w-full max-w-2xl bg-gray-50 rounded-lg shadow-lg mx-auto">
                    <DrawerHeader className="px-0 border-b border-gray-300 pb-4">
                        <div className="flex justify-between items-center">
                            <DrawerTitle className="text-2xl font-bold text-gray-800 truncate">
                                {jobItem?.title}
                            </DrawerTitle>
                            <DrawerClose>
                                <Button
                                    variant="ghost"
                                    onClick={() => handleDrawerToggle(false)}
                                    className="text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                    Close
                                </Button>
                            </DrawerClose>
                        </div>
                    </DrawerHeader>

                    <DrawerDescription className="mt-6 space-y-4 text-gray-700">
                        <p className="text-lg leading-relaxed">
                            {jobItem?.description}
                        </p>
                        <div className="flex flex-col space-y-3">
                            <div className="flex items-center space-x-2">
                                <strong className="w-1/3">Company:</strong>
                                <span className="w-2/3 text-gray-900">{jobItem?.companyName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <strong className="w-1/3">Location:</strong>
                                <span className="w-2/3 text-gray-900">{jobItem?.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <strong className="w-1/3">Type:</strong>
                                <span className="w-2/3 text-gray-900">{jobItem?.type}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <strong className="w-1/3">Experience:</strong>
                                <span className="w-2/3 text-gray-900">{jobItem?.experience}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <strong className="w-1/3">Skills:</strong>
                                <span className="w-2/3 text-gray-900">{jobItem?.skills}</span>
                            </div>
                        </div>
                    </DrawerDescription>

                    <DrawerFooter className="mt-8">
                        <Button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all duration-300 ease-in-out"
                            onClick={() => handleJobApply()}
                        >
                            Apply
                        </Button>
                    </DrawerFooter>
                </DrawerContent>


            </Drawer>
        </div>
    );
};

export default CandidateJobCard;
