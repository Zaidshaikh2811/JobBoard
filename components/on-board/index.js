"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useState } from 'react'

import { candidateOnBoardFormControls, initialRecruiterFormData, recruiterOnBoardFormControls } from '@/utils'
import CommonForm from '../common-form'
import { useUser } from '@clerk/nextjs'




function OnBoard() {
    const currentAuthUser = useUser();
    const { user } = currentAuthUser
    console.log(currentAuthUser);

    const [currentTab, setCurrentTab] = useState("candidate")
    const [formControls, setFormControls] = useState(initialRecruiterFormData)
    const [candidateFormControls, setCandidateFormControls] = useState(candidateOnBoardFormControls)


    const handleTabChange = (value) => {
        setCurrentTab(value)
    }

    function handleRecuiterFormValid() {
        return formControls && formControls.name.trim() !== "" &&
            formControls.companyName.trim() !== "" && formControls.companyRole.trim() !== ""


    }


    async function createProfileAction() {

        const data = {
            recruiterInfo: formControls,
            role: "recruiter",
            userId: user.id,
            email: user?.primaryEmailAddress?.emailAddress,
            isPremiumUser: false,
        }
        await createProfileAction(data, '/onboard')
    }




    return (<div className="bg-white" >
        <Tabs value={currentTab} onValueChange={handleTabChange}>
            <div className="w-full">
                <div className="flex items-baseline justify-between
                    border-b pb-6 pt-24">
                    <h1 className="text-4xl font-bold  tracking-tight text-gray-900"> Welcome to Onboarding</h1>
                    <TabsList>
                        <TabsTrigger value="candidate">Candidate</TabsTrigger>
                        <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
                    </TabsList>
                </div>
            </div>
            <TabsContent value="candidate">
                <CommonForm
                    formControls={candidateOnBoardFormControls}
                    buttonText={"OnBoard as recruiter"}
                    formData={candidateFormControls}
                    setFormdata={setCandidateFormControls}
                />
            </TabsContent>
            <TabsContent value="recruiter">
                <CommonForm formControls={recruiterOnBoardFormControls}
                    buttonText={"OnBoard as recruiter"}
                    formData={formControls}
                    setFormdata={setFormControls}
                    isBtnDisabled={!handleRecuiterFormValid()}
                    action={createProfileAction}
                />
            </TabsContent>
        </Tabs>
    </div >)
}

export default OnBoard