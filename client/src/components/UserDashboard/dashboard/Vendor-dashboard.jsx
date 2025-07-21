"use client"

import { useState } from "react"
import CreateVendor from "../pop-ups/CreateVendor"
import { useEffect } from "react"
import axios from "axios"
import {
  Users, CheckCircle, AlertTriangle, SortAsc, Square, Clock, Flag, Search, Eye, Edit, Ban, Plus, X, Star, Phone, Mail, File, Upload, ChevronDown,
  CheckSquare,
  ChevronUp,
  Tags,
  MapPin
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom"
import Topbar from "../../ui/Topbar"
import Sidebar from "../pages/Sidebar"
import { AllEventsSkeleton } from "../../skeleton/skeleton-cards/DashboardSkeletonCard"
export const Icons = {
  Users, CheckCircle, Clock, Flag, Search, Eye, Edit, Ban, Plus, X, Star, Phone, Mail, File, Upload, ChevronDown,
};
import { Listbox } from '@headlessui/react'
import SimpleUpwardDropdown from "../../ui/SimpleUpwardDropdown"


export default function VendorsDashboard() {

  const [loading, setLoading] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState(null)
  const [activeTab, setActiveTab] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showAddVendor, setShowAddVendor] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [stats, setStats] = useState([]);
  const [vendors, setVendors] = useState([]);
  const { id } = useParams();
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const options = ['Follow-up', 'High Priority', 'General'];
  const [selected, setSelected] = useState(options[0]);

  // const vendors = [
  //   {
  //     id: 3,
  //     name: "Bloom Floral Design",
  //     category: "Decoration",
  //     contact: "Emma Davis",
  //     email: "emma@bloomfloral.com",
  //     phone: "+1 (555) 456-7890",
  //     status: "active",
  //     rating: 4.9,
  //     services: ["Floral Arrangements", "Event Decoration", "Wedding Decor"],
  //     recentEvents: ["Spring Wedding", "Corporate Event"],
  //     documents: [{ name: "Portfolio.pdf", type: "PDF", size: "5.1 MB", date: "2024-01-20" }],
  //   },
  // ]

  const communications = [
    {
      id: 1,
      type: "email",
      subject: "Contract Renewal Discussion",
      timestamp: "2 hours ago",
      vendor: "Elite Catering Co.",
    },
    {
      id: 2,
      type: "call",
      subject: "Equipment Setup Meeting",
      timestamp: "1 day ago",
      vendor: "Sound & Vision AV",
    },
    {
      id: 3,
      type: "message",
      subject: "Quote Request Follow-up",
      timestamp: "3 days ago",
      vendor: "Bloom Floral Design",
    },
  ]

  const internalNotes = [
    {
      id: 1,
      content: "Excellent service quality. Recommended for high-profile events.",
      timestamp: "2024-02-28",
      tag: "High Priority",
      author: "John Doe",
    },
    {
      id: 2,
      content: "Need to follow up on insurance documentation.",
      timestamp: "2024-02-25",
      tag: "Follow-up",
      author: "Jane Smith",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "flagged":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icons.Star key={i} className="text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<Icons.Star key="half" className="text-yellow-400 opacity-50" />)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icons.Star key={`empty-${i}`} className="text-gray-600" />)
    }

    return stars
  }

  const getFilteredVendors = () => {
    let filtered = vendors

    if (searchTerm) {
      filtered = filtered.filter(
        (vendor) =>
          vendor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vendor.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vendor.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vendor.location?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    switch (filter) {
      case "Active":
        filtered = filtered.filter((vendor) => !vendor.Active)
        break
      case "Pending":
        filtered = filtered.filter((vendor) => vendor.Pending)
        break
      case "Flagged":
        filtered = filtered.filter((vendor) => vendor.Flagged)
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
  const filteredVendors = getFilteredVendors()
  const visibleVendors = filteredVendors.slice(0, 6)
  const flaggedCount = vendors.filter((vendor) => vendor.Flagged)
  const activeCount = vendors.filter((vendor) => vendor.Active)
  const pendingCount = vendors.filter((vendor) => vendor.Pending)

  const filterOptions = [
    { value: "all", label: "All Vendors", icon: <Square className="w-4 h-4" />, count: vendors.length },
    { value: "Active", label: "Active", icon: <Users className="w-4 h-4" />, count: vendors.length },
    { value: "Pending", label: "Pending", icon: <AlertTriangle className="w-4 h-4" />, count: pendingCount.length },
    { value: "Flagged", label: "Flagged", icon: <Flag className="w-4 h-4" />, count: flaggedCount.length },
  ]



  // stats

  //get all vendors
  useEffect(() => {
    const filteredVendors = async () => {
      const token = localStorage.getItem('token');
      if (!token) return console.error('No token found');
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/vendors/get-all-vendors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setVendors(response.data || []);
      } catch (error) {
        console.error("Failed to load clients", error);
      } finally {
        setLoading(false)
      }
    };

    filteredVendors();
  }, []);

  //stats
  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      if (!token) return console.error('No token found');

      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/vendors/get-stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        setStats([
          { title: "Total Vendors", value: data.totalVendors, icon: Icons.Users, color: "text-blue-400", bg: "bg-blue-400/10" },
          { title: "Active Vendors", value: data.activeVendors, icon: Icons.CheckCircle, color: "text-green-400", bg: "bg-green-400/10" },
          { title: "Pending Vendors", value: data.pendingVendors, icon: Icons.Clock, color: "text-yellow-400", bg: "bg-yellow-400/10" },
          { title: "Flagged Vendors", value: data.flaggedVendors, icon: Icons.Flag, color: "text-red-400", bg: "bg-red-400/10" },
        ]);
      } catch (error) {
        console.error('Error fetching vendor stats:', error);
      } finally {
        setLoading(false)
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-[#0d1117] text-white">
      <div className="sticky top-0 z-40 bg-[#0d1117] border-b border-gray-800">
        <Topbar />
      </div>
      <div className=" flex flex-1 overflow-hidden">
        <div className="flex-shrink-0">
          <Sidebar onToggle={(visible) => setSidebarVisible(visible)} />
        </div>
        {/* Header */}
        <div className={`flex-1 overflow-auto transition-all duration-300  ${sidebarVisible ? "lg:ml-64" : "lg:ml-16"}`}>
          <div className="bg-[#0f1117]  px-4 py-4 md:px-6 md:py-4">
            <div className="flex flex-wrap justify-between items-center gap-y-3"> {/* Changed from flex-col sm:flex-row */}
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-white">Vendors Dashboard</h1>
                <p className="text-slate-400 text-sm sm:text-base mt-1">Manage your vendor relationships</p>
              </div>
              <button
                onClick={() => setIsPopupOpen(true)}
                className="bg-gradient-to-r from-[#2E3192] to-[] hover:from-[#2E3192] hover:to-[] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg flex items-center space-x-2 text-sm sm:text-base transition-colors cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" /> {/* Adjust icon size */}
                <span>Add Vendor</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Vendor Overview Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 md:mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-slate-800/50 rounded-lg p-4 sm:p-6 border border-slate-700/50"> {/* Adjusted padding */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-xs sm:text-sm">{stat.title}</p> {/* Adjusted title font size */}
                      <p className="text-xl sm:text-2xl font-bold text-white mt-1">{stat.value}</p> {/* Adjusted value font size */}
                    </div>
                    <div className={`p-2 sm:p-3 rounded-lg ${stat.bg}`}> {/* Adjusted icon container padding */}
                      <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} /> {/* Adjusted icon size */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Main Content */}
              <div className={`${selectedVendor ? "lg:col-span-2" : "lg:col-span-3"} space-y-6`}>
                {/* Vendor List Table */}
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


                      </div>
                    </div>

                    {/* Filter Results Info */}
                    {(searchTerm || filter !== "all") && (
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm text-gray-400">
                        <span>
                          Showing {filteredVendors.length} of {vendors.length} events
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
                      {filteredVendors.length === 0 ? (
                        <div className="text-center py-12 lg:py-16">
                          <div className="w-16 h-16 bg-slate-700/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckSquare className="w-8 h-8 text-gray-400" />
                          </div>
                          <h3 className="text-lg lg:text-xl font-medium text-gray-300 mb-2">
                            {searchTerm
                              ? "No Vendors found"
                              : filter === "Flagged"
                                ? "No flagged Vendors"
                                : filter === "Pending"
                                  ? "No pending Vendors"
                                  : "No Vendors yet"}
                          </h3>
                          <p className="text-gray-500 max-w-md mx-auto">
                            {searchTerm
                              ? "Try adjusting your search terms"
                              : filter === "completed"
                                ? "Complete some events to see them here"
                                : filter === "upcoming"
                                  ? "All Events are completed!"
                                  : "Add your first Vendor to get started"}
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                          {visibleVendors.map((vendor, index) => (
                            <div
                              key={index}
                              className="group relative p-4 lg:p-6 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 flex flex-col gap-3 lg:gap-4 shadow-lg hover:shadow-xl hover:bg-slate-900/70 transition-all duration-300 hover:scale-[1.02]"
                            >


                              {/* Title */}
                              <h3 className="text-lg lg:text-xl font-semibold text-white line-clamp-2 pr-16 group-hover:text-blue-300 transition-colors duration-200">
                                {vendor.name}
                              </h3>

                              {/* Meta Info */}
                              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
                                <span className="bg-slate-800/50 px-2.5 py-1 rounded-md text-xs font-medium border border-slate-700/50">
                                  {vendor.category || "Uncategorized"}
                                </span>
                                <span className="text-slate-600"><MapPin className=" w-5 h-5" /></span>
                                <span className="truncate">
                                  {vendor.address?.city && vendor.address?.country
                                    ? `${vendor.address.city}, ${vendor.address.country}`
                                    : "No location"}
                                </span>
                              </div>

                              {/* Description */}
                              {vendor.description && (
                                <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">{event.description}</p>
                              )}

                              {/* CTA */}
                              <div className="mt-auto pt-2">
                                <button
                                  onClick={() => navigate(`/vendor-profile/${vendor.id}`)}
                                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium group-hover:translate-x-1 transform cursor-pointer"
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
                    {filteredVendors.length > 6 && (
                      <div className="flex justify-center mt-8">
                        <button
                          onClick={() => navigate("/event-dashboard")}
                          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border border-slate-600/50 text-sm font-medium text-white rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          See All Events →
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Communication Log */}
                <div className="bg-[#0f1117] rounded-lg ">
                  <div className="p-6 border-b border-slate-700">
                    <h2 className="text-xl font-semibold text-white">Communication Log</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {communications.map((comm) => (
                        <div key={comm.id} className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-lg">
                          <div
                            className={`p-2 rounded-lg ${comm.type === "email"
                              ? "bg-blue-500/20"
                              : comm.type === "call"
                                ? "bg-green-500/20"
                                : "bg-purple-500/20"
                              }`}
                          >
                            {comm.type === "email" ? (
                              <Icons.Mail className="text-blue-400" />
                            ) : comm.type === "call" ? (
                              <Icons.Phone className="text-green-400" />
                            ) : (
                              <Icons.Mail className="text-purple-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-white">{comm.subject}</p>
                            <p className="text-sm text-slate-400">
                              {comm.vendor} • {comm.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Internal Notes Panel */}
                <div className="bg-[#0f1117] rounded-lg ">
                  <div className="p-5 border-b border-slate-700">
                    <h2 className="text-xl font-semibold text-white">Internal Notes</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4 mb-6">
                      {internalNotes.map((note) => (
                        <div key={note.id} className="p-3 bg-slate-700/30 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${note.tag === "High Priority"
                                ? "bg-red-500/20 text-red-300"
                                : "bg-yellow-500/20 text-yellow-300"
                                }`}
                            >
                              {note.tag}
                            </span>
                            <span className="text-xs text-slate-400">{note.timestamp}</span>
                          </div>
                          <p className="text-slate-300 mb-2">{note.content}</p>
                          <p className="text-xs text-slate-500">by {note.author}</p>
                        </div>
                      ))}
                    </div>

                    {/* Add Note */}
                    <div className="space-y-3">
                      <textarea
                        placeholder="Add internal note..."
                        className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        rows="3"
                      />
                      <div className="flex justify-between items-center">
                        <div className="relative w-max">
                        <SimpleUpwardDropdown/>
                        </div>
                        <button className="bg-gradient-to-r from-[#2E3192] to-[] hover:from-[#2E3192] hover:to-[] text-white px-4 py-2 rounded-lg transition-colors">
                          Add Note
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateVendor isOpen={isPopupOpen} onClose={() => { setIsPopupOpen(false) }} />
    </div>
  )
}
