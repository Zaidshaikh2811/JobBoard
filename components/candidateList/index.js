"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogFooter } from '../ui/dialog'
import { getCandidateDetailsById, updateJobApplicationAction } from '@/actions'
import { createClient } from '@supabase/supabase-js'

const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY

)


const CandidateList = ({
    currentCandidateDetails,
    setCurrentCandidateDEtails,
    JobApplicants,
    showCurrrentCandidateDeatilsModal,
    setShowCurrentCandidateDetailsModal
}) => {

    async function handleFetchCandidateDetails(candidateId) {
        const candidateDetails = await getCandidateDetailsById(candidateId)
        if (candidateDetails) {
            setCurrentCandidateDEtails(candidateDetails)
            setShowCurrentCandidateDetailsModal(true)

        }
    }

    async function handleUpdateJobStatus(getCurrentStatus) {
        let cpyJobApplicants = [...JobApplicants]
        const indexOfCurrentJobApplicants = cpyJobApplicants.findIndex(item => item.candidateUserId === currentCandidateDetails?.userId)

        const jobApplicantsToUpdate = {
            ...cpyJobApplicants[indexOfCurrentJobApplicants],
            status: cpyJobApplicants[indexOfCurrentJobApplicants].status.concat(getCurrentStatus)
        }

        await updateJobApplicationAction(jobApplicantsToUpdate, "/jobs")

    }

    async function handlePreviewResume() {

        const { data, error } = supabaseClient.storage.from('job-board-public').getPublicUrl(currentCandidateDetails?.candidateInfo?.resume)

        if (data) {
            const a = document.createElement('a')

            a.href = data.publicUrl
            a.setAttribute("download", "Resume.pdf")
            a.setAttribute("target", "_blank")
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        }

    }

    return (
        <>
            <div className='grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3'>
                {JobApplicants && JobApplicants.length > 0 ? (
                    JobApplicants?.map((jobItem, index) => {
                        return (
                            <div
                                key={index}
                                className='bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden'
                            >
                                <div className='p-6 flex justify-between items-center'>
                                    <h3 className='text-xl font-semibold text-gray-800'>{jobItem?.name}</h3>
                                    <Button
                                        className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'
                                        onClick={() => handleFetchCandidateDetails(jobItem.candidateUserId)}
                                    >
                                        View Profile
                                    </Button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <p className="text-center text-gray-500">No applicants available</p>
                )}
            </div>

            {/* Candidate Details Dialog */}
            <Dialog
                open={showCurrrentCandidateDeatilsModal}
                onOpenChange={() => {
                    setCurrentCandidateDEtails(null)
                    setShowCurrentCandidateDetailsModal(false)
                }}
            >
                <DialogContent className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                    <div className="space-y-6">
                        <h1 className='text-2xl font-bold text-gray-800'>
                            {currentCandidateDetails?.candidateInfo?.name}
                            <span className="block text-sm font-normal text-gray-500">
                                {currentCandidateDetails?.email}
                            </span>
                        </h1>

                        <div className="space-y-4 text-gray-700">
                            <p className="text-lg"><strong>Company: </strong>{currentCandidateDetails?.candidateInfo?.currentCompany}</p>
                            <p className="text-lg"><strong>Location: </strong>{currentCandidateDetails?.candidateInfo?.currentJobLocation}</p>
                            <p className="text-lg"><strong>Total Experience: </strong>{currentCandidateDetails?.candidateInfo?.totalExperience} Years</p>
                            <p className="text-lg"><strong>Salary: </strong>{currentCandidateDetails?.candidateInfo?.currentSalary} LPA</p>
                            <p className="text-lg"><strong>Notice Period: </strong>{currentCandidateDetails?.candidateInfo?.noticePeriod} Days</p>

                            <div>
                                <h3 className='font-semibold text-lg'>Skills:</h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {currentCandidateDetails?.candidateInfo?.skills.split(",").map((skillItem, index) => (
                                        <span key={index} className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-lg">
                                            {skillItem}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className='font-semibold text-lg'>Previous Companies:</h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {currentCandidateDetails?.candidateInfo?.previousCompanies.split(",").map((companyItem, index) => (
                                        <span key={index} className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-lg">
                                            {companyItem}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-between items-center gap-4">
                        <Button onClick={handlePreviewResume} className=" disabled:opacity-65 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Resume</Button>
                        <Button
                            disabled={
                                JobApplicants.find(item => item.candidateUserId === currentCandidateDetails?.userId)?.status.includes("Selected") || JobApplicants.find(item => item.candidateUserId === currentCandidateDetails?.userId)?.status.includes("Rejected") ? true : false
                            }
                            onClick={() => handleUpdateJobStatus("Selected")} className="disabled:opacity-65 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">{
                                JobApplicants.find(item => item.candidateUserId === currentCandidateDetails?.userId)?.status.includes("Selected") ? "Selected" : 'Select'}
                        </Button>
                        <Button
                            disabled={
                                JobApplicants.find(item => item.candidateUserId === currentCandidateDetails?.userId)?.status.includes("Selected") ? true : false
                            }
                            className="disabled:opacity-65 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                            {
                                JobApplicants.find(item => item.candidateUserId === currentCandidateDetails?.userId)?.status.includes("Rejected") || JobApplicants.find(item => item.candidateUserId === currentCandidateDetails?.userId)?.status.includes("Selected") ? "Rejected" : 'Reject'}

                        </Button>
                    </div>

                </DialogContent>

            </Dialog>
        </>
    )
}

export default CandidateList
