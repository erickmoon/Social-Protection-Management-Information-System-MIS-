const createTestProgram = async (knex, data = {}) => {
  const [program] = await knex("programs")
    .insert({
      name: "Test Program",
      description: "Test Description",
      budget: 100000,
      start_date: "2025-01-01",
      is_active: true,
      ...data
    })
    .returning("*");
  return program;
};

const createTestLocation = async (knex, data = {}) => {
  const [location] = await knex("locations")
    .insert({
      county: "Test County",
      sub_county: "Test Sub County",
      location: "Test Location",
      sub_location: "Test Sub Location",
      ...data
    })
    .returning("*");
  return location;
};

module.exports = {
  createTestProgram,
  createTestLocation
};
