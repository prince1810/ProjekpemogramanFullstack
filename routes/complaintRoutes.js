const express = require("express");
const router = express.Router();

const controller = require("../controllers/complaintController");

router.get("/complaints", controller.getComplaints);
router.post("/complaints", controller.createComplaint);

router.put("/complaints/:id", controller.updateStatus);

module.exports = router;