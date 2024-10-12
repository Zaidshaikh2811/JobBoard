"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useState, useEffect } from 'react'

import { candidateOnBoardFormControls, initialCandidateFormData, initialRecruiterFormData, recruiterOnBoardFormControls } from '@/utils'
import CommonForm from '../common-form'
import { useUser } from '@clerk/nextjs'
import { createProfileAction } from '@/actions'
import { createClient } from '@supabase/supabase-js'


const supabaseClient = createClient('https://uipypeqycvarkryygfsm.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpcHlwZXF5Y3ZhcmtyeXlnZnNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2NTcyNzUsImV4cCI6MjA0NDIzMzI3NX0.yd93UQ0jyERAOwAdtPApx9LilEBBBbksvX6IXADptdY'
)

function OnBoard() {
    const currentAuthUser = useUser();
    const { user } = currentAuthUser


    const [currentTab, setCurrentTab] = useState("candidate")
    const [formControls, setFormControls] = useState(initialRecruiterFormData)
    const [candidateFormControls, setCandidateFormControls] = useState(initialCandidateFormData)
    const [file, setFile] = useState(null)

    useEffect(() => {

        if (file) {


            handleUploadPdfToSupaBase()
        }

    }, [file])

    async function handleUploadPdfToSupaBase() {

        const { data, error } = await supabaseClient.storage.from(
            "job-board-public",

        ).upload(`/public/${file.name}`, file, {
            cacheControl: "3600",
            upsert: false,
        })

        if (data) {
            setCandidateFormControls({
                ...candidateFormControls,
                resume: data.path
            })
        }

    }

    const handleTabChange = (value) => {
        setCurrentTab(value)
    }

    function handleRecuiterFormValid() {
        return formControls && formControls.name.trim() !== "" &&
            formControls.companyName.trim() !== "" && formControls.companyRole.trim() !== ""


    }

    function handleCandidateFormValid() {

        return Object.keys(candidateFormControls).every((key) => candidateFormControls[key].trim() !== '')

    }

    function handleFileChange(e) {
        e.preventDefault();
        setFile(e.target.files[0])
    }

    async function createProfile() {

        const data = currentTab == "candidate" ? {
            candidateInfo: candidateFormControls,
            role: 'candidate',
            isPremiumUser: false,
            userId: user.id,
            email: user?.primaryEmailAddress?.emailAddress,
        } : {
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
                    handleFileChange={handleFileChange}
                    isBtnDisabled={!handleCandidateFormValid()}
                    action={createProfile}
                />
            </TabsContent>
            <TabsContent value="recruiter">
                <CommonForm formControls={recruiterOnBoardFormControls}
                    buttonText={"OnBoard as recruiter"}
                    formData={formControls}
                    setFormdata={setFormControls}
                    isBtnDisabled={!handleRecuiterFormValid()}
                    action={createProfile}
                />
            </TabsContent>
        </Tabs>
    </div >)
}

export default OnBoard