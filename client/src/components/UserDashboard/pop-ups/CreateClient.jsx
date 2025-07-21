"use client"

import { Calendar, ChevronDown, X, Phone } from "lucide-react"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CreateClient({ isOpen, onClose }) {
    if (!isOpen) return null

    const [clientName, setClientName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [internalNotes, setInternalNotes] = useState("");
    const [clientType, setClientType] = useState("")
    const navigate = useNavigate();
    const [addressLine1, setAddressLine1] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [organizationName, setOrganizationName] = useState('');


   const handleCreateClient = async (e) => {
  e.preventDefault();

  const createClientPromise = new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");

      const payload = {
        name: clientName,
        email,
        phone: contact,
        notes: internalNotes || "",
        clientType,
        address: {
          addressLine1,
          city,
          postalCode,
          country,
        },
      };
      if (clientType === 'corporate' || clientType === 'non-profit') {
        payload.organizationName = organizationName;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/clients/create-client`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const createdClient = response?.data?.client;

      if (createdClient && createdClient._id) {
        resolve(createdClient);
      } else {
        reject('Failed to retrieve client ID after creation.');
      }
    } catch (error) {
      console.error('Error creating Client:', error.response?.data || error.message);
      reject(error.response?.data?.message || "Failed to create client.");
    }
  });

  toast.promise(
    createClientPromise,
    {
      loading: 'Creating client...',
      success: (createdClient) => {
        // Clear form fields
        setClientName('');
        setEmail('');
        setContact('');
        setAddress('');
        setClientType('');
        setInternalNotes('');
        setAddressLine1('');
        setCity('');
        setCountry('');
        setPostalCode('');

        navigate(`/client-profile/${createdClient._id}`);
        onClose();

        return 'Client Created Successfully!';
      },
      error: (errMsg) => errMsg || 'Client creation failed.',
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
                        <h2 className="text-xl font-bold text-white">Client Details</h2>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="hidden lg:block  items-center space-x-2">
                            <span className="text-slate-400 text-sm">Client ID:</span>
                            <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-sm">AUTO-GENERATED</span>
                        </div>
                        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <form onSubmit={handleCreateClient}>
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
                                        Client Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter client name"
                                        value={clientName}
                                        onChange={(e) => setClientName(e.target.value)}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-slate-300 text-sm">
                                        Client Type <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={clientType}
                                            onChange={(e) => setClientType(e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        >
                                            <option value="">Select client type</option>
                                            <option value="corporate">Corporate</option>
                                            <option value="individual">Individual</option>
                                            <option value="non-profit">Non-Profit</option>
                                            <option value="government">Government</option>

                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Conditional rendering for Organization Name */}
                                {(clientType === 'corporate' || clientType === 'non-profit') && (
                                    <div className="space-y-2 col-span-1"> {/* Added col-span-1 to ensure it takes full width on single column layout, or one column in two-column grid */}
                                        <label className="text-slate-300 text-sm">
                                            Organization Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter organization name"
                                            value={organizationName}
                                            onChange={(e) => setOrganizationName(e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>
                                )}
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
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            placeholder="FunPlanner@gmail.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-slate-300 text-sm">
                                        Contact no. <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                        <input
                                            type="tel"
                                            placeholder="938XXXX850"
                                            value={contact}
                                            onChange={(e) => setContact(e.target.value)}
                                            className="w-full  bg-slate-800 border border-slate-700 rounded-lg px-10 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Client's address */}
                        <div className="space-y-6">
                            {/* Section Header */}
                            <div className="flex items-center space-x-3">
                                <div className="w-1.5 h-6 bg-purple-500 rounded"></div>
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



                        {/* Internal Notes */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-1 h-6 bg-purple-500 rounded"></div>
                                <h3 className="text-lg font-semibold text-white">Internal Notes</h3>
                            </div>

                            <div className="space-y-2">
                                <label className="text-slate-300 text-sm">
                                    Notes <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Important notes about client.."
                                    value={internalNotes}
                                    onChange={(e) => setInternalNotes(e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                        </div>


                        <div className="flex justify-end space-x-4 pt-6 border-t border-slate-700">
                            <button  onClick={onClose} className="border-slate-600 text-slate-300 hover:bg-slate-800 py-2 px-6 rounded-lg cursor-point">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg transition duration-200"
                            >
                                Create Client
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}
