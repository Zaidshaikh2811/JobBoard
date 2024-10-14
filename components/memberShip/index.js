"use client";

import { memberPlans } from "@/utils";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { createPriceIdAction, createStripePaymentACtion, UpdateProfileACtion } from "@/actions";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(
    "pk_test_51Q9QmbSB6cFymKAAKFwDZPlaePVjir1YKtDR4RSMS8THmTyv99C3vtQ0tVCSU2xZ1iH0BzFcmltct5UsJEv1bPyn00EgwTUlf4"
);

const MemberShip = ({ profileInfo }) => {

    const pathName = useSearchParams();


    const handlePayment = async (plan) => {
        const stripe = await stripePromise;

        const extractPriceId = await createPriceIdAction({
            amount: Number(plan?.price),
        });

        if (extractPriceId) {
            sessionStorage.setItem("currentPlan", JSON.stringify(plan));
            const result = await createStripePaymentACtion({
                lineItems: [
                    {
                        price: extractPriceId?.id,
                        quantity: 1,
                    },
                ],
            });
            await stripe.redirectToCheckout({
                sessionId: result?.id,
            });
        }
    };
    async function updateProfile() {


        const fetchCurrentPlanFromStorage = JSON.parse(sessionStorage.getItem('currentPlan'))

        await UpdateProfileACtion({
            ...profileInfo,
            isPremiumUser: true,
            memberShipType: fetchCurrentPlanFromStorage?.type,
            memberShipStartDate: new Date().toString(),
            memberShipEndDate: new Date(
                new Date().getFullYear() + fetchCurrentPlanFromStorage?.type == "Starter" ? 1 :
                    fetchCurrentPlanFromStorage?.type == "Pro" ? 2 :
                        fetchCurrentPlanFromStorage?.type == "Business" ? 3 : 4,
                new Date().getMonth(),
                new Date().getDay()
            ).toString(),

        }, '/membership')

    }
    console.log(profileInfo);

    useEffect(() => {
        if (pathName.get("status") === "success") updateProfile();
    }, [pathName, updateProfile])


    return (
        <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-gray-900">Membership Plans</h2>
                <p className="mt-4 text-lg text-gray-600">
                    {
                        profileInfo?.isPremiumUser ? "You Are A Premium User" : "Choose a plan that best fits your needs and upgrade to premium today."
                    }

                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {memberPlans.map((plan, index) => (
                    <div
                        key={index}
                        className="relative p-6 bg-white border border-gray-200 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-900">{plan.heading}</h3>
                            <span
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform ${profileInfo?.memberShipType === plan.type
                                    ? "bg-green-100 text-green-600 border border-green-500 shadow-md"
                                    : "bg-blue-100 text-blue-600 border border-blue-500 shadow-md"
                                    }`}
                            >
                                {profileInfo?.memberShipType === plan.type ? "Activated" : "Upgrade Available"}
                            </span>
                        </div>

                        <div className="mb-4">
                            <p className="text-4xl font-extrabold text-gray-900">
                                {plan.price} <span className="text-xl font-light">Rs</span>
                            </p>
                            <p className="text-sm text-gray-600">Per {plan.duration}</p>
                        </div>
                        <ul className="space-y-2 mb-6 text-sm text-gray-600">
                            {plan?.features?.map((feature, i) => (
                                <li key={i} className="flex items-center">
                                    <svg
                                        className="w-5 h-5 text-green-500 mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Button
                            className={`w-full py-3 font-medium ${profileInfo?.memberShipType === plan.type
                                ? "bg-gray-400 text-gray-700 cursor-not-allowed" // Disabled styling for active plan
                                : "bg-indigo-600 text-white hover:bg-indigo-700"
                                }`}
                            onClick={() => profileInfo?.memberShipType !== plan.type && handlePayment(plan)} // Prevent onClick if the plan is already bought
                            disabled={profileInfo?.memberShipType === plan.type} // Disable the button if the plan is already bought
                        >
                            {profileInfo?.memberShipType === plan.type ? "Current Plan" : "Get Premium"}
                        </Button>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default MemberShip;
