"use client"

import React, { useEffect, useState } from 'react'
import PostNewJob from '../post-new-job'
import RecruiterJobCard from '../recruiter-job-card'
import CandidateJobCard from '../candidate-job-card'
import { filterMenuDataArray, formUrlQuery } from '@/utils'
import { Menubar, MenubarItem, MenubarMenu, MenubarTrigger } from '../ui/menubar'
import { MenubarContent } from '@radix-ui/react-menubar'
import { Label } from '../ui/label'
import { useRouter, useSearchParams } from 'next/navigation'


const JobListing = ({ profileInfo, user, jobList, getJobApplicationList, fetchFilteredCategory }) => {
    const [filtersParams, setFilterParams] = useState({})
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {

        if (sessionStorage.getItem("filterParams")) {
            setFilterParams(JSON.parse(sessionStorage.getItem("filterParams")))
        }

    }, [])
    useEffect(() => {

        if (searchParams && Object.keys(filtersParams).length > 0) {
            let url = '';
            url = formUrlQuery({
                params: searchParams.toString(),
                dataToAdd: filtersParams
            })
            router.push(url, { scroll: false })

        }

    }, [filtersParams, searchParams, router])


    const filterMenus = filterMenuDataArray.map(item => ({
        id: item.id,
        name: item.label,
        options: [
            ...new Set(fetchFilteredCategory.map(listItem => listItem[item.id]))
        ]
    }))

    function handleFilter(getSectionId, getCurrentOption) {
        let cpyFilters = { ...filtersParams }
        const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId)
        if (indexOfCurrentSection == -1) {
            cpyFilters = {
                ...cpyFilters,
                [getSectionId]: [getCurrentOption]
            }
        }
        else {
            const idexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption)

            if (idexOfCurrentOption == -1) {
                cpyFilters[getSectionId].push(getCurrentOption)
            }
            else {
                cpyFilters[getSectionId].splice(idexOfCurrentOption, 1)

            }
        }
        setFilterParams(cpyFilters)
        sessionStorage.setItem("filterParams", JSON.stringify(cpyFilters))


    }

    return (
        <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-4">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                        {profileInfo?.info === "candidate" ? "Explore All Jobs" : "Jobs Dashboard"}

                    </h1>
                    <div className="flex items-center">
                        {profileInfo?.role === "candidate" ? <Menubar className="flex space-x-4">
                            {filterMenus.map((filterMenu) => (
                                <MenubarMenu key={filterMenu.name} className="relative">
                                    <MenubarTrigger className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                        {filterMenu.name}
                                    </MenubarTrigger>
                                    <MenubarContent className="absolute mt-1 rounded-md shadow-lg bg-white border border-gray-200  z-10">
                                        {filterMenu.options.map((option) => (
                                            <MenubarItem onClick={() => handleFilter(filterMenu.id, option)} key={option} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors">
                                                <div className={`h-4 w-4 border rounded border-gray-900 transition-all duration-300 ${filtersParams && Object.keys(filtersParams).length > 0 && filtersParams[filterMenu.id] && filtersParams[filterMenu.id].indexOf(option) > -1 ? "bg-black text-indigo-600" : "bg-white"}`}>
                                                </div>

                                                <Label className="ml-3 cursor-pointer text-sm text-gray-600">

                                                    {option}
                                                </Label>
                                            </MenubarItem>
                                        ))}
                                    </MenubarContent>
                                </MenubarMenu>
                            ))}
                        </Menubar> : <PostNewJob jobList={jobList} profileInfo={profileInfo} user={user} />}
                    </div>
                </div>

                {/* Job Listing Section */}
                <div className="pt-6 pb-24">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                        <div className="lg:col-span-4">
                            <div className="container mx-auto p-0 space-y-8">
                                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                                    {jobList && jobList.length > 0 ? (

                                        jobList.map((jobItem, index) => (
                                            profileInfo?.role === "candidate" ? (
                                                <div key={index}>


                                                    <CandidateJobCard getJobApplicationList={getJobApplicationList} key={index} jobItem={jobItem} profileInfo={profileInfo} />

                                                </div>
                                            ) : (
                                                <RecruiterJobCard getJobApplicationList={getJobApplicationList} key={index} jobItem={jobItem} />
                                            )
                                        ))
                                    ) : (
                                        <p>No jobs available</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default JobListing;
