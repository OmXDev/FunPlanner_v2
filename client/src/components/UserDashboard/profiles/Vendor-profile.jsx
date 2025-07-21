"use client"

import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Star,
  StarOff,
  Mail,
  Phone,
  User,
  Tag,
  Calendar,
  FileText,
  Image as ImageIcon,
  Download,
  ChevronRight,
  Building,
  MapPin,
  Clock,
  Plus,
  UserCheck,
  Send,
  FileDown,
  Building2,
} from 'lucide-react';

const Icons = {
  ArrowLeft: () => <ArrowLeft className="w-5 h-5 " />,
  Star: () => <Star className="w-4 h-4 fill-current text-gray-400" />,
  StarOutline: () => <StarOff className="w-4 h-4" />,
  Mail: () => <Mail className="w-5 h-4 text-gray-400" />,
  Phone: () => <Phone className="w-5 h-4 text-gray-400" />,
  User: () => <User className="w-5 h-4 text-gray-400" />,
  Tag: () => <Tag className="w-5 h-5 text-gray-400" />,
  Calendar: () => <Calendar className="w-5 h-5 text-gray-400" />,
  FileText: () => <FileText className="w-5 h-5 text-gray-400" />,
  Image: () => <ImageIcon className="w-5 h-5" />,
  Download: () => <Download className="w-4 h-4" />,
  ChevronRight: () => <ChevronRight className="w-4 h-4" />,
  Building: () => <Building className="w-5 h-5" />,
  MapPin: () => <MapPin className="w-5 h-5" />,
  Clock: () => <Clock className="w-4 h-4" />,
};

