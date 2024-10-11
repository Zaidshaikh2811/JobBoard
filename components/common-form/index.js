import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const CommonForm = ({ action, buttonText, isBtnDisabled, formControls, btnType, formData, setFormdata, handleFileChange }) => {

    function renderInputByComponentType(getCurrentControl) {
        let content = null;

        switch (getCurrentControl.componentType) {
            case 'input':
                content = (
                    <div className="relative flex items-center mt-8">
                        <Input
                            type="text"
                            disabled={getCurrentControl.disabled}
                            placeholder={getCurrentControl.placeholder}
                            name={getCurrentControl.name}
                            id={getCurrentControl.id}
                            value={formData[getCurrentControl.name]} // Correct value access
                            onChange={(event) =>
                                setFormdata({
                                    ...formData,
                                    [event.target.name]: event.target.value,
                                })
                            }
                            className="w-full h-[60px] px-4 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-black text-lg text-gray-700 dark:text-gray-200 placeholder-gray-500 transition duration-300 ease-in-out 
                                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 focus-visible:outline-none hover:shadow-lg hover:bg-gray-200 dark:hover:bg-gray-800"
                        />
                    </div>
                );
                break;

            case 'file':
                content = (
                    <Label
                        htmlFor={getCurrentControl.name}
                        className="flex flex-col items-center justify-center bg-gray-100 dark:bg-black px-6 py-8 mx-auto mt-6 text-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-gray-800 hover:shadow-md"
                    >
                        <h2 className="text-gray-700 dark:text-gray-200 mb-2">{getCurrentControl.label}</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Click to upload</p>
                        <Input
                            onChange={handleFileChange}
                            id={getCurrentControl.name}
                            type="file"
                            className="hidden"
                        />
                    </Label>
                );
                break;

            default:
                content = (
                    <div className="relative flex flex-col mt-8">
                        <Label htmlFor={getCurrentControl.id} className="mb-1 text-sm font-semibold text-black dark:text-white">
                            {getCurrentControl.placeholder}
                        </Label>
                        <Input
                            type="text"
                            disabled={getCurrentControl.disabled}
                            placeholder={getCurrentControl.placeholder}
                            name={getCurrentControl.name}
                            id={getCurrentControl.id}
                            value={formData[getCurrentControl.name]} // Correct value access
                            onChange={(event) =>
                                setFormdata({
                                    ...formData,
                                    [event.target.name]: event.target.value,
                                })
                            }
                            className="w-full h-[60px] px-4 rounded-md border border-black dark:border-white bg-white dark:bg-black text-black dark:text-white placeholder-gray-400 transition duration-300 ease-in-out 
                                focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 focus-visible:outline-none hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-900"
                        />
                    </div>
                );
                break;
        }

        return content;
    }

    return (
        <div className="p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg transition-all duration-300 ease-in-out">
            <form action={action} className="space-y-6">
                {
                    formControls.map(control => renderInputByComponentType(control))
                }
                <div className="mt-6 w-full">
                    <Button
                        className="disabled:opacity-60 flex h-11 items-center justify-center px-5" type={btnType || "submit"}
                        disabled={isBtnDisabled}
                    >
                        {buttonText}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default CommonForm;
