"use client"

import { Calendar, ChevronDown, Contact, X } from "lucide-react"
import { useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast";

export default function CreateVendor({ isOpen, onClose }) {
  if (!isOpen) return null

  const [vendorName, setVendorName] = useState("")
  const [vendorCategory, setVendorCategory] = useState("")
  const [ContactPerson, setContactPerson] = useState("")
  const [status, setStatus] = useState("")
  const [contact, SetContact] = useState("")
  const [email, setEmail] = useState("")
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const navigate = useNavigate()


  const handleAddVendor = async (e) => {
  e.preventDefault();

  const addVendorPromise = new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return reject("Unauthorized: Token missing");

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/vendors/add-vendor`,
        {
          name: vendorName,
          category: vendorCategory,
          contactPerson: ContactPerson,
          status: status,
          phone: contact,
          email: email,
          address: {
            addressLine1,
            city,
            postalCode,
            country,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const createdVendor = response?.data?.vendor;

      if (createdVendor && createdVendor._id) {
        resolve(createdVendor);
      } else {
        reject('Failed to retrieve vendor ID after creation.');
      }
    } catch (error) {
      console.error('Error adding vendor:', error);
      reject(error.response?.data?.message || 'Failed to add vendor.');
    }
  });

  toast.promise(
    addVendorPromise,
    {
      loading: 'Adding vendor...',
      success: (createdVendor) => {
        setVendorName("");
        setVendorCategory("");
        setContactPerson("");
        setStatus("");
        SetContact("");
        setEmail("");
        setAddressLine1('');
        setCity('');
        setCountry('');
        setPostalCode('');

        navigate(`/vendor-profile/${createdVendor._id}`);
        onClose();

        return 'Vendor Created Successfully!';
      },
      error: (errMsg) => errMsg || 'Vendor creation failed.',
    },
    {
      style: {
        minWidth: '250px',
      },
      success: {
        duration: 5000,
      },
      error: {
        duration: 5000,
      },
    }
  );
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <Calendar className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Vendor Details</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden lg:block  items-center space-x-2">
              <span className="text-slate-400 text-sm">Vendor ID:</span>
              <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-sm">AUTO-GENERATED</span>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleAddVendor}>
          <div className="p-6 space-y-8">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-6 bg-purple-500 rounded"></div>
                <h3 className="text-lg font-semibold text-white">Basic Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-slate-300 text-sm">
                    Organization Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Organization name"
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>



                <div className="space-y-2">
                  <label className="text-slate-300 text-sm">
                    Vendor Category<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={vendorCategory}
                      onChange={(e) => setVendorCategory(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option value="">Select Vendor category</option>
                      <option value="catering">Catering</option>
                      <option value="audio/Visual">Audio/Visual</option>
                      <option value="decoration">Decoration</option>
                      <option value="security">Security</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-slate-300 text-sm">
                    Contact Person<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Contact person name "
                      value={ContactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-slate-300 text-sm">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option value="">Select Status</option>
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="blocked">Blocked</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-6 bg-purple-500 rounded"></div>
                <h3 className="text-lg font-semibold text-white">Contact Info</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-slate-300 text-sm">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="+91 12345 67890"
                    value={contact}
                    onChange={(e) => { SetContact(e.target.value) }}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-slate-300 text-sm">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="vendor@gmail.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-6">
              {/* Section Header */}
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-purple-500 rounded"></div>
                <h3 className="text-xl font-semibold text-white">Client's Address</h3>
              </div>

              {/* Address Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Address Line 1 */}
                <div className="space-y-2">
                  <label className="text-slate-300 text-sm font-medium">
                    Address Line 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter address line 1"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-md px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* City */}
                <div className="space-y-2">
                  <label className="text-slate-300 text-sm font-medium">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-md px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Postal Code */}
                <div className="space-y-2">
                  <label className="text-slate-300 text-sm font-medium">
                    Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter postal code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-md px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <label className="text-slate-300 text-sm font-medium">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-md px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>


            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-slate-700">
              <button type="button" onClick={onClose} className="border-slate-600 text-slate-300 hover:bg-slate-800 py-2 px-6 rounded-lg cursor-pointer">
                Cancel
              </button>
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg transition duration-200 cursor-pointer"
              >
                Add Vendor
              </button>
            </div>


          </div>
        </form>
      </div>
    </div>
  )
}
