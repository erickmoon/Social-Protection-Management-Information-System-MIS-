const express = require("express");
const router = express.Router();
const programController = require("../controllers/programController");

router.get("/", programController.getAll);
router.get("/:id", programController.getById);
router.post("/", programController.create);
router.put("/:id", programController.update);
router.delete("/:id", programController.remove);

module.exports = router;
