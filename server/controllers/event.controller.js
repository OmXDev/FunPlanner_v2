import Event from '../models/event.model.js';
import Client from '../models/client.model.js';

export const createEvent = async (req, res) => {
  try {
    const { name, eventType, date, format, sitting, venue,budget,attendees } = req.body;

   const userId = req.user._id;
   const clientId = req.params.id;

if (!userId) {
  return res.status(401).json({
    success: false,
    msg: "Unauthorized : User Id not found."
  });
}

    const event = new Event({
      name,
      eventType,
      date,
      format,
      sitting,
      venue,
      budget,
      attendees,
      user:userId,
      client: clientId , 
    });

    await event.save();
    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event,
    });
  } catch (error) {
    console.error('Create event error:', error.message);
    res.status(400).json({
      success: false,
      message: 'Failed to create event',
      error: error.message,
    });
  }
};

export const getAllEventsOfClient = async (req,res) =>{
  try {
    const userId = req.user._id;
    const clientId = req.params.id;

    const client = await Client.findOne({_id:clientId , user: userId});
    if(!client){
      return res.status(403).json({error : "Unauthorized access to client's events"})
    }

    const events =await Event.find({client : clientId}).select('name date budget attendees status');

    const simplifiedEvents = events.map(event =>({
      id: event._id,
      name: event.name,
      date: event.date,
      budget: event.budget,
      attendees: event.attendees,
      status: event.status,
      eventType:event.eventType
    }));

    return res.status(200).json(simplifiedEvents)
  } catch (error) {
    console.error("Error getting Event Data ", error.message);
    return res.status(500).json({error:"Failed to fetch event data"})
  }
}

export const singleEventWithStats = async (req, res) => {
    try {
        const userId = req.user._id;
        const eventId = req.params.id;
        // const clientId = req.params.clientId;

        
        const event = await Event.findOne({ _id: eventId,user:userId })
        .populate('client')
        .lean();
        if (!event) {
  return res.status(404).json({ message: "Event not found" });
}
        const enrichedEvent = {
            id: eventId,
            name: event.name,
            description: event.description|| "No description provided",
            type: event.eventType,
            status: event.status,
            date: event.date,
            endDate: event.endDate || null, // Assuming endDate is optional
            time: event.time || null, // Assuming time is optional
            endTime: event.endTime || null,
            venue: event.venue,
            format: event.format, 
            sitting: event.sitting,
            venue: event.venue,
            address:event.venue,
            capacity:event.attendees,  
            attendees: event.attendees,
            budget: event.budget, 
            spent: event.spent || 0,
            clientId: event.client, 
            tags: event.tags || [],
            slug: event.slug,
            createdAt: event.createdAt,
            updatedAt: event.updatedAt,
            
        };

        res.status(200).json(enrichedEvent);


    } catch (error) {
        console.error(error.message)
        res.status(500).json({message:"Failed to fetch the Event"})
    }
}




