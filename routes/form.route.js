import { handleContactForm, handleBoostForm } from "../controllers/form.controller";
import express from express;


const router = express.Router();

router.post("/contact", handleContactForm);
router.post("/boost", handleBoostForm);

export default router;