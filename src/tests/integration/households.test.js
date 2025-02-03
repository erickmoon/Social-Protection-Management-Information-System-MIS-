const request = require('supertest');
const app = require('../../server');
const db = require('../../config/database');

describe('Households API', () => {
  const API_KEY = process.env.API_KEY;

  let programId, locationId;
  const sampleHousehold = {
    full_name: 'Test Person',
    id_number: 'TEST001',
    phone_number: '+254700000099',
    gender: 'Male',
    date_of_birth: '1990-01-01'
  };

  beforeEach(async () => {
    // Create required foreign keys
    const [program] = await db('programs')
      .insert({
        name: 'Test Program',
        description: 'Test Description'
      })
      .returning('*');
    programId = program.id;

    const [location] = await db('locations')
      .insert({
        county: 'Test County',
        sub_county: 'Test Sub County',
        location: 'Test Location',
        sub_location: 'Test Sub Location'
      })
      .returning('*');
    locationId = location.id;

    sampleHousehold.program_id = programId;
    sampleHousehold.location_id = locationId;
  });

  describe('GET /api/households', () => {
    beforeEach(async () => {
      await db('household_heads').insert(sampleHousehold);
    });

    it('should return all households with decrypted phone numbers', async () => {
      const res = await request(app)
        .get('/api/households')
        .set('x-api-key', API_KEY);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body[0].phone_number).toBe(sampleHousehold.phone_number);
    });
  });

  describe('POST /api/households', () => {
    it('should create a new household', async () => {
      const res = await request(app)
        .post('/api/households')
        .set('x-api-key', API_KEY)
        .send(sampleHousehold);

      expect(res.statusCode).toBe(201);
      expect(res.body.full_name).toBe(sampleHousehold.full_name);
      expect(res.body.phone_number).toBe(sampleHousehold.phone_number);
    });
  });

  describe('GET /api/households/:id', () => {
    let householdId;

    beforeEach(async () => {
      const [household] = await db('household_heads')
        .insert(sampleHousehold)
        .returning('*');
      householdId = household.id;
    });

    it('should return a specific household', async () => {
      const res = await request(app)
        .get(`/api/households/${householdId}`)
        .set('x-api-key', API_KEY);

      expect(res.statusCode).toBe(200);
      expect(res.body.id_number).toBe(sampleHousehold.id_number);
    });
  });
});