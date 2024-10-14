"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { CirclePlus, Heart } from "lucide-react";
import { Input } from "../ui/input";
import { createClient } from "@supabase/supabase-js";
import { createFeedPostAction, updateFeedPostAction } from "@/actions";
import Image from "next/image";

console.log(process.env.SUPABASE_URL);

const supabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY

)

const Feed = ({ user, profileInfo, allFeedPost }) => {


    const [imageData, setImageData] = useState(null)
    const [showPostDialog, setPostDialog] = useState(false);
    const [formData, setFormData] = useState({
        message: "",
        imageURL: "",
    });


    const handleFileChange = async (e) => {
        e.preventDefault()
        console.log("handleFileChange");

        const file = e.target.files[0]

        if (file) {
            // const base64 = await convertBase64(file)
            // setFormData({ ...formData, imageURL: base64 })
            setImageData(file)

        }

    }

    function handleFetchImagePublicUrl(getData) {
        console.log(getData);

        const { data } = supabaseClient.storage.from('job-board-public').getPublicUrl(getData.path)

        console.log("handleFetchImagePublicUrl");
        console.log(data);
        if (data) {


            setFormData({
                ...formData,
                imageURL: data.publicUrl
            })
        }
    }

    async function handleUploadImageToSupabase() {


        const { data, error } = await supabaseClient.storage.from(

            "job-board-public"

        ).upload(`/public/${imageData?.name}`, imageData, {

            cacheControl: "3600",

            upsert: false,
        })

        console.log(data, error);
        if (data) {
            handleFetchImagePublicUrl(data)



        }





    }

    async function handleSaveFeedPost() {
        await createFeedPostAction({
            userId: user?.id,
            userName: profileInfo?.candidateInfo?.name || profileInfo?.recruiterInfo?.name,
            message: formData?.message,
            image: formData?.imageURL,
            likes: [

            ]
        }, "/feed")
        setPostDialog(false);
        setFormData({
            message: "",
            imageURL: "",
        })
    }

    useEffect(() => {
        if (imageData) {
            handleUploadImageToSupabase()
        }
    }, [imageData])


    async function handleUpdateFeedPostLikes(getCurrentFeedPost) {
        let cpyLikes = [...getCurrentFeedPost.likes]
        const index = cpyLikes.findIndex(item => item.reactorUserId == user?.id)

        if (index == -1) {

            cpyLikes.push({
                reactorUserId: user?.id,
                reactorUserName: profileInfo?.candidateInfo?.name || profileInfo?.recruiterInfo?.name
            })
        }
        else {

            cpyLikes.splice(index, 1)
        }
        getCurrentFeedPost.likes = cpyLikes
        await updateFeedPostAction(getCurrentFeedPost, "/feed")


    }


    return (
        <>
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                {/* Page Header */}
                <div className="flex items-center justify-between border-b pb-6 pt-24">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                        Explore Feed
                    </h1>
                    <Button
                        className="bg-blue-600 text-white hover:bg-blue-700 transition-all"
                        onClick={() => setPostDialog(true)}
                    >
                        Add New Post
                    </Button>
                </div>
                <div className="py-12">
                    <div className="container mx-auto p-0 flex flex-col gap-8 text-gray-700">
                        {allFeedPost && allFeedPost.length > 0 ? (
                            allFeedPost.map((post, index) => (
                                <div
                                    key={post._id}
                                    className="group relative p-6 rounded-xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
                                >
                                    {/* User Info */}
                                    <div className="flex items-center gap-4">
                                        <div className="flex-shrink-0">
                                            <Image
                                                src={post?.profilePicture || "/default-avatar.png"} // Default image if no profile picture
                                                alt={`${post?.userName}'s profile picture`}
                                                className="rounded-full object-cover"
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {post?.userName}
                                            </h3>
                                            <p className="text-sm text-gray-500">{new Date(post?.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>

                                    {/* Post Content */}
                                    <div className="mt-4 space-y-4">
                                        {post?.message && (
                                            <p className="text-base text-gray-700 break-words leading-relaxed">
                                                {post?.message}
                                            </p>
                                        )}

                                        {post?.image && (
                                            <div className="w-full overflow-hidden rounded-lg">
                                                <img
                                                    src={post?.image}
                                                    alt="User post image"
                                                    className="w-full h-auto object-cover"

                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Like & Comment Section */}
                                    <div className="mt-6 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            {/* Like Button */}
                                            <button className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors duration-200">
                                                <Heart
                                                    strokeWidth={1.5}
                                                    onClick={() => handleUpdateFeedPostLikes(post)}
                                                    size={24}
                                                    fill={post?.likes?.length > 0 ? "#FF0000" : "none"}
                                                    className="hover:scale-110 transition-transform"
                                                />
                                                <span className="text-sm">{post?.likes?.length}</span>
                                            </button>
                                        </div>

                                        {/* Comment Button */}
                                        <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-all">
                                            Comment
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No Posts</p>
                        )}
                    </div>
                </div>

                {/* Post Dialog */}
                <Dialog open={showPostDialog} onOpenChange={() => {
                    setPostDialog(false)
                    setFormData({
                        message: "",
                        imageURL: "",
                    })
                }}>
                    <DialogContent className="max-w-lg mx-auto p-6 space-y-2 ">
                        {/* Textarea for the Post Message */}
                        <Textarea
                            name="message"
                            value={formData.message}
                            onChange={(e) =>
                                setFormData({ ...formData, message: e.target.value })
                            }
                            placeholder="What's on your mind?"
                            className="mt-8 w-full bg-gray-100 border-none rounded-md p-3 focus:outline-none focus-visible:ring-0 focus:ring-2 focus:ring-blue-500 text-[30px] h-[200px]"
                        />

                        {/* Image Upload */}
                        <div className="flex items-center justify-between gap-5">
                            <Label className="flex items-center cursor-pointer space-x-2 text-gray-700">
                                <CirclePlus className="w-6 h-6" />
                                <span className="text-sm">Attach Image</span>
                                <Input
                                    type="file"
                                    name="imageURL"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </Label>

                            {/* Post Button */}
                            <Button
                                onClick={handleSaveFeedPost}
                                disabled={formData?.imageURL === '' && formData?.message === ''}
                                className="disabled:opacity-65 bg-blue-600 text-white hover:bg-blue-700 transition-all flex-shrink-0"
                            >
                                Post
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
};

export default Feed;
