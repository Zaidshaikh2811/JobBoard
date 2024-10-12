import React from 'react'

const CandidateActivityCard = ({ jobItem, status }) => {
    return (
        <div className="border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out bg-white">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">{jobItem.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${status === 'Applied' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {status}
                </span>
            </div>
            <p className="text-sm text-gray-500 mb-2">Company: <span className="font-semibold text-gray-700">{jobItem.companyName}</span></p>
            <p className="text-sm text-gray-500 mb-2">Location: <span className="font-semibold text-gray-700">{jobItem.location}</span></p>
            <p className="text-sm text-gray-500 mb-2">Experience: <span className="font-semibold text-gray-700">{jobItem.experience}</span></p>
            <p className="text-sm text-gray-500 mb-2">Skills: <span className="font-semibold text-gray-700">{jobItem.skills}</span></p>

            <div className="mt-4">
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-all">
                    View Details
                </button>
            </div>
        </div>
    )
}

export default CandidateActivityCard
