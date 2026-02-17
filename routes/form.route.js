import express from "express";
import {
  handleContactForm,
  handleBoostForm,
} from "../controllers/form.controller.js";

const router = express.Router();

router.post("/contact", handleContactForm);
router.post("/boost", handleBoostForm);

export default router;
