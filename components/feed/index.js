"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { CirclePlus } from "lucide-react";
import { Input } from "../ui/input";

const Feed = () => {
    const [showPostDialog, setPostDialog] = useState(false);
    const [formData, setFormData] = useState({
        message: "",
        imageURL: "",
    });

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
                                    onChange={(e) =>
                                        setFormData({ ...formData, imageURL: e.target.value })
                                    }
                                    className="hidden"
                                />
                            </Label>

                            {/* Post Button */}
                            <Button
                                className="bg-blue-600 text-white hover:bg-blue-700 transition-all flex-shrink-0"
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
