const asyncHandler = require("express-async-handler");
const Program = require("../models/Program");

const getAll = asyncHandler(async (req, res) => {
  const programs = await Program.getAll();
  res.json(programs);
});

const getById = asyncHandler(async (req, res) => {
  const program = await Program.getById(req.params.id);
  if (!program) {
    res.status(404).json({ message: "Program not found" });
    return;
  }
  res.json(program);
});

const create = asyncHandler(async (req, res) => {
  const program = await Program.create(req.body);
  res.status(201).json(program);
});

const update = asyncHandler(async (req, res) => {
  const program = await Program.update(req.params.id, req.body);
  if (!program) {
    res.status(404).json({ message: "Program not found" });
    return;
  }
  res.json(program);
});

const remove = asyncHandler(async (req, res) => {
  const deleted = await Program.delete(req.params.id);
  if (!deleted) {
    res.status(404).json({ message: "Program not found" });
    return;
  }
  res.json({ message: "Program deleted successfully" });
});

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
