"use client"
import React from 'react'
import { Drawer, DrawerContent } from '../ui/drawer'
import { ScrollArea } from '../ui/scroll-area'
import CandidateList from '../candidateList'

const JobApplicants = ({
    showApplicationsDrawer,
    setShowApplicationsDrawer,
    jobItem,
    getJobApplicationList,
    currentCandidateDetails,
    setCurrentCandidateDEtails,
    showCurrrentCandidateDeatilsModal,
    setShowCurrentCandidateDetailsModal,

}) => {


    return (
        <Drawer open={showApplicationsDrawer} onOpenChange={setShowApplicationsDrawer}>

            <DrawerContent className="max-h-[50vh]">
                <ScrollArea className="h-auto overflow-y-auto">
                    <CandidateList
                        currentCandidateDetails={currentCandidateDetails}
                        setCurrentCandidateDEtails={setCurrentCandidateDEtails}
                        JobApplicants={getJobApplicationList}
                        showCurrrentCandidateDeatilsModal={showCurrrentCandidateDeatilsModal}
                        setShowCurrentCandidateDetailsModal={setShowCurrentCandidateDetailsModal}

                    />

                </ScrollArea>
            </DrawerContent>


        </Drawer>
    )
}

export default JobApplicants
