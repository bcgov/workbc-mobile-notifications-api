import * as express from "express";
import * as messagingController from "../controllers/messaging.controller";
export const router = express.Router();

router.post("/send", messagingController.sendMessage)

module.exports = router