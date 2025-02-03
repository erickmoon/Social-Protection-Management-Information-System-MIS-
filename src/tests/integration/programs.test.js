const request = require("supertest");
const app = require("../../server");
const { knex } = require("../../config/database");

describe("Programs API", () => {
  const API_KEY = process.env.API_KEY;

  const sampleProgram = {
    name: "Test Program",
    description: "Test Description",
    budget: 100000,
    start_date: "2025-01-01",
    is_active: true
  };

  describe("GET /api/programs", () => {
    beforeEach(async () => {
      await knex("programs").insert(sampleProgram);
    });

    it("should return all programs", async () => {
      const res = await request(app)
        .get("/api/programs")
        .set("x-api-key", API_KEY);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body[0].name).toBe(sampleProgram.name);
    });

    it("should return 401 without API key", async () => {
      const res = await request(app).get("/api/programs");

      expect(res.statusCode).toBe(401);
    });
  });

  describe("POST /api/programs", () => {
    it("should create a new program", async () => {
      const res = await request(app)
        .post("/api/programs")
        .set("x-api-key", API_KEY)
        .send(sampleProgram);

      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe(sampleProgram.name);
    });
  });
});