export default function VendorProfile() {

  const navigate = useNavigate()
  const [vendor, setVendor] = useState('');
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  //   const vendor = {
  //     id: vendorId || 1,
  //     name: "Elite Catering Solutions",
  //     email: "contact@elitecatering.com",
  //     phone: "+1 (555) 123-4567",
  //     contactPerson: "Sarah Johnson",
  //     category: "Catering",
  //     status: "active",
  //     rating: 4.8,
  //     totalReviews: 127,
  //     location: "New York, NY",
  //     website: "www.elitecatering.com",
  //     joinDate: "January 2022",
  //     description:
  //       "Elite Catering Solutions has been providing exceptional catering services for corporate events, weddings, and special occasions for over 10 years. We pride ourselves on using fresh, locally-sourced ingredients and creating memorable dining experiences.",
  //     services: [
  //       "Corporate Event Catering",
  //       "Wedding Catering",
  //       "Cocktail Reception Services",
  //       "Buffet Setup & Service",
  //       "Custom Menu Planning",
  //       "Dietary Accommodation",
  //       "Event Staff Coordination",
  //       "Equipment Rental",
  //     ],
  //     recentEvents: [
  //       {
  //         id: 1,
  //         name: "Annual Tech Conference 2024",
  //         date: "2024-02-15",
  //         type: "Corporate",
  //         attendees: 250,
  //         status: "completed",
  //       },
  //       {
  //         id: 2,
  //         name: "Johnson Wedding Reception",
  //         date: "2024-01-28",
  //         type: "Wedding",
  //         attendees: 120,
  //         status: "completed",
  //       },
  //       {
  //         id: 3,
  //         name: "Product Launch Event",
  //         date: "2024-03-10",
  //         type: "Corporate",
  //         attendees: 80,
  //         status: "upcoming",
  //       },
  //       {
  //         id: 4,
  //         name: "Charity Gala Dinner",
  //         date: "2024-02-05",
  //         type: "Nonprofit",
  //         attendees: 200,
  //         status: "completed",
  //       },
  //     ],
  //     documents: [
  //       {
  //         id: 1,
  //         name: "Business License 2024.pdf",
  //         type: "pdf",
  //         size: "2.4 MB",
  //         uploadDate: "2024-01-15",
  //         category: "Legal",
  //       },
  //       {
  //         id: 2,
  //         name: "Insurance Certificate.pdf",
  //         type: "pdf",
  //         size: "1.8 MB",
  //         uploadDate: "2024-01-10",
  //         category: "Insurance",
  //       },
  //       {
  //         id: 3,
  //         name: "Menu Portfolio.pdf",
  //         type: "pdf",
  //         size: "5.2 MB",
  //         uploadDate: "2024-02-01",
  //         category: "Portfolio",
  //       },
  //       {
  //         id: 4,
  //         name: "Event Photos.zip",
  //         type: "zip",
  //         size: "15.7 MB",
  //         uploadDate: "2024-02-20",
  //         category: "Media",
  //       },
  //       {
  //         id: 5,
  //         name: "Contract Template.docx",
  //         type: "docx",
  //         size: "0.8 MB",
  //         uploadDate: "2024-01-20",
  //         category: "Contract",
  //       },
  //     ],
  //   }

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "blocked":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Get event status color
  const getEventStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "ongoing":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
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
        return <Icons.FileText className="text-red-500" />
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <Icons.Image className="text-blue-500" />
      case "zip":
      case "rar":
        return <Icons.Download className="text-purple-500" />
      default:
        return <Icons.FileText className="text-gray-500" />
    }
  }

  // Render star rating
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
      stars.push(<Icons.StarOutline key={`empty-${i}`} className="text-gray-300" />)
    }

    return stars
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Generate initials for avatar
  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  useEffect(() => {
    const fetchVendor = async () => {
      const token = localStorage.getItem("token");
      if (!token) return console.error("No token found");

      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/vendors/vendor-stats/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVendor(res.data);
        //   setLoading(false);
      } catch (err) {
        console.error("Failed to load Vendor", err);
        setLoading(false);
      }
    };

    fetchVendor();
  }, [id]);

  return (
    <div className="min-h-screen p-6 bg-[#0d1117]">
      {/* Sticky Header */}
      <div className="top-0 z-10 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 sm:h-16">

            {/* Left: Back button + Breadcrumb */}
            <div className="flex items-center gap-2 text-sm overflow-hidden">
              {/* Back Button */}
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-slate-400 hover:text-white transition-colors"
              >
                <Icons.ArrowLeft className="w-4 h-4 mr-1" />
                <span className=" sm:inline">Back to Vendors Dashboard</span>
              </button>

              {/* Breadcrumb (Visible on sm+) */}
              <div className="hidden sm:flex items-center space-x-1 text-slate-400 font-medium">
                <span>Vendors</span>
                <Icons.ChevronRight className="w-4 h-4" />
                <span className="text-slate-300 truncate max-w-[120px]">{vendor.name}</span>
              </div>
            </div>

            {/* Right: Status (Always right aligned) */}
            <span
              className={`shrink-0 px-3 py-1 rounded-full border font-medium text-xs sm:text-sm ${getStatusColor(
                vendor.status
              )}`}
            >
              {vendor.status}
            </span>

          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto space-y-6">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Section: Heading */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-200">Vendor's Profile</h1>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Manage vendor information
            </p>
          </div>

          {/* Right Section: Actions */}
          <div className="flex flex-wrap gap-3">
            <button className="bg-gradient-to-r from-[#2E3192] to-[] text-slate-300 bg-transparent px-4 py-2 rounded inline-flex items-center cursor-pointer">
              <UserCheck className="w-4 h-4 mr-2" />
              Assign Manager
            </button>

            <button className="border border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent px-4 py-2 rounded inline-flex items-center cursor-pointer">
              <Send className="w-4 h-4 mr-2" />
              Send Email
            </button>

            <button className="border border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent px-4 py-2 rounded inline-flex items-center cursor-pointer">
              <FileDown className="w-4 h-4 mr-2" />
              Export Info
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto ">
          {/* Vendor Header */}
          <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <User className="w-5 h-5 text-purple-400" />
              <h2 className="text-white text-lg font-semibold">Vendor Overview</h2>
            </div>
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div>
                  <div className="flex items-center space-x-3">
                    {vendor?.name && (
                      <div className="w-12 h-12 bg-gradient-to-r from-[#2E3192] to-[] rounded-full flex items-center justify-center text-white font-semibold">
                        {getInitials(vendor.name)}
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-white">{vendor.name}</h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1 text-sm">
                    {/* Organization */}
                    {vendor.organizationName && (
                      <div className="flex items-center gap-1 text-slate-300">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        <span>{vendor.organizationName}</span>
                      </div>
                    )}

                    {/* Location */}
                    <div className="flex items-center gap-1 text-slate-300">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>
                        {vendor.address?.city && vendor.address?.country
                          ? `${vendor.address.city}, ${vendor.address.country}`
                          : "No location"}
                      </span>
                    </div>
                  </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300 text-sm">{vendor.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300 text-sm">{vendor.phone}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">

                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400 text-sm">Member Since:</span>
                    <span className="text-slate-300 text-sm">
                      {new Date(vendor.joinDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(vendor.status)}`}></div>
                <span className="text-sm font-medium capitalize">{vendor.status}</span>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Services Offered */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 sm:p-6 shadow-sm">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-100 mb-4">Services Offered</h2>
              {vendor.services && vendor.services.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {vendor.services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-3 bg-slate-900 rounded-lg border border-slate-700"
                    >
                      <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0" />
                      <span className="text-sm font-medium text-slate-200">{service}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 py-8">
                  <Tag className="w-5 h-5 text-slate-300" />
                  <p className="text-slate-500">No services listed</p>
                </div>

              )}
            </div>

            {/* Recent Events */}
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 sm:p-6 shadow-sm">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-300 mb-4">Recent Events</h2>
              {vendor.recentEvents && vendor.recentEvents.length > 0 ? (
                <div className="space-y-4">
                  {vendor.recentEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border border-slate-700 rounded-lg p-4 hover:bg-slate-900 transition-colors cursor-pointer"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h3 className="font-medium text-slate-200">{event.name}</h3>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getEventStatusColor(event.status)}`}
                        >
                          {event.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Tag className="w-4 h-4" />
                          <span>{event.type}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icons.User className="w-4 h-4" />
                          <span>{event.attendees} attendees</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 py-8">
                  <Calendar className="w-5 h-5 text-slate-300" />
                  <p className="text-slate-500">No recent events</p>
                </div>

              )}
            </div>
          </div>



          {/* Documents Section */}
          <div className="mt-8 bg-slate-800 rounded-lg border border-slate-700 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-100 mb-4">Documents</h2>
            {vendor.documents && vendor.documents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vendor.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="border border-slate-950 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">{getFileIcon(doc.type)}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-slate-200 truncate group-hover:text-purple-600 transition-colors">
                          {doc.name}
                        </h3>
                        <div className="mt-1 space-y-1">
                          <div className="flex items-center space-x-2 text-xs text-slate-300">
                            <span>{doc.size}</span>
                            <span>•</span>
                            <span>{formatDate(doc.uploadDate)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-slate-300 text-slate-900 rounded">
                              {doc.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-100 rounded">
                        <Icons.Download />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center space-y-2">
  <div className="flex items-center justify-center gap-2">
    <FileText className="w-5 h-5 text-slate-300" />
    <p className="text-slate-500">No documents uploaded</p>
  </div>
  
  <p className="text-slate-400 text-sm">
    Documents will appear here once they are uploaded.
  </p>
</div>


            )}
          </div>
        </div>
      </div>
    </div>
  )
}
