import Client from '../models/client.model.js';
import Event from '../models/event.model.js'
import Vendor from '../models/vendor.model.js';

const getColorForCategory = (category) => {
  const colorMap = {
    Social: 'bg-pink-500' ,
    Tech: 'bg-blue-500',
    Charity: 'bg-green-500',
    Corporate: 'bg-purple-500',

  };
  return colorMap[category] || 'bg-slate-500';
};

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const [totalClients, totalEvents, totalVendors] = await Promise.all([
      Client.countDocuments({ user: userId }),
      Event.countDocuments({ user: userId }),
      Vendor.countDocuments({ user: userId }),
    ]);

    res.status(200).json({
      totalClients,
      totalEvents,
      totalVendors,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};

export const getEventDistribution = async (req,res) => {
  try {
    const userId = req.user._id;
    const events = await Event.find({user:userId}).select('eventType').lean();

    const distributionMap = {};

    events.forEach(event =>{
      const type = event.eventType || 'Unknown';
      distributionMap[type] = (distributionMap[type] || 0) +1;
    })

    const total = events.length;
    const distribution = Object.entries(distributionMap).map(([category,count]) =>{
      return{
        category,
        percentage: ((count/total)*100).toFixed(1),
        color: getColorForCategory(category),
      }
    })

    return res.status(200).json(distribution);
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ error: "Failed to fetch event distribution" });
  }
};

export const getAllEventWithStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const events = await Event.find({ user: userId }).select('name date').lean();

    const simplifiedEvents = events.map(event => ({
      id: event._id,
      name: event.name,
      date: event.date,
      category: event.eventType,
      status: event.status,
    }));

    return res.status(200).json(simplifiedEvents);
  } catch (error) {
    console.error("Error fetching events:", error.message);
    return res.status(500).json({ error: "Failed to load events" });
  }
};