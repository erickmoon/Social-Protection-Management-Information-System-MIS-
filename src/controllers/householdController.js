const asyncHandler = require("express-async-handler");
const HouseholdHead = require("../models/HouseholdHead");

const getAll = asyncHandler(async (req, res) => {
  const { program_id, location_id } = req.query;

  // Convert query parameters to appropriate types
  const filters = {
    program_id: program_id ? parseInt(program_id) : undefined,
    location_id: location_id ? parseInt(location_id) : undefined
  };

  const households = await HouseholdHead.getAll(filters);
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
