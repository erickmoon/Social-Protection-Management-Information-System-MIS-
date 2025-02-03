const express = require("express");
const router = express.Router();

const programRoutes = require("./programs");
const locationRoutes = require("./locations");
const householdRoutes = require("./households");
const memberRoutes = require("./members");

router.use("/programs", programRoutes);
router.use("/locations", locationRoutes);
router.use("/households", householdRoutes);
router.use("/members", memberRoutes);

// API Health check
router.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

module.exports = router;
