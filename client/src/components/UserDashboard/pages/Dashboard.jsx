"use client"

import { AlertTriangle, CheckSquare, Search, SortAsc, Square, TrendingUp, Clock, MapPin } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useDashboardData } from "../../../hooks/useDashboardData"
import {
  AllEventsSkeleton,
  DashboardStatsSkeleton,
  EventDistributionSkeleton,
} from "../../skeleton/skeleton-cards/DashboardSkeletonCard"
import { useState } from "react"

export default function Dashboard() {
  const { loading, events, stats, eventDistribution } = useDashboardData()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const getFilteredEvents = () => {
    let filtered = events

    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.eventType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    switch (filter) {
      case "upcoming":
        filtered = filtered.filter((event) => !event.completed)
        break
      case "completed":
        filtered = filtered.filter((event) => event.completed)
        break
      case "cancelled":
        filtered = filtered.filter((event) => event.cancelled)
      default:
        break
    }

    switch (sortBy) {
      case "oldest":
        filtered = [...filtered].sort((a, b) => new Date(a.date) - new Date(b.date))
        break
      default: // newest
        filtered = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date))
        break
    }

    return filtered
  }

  const filteredEvents = getFilteredEvents()
  const visibleEvents = filteredEvents.slice(0, 12)
  const upcomingCount = events.filter((event) => !event.completed)
  const completedCount = events.filter((event) => event.completed)

  const filterOptions = [
    { value: "all", label: "All Events", icon: <Square className="w-4 h-4" />, count: events.length },
    { value: "upcoming", label: "Upcoming", icon: <AlertTriangle className="w-4 h-4" />, count: upcomingCount.length },
    { value: "completed", label: "Completed", icon: <CheckSquare className="w-4 h-4" />, count: completedCount.length },
  ]

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
  ]

  return (
    <div className="min-h-screen bg-[#0f1117] text-white">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Dashboard</h1>
            <p className="text-slate-400 text-sm sm:text-base">Track and manage your events efficiently</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-400">
            <Clock className="w-4 h-4" />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
          {loading
            ? Array(5)
              .fill(0)
              .map((_, index) => <DashboardStatsSkeleton key={index} />)
            : stats.map((stat, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 lg:p-6 shadow-lg hover:shadow-xl hover:bg-slate-800/70 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <div
                    className={`p-2.5 lg:p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className={`w-5 h-5 lg:w-6 lg:h-6 ${stat.iconColor}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-lg lg:text-sm text-slate-400 font-medium">{stat.title}</p>
                    <p className="text-lg lg:text-xl xl:text-2xl font-bold text-white truncate">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Analytics + Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Event Analytics */}
          <div className="lg:col-span-2 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 lg:p-6 shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-white text-lg lg:text-xl font-semibold">Event Analytics</h2>
                <p className="text-slate-400 text-sm">Performance overview</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Month", "Quarter", "Year"].map((label, idx) => (
                  <button
                    key={idx}
                    className="text-sm px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-200 border border-slate-700/50 hover:border-slate-600"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-48 lg:h-64 flex items-center justify-center text-slate-500 border border-dashed border-slate-600/50 rounded-lg bg-slate-900/20">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium">Analytics Chart</p>
                  <p className="text-sm text-slate-600">Coming soon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Event Distribution */}
          {loading ? (
            <EventDistributionSkeleton />
          ) : (
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 lg:p-6 shadow-lg">
              <div className="mb-6">
                <h2 className="text-white text-lg lg:text-xl font-semibold">Event Distribution</h2>
                <p className="text-slate-400 text-sm">By category</p>
              </div>
              <div className="space-y-4 lg:space-y-5">
                {eventDistribution.map((item, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between text-sm text-slate-300 mb-2">
                      <span className="font-medium">{item.category}</span>
                      <span className="text-slate-400">{item.percentage}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-700/50 rounded-full overflow-hidden">
                      <div
                        className={`h-2.5 ${item.color} rounded-full transition-all duration-500 ease-out group-hover:brightness-110`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Your Events */}
        {loading ? (
          <AllEventsSkeleton />
        ) : (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-slate-800/20 backdrop-blur-sm rounded-2xl border border-slate-700/30 p-4 lg:p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 min-w-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search events..."
                      className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex bg-slate-700/30 rounded-xl p-1 overflow-x-auto">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFilter(option.value)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${filter === option.value
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-400 hover:text-white hover:bg-slate-600/50"
                        }`}
                    >
                      {option.icon}
                      <span className="hidden sm:inline">{option.label}</span>
                      <span className="bg-slate-600/50 text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                        {option.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Sort Dropdown */}
                <div className="relative min-w-[160px] text-sm">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-4 py-2.5 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 cursor-pointer"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-slate-900 text-white">
                        {option.label}
                      </option>
                    ))}
                  </select>

                  {/* Sort Icon */}
                  <SortAsc className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                </div>

              </div>
            </div>

            {/* Filter Results Info */}
            {(searchTerm || filter !== "all") && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm text-gray-400">
                <span>
                  Showing {filteredEvents.length} of {events.length} events
                  {searchTerm && ` matching "${searchTerm}"`}
                </span>
                {(searchTerm || filter !== "all") && (
                  <button
                    onClick={() => {
                      setSearchTerm("")
                      setFilter("all")
                    }}
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200 cursor-pointer font-medium"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}

            {/* Events Grid */}
            <div>
              {filteredEvents.length === 0 ? (
                <div className="text-center py-12 lg:py-16">
                  <div className="w-16 h-16 bg-slate-700/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckSquare className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-medium text-gray-300 mb-2">
                    {searchTerm
                      ? "No Events found"
                      : filter === "completed"
                        ? "No completed Events"
                        : filter === "upcoming"
                          ? "No upcoming Events"
                          : "No Events yet"}
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    {searchTerm
                      ? "Try adjusting your search terms"
                      : filter === "completed"
                        ? "Complete some events to see them here"
                        : filter === "upcoming"
                          ? "All Events are completed!"
                          : "Add your first Event to get started"}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                  {visibleEvents.map((event, index) => (
                    <div
                      key={index}
                      className="group relative p-4 lg:p-6 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 flex flex-col gap-3 lg:gap-4 shadow-lg hover:shadow-xl hover:bg-slate-900/70 transition-all duration-300 hover:scale-[1.02]"
                    >
                      {/* Date Badge */}
                      <span className="absolute top-4 right-4 bg-slate-700/70 backdrop-blur-sm text-xs px-2.5 py-1 rounded-full text-white font-medium border border-slate-600/50">
                        {new Intl.DateTimeFormat("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }).format(new Date(event.date))}
                      </span>

                      {/* Title */}
                      <h3 className="text-lg lg:text-xl font-semibold text-white line-clamp-2 pr-16 group-hover:text-blue-300 transition-colors duration-200">
                        {event.name}
                      </h3>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
                        <span className="bg-slate-800/50 px-2.5 py-1 rounded-md text-xs font-medium border border-slate-700/50">
                          {event.eventType || "Uncategorized"}
                        </span>
                        <span className="text-slate-600"><MapPin className="h-4 w-4" /></span>
                        <span className="truncate">{event.location || "No location"}</span>
                      </div>

                      {/* Description */}
                      {event.description && (
                        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">{event.description}</p>
                      )}

                      {/* CTA */}
                      <div className="mt-auto pt-2">
                        <button
                          onClick={() => navigate(`/event-profile/${event.id}`)}
                          className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium group-hover:translate-x-1 transform cursor-pointer "
                        >
                          View Details →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* See All Button */}
            {filteredEvents.length > 6 && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => navigate("/event-dashboard")}
                  className="px-6 py-3 lue-500 bg-gradient-to-r from-[#2E3192] to-[] text-sm font-medium text-white rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  See All Events →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
