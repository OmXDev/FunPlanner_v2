"use client"

import { Calendar, ChevronDown, X } from "lucide-react"
import { useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"

export default function CreateEvent({ isOpen, onClose, }) {
  if (!isOpen) return null
  const { id } = useParams(); 

  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [format, setFormat] = useState("");
  const [sitting, setSitting] = useState("");
  const [location, setLocation] = useState("");
  const [rawBudget, setRawBudget] = useState("")
  const [attendees, setAttendees] = useState("");
  const navigate = useNavigate();

  const formatINR = (value) => {
    if (!value) return " ";

    const number = parseInt(value.replace(/,/g, ""), 10)
    if (isNaN(number)) return "";

    return number.toLocaleString('en-IN');
  }

  const handleBudgetChange = (e) => {
    const input = e.target.value.replace(/[^0-9]/g, "");
    const trimmed = input.replace(/^0+/, "");
    setRawBudget(formatINR(trimmed));
  }

  const numericBudget = rawBudget.replace(/,/g, "");

  const handleCreateEvent = async (e) => {
  e.preventDefault();

  const createEventPromise = new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/events/create-event/${id}`,
        {
          name: eventName,
          eventType,
          date: eventDate,
          format,
          sitting,
          venue: location,
          budget: numericBudget,
          attendees,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const createdEvent = response?.data?.event;

      if (createdEvent && createdEvent._id) {
        resolve(createdEvent);
      } else {
        reject('Failed to retrieve event ID after creation.');
      }
    } catch (error) {
      console.error("Error in creating Event:", error);
      reject(error.response?.data?.message || 'Failed to create event.');
    }
  });

  toast.promise(
    createEventPromise,
    {
      loading: 'Creating event...',
      success: (createdEvent) => {
        setEventName('');
        setEventType('');
        setEventDate('');
        setFormat('');
        setSitting('');
        setLocation('');
        setRawBudget('');
        setAttendees('');
        navigate(`/event-profile/${createdEvent._id}`);
        onClose();
        return 'Event Created Successfully!';
      },
      error: (errMsg) => errMsg || 'Event creation failed.',
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
      <div className="bg-slate-900 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <Calendar className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Event Details</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 text-sm">Event ID:</span>
              <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-sm">AUTO-GENERATED</span>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleCreateEvent}>
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
                    Event Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter event name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>



                <div className="space-y-2">
                  <label className="text-slate-300 text-sm">
                    Event Type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option value="">Select event type</option>
                      <option value="corporate">Corporate</option>
                      <option value="social">Social</option>
                      <option value="tech">Tech</option>
                      <option value="charity">Charity</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Date & Format */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-6 bg-purple-500 rounded"></div>
                <h3 className="text-lg font-semibold text-white">Date & Format</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-slate-300 text-sm">
                    Event Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      placeholder="dd-mm-yyyy"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <Calendar className="absolute right-3 top-1/2 mr-2 transform -translate-y-1/2 w-4 h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-slate-300 text-sm">
                    Format <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option value="">Select format</option>
                      <option value="in-person">In-Person</option>
                      <option value="virtual">Virtual</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-slate-300 text-sm">
                    Sitting <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={sitting}
                      onChange={(e) => setSitting(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option value="">Select sitting</option>
                      <option value="theater">Theater</option>
                      <option value="indoor">Indoor</option>
                      <option value="outdoor">Outdoor</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-6 bg-purple-500 rounded"></div>
                <h3 className="text-lg font-semibold text-white">Location</h3>
              </div>

              <div className="space-y-2">
                <label className="text-slate-300 text-sm">
                  Venue <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter venue name or address"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* URL & Identification */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-6 bg-purple-500 rounded"></div>
                <h3 className="text-lg font-semibold text-white">URL & Identification</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-slate-300 text-sm">
                    Budget (INR) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter budget in ₹"
                    value={rawBudget}
                    onChange={handleBudgetChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-slate-300 text-sm">
                    Total Attendees <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter no. of attendees..."
                    value={attendees}
                    onChange={(e) => {
                      const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
                      setAttendees(onlyNumbers);
                    }}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-slate-300 text-sm">URL Slug</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm">
                    events/
                  </div>
                  <input
                    type="text"
                    placeholder="auto-generated-from-n..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-16 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <p className="text-slate-500 text-xs">Leave blank to auto-generate from event name</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-slate-700">
              <button type="button" variant="outline" onClick={onClose} className="border-slate-600 text-slate-300 hover:bg-slate-800">
                Cancel
              </button>
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg transition duration-200 cursor-pointer"
              >
                Create Event
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
