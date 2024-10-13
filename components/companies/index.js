"use client"


import React from 'react'

const Companies = ({ fetchAllJobs }) => {

    const createUniqueSetOfCompanies = [...new Set(fetchAllJobs.filter((item) => item?.companyName && item?.companyName.trim() !== "").map((item) => item.companyName))]


    return (
        <div>

        </div>
    )
}

export default Companies
