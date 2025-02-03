const asyncHandler = require("express-async-handler");
const HouseholdMember = require("../models/HouseholdMember");

const getAll = asyncHandler(async (req, res) => {
  const { household_head_id, is_student } = req.query;

  // Convert query parameters to appropriate types
  const filters = {
    household_head_id: household_head_id
      ? parseInt(household_head_id)
      : undefined,
    is_student:
      is_student !== undefined
        ? is_student === "true" || is_student === "1"
        : undefined
  };

  const members = await HouseholdMember.getAll(filters);
  res.json(members);
});

const getById = asyncHandler(async (req, res) => {
  const member = await HouseholdMember.getById(req.params.id);
  if (!member) {
    res.status(404).json({ message: "Member not found" });
    return;
  }
  res.json(member);
});

const create = asyncHandler(async (req, res) => {
  const member = await HouseholdMember.create(req.body);
  res.status(201).json(member);
});

const update = asyncHandler(async (req, res) => {
  const member = await HouseholdMember.update(req.params.id, req.body);
  if (!member) {
    res.status(404).json({ message: "Member not found" });
    return;
  }
  res.json(member);
});

const remove = asyncHandler(async (req, res) => {
  const deleted = await HouseholdMember.delete(req.params.id);
  if (!deleted) {
    res.status(404).json({ message: "Member not found" });
    return;
  }
  res.json({ message: "Member deleted successfully" });
});

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
