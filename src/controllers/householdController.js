const asyncHandler = require("express-async-handler");
const HouseholdHead = require("../models/HouseholdHead");

const getAll = asyncHandler(async (req, res) => {
  const households = await HouseholdHead.getAll();
  res.json(households);
});

const getById = asyncHandler(async (req, res) => {
  const household = await HouseholdHead.getById(req.params.id);
  if (!household) {
    res.status(404).json({ message: "Household not found" });
    return;
  }
  res.json(household);
});

const create = asyncHandler(async (req, res) => {
  const household = await HouseholdHead.create(req.body);
  res.status(201).json(household);
});

const update = asyncHandler(async (req, res) => {
  const household = await HouseholdHead.update(req.params.id, req.body);
  if (!household) {
    res.status(404).json({ message: "Household not found" });
    return;
  }
  res.json(household);
});

const remove = asyncHandler(async (req, res) => {
  const deleted = await HouseholdHead.delete(req.params.id);
  if (!deleted) {
    res.status(404).json({ message: "Household not found" });
    return;
  }
  res.json({ message: "Household deleted successfully" });
});

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
