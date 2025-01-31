import {Router} from "express";
import {mockFeatureControlProvider, mockUser} from "../module/restfulModule/index.js";

const router = Router();

// Define custom base path for REST API
export const basePath = "/Framework";

// Sample data

// POST /api/users - Create a new user
router.post("/Main/GetFeatures", (req, res) => {

    const mockData = mockFeatureControlProvider
    res.status(200).json(mockData);
});

router.post("/Info/GetRole", (req, res) => {
    res.status(200).json(mockUser);
});


export default router;
