import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {


    // <div className="flex flex-col space-y-3">
    //     <Skeleton className="min-h-[630px] h-full w-full bg-zinc-500 mt-5" />
    // </div>


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-zinc-800 bg-opacity-50 backdrop-blur-sm z-50">
            <div className="loader"></div>
        </div>

    )
}

export default Loading

