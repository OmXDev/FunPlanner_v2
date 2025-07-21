"use client"

import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import {
  ArrowLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Users,
  Clock,
  DollarSign,
  User,
  Mail,
  Phone,
  Building,
  Tag,
  FileText,
  ImageIcon,
  Download,
  CheckCircle,
  AlertCircle,
  XCircle,
  Camera,
  Music,
  Utensils,
  Truck,
  Lightbulb,
  Mic,
  Shield,
  Heart,
  PencilLine,
  UserRoundPlus,
  UserCheck,
  FileDown,
} from "lucide-react"
import { useEffect, useState } from "react"
import AssignVendor from "../pop-ups/AssignVendor"

// This component fetches data for a single event using eventId
export default function EventProfile({ onBack }) {

  const [assignVendor, setAssignVendor] = useState(false)
  const [client, setClient] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  // Initialize event state with default values
  // This ensures that the component can render without crashing if data is not yet available
  const [event, setEvent] = useState({
    name: "",
    description: "",
    type: "",
    status: "",
    date: "",
    endDate: "",
    clientId: null,
    time: "",
    endTime: "",
    venue: "",
    address: "",
    capacity: 0,
    registeredAttendees: 0,
    budget: 0,
    spent: 0,
    tags: [],
    vendors: [],
    timeline: [],
    documents: [],
    tasks: [],
  })
  const { id } = useParams();

  //get event data from the server
  useEffect(() => {
    const fetchEvent = async () => {
      const token = localStorage.getItem("token");
      if (!token) return console.error("No token found");

      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/events/event-stats/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.data || !res.data.name) {
          console.warn("Event data is missing or malformed:", res.data);
        }
        setEvent(res.data);
        console.log(res.data.clientId)
        //   setLoading(false);
      } catch (err) {
        console.error("Failed to load Event", err);
        // setLoading(false);
      }
    };

    fetchEvent();
  }, []);


  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "ongoing":
        return "bg-green-100 text-green-800 border-green-200"
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      case "postponed":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Get vendor status color
  const getVendorStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get timeline status icon
  const getTimelineStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "upcoming":
        return <Clock className="w-5 h-5 text-blue-500" />
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  // Get task priority color
  const getTaskPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get file icon based on type
  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case "pdf":
      case "doc":
      case "docx":
        return <FileText className="w-5 h-5 text-red-500" />
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <ImageIcon className="w-5 h-5 text-blue-500" />
      case "zip":
      case "rar":
        return <Download className="w-5 h-5 text-purple-500" />
      default:
        return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  // Get service icon
  const getServiceIcon = (service) => {
    switch (service.toLowerCase()) {
      case "catering":
        return <Utensils className="w-5 h-5 text-orange-500" />
      case "audio/visual":
        return <Mic className="w-5 h-5 text-purple-500" />
      case "decoration":
        return <Heart className="w-5 h-5 text-pink-500" />
      case "security":
        return <Shield className="w-5 h-5 text-blue-500" />
      case "transportation":
        return <Truck className="w-5 h-5 text-green-500" />
      case "photography":
        return <Camera className="w-5 h-5 text-indigo-500" />
      case "entertainment":
        return <Music className="w-5 h-5 text-red-500" />
      case "lighting":
        return <Lightbulb className="w-5 h-5 text-yellow-500" />
      default:
        return <Tag className="w-5 h-5 text-gray-500" />
    }
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount)
  }

  // Calculate days until event
  const getDaysUntilEvent = () => {
    const eventDate = new Date(event.date)
    const today = new Date()
    const diffTime = eventDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="min-h-screen bg-[#0d1117] p-6">
      {/* Sticky Header */}
      <div className="top-0 z-10">
        <div className="flex items-center justify-between py-3 sm:h-16">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 lg:ml-6 text-sm overflow-hidden">
            <button
              onClick={() => navigate(-1)}
              className=" flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span className=" sm:inline">Back to Events</span>
            </button>

            <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-400">
              <span>Events</span>
              <ChevronRight className="w-4 h-4" />
              <span className=" text-white font-medium">{event.name}</span>
            </div>
          </div>

          {/* Event Name and Status (Mobile) */}
          <div className="flex items-center space-x-3 sm:hidden">
            <span className="hidden sm:flex font-semibold text-white truncate">{event.name}</span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(event.status)}`}>
              {event.status}
            </span>
          </div>

          {/* Desktop Status */}
          <div className="hidden sm:flex items-center space-x-4">
            {event.status === "upcoming" && (
              <div className="text-sm text-slate-300">
                <span className="font-medium">{getDaysUntilEvent()}</span> days until event
              </div>
            )}
            <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(event.status)}`}>
              {event.status}
            </span>
          </div>

        </div>
      </div>

      <div className=" max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Section: Heading */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-200">Event Profile</h1>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Manage event information
            </p>
          </div>

          {/* Right Section: Actions */}
          <div className="flex flex-wrap gap-3">

            <button className=" text-slate-300 bg-gradient-to-r from-[#2E3192] to-[] hover:opacity-90 px-4 py-2 rounded inline-flex items-center cursor-pointer">
              <UserCheck className="w-4 h-4 mr-2" />
              Assign Manager
            </button>

            <button className="border border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent px-4 py-2 rounded inline-flex items-center cursor-pointer">
              <FileDown className="w-4 h-4 mr-2" />
              Export Info
            </button>
          </div>
        </div>

        
          {/* Event Header */}
          <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-6 mb-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              {/* Left Side - Event Info */}
              <div className="flex-1 mb-6 lg:mb-0">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#2E3192] to-[] rounded-lg flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1 className="text-2xl font-bold text-white mb-2">{event.name}</h1>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {event.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full border border-blue-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-slate-300 leading-relaxed mb-6">{event.description}</p>

                {/* Event Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-white">
                        {formatDate(event.date)}
                        {event.endDate && event.endDate !== event.date && ` - ${formatDate(event.endDate)}`}
                      </p>
                      <p className="text-xs text-slate-400">
                        {event.time}
                        {event.endTime && ` - ${event.endTime}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-white">{event.venue}</p>
                      <p className="text-xs text-slate-400">{event.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-white">
                        {event.registeredAttendees} / {event.capacity}
                      </p>
                      <p className="text-xs text-slate-400">Registered / Capacity</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-white">{formatCurrency(event.budget)}</p>
                      <p className="text-xs text-slate-400">Total Budget</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Tag className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-white">{event.type}</p>
                      <p className="text-xs text-slate-400">Event Type</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Building className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-white">{event.clientId?.name}</p>
                      <p className="text-xs text-slate-400">Client</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Budget Overview */}
              <div className="lg:ml-8 lg:flex-shrink-0">
                <div className="bg-slate-700/50 rounded-lg p-4 w-full lg:w-64">
                  <h3 className="font-semibold text-white mb-4">Budget Overview</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Total Budget</span>
                      <span className="text-sm font-medium text-white">{formatCurrency(event.budget)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Spent</span>
                      <span className="text-sm font-medium text-white">{formatCurrency(event.spent)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Remaining</span>
                      <span className="text-sm font-medium text-green-600">
                        {formatCurrency(event.budget - event.spent)}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(event.spent / event.budget) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-400 text-center">
                      {Math.round((event.spent / event.budget) * 100)}% of budget used
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Contact Information */}
            <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-white mb-4">Contact Information</h2>
              {event.clientId ? (
                <div className="space-y-6">
                  {/* Organizer */}
                  <div>
                    <h3 className="font-medium text-white mb-3">Event Organizer</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <User className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-300">{event.clientId?.name}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-300">{event.clientId?.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-300">{event.clientId?.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Building className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-300">{event.clientId?.organizationName}</span>
                      </div>
                    </div>

                  </div>

                </div>
              ) : (
                <p className="text-sm text-slate-400 italic">Organizer information not available.</p>
              )}
            </div>

            {/* Vendors */}
            <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-4 sm:p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <h2 className="text-xl font-semibold text-white mb-2 sm:mb-0">Vendors</h2>
                <button
                  onClick={() => setAssignVendor(true)}
                  className="flex items-center  text-slate-300 hover:bg-slate-700/50 bg-transparent px-3 py-1.5 rounded text-sm cursor-pointer"
                >
                  <UserRoundPlus className="w-4 h-4 mr-2" />
                  Assign Vendor
                </button>
              </div>

              {event.vendors && event.vendors.length > 0 ? (
                <div className="space-y-4">
                  {event.vendors.map((vendor) => (
                    <div key={vendor.id} className="border border-slate-700/50 rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 space-y-2 sm:space-y-0">
                        <div className="flex items-center space-x-3">
                          {getServiceIcon(vendor.service)}
                          <div>
                            <h3 className="font-medium text-white">{vendor.name}</h3>
                            <p className="text-sm text-slate-300">{vendor.service}</p>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full self-start sm:self-center ${getVendorStatusColor(vendor.status)}`}
                        >
                          {vendor.status}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-slate-300 space-y-2 sm:space-y-0">
                        <span>Contact: {vendor.contact}</span>
                        <span className="font-medium">{formatCurrency(vendor.cost)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-5 h-5 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-400">No vendors assigned</p>
                </div>
              )}
            </div>

          </div>

          {/* Timeline */}
          <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-4 sm:p-6 shadow-sm mb-6 sm:mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Event Timeline</h2>

            {event.timeline && event.timeline.length > 0 ? (
              <div className="space-y-4">
                {event.timeline.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
                    <div className="flex-shrink-0 mb-2 sm:mb-0 mt-1">{getTimelineStatusIcon(item.status)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                        <h3 className="font-medium text-white">{item.title}</h3>
                        <span className="text-sm text-slate-400 mt-1 sm:mt-0">
                          {formatDate(item.date)} at {item.time}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="w-5 h-5 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-400">No timeline items</p>
              </div>
            )}
          </div>


          {/* Tasks and Documents Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Tasks */}
            <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-4 sm:p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-white mb-4">Tasks</h2>
              {event.tasks && event.tasks.length > 0 ? (
                <div className="space-y-4">
                  {event.tasks.map((task) => (
                    <div key={task.id} className="border border-slate-700 rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                        <h3 className="font-medium text-white flex-1">{task.title}</h3>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getTaskPriorityColor(task.priority)}`}
                        >
                          {task.priority}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-slate-300 gap-1">
                        <span>Assigned to: {task.assignee}</span>
                        <span>Due: {formatDate(task.dueDate)}</span>
                      </div>
                      <div className="mt-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${task.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                            }`}
                        >
                          {task.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-5 h-5 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-400">No tasks assigned</p>
                </div>
              )}
            </div>

            {/* Documents */}
            <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-4 sm:p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-white mb-4">Documents</h2>
              {event.documents && event.documents.length > 0 ? (
                <div className="space-y-4">
                  {event.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="border border-slate-700/50 rounded-lg p-4 hover:bg-slate-700 transition-shadow cursor-pointer group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-3 space-y-3 sm:space-y-0">
                        <div className="flex-shrink-0">{getFileIcon(doc.type)}</div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-white truncate group-hover:text-blue-600 transition-colors">
                            {doc.name}
                          </h3>
                          <div className="mt-1 space-y-1">
                            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                              <span>{doc.size}</span>
                              <span className="hidden sm:inline">•</span>
                              <span>{formatDate(doc.uploadDate)}</span>
                            </div>
                            <div>
                              <span className="inline-block px-2 py-1 text-xs font-medium bg-slate-600 text-slate-300 rounded">
                                {doc.category}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button className="self-start sm:self-auto opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-600 rounded">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-5 h-5 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-slate-300 mb-2">No documents uploaded</h3>
                  <p className="text-slate-400">Documents will appear here once they are uploaded.</p>
                </div>
              )}
            </div>
        </div>
      </div>
      <AssignVendor isOpen={assignVendor} onClose={() => setAssignVendor(false)} />
    </div>
  )
}
