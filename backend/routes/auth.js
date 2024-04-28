import express from "express";
import { getMe, login, logout, signup } from "../controllers/auth.js";
import {body} from "express-validator";
import { protectRoute } from "../middleware/protectRoute.js";

const router=express.Router();
router.get("/me",protectRoute,  getMe);
router.post("/signup", [body('email').isEmail().withMessage('Invalid email address'),],signup);
router.post("/login",login);
router.post("/logout",logout);
export default router;