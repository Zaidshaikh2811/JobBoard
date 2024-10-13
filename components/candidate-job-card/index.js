"use client"
import React, { useEffect, useState } from 'react';
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
import { useToast } from "@/hooks/use-toast"
import Link from 'next/link';
const CandidateJobCard = ({ jobItem, profileInfo, getJobApplicationList }) => {
    const [showJobDetails, setShowJobDetails] = useState(false);

    const { toast } = useToast()









    // Log the state of the drawer
    const handleDrawerToggle = (isOpen) => {

        setShowJobDetails(isOpen);
    };



    const handleJobApply = async () => {
        if (!profileInfo?.isPremiumUser && getJobApplicationList.length >= 2) {
            toast({
                variant: "destructive",
                title: "You Can Apply Max 2 New Job",
                description: " Please Upgrade Your Membership",
                action: <Link
                    href="/membership"
                    className="text-white text-[15px] font-sm hover:underline transition duration-200 ease-in-out"
                >
                    Choose Membership
                </Link>
            })

            return
        }


        await createJobApplicationAction({
            recruiterUserID: jobItem?.recruiterId,
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

                                {getJobApplicationList?.filter(item => item.jobID == jobItem._id).length} Applicants

                            </p>


                            <DrawerTrigger>
                                <Button
                                    className="disabled:opacity-65 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                                    onClick={() => console.log('View Details button clicked')}
                                    disabled={getJobApplicationList.findIndex(item => item.jobID == jobItem?._id).length == 0}
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
                            disabled={
                                getJobApplicationList?.filter(
                                    (item) => item.jobID === jobItem?._id && item.candidateUserId === profileInfo?.userId
                                ).length > 0
                            }
                            className="disabled:opacity-65 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all duration-300 ease-in-out"
                            onClick={() => handleJobApply()}
                        >
                            {
                                getJobApplicationList?.filter(
                                    (item) => item.jobID === jobItem?._id && item.candidateUserId === profileInfo?.userId
                                ).length > 0
                                    ? "Applied"
                                    : "Apply"
                            }

                        </Button>
                    </DrawerFooter>
                </DrawerContent>


            </Drawer>
        </div>
    );
};

export default CandidateJobCard;
