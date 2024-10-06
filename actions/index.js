"use server"

import connectToDb from "@/database"
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";


export async function createProfile(formData, pathToRevalidate) {
    await connectToDb();
    await Profile.create(formData);
    revalidatePath(pathToRevalidate);

}


export async function fetchProfileAction(id) {

    await connectToDb();

    const profile = await Profile.findOne({ userId: id });
    return JSON.parse(JSON.stringify(profile))
}