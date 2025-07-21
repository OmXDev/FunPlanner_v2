import Client from '../models/client.model.js';
import Event from '../models/event.model.js'

export const createClient = async (req, res) => {
    try {
        const { name, email, phone, address, notes, clientType, organizationName } = req.body;
        const { addressLine1, city, postalCode, country } = address;
        const userId = req.user._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                msg: "Unauthorized : User Id not found."
            })
        }

        const client = new Client({
            name,
            email,
            phone,
            notes,
            user: userId,
            clientType,
            address: {
                addressLine1,
                city,
                postalCode,
                country,
            },
            organizationName
        })
        await client.save();

        res.status(201).json({
            success: true,
            message: 'Client created successfully',
            client,
        });


    } catch (error) {
        console.error("client creation error :", error.message)
        res.status(400).json({
            success: false,
            message: 'Failed to create client',
            error: error.message,
        });
    }
}

export const getClientStats = async (req, res) => {
    try {
        const userId = req.user._id;
        const clientId = req.params.id;

        const [totalClients, activeClients, pendingClients, flaggedClients] = await Promise.all([
            Client.countDocuments({ user: userId }),
            Client.countDocuments({ user: userId, status: 'active' }),
            Client.countDocuments({ user: userId, status: 'pending' }),
            Client.countDocuments({ user: userId, status: 'flagged' }),
        ]);

        res.status(200).json({
            totalClients,
            activeClients,
            pendingClients,
            flaggedClients,
            clientId,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch stats" });
    }
};

export const getAllClientWithStats = async (req, res) => {
    try {
        const userId = req.user._id;

        const clients = await Client.find({ user: userId }).lean();

        const enrichedClients = await Promise.all(
            clients.map(async (client) => {
                const events = await Event.find({ client: client._id })
                const eventsCount = events.length;

                const lastEventDate = events
                    .map(e => e.date)
                    .sort((a, b) => new Date(b) - new Date(a))[0] || null;

                return {
                    id: client._id,
                    name: client.name,
                    contactPerson: client.accountManager || "N/A",
                    email: client.email,
                    phone: client.phone,
                    clientType: client.clientType || "unknown",
                    status: client.status || "active",
                    eventsCount: events.length,
                    tags: client.tags || [],
                    avatar: client.avatar || null,
                    isNew: isNewClient(client.clientSince),
                    joinDate: client.clientSince,
                    lastEvent: lastEventDate,
                    address: {
                        city: client.address?.city || "",
                        country: client.address?.country || ""
                    },
                    organizationName: client.organizationName
                };
            })
        )
        res.status(200).json(enrichedClients);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Failed to fetch clients" });
    }
}

function isNewClient(date) {
    const joinDate = new Date(date);
    const now = new Date();
    const diffDays = (now - joinDate) / (1000 * 60 * 60 * 24);
    return diffDays <= 30;
}

export const singleClientWithStats = async (req, res) => {
    try {
        const userId = req.user._id;
        const clientId = req.params.id;

        const client = await Client.findOne({ _id: clientId, user: userId }).lean();
        if (!client) return res.status(404).json({ message: "Client not found" });

        const events = await Event.find({ client: clientId })

        const lastEventDate = events.reduce((latest, event) => {
            return !latest || new Date(event.date) > new Date(latest)
                ? event.date
                : latest;
        }, null)

        const enrichedClient = {
            id: client._id,
            name: client.name,
            contactPerson: client.contactPerson || "N/A",
            email: client.email,
            phone: client.phone,
            clientType: client.clientType || "unknown",
            status: client.status || "active",
            eventsCount: events.length,
            tags: client.tags || [],
            avatar: client.avatar || null,
            isNew: isNewClient(client.clientSince),
            joinDate: client.clientSince,
            lastEvent: lastEventDate,
            address: {
                city: client.address?.city || "",
                country: client.address?.country || ""
            },
            organizationName: client.organizationName
        };

        res.status(200).json(enrichedClient);


    } catch (error) {
        console.error(error.message)
        res.status(500).json({ message: "Failed to fetch the clients" })
    }
}
