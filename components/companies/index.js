"use client";

import React from 'react';
import CommonCard from '../common-card';
import { Button } from '../ui/button';
import JobIcon from '../job-icon';
import { useRouter } from 'next/navigation';


export const metadata = {
    title: "Explore Top Companies - Job Opportunities",
    description: "Discover and browse leading companies hiring in your field. Find job opportunities that match your skills and career goals.",
};




const Companies = ({ fetchAllJobs }) => {
    const router = useRouter()
    const createUniqueSetOfCompanies = [
        ...new Set(fetchAllJobs
            .filter(item => item?.companyName && item?.companyName.trim() !== "")
            .map(item => item.companyName))
    ];

    const handleFilterJobsByCompanyName = (companyName) => {
        sessionStorage.setItem('filterParams', JSON.stringify({
            companyName: [companyName]
        }))

        router.push('/jobs')
    }






    return (
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex items-baseline justify-between border-b pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">Browse Companies</h1>
            </div>

            <div className="pt-6 pb-24">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                    {createUniqueSetOfCompanies?.map((companyName, index) => (
                        <CommonCard
                            key={index}
                            icon={<JobIcon />}
                            title={companyName}
                            description={`Explore job opportunities at ${companyName}.`}
                            footerContent={
                                <Button onClick={() => {
                                    handleFilterJobsByCompanyName(companyName)
                                }} className="mt-4 bg-indigo-600 text-white hover:bg-indigo-700 transition duration-200 ease-in-out">
                                    See Jobs
                                </Button>
                            }
                            className="flex flex-col p-6 border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-200 ease-in-out"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Companies;
