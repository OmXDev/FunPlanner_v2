import mongoose from "mongoose";
import Event from "../models/event.model.js";
import Vendor from "../models/vendor.model.js";

export const addVendor = async (req, res) => {
    try {
        const { name, category,address, contactPerson, status, phone, email} = req.body;
         const { addressLine1, city, postalCode, country } = address;

        const userId = req.user._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                msg: "Unauthorized : User Id not found."
            });
        }

        const vendor = new Vendor({
            user: userId,
            name,
            category,
            contactPerson,
            status,
            phone,
            email,
            address: {
                addressLine1,
                city,
                postalCode,
                country,
            },
        });

        await vendor.save();
        res.status(201).json({
            success: true,
            message: 'Vendor added successfully',
            vendor,
        });
    } catch (error) {
        console.error('Create vendor error:', error.message);
        res.status(400).json({
            success: false,
            message: 'Failed to add Vendor',
            error: error.message,
        });
    }
};


export const getVendorStats = async (req, res) => {
    try {
        const userId = req.user._id;
        const vendorId = req.params.id;

        const [totalVendors, activeVendors, pendingVendors, flaggedVendors] = await Promise.all([
            Vendor.countDocuments({ user: userId }),
            Vendor.countDocuments({ user: userId, status: 'Active' }),
            Vendor.countDocuments({ user: userId, status: 'Pending' }),
            Vendor.countDocuments({ user: userId, status: 'Flagged' }),
        ]);

        res.status(200).json({
            totalVendors,
            activeVendors,
            pendingVendors,
            flaggedVendors,
            vendorId,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch stats" });
    }
};

export const getAllVendorsWithStats = async (req, res) => {
    try {
        const userId = req.user._id;
        const vendorId = req.params.id;

        const vendors = await Vendor.find({ vendor:vendorId ,user: userId }).lean();

        const simplifiedVendors = vendors.map(vendor => ({
            id: vendor._id,
            name: vendor.name,
            email: vendor.email,
            category: vendor.category,
            contact: vendor.contactPerson,
            status: vendor.status,
            rating: vendor.rating || 0,
            services: vendor.services || ['TBD'],
            recentEvents: vendor.recentEvents || ['TBD'],
            documents: vendor.documents || ['TBD'],
            address: {
                city: vendor.address?.city || "",
                country: vendor.address?.country || ""
            },
            
        }));

        return res.status(200).json(simplifiedVendors);
    } catch (error) {
        console.error("Error fetching events:", error.message);
        return res.status(500).json({ error: "Failed to load events" });
    }
};

export const singleVendorWithStats = async (req, res) => {
    try {
        const userId = req.user._id;
        const vendorId = req.params.id;

        if (!vendorId || !mongoose.Types.ObjectId.isValid(vendorId)) {
      return res.status(400).json({ message: "Invalid or missing vendor ID" });
    }

        const vendor = await Vendor.findOne({ _id: vendorId, user: userId}).lean();
        if (!vendor) return res.status(404).json({ message: "Vendor not found" });

        const events = await Event.find({ vendor: vendorId })


        const enrichedVendor = {
            id: vendorId,
            name: vendor.name,
            contactPerson: vendor.contactPerson || "N/A",
            email: vendor.email,
            phone: vendor.phone,
            category: vendor.category || "unknown",
            status: vendor.status || "active",
            eventsCount: events.length,
            address: {
                city: vendor.address?.city || "",
                country: vendor.address?.country || ""
            },
            joinDate:vendor.memberSince,
        };

        res.status(200).json(enrichedVendor);


    } catch (error) {
        console.error(error.message)
        res.status(500).json({message:"Failed to fetch the Vendor"})
    }
}
