"use server"

import connectToDb from "@/database"
import Application from "@/models/application";
import application from "@/models/application";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { Error } from "mongoose";
import { revalidatePath } from "next/cache";


export async function createProfileAction(formData, pathToRevalidate) {
    await connectToDb();
    await Profile.create(formData);
    revalidatePath(pathToRevalidate);

}


export async function fetchProfileAction(id) {

    await connectToDb();



    const profile = await Profile.findOne({ userId: id });
    return JSON.parse(JSON.stringify(profile))
}



export async function postNewJobAction(formData, pathToRevalidate) {

    await connectToDb();
    await Job.create(formData);

    revalidatePath(pathToRevalidate);
}


export async function fetchJobsForRecruiterAction(id) {

    await connectToDb();

    const jobs = await Job.find({ recruiterId: id });

    return JSON.parse(JSON.stringify(jobs))
}
export async function fetchJobsForCandidateACtion() {

    await connectToDb();

    const jobs = await Job.find({});
    // const jobs = await Job.find({ applicants: { $elemMatch: { userId: id } } });


    return JSON.parse(JSON.stringify(jobs))
}


export async function createJobApplicationAction(data, pathToRevalidate) {

    await connectToDb();
    await application.create(data);
    revalidatePath(pathToRevalidate);
}

export async function fetchJobApplicationsForCandidate() {


    try {
        // Connect to the database
        await connectToDb();

        // Fetch all documents from the 'applications' collection
        const applicationsDoc = await Application.find({});

        // Convert the documents to JSON-friendly format and return them
        return JSON.parse(JSON.stringify(applicationsDoc));

    } catch (error) {
        console.error('Error fetching job applications:', error);
        throw new Error('Failed to fetch job applications');
    }

}

export async function fetchJobApplicationsForRecruiter(recruiterId) {


    try {
        // Connect to the database
        await connectToDb();

        // Fetch all documents from the 'applications' collection
        const applicationsDoc = await Application.find({});


        // Convert the documents to JSON-friendly format and return them
        return JSON.parse(JSON.stringify(applicationsDoc));

    } catch (error) {
        console.error('Error fetching job applications:', error);

    }
}


export async function fetchApplicationCount(jobID) {

    await connectToDb();

    const count = await Application.countDocuments({ jobID: jobID });


    return count
}

export async function getCandidateDetailsById(currentCandidateId) {

    await connectToDb();

    const candidate = await Profile.findOne({ userId: currentCandidateId });

    return JSON.parse(JSON.stringify(candidate))
}