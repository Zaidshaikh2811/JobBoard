import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";

const RecruiterJobCard = ({ jobItem }) => {
    return (
        <div className="transition-transform transform hover:scale-105 duration-200 ease-in-out">
            <CommonCard
                icon={<JobIcon />}
                title={jobItem?.title}
                description={jobItem?.description}
                details={{
                    companyName: jobItem?.companyName,
                    location: jobItem?.location,
                    type: jobItem?.type,
                    experience: jobItem?.experience,
                    skills: jobItem?.skills,
                }}
                footerContent={
                    <div className="flex justify-between items-center w-full">
                        <p className="text-gray-500 text-sm">
                            {jobItem?.applicants.length} Applicants
                        </p>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                            View Details
                        </Button>
                    </div>
                }
                className="p-6 border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out"
            />

        </div>
    );
};

export default RecruiterJobCard;
