"use client";
import {
    candidateOnBoardFormControls,
    initialCandidateAccountFormData,
    initialRecruiterFormData,
    recruiterOnBoardFormControls,
} from "@/utils";
import React, { useEffect, useState } from "react";
import CommonForm from "../common-form";
import { UpdateProfileACtion } from "@/actions";

const AccountInfo = ({ profileInfo }) => {
    const [candidateFormData, setCandidateFormData] = useState(
        initialCandidateAccountFormData
    );
    const [recruiterFormData, setRecruiterFormData] = useState(
        initialRecruiterFormData
    );
    const [isLoading, setIsLoading] = useState(false); // Add loading state for animation

    useEffect(() => {
        if (profileInfo) {
            if (profileInfo?.role == "candidate") {
                setCandidateFormData(profileInfo?.candidateInfo);
            } else {
                setRecruiterFormData(profileInfo?.recruiterInfo);
            }
        }
    }, [profileInfo]);


    const handleUpdateAccount = async () => {
        setIsLoading(true); // Show loading animation
        try {
            if (profileInfo?.role == "candidate") {
                await UpdateProfileACtion(
                    {
                        _id: profileInfo?._id,
                        userId: profileInfo?.userId,
                        role: profileInfo?.role,
                        email: profileInfo?.email,
                        isPremiumUser: profileInfo?.isPremiumUser,
                        memberShipStartDate: profileInfo?.memberShipStartDate,
                        memberShipEndDate: profileInfo?.memberShipEndDate,
                        memberShipType: profileInfo?.memberShipType,
                        candidateInfo: {
                            ...candidateFormData,
                            resume: profileInfo?.candidateInfo?.resume
                        },
                    }, "/accounts"
                );
            } else {
                await UpdateProfileACtion(
                    {
                        _id: profileInfo?._id,
                        userId: profileInfo?.userId,
                        role: profileInfo?.role,
                        email: profileInfo?.email,
                        isPremiumUser: profileInfo?.isPremiumUser,
                        memberShipStartDate: profileInfo?.memberShipStartDate,
                        memberShipEndDate: profileInfo?.memberShipEndDate,
                        memberShipType: profileInfo?.memberShipType,
                        recruiterInfo: {
                            ...recruiterFormData
                        }
                    }, "/accounts"
                );
            }
        } finally {
            setIsLoading(false); // Hide loading animation
        }
    };

    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4 animate-fadeIn"> {/* Fade-in animation */}
            <div className="flex items-center justify-center pb-8 border-b pt-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 animate-slideInUp">
                    Account Info
                </h2>
            </div>
            <div className="py-8">
                <div className="container mx-auto space-y-12">
                    {/* Add loading spinner when profile is being updated */}
                    {isLoading ? (
                        <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-indigo-600"></div>
                        </div>
                    ) : (
                        <CommonForm
                            action={handleUpdateAccount}
                            formControls={
                                profileInfo?.role == "candidate"
                                    ? candidateOnBoardFormControls.filter(
                                        (formControl) => formControl.name !== "resume"
                                    )
                                    : recruiterOnBoardFormControls
                            }
                            setFormdata={
                                profileInfo?.role == "candidate"
                                    ? setCandidateFormData
                                    : setRecruiterFormData
                            }
                            buttonText={"Update Profile"}
                            formData={
                                profileInfo?.role == "candidate"
                                    ? candidateFormData
                                    : recruiterFormData
                            }
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountInfo;
