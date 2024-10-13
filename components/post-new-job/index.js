"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { useToast } from "@/hooks/use-toast"
import CommonForm from '../common-form'
import { initialPostNewJobFormData, postNewJobFormControls } from '@/utils'
import { postNewJobAction } from '@/actions'
import Link from 'next/link'

const PostNewJob = ({ profileInfo, user, jobList }) => {

    const { toast } = useToast()
    const [showJobDialog, setShowJobDialog] = useState(false)
    const [jobFormData, setJobFormData] = useState({
        ...initialPostNewJobFormData,
        companyName: profileInfo.recruiterInfo.companyName
    })

    function handlePostNewBtnValid() {
        return Object.keys(jobFormData).every(control => jobFormData[control] !== '')
    }

    async function createNewJob() {
        await postNewJobAction({ ...jobFormData, recruiterId: user?.id, applications: [] }, "/jobs")
        setJobFormData({
            ...initialPostNewJobFormData,
            companyName: profileInfo.recruiterInfo.companyName
        })
    }

    function handleAddNewJob() {
        if (!profileInfo?.isPremiumUser && jobList?.length >= 1) {
            toast({
                variant: "destructive",
                title: "You Can Post Max 2 New Job",
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

        setShowJobDialog(true)


    }

    return (
        <div>
            {/* Button with hover and transition effect */}
            <Button
                onClick={handleAddNewJob}
                className="disabled:opacity-60 flex h-11 items-center justify-center px-5 
                           bg-black text-white hover:bg-gray-800 transition-all duration-300">
                Post A Job
            </Button>

            {/* Dialog with fade-in and fade-out animations */}
            <Dialog
                open={showJobDialog}
                onOpenChange={() => {
                    setShowJobDialog(false)
                    setJobFormData({
                        ...initialPostNewJobFormData,
                        companyName: profileInfo.recruiterInfo.companyName
                    })
                }}
            >
                <DialogContent
                    className="sm:max-w-screen-md h-[600px] overflow-auto 
                               text-black border border-gray-600 
                               animate-fadeIn transition-all duration-300"
                >

                    <DialogHeader>
                        <DialogTitle className=" flex text-center justify-center text-4xl text-black ">Post New Job</DialogTitle>

                        <div className="grid gap-4 py-4">
                            <CommonForm
                                buttonText={"Add"}
                                formData={jobFormData}
                                setFormdata={setJobFormData}
                                formControls={postNewJobFormControls}
                                isBtnDisabled={!handlePostNewBtnValid()}
                                action={createNewJob}
                            />
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default PostNewJob
