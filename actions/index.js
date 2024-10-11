"use server"

import connectToDb from "@/database"
import Job from "@/models/job";
import Profile from "@/models/profile";
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
export async function fetchJobsForCandidateACtion(id) {

    await connectToDb();

    const jobs = await Job.find({ applicants: { $elemMatch: { userId: id } } });

    return JSON.parse(JSON.stringify(jobs))
}