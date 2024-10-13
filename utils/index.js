
import qs from "query-string"

export const recruiterOnBoardFormControls = [
    {
        name: "name",
        label: "Name",
        placeholder: "Your name",
        type: "text",
        required: true

    },
    {
        name: "companyName",
        label: "Company Name",
        placeholder: "Your Company name",
        type: "text",
        required: true

    },
    {
        name: "companyRole",
        label: "Company Role",
        placeholder: "Enter Your Company Role",
        type: "text",
        required: true

    },
]


export const initialRecruiterFormData = {
    name: "",
    companyName: "",
    companyRole: "",


}

export const candidateOnBoardFormControls = [
    {
        label: "Resume",
        name: "resume",
        componentType: "file",
        required: true
    },
    {
        name: "name",
        label: "Name",
        placeholder: "Your name",
        type: "text",
        required: true

    },
    {
        name: "currentCompany",
        label: "Current Company",
        placeholder: "Enter Your current Company",
        type: "text",
        required: true

    },
    {
        name: "currentJobLocation",
        label: "Current Job Location",
        placeholder: "Enter Your current Job Location",
        type: "text",
        required: true

    },
    {
        name: "currentSalary",
        label: "Current Salary",
        placeholder: "Enter Your current Salary",
        type: "text",
        required: true

    },
    {
        name: "currentPeriod",
        label: "Current Period",
        placeholder: "Enter Your Notice Period (In Days)",
        type: "text",
        required: true

    },
    {
        name: "preferredJobLocation",
        label: "Preferred Job Location",
        placeholder: "Enter Your Preferred Job Location",
        type: "text",
        required: true

    },
    {
        name: "skills",
        label: "Skills",
        placeholder: "Enter Your Skills",
        type: "text",
        required: true

    },
    {
        name: "previousCompanies",
        label: "Previous Companies",
        placeholder: "Enter Your Previous Companies",
        type: "text",
        required: true

    },
    {
        name: "totalExperience",
        label: "Total Experience",
        placeholder: "Enter Your Total Experience",
        type: "text",
        required: true

    },
    {
        name: "college",
        label: "College",
        placeholder: "Enter Your College Name",
        type: "text",
        required: true

    },
    {
        name: "collegeLocation",
        label: "College Location ",
        placeholder: "Enter Your College Location",
        type: "text",
        required: true

    },
    {
        name: "graduatedYear",
        label: "Graduated Year ",
        placeholder: "Enter Your Graduated Year",
        type: "text",
        required: true

    },
    {
        name: "linkedinProfile",
        label: "Linkedin Profiler ",
        placeholder: "Enter Your Linkedin Profiler URL",
        type: "text",
        required: true

    },
    {
        name: "githubProfile",
        label: "Github Profile",
        placeholder: "Enter Your GitHub Profile",
        type: "text",
        required: true

    },
]

export const initialCandidateFormData = {
    name: "",
    resume: "",
    currentCompany: "",
    currentJobLocation: "",
    preferredJobLocation: "",
    currentSalary: "",
    currentPeriod: "",
    skills: "",
    previousCompanies: "",
    totalExperience: "",
    college: "",
    collegeLocation: "",
    graduatedYear: "",
    linkedinProfile: "",
    githubProfile: "",



}
export const initialCandidateAccountFormData = {
    name: "",

    currentCompany: "",
    currentJobLocation: "",
    preferredJobLocation: "",
    currentSalary: "",
    currentPeriod: "",
    skills: "",
    previousCompanies: "",
    totalExperience: "",
    college: "",
    collegeLocation: "",
    graduatedYear: "",
    linkedinProfile: "",
    githubProfile: "",



}



export const postNewJobFormControls = [
    {
        name: "companyName",
        label: "Company Name",
        placeholder: "Enter Company Name",
        componentType: "text",
        required: true,
        disabled: true
    },

    {
        name: "title",
        label: "Title",
        placeholder: "Enter Title",
        componentType: "text",
        required: true
    },
    {
        name: "type",
        label: "Type",
        placeholder: "Enter Type",
        componentType: "text",
        required: true
    },
    {
        name: "location",
        label: "Location",
        placeholder: "Enter Location",
        componentType: "text",
        required: true
    },
    {
        name: "description",
        label: "Description",
        placeholder: "Enter Description",
        componentType: "text",
        required: true
    },
    {
        name: "experience",
        label: "Experience",
        placeholder: "Enter Experience",
        componentType: "text",
        required: true
    },
    {
        name: "skills",
        label: "Skills",
        placeholder: "Enter Skills",
        componentType: "text",
        required: true
    }
]

export const initialPostNewJobFormData = {
    companyName: "",

    title: "",
    type: "",
    location: "",
    description: "",
    experience: "",
    skills: "",


}

export const filterMenuDataArray = [
    {
        id: "companyName",
        label: "Company Name"
    },
    {
        id: "title",
        label: "Title"
    },
    {
        id: "type",
        label: "Type"
    },
    {
        id: "location",
        label: "Location"
    },
]


export function formUrlQuery({ params, dataToAdd }) {

    let currentURL = qs.parse(params);
    if (Object.keys(dataToAdd).length > 0) {
        Object.keys(dataToAdd).map(key => {
            if (dataToAdd[key].length === 0) delete currentURL[key]
            else currentURL[key] = dataToAdd[key].join(",")
        })
    }
    return qs.stringifyUrl({
        url: window.location.pathname,
        query: currentURL,
    }, {
        skipNulls: true
    })
}


export const memberPlans = [
    {
        heading: "Starter",
        price: 49,
        type: "Basic",
        duration: "Monthly",
        features: [
            "3 Active Projects",
            "5 GB Storage",
            "Email Support",
            "Access to Basic Templates",
            "Analytics Dashboard",
        ],
    },
    {
        heading: "Pro",
        price: 199,
        type: "Professional",
        duration: "Monthly",
        features: [
            "10 Active Projects",
            "50 GB Storage",
            "Priority Email Support",
            "Access to Advanced Templates",
            "Custom Branding",
            "Advanced Analytics & Reports",
            "Team Collaboration (up to 10 members)",
        ],
    },
    {
        heading: "Business",
        price: 499,
        type: "Small Teams",
        duration: "Monthly",
        features: [
            "Unlimited Active Projects",
            "500 GB Storage",
            "Priority Phone & Email Support",
            "Access to Premium Templates",
            "Custom Domain & Branding",
            "Advanced Workflow Automation",
            "Team Collaboration (up to 50 members)",
            "Custom Integrations",
        ],
    },
    {
        heading: "Enterprise",
        price: 999,
        type: "Large Teams",
        duration: "Annually",
        features: [
            "Unlimited Projects",
            "Unlimited Storage",
            "24/7 Dedicated Support",
            "Custom Integrations & API Access",
            "Custom Security Policies",
            "Onboarding & Training",
            "Team Collaboration (unlimited members)",
            "Enterprise SLA",
            "Multi-team Management",
            "Dedicated Account Manager",
        ],
    },
];
