"use client"

import { useEffect } from "react"
import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import CreateClient from "../pop-ups/CreateClient"
import Topbar from "../pages/Topbar"
import {
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
} from "lucide-react"

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
  const [isPopupOpen,setIsPopupOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [viewMode, setViewMode] = useState("grid") // grid or table
  const[loading,setLoading]=useState(true)
  const [showNewClientModal, setShowNewClientModal] = useState(false)
  const [newClient, setNewClient] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    type: "individual",
    communicationMethod: "email",
    notes: "",
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

      setClients(response.data ||[]);
      setLoading(false);
    } catch (error) {
      console.error("Failed to load clients", error);
      setLoading(false);
    }
  };

  fetchClients();
}, []);
  

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || client.status === statusFilter
      const matchesType = typeFilter === "all" || client.type === typeFilter

      return matchesSearch && matchesStatus && matchesType
    })
  }, [searchTerm, statusFilter, typeFilter])


  const handleNewClientSubmit = (e) => {
    e.preventDefault()
    console.log("New client:", newClient)
    setShowNewClientModal(false)
    setNewClient({
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
      type: "individual",
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

  return (
    <div className="min-h-screen bg-black text-white ">
      <div className="sticky top-0 z-40 bg-[#0d1117] border-b border-gray-800">
        <Topbar />
      </div>
      {/* Header */}
      <div className="bg-[#1d293d] border-b text-white border-slate-600 px-6 py-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">Client Dashboard</h1>
            <p className="text-slate-200 mt-1">Manage your client relationships</p>
          </div>

          <button
            onClick={() => setIsPopupOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm"
          >
            <Icons.Plus />
            <span>New Client</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Search and Filters */}
        <div className="bg-[#1d293d] rounded-lg border text-white border-slate-600 p-6 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative items-i ">
                <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 " />
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-5 py-2 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent h-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-[#1d293d] border text-white border-slate-600 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="prospect">Prospect</option>
                </select>
                <Icons.ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {/* Type Filter */}
              <div className="relative">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="appearance-none bg-[#1d293d] text-white border border-slate-600 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="corporate">Corporate</option>
                  <option value="individual">Individual</option>
                  <option value="nonprofit">Nonprofit</option>
                </select>
                <Icons.ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex border border-slate-600 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-slate-700 text-white" : "bg-[#1d293d] text-slate-100 hover:bg-slate-400"} transition-colors`}
                >
                  <Icons.Grid />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 ${viewMode === "table" ? "bg-slate-700 text-white" : "bg-[#1d293d] text-slate-100 hover:bg-slate-400"} transition-colors`}
                >
                  <Icons.List />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-white">
            Showing {filteredClients.length} of {clients.length} clients
          </p>
        </div>

        {/* Client List */}
        {viewMode === "grid" ? (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredClients.map((client) => (
              <Link
                key={client.id}
                to={`/client-profile/${client.id}`}
                className="bg-[#1d293d] text-white rounded-lg border border-slate-600 p-6 hover:shadow-lg hover:border-purple-300 transition-all cursor-pointer group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {getInitials(client.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate group-hover:text-slate-300 transition-colors">
                        {client.name}
                      </h3>
                      <p className="text-sm text-slate-400 truncate">{client.contactPerson}</p>
                    </div>
                  </div>
                  {client.isNew && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full border border-green-200">
                      New
                    </span>
                  )}
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-slate-100">
                    <Icons.Mail />
                    <span className="truncate">{client.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-100">
                    <Icons.Phone />
                    <span>{client.phone}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-sm text-slate-100">
                    <Icons.Calendar />
                    <span>{client.eventsCount} events</span>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full border ${getStatusColor(client.status)}`}
                  >
                    {client.status}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {client.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className={`text-xs font-medium px-2 py-1 rounded-full border ${getTagColor(tag)}`}
                    >
                      {tag}
                    </span>
                  ))}
                  {client.tags.length > 2 && (
                    <span className="text-xs font-medium px-2 py-1 rounded-full border bg-[#101012] text-slate-100 border-gray-200">
                      +{client.tags.length - 2}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // Table View
          <div className="bg-[#1d293d] rounded-lg border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1d293d] border-b border-slate-200">
                  <tr>
                    <th className="text-left py-3 px-6 text-slate-200 font-medium">Client</th>
                    <th className="text-left py-3 px-6 text-slate-200 font-medium">Contact</th>
                    <th className="text-left py-3 px-6 text-slate-200 font-medium">Type</th>
                    <th className="text-left py-3 px-6 text-slate-200 font-medium">Events</th>
                    <th className="text-left py-3 px-6 text-slate-200 font-medium">Status</th>
                    <th className="text-left py-3 px-6 text-slate-200 font-medium">Tags</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client) => (
                    <tr
                      key={client.id}
                      onClick={()=>{navigate('/client-profile')}}
                      className="border-b border-slate-200 hover:bg-slate-900 cursor-pointer transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {getInitials(client.name)}
                          </div>
                          <div>
                            <p className="font-medium text-slate-300">{client.name}</p>
                            <p className="text-sm text-slate-100">{client.contactPerson}</p>
                          </div>
                          {client.isNew && (
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full border border-green-200">
                              New
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-sm text-slate-100">
                            <Icons.Mail className="w-3 h-3" />
                            <span>{client.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-slate-100">
                            <Icons.Phone className="w-3 h-3" />
                            <span>{client.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          {client.type === "corporate" ? (
                            <Icons.Building className="text-slate-100" />
                          ) : (
                            <Icons.User className="text-slate-100" />
                          )}
                          <span className="text-slate-100 capitalize">{client.type}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-slate-100">{client.eventsCount}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full border ${getStatusColor(client.status)}`}
                        >
                          {client.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1">
                          {client.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className={`text-xs font-medium px-2 py-1 rounded-full border ${getTagColor(tag)}`}
                            >
                              {tag}
                            </span>
                          ))}
                          {client.tags.length > 2 && (
                            <span className="text-xs font-medium px-2 py-1 rounded-full border bg-gray-100 text-gray-600 border-gray-200">
                              +{client.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredClients.length === 0 && (
          <div className="bg-[#1d293d] rounded-lg border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icons.User className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No clients found</h3>
            <p className="text-slate-600 mb-4">Try adjusting your search or filter criteria.</p>
            <button
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
                setTypeFilter("all")
              }}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
        <CreateClient isOpen={isPopupOpen} onClose={()=>setIsPopupOpen(false)}/>
    </div>
  )
}
