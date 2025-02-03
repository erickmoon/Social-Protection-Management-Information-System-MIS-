const request = require("supertest");
const app = require("../../server");
const { knex } = require("../../config/database");

describe("Households API", () => {
  const API_KEY = process.env.API_KEY;

  let programId, locationId;
  const sampleHousehold = {
    full_name: "Test Person",
    id_number: "TEST001",
    phone_number: "+254700000099",
    gender: "Male",
    date_of_birth: "1990-01-01"
  };

  beforeEach(async () => {
    // Create required foreign keys
    [programId] = await knex("programs")
      .insert({
        name: "Test Program",
        description: "Test Description"
      })
      .returning("id");

    [locationId] = await knex("locations")
      .insert({
        county: "Test County",
        sub_county: "Test Sub County",
        location: "Test Location",
        sub_location: "Test Sub Location"
      })
      .returning("id");

    sampleHousehold.program_id = programId;
    sampleHousehold.location_id = locationId;
  });

  describe("GET /api/households", () => {
    beforeEach(async () => {
      await knex("household_heads").insert(sampleHousehold);
    });

    it("should return all households with decrypted phone numbers", async () => {
      const res = await request(app)
        .get("/api/households")
        .set("x-api-key", API_KEY);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body[0].phone_number).toBe(sampleHousehold.phone_number);
    });
  });
});
