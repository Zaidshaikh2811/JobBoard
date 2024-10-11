import {
    Card,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const CommonCard = ({ icon, title, description, footerContent, details }) => {
    return (
        <Card className="flex flex-col gap-4 rounded-2xl p-6 bg-white transition duration-300 shadow-md hover:shadow-xl cursor-pointer">
            <CardHeader className="flex items-center space-x-3">
                {icon && <div className="flex-shrink-0">{icon}</div>}
                <div className="flex-1">
                    {title && (
                        <CardTitle className="text-xl font-semibold text-gray-900 truncate">
                            {title}
                        </CardTitle>
                    )}
                    {description && (
                        <p className="flex mt-1 text-gray-600 text-sm justify-center font-semibold">
                            {description}
                        </p>
                    )}
                </div>
            </CardHeader>

            {/* Job Details Section */}
            {details && (
                <div className="mt-2 text-gray-700 text-sm space-y-1">
                    <p className="flex justify-between">
                        <strong>Company:</strong>
                        <span>{details.companyName}</span>
                    </p>
                    <p className="flex justify-between">
                        <strong>Location:</strong>
                        <span>{details.location}</span>
                    </p>
                    <p className="flex justify-between">
                        <strong>Type:</strong>
                        <span>{details.type}</span>
                    </p>
                    <p className="flex justify-between">
                        <strong>Experience:</strong>
                        <span>{details.experience}</span>
                    </p>
                    <p className="flex justify-between">
                        <strong>Skills:</strong>
                        <span>{details.skills}</span>
                    </p>
                </div>
            )}

            <CardFooter className="flex justify-between items-center border-t border-gray-200 pt-4 mt-4">
                {footerContent}
            </CardFooter>
        </Card>
    );
}

export default CommonCard;
