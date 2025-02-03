const express = require("express");
const router = express.Router();
const householdController = require("../controllers/householdController");

router.get("/", householdController.getAll);
router.get("/:id", householdController.getById);
router.post("/", householdController.create);
router.put("/:id", householdController.update);
router.delete("/:id", householdController.remove);

module.exports = router;
