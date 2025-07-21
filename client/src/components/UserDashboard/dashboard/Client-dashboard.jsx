"use client"

import { useEffect } from "react"
import { useState, useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import CreateClient from "../pop-ups/CreateClient"
import {
  Square,
  Search,
  Filter,
  Plus,
  X,
  Mail,
  Phone,
  Calendar,
  Building,
  User,
  ChevronDown,
  LayoutGrid,
  List,
  AlertTriangle,
  CheckSquare,
  SortAsc,
  Users,
  CheckCircle,
  Clock,
  Flag,
  MapPin,
  Building2
} from "lucide-react"
import { AllEventsSkeleton } from "../../skeleton/skeleton-cards/DashboardSkeletonCard"
import Sidebar from "../pages/Sidebar"
import Topbar from "../../ui/Topbar"
import SimpleUpwardDropdown from "../../ui/SimpleUpwardDropdown"
import CreateEvent from "../pop-ups/CreateEvent"

const Icons = {
  Search: () => <Search className="w-5 h-5" />,
  Filter: () => <Filter className="w-5 h-5" />,
  Plus: () => <Plus className="w-5 h-5" />,
  X: () => <X className="w-5 h-5" />,
  Mail: () => <Mail className="w-4 h-4" />,
  Phone: () => <Phone className="w-4 h-4" />,
  Calendar: () => <Calendar className="w-4 h-4" />,
  Building: () => <Building className="w-4 h-4" />,
  User: () => <User className="w-4 h-4" />,
  ChevronDown: () => <ChevronDown className="w-4 h-4" />,
  Grid: () => <LayoutGrid className="w-5 h-5" />,
  List: () => <List className="w-5 h-5" />,
}

export default function ClientDashboard() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [viewMode, setViewMode] = useState("grid") // grid or table
  const [loading, setLoading] = useState(true)
  const [showNewClientModal, setShowNewClientModal] = useState(false)
  const [filter, setFilter] = useState("all")
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [selectedVendor, setSelectedVendor] = useState(null)
  const [stats, setStats] = useState([]);
  const [newClient, setNewClient] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    communicationMethod: "email",
    notes: "",
    clientType: "",
    address: {
      city: "",
      country: ""
    }
  })
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem('token');
      if (!token) return console.error('No token found');
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/clients/clients-with-stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClients(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load clients", error);
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

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

  const getFilteredClients = () => {
    let filtered = clients

    if (searchTerm) {
      filtered = filtered.filter(
        (client) =>
          client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.clientType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.location?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    switch (filter) {
      case "active":
        filtered = filtered.filter((client) => !client.active)
        break
      case "inactive":
        filtered = filtered.filter((client) => client.inactive)
        break
      case "flagged":
        filtered = filtered.filter((client) => client.flagged)
      default:
        break
    }

    return filtered
  }

  const filteredClients = getFilteredClients();
  const visibleClients = filteredClients.slice(0, 6)
  const activeCount = clients.filter((client) => client.active)
  const inactiveCount = clients.filter((client) => client.inactive)
  const flaggedCount = clients.filter((client) => client.flagged)


  const filterOptions = [
    { value: "all", label: "All Clients", icon: <Square className="w-4 h-4" />, count: clients.length },
    { value: "active", label: "Active", icon: <AlertTriangle className="w-4 h-4" />, count: clients.length },
    { value: "inactive", label: "Inactive", icon: <CheckSquare className="w-4 h-4" />, count: inactiveCount.length },
    { value: "flagged", label: "Flagged", icon: <Flag className="w-4 h-4" />, count: flaggedCount.length },
  ]

  const handleNewClientSubmit = (e) => {
    e.preventDefault()
    console.log("New client:", newClient)
    setShowNewClientModal(false)
    setNewClient({
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
      clientType: "",
      communicationMethod: "email",
      notes: "",
    })
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "prospect":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Get tag color
  const getTagColor = (tag) => {
    const colors = {
      VIP: "bg-purple-100 text-purple-800 border-purple-200",
      Corporate: "bg-blue-100 text-blue-800 border-blue-200",
      Wedding: "bg-pink-100 text-pink-800 border-pink-200",
      "One-time": "bg-yellow-100 text-yellow-800 border-yellow-200",
      Nonprofit: "bg-green-100 text-green-800 border-green-200",
      Returning: "bg-indigo-100 text-indigo-800 border-indigo-200",
      Tech: "bg-cyan-100 text-cyan-800 border-cyan-200",
      Environmental: "bg-emerald-100 text-emerald-800 border-emerald-200",
      Community: "bg-orange-100 text-orange-800 border-orange-200",
      Local: "bg-teal-100 text-teal-800 border-teal-200",
    }
    return colors[tag] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  // Generate avatar initials
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      if (!token) return console.error('No token found');

      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/clients/get-stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        setStats([
          { title: "Total Clients", value: data.totalClients, icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
          { title: "Active Clients", value: data.activeClients, icon: CheckCircle, color: "text-green-400", bg: "bg-green-400/10" },
          { title: "Inactive Clients", value: data.pendingClients, icon: Clock, color: "text-yellow-400", bg: "bg-yellow-400/10" },
          { title: "Flagged Clients", value: data.flaggedClients, icon: Flag, color: "text-red-400", bg: "bg-red-400/10" },
        ]);
      } catch (error) {
        console.error('Error fetching client stats:', error);
      } finally {
        setLoading(false)
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-[#0d1117] text-white ">
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
            <div className="flex flex-wrap justify-between items-center gap-y-3">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-white">Client Dashboard</h1>
                <p className="text-slate-400 text-sm sm:text-base mt-1">Manage your client relationships</p>
              </div>

              <button
                onClick={() => setIsPopupOpen(true)}
                className="bg-gradient-to-r from-[#2E3192] to-[] hover:from-[#2E3192] hover:to-[] text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>New Client</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Client Overview panel */}
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
              <div className={`${selectedVendor ? "lg:col-span-2" : "lg:col-span-3"} space-y-6`}>
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
                        <div className="flex bg-slate-700/30 rounded-xl p-1 overflow-x-auto ">
                          {filterOptions.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => setFilter(option.value)}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${filter === option.value
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
                          Showing {filteredClients.length} of {clients.length} events
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
                      {filteredClients.length === 0 ? (
                        <div className="text-center py-12 lg:py-16">
                          <div className="w-16 h-16 bg-slate-700/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckSquare className="w-8 h-8 text-gray-400" />
                          </div>
                          <h3 className="text-lg lg:text-xl font-medium text-gray-300 mb-2">
                            {searchTerm
                              ? "No Clients found"
                              : filter === "active"
                                ? "No Active Client"
                                : filter === "inactive"
                                  ? "No Inactive Client"
                                  : filter === "flagged"
                                    ? "No Flagged Clients"
                                    : "No Clients yet"}
                          </h3>
                          <p className="text-gray-500 max-w-md mx-auto">
                            {searchTerm
                              ? "Try adjusting your search terms"
                              : filter === "active"
                                ? "Add some clients to see them here"
                                : filter === "inactive"
                                  ? "All Clients are active!"
                                  : filter === "flagged"
                                    ? "No Clients are flagged!"
                                    : "Add your first Client to get started"}
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                          {visibleClients.map((client, index) => (
                            <div
                              key={index}
                              className="group relative p-4 lg:p-6 rounded-xl bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 flex flex-col gap-3 lg:gap-4 shadow-lg hover:shadow-xl hover:bg-slate-900/70 transition-all duration-300 hover:scale-[1.02]"
                            >
                              <div className="flex items-start justify-between w-full">

                                <div className="flex items-center space-x-3">
                                  <div className="w-12 h-12 bg-gradient-to-r from-[#2E3192] to-[] rounded-full flex items-center justify-center text-white font-semibold">
                                    {getInitials(client.name)}
                                  </div>
                                  <div className="flex flex-col">
                                    <h3 className="text-lg lg:text-xl font-semibold text-white line-clamp-2 group-hover:text-blue-300 transition-colors duration-200">
                                      {client.name}
                                    </h3>

                                    {client.organizationName && (
                                      <div className="flex items-center space-x-2 mt-1">
                                        <Building2 className="w-4 h-4 text-slate-400" />
                                        <span className="text-slate-300 text-sm">{client.organizationName}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-slate-400">
                                  <Calendar className="w-5 h-5" />
                                  <span>{client.eventsCount} events</span>
                                </div>
                              </div>


                              {/* contact Info */}

                              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400 mb-2.5  ">
                                <div className="flex items-center space-x-2 text-sm text-slate-400">
                                  <Mail className="w-5 h-5" />
                                  <span className="truncate">{client.email}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-slate-400">
                                  <Phone className="h-4 w-5" />
                                  <span>{client.phone}</span>
                                </div>
                              </div>

                              {/* Meta Info */}
                              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
                                <span className="bg-slate-800/50 px-2.5 py-1 rounded-md text-xs font-medium border border-slate-700/50">
                                  {client.clientType.charAt(0).toUpperCase() + client.clientType.slice(1)}
                                </span>
                                <span className="text-slate-600"><MapPin className=" w-5 h-5" /></span>
                                <span className="truncate">
                                  {client.address?.city && client.address?.country
                                    ? `${client.address.city}, ${client.address.country}`
                                    : "No location"}
                                </span>
                              </div>

                              {/* Description */}
                              {client.description && (
                                <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">{event.description}</p>
                              )}

                              {/* CTA */}
                              <div className="mt-auto pt-2">
                                <button
                                  key={client.id}
                                  onClick={() => navigate(`/client-profile/${client.id}`)}
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
                    {filteredClients.length > 6 && (
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
                          <SimpleUpwardDropdown />
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
      <CreateClient
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  )
}
