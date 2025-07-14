import SkeletonCircle from "../SkeletonCircle";
import SkeletonBox from "../SkeletonBox"
import React from "react"
import clsx from "clsx"

export function DashboardStatsSkeleton(){
    return(
         <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 animate-pulse">
      <div className="flex items-center space-x-4">
        <SkeletonCircle />
        <div className="space-y-2">
          <SkeletonBox className="w-24 h-4" />
          <SkeletonBox className="w-16 h-6" />
        </div>
      </div>
    </div>
    )
}

export function EventDistributionSkeleton({ count = 4 }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 animate-pulse">
      <div className="h-6 bg-slate-700 rounded w-40 mb-6" /> {/* Title placeholder */}

      <div className="space-y-5">
        {Array(count)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="space-y-2">
              {/* Label and percentage line */}
              <div className="flex justify-between text-sm text-slate-300">
                <div className="h-4 bg-slate-700 rounded w-24" />
                <div className="h-4 bg-slate-700 rounded w-10" />
              </div>
              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-2 bg-slate-600 w-1/2 rounded-full" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}


export function AllEventsSkeleton({ count = 6 }) {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Search + Filters + Sort Bar */}
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Skeleton */}
          <div className="flex-1">
            <div className="h-10 bg-slate-700/50 rounded-xl" />
          </div>

          {/* Filter Tabs Skeleton */}
          <div className="flex gap-2 rounded-xl p-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-24 h-8 bg-slate-700/50 rounded-lg" />
            ))}
          </div>

          {/* Sort Dropdown Skeleton */}
          <div className="w-40 h-10 bg-slate-700/50 rounded-xl" />
        </div>
      </div>

      {/* Events Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="relative p-4 rounded-xl bg-slate-900 border border-slate-700 flex flex-col gap-3 shadow"
          >
            {/* Date Badge */}
            <span className="absolute top-4 right-4 w-20 h-6 bg-slate-700/50 rounded-full" />

            {/* Title */}
            <div className="w-2/4 h-5 bg-slate-700/50 rounded" />

            {/* Meta Info */}
            <div className="flex gap-2">
              <div className="w-20 h-4 bg-slate-700/50 rounded" />
              <div className="w-16 h-4 bg-slate-700/50 rounded" />
            </div>

            {/* CTA */}
            <div className="mt-auto w-24 h-4 bg-slate-700/50 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}
