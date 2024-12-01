"use server"

import connectToDb from "@/database"
import Application from "@/models/application";
import application from "@/models/application";
import Feed from "@/models/feed";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { Error } from "mongoose";
import { revalidatePath } from "next/cache";
const stripe = require("stripe")("sk_test_51Q9QmbSB6cFymKAAAuxQ3LYBjtDZvItGHanNCnOmbFtmzhAM7KeHaJ8ORbeX4yeXCBWOSrwSrlXEHtjcrO8NQlAv00WfrVlyeG")


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
export async function fetchJobsForCandidateACtion(filterParams = {}) {

    await connectToDb();
    let updatedParams = {};

    Object.keys(filterParams).forEach((filterKey) => {
        updatedParams[filterKey] = { $in: filterParams[filterKey].split(",") };
    });

    const jobs = await Job.find(Object.keys(updatedParams).length > 0 ? updatedParams : {});



    return JSON.parse(JSON.stringify(jobs))
}




export async function createJobApplicationAction(data, pathToRevalidate) {

    await connectToDb();
    await application.create(data);
    revalidatePath(pathToRevalidate);
}

export async function fetchJobApplicationsForCandidate(userId) {


    try {
        // Connect to the database
        await connectToDb();

        // Fetch all documents from the 'applications' collection
        const applicationsDoc = await Application.find({

            candidateUserId: userId
        });

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


export async function updateJobApplicationAction(data, pathToRevalidate) {
    try {

        const {
            _id,
            recruiterUserID,
            name,
            email,
            candidateUserId,
            status,
            jobID,
            jobAppliedDate,
        } = data

        await connectToDb();

        await Application.updateOne(
            { _id: _id },
            {
                $set: {
                    recruiterUserID: recruiterUserID,
                    name: name,
                    email: email,
                    candidateUserId: candidateUserId,
                    status: status,
                    jobID: jobID,
                    jobAppliedDate: jobAppliedDate
                }
            },
            { new: true }
        )

        revalidatePath(pathToRevalidate);
        return true

    } catch (error) {
        console.log(error);

    }
}



export async function createFilterCategoryAction() {
    try {

        // const filterCategory = await Job.aggregate([
        //     { $group: { _id: "$category", count: { $sum: 1 } } },
        //     { $sort: { count: -1 } },
        // ]);
        const filterCategory = await Job.find({});

        return JSON.parse(JSON.stringify(filterCategory))

    } catch (err) {
        console.log(err);

    }
}



export async function UpdateProfileACtion(data, pathTorevalidate) {
    try {


        await connectToDb();
        const { userId, role, email, isPremiumUser, memberShipStartDate,
            memberShipEndDate, memberShipType, recruiterInfo, candidateInfo, _id } = data


        await Profile.updateOne({ _id: _id },
            {
                $set: {
                    userId: userId,
                    role: role,
                    email: email,
                    isPremiumUser: isPremiumUser,
                    memberShipStartDate: memberShipStartDate,
                    memberShipEndDate: memberShipEndDate,
                    memberShipType: memberShipType,
                    recruiterInfo: recruiterInfo,
                    candidateInfo: candidateInfo
                }
            },
            { new: true }
        )


        revalidatePath(pathTorevalidate);
        return { message: "Profile updated successfully" }




    } catch (error) {
        console.log(error);
    }
}



export async function createPriceIdAction(data) {
    console.log(data);



    const session = await stripe.prices.create({
        currency: 'inr',
        unit_amount: data?.amount * 100,
        recurring: {
            interval: 'year'
        },
        product_data: {
            name: "Premium Plan"
        }
    })

    return {
        success: true,
        id: session?.id
    }
}


export async function createStripePaymentACtion(data) {

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: data?.lineItems,
        mode: "subscription",
        success_url: `${process.env.WEB_URL}/membership` + "?status=success",
        cancel_url: `${process.env.WEB_URL}/membership` + "?status=cancel"

    })

    return {
        success: true,
        id: session?.id

    }

}



export async function createFeedPostAction(data, pathToRevalidate) {
    try {


        await connectToDb();

        await Feed.create(data);

        revalidatePath(pathToRevalidate);
    }
    catch (error) {
        console.log(error);

    }



}

export async function fetchAllFeedPostAction() {
    try {


        await connectToDb();

        const feed = await Feed.find({});

        return JSON.parse(JSON.stringify(feed))
    }
    catch (error) {
        console.log(error);

    }



}

export async function updateFeedPostAction(data, pathToRevalidate) {
    try {


        await connectToDb();
        const {
            userId,
            userName,
            message,
            image,
            likes,
            _id
        } = data
        await Feed.updateOne(
            { _id: _id },
            {
                $set: {
                    userId: userId,
                    userName: userName,
                    message: message,
                    image: image,
                    likes: likes
                }
            },
            { new: true }
        )

        revalidatePath(pathToRevalidate);
        return true
    }
    catch (error) {
        console.log(error);

    }



}