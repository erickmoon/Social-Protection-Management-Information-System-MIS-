const asyncHandler = require('express-async-handler');
const Location = require('../models/Location');

const getAll = asyncHandler(async (req, res) => {
  const locations = await Location.getAll();
  res.json(locations);
});

const getById = asyncHandler(async (req, res) => {
  const location = await Location.getById(req.params.id);
  if (!location) {
    res.status(404).json({ message: 'Location not found' });
    return;
  }
  res.json(location);
});

const create = asyncHandler(async (req, res) => {
  const location = await Location.create(req.body);
  res.status(201).json(location);
});

const update = asyncHandler(async (req, res) => {
  const location = await Location.update(req.params.id, req.body);
  if (!location) {
    res.status(404).json({ message: 'Location not found' });
    return;
  }
  res.json(location);
});

const remove = asyncHandler(async (req, res) => {
  const deleted = await Location.delete(req.params.id);
  if (!deleted) {
    res.status(404).json({ message: 'Location not found' });
    return;
  }
  res.json({ message: 'Location deleted successfully' });
});

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};