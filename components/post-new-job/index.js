"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'

import CommonForm from '../common-form'
import { initialPostNewJobFormData, postNewJobFormControls } from '@/utils'
import { postNewJobAction } from '@/actions'

const PostNewJob = ({ profileInfo, user }) => {
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

    return (
        <div>
            {/* Button with hover and transition effect */}
            <Button
                onClick={() => setShowJobDialog(true)}
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
