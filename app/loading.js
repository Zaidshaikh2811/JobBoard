import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="min-h-[630px] h-full w-full bg-zinc-500 mt-5" />
        </div>
    )
}

export default Loading
