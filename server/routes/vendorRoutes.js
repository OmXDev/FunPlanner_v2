import express from "express";
import { addVendor, getAllVendorsWithStats, getVendorStats, singleVendorWithStats } from "../controllers/vendor.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/add-vendor", isAuthenticated, addVendor);
router.get("/get-stats", isAuthenticated, getVendorStats);
router.get('/vendor-stats/:id',isAuthenticated, singleVendorWithStats)
router.get("/get-all-vendors", isAuthenticated, getAllVendorsWithStats);

export default router;