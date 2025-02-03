const request = require('supertest');
const app = require('../../server');
const db = require('../../config/database');

describe('Locations API', () => {
  const API_KEY = process.env.API_KEY;

  const sampleLocation = {
    county: 'Test County',
    sub_county: 'Test Sub County',
    location: 'Test Location',
    sub_location: 'Test Sub Location',
    ward: 'Test Ward',
    latitude: -1.2921,
    longitude: 36.8219
  };

  describe('GET /api/locations', () => {
    beforeEach(async () => {
      await db('locations').insert(sampleLocation);
    });

    it('should return all locations', async () => {
      const res = await request(app)
        .get('/api/locations')
        .set('x-api-key', API_KEY);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body[0].county).toBe(sampleLocation.county);
    });
  });

  describe('POST /api/locations', () => {
    it('should create a new location', async () => {
      const res = await request(app)
        .post('/api/locations')
        .set('x-api-key', API_KEY)
        .send(sampleLocation);

      expect(res.statusCode).toBe(201);
      expect(res.body.county).toBe(sampleLocation.county);
    });

    it('should validate required fields', async () => {
      const invalidLocation = { county: 'Test County' };
      const res = await request(app)
        .post('/api/locations')
        .set('x-api-key', API_KEY)
        .send(invalidLocation);

      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /api/locations/:id', () => {
    let locationId;

    beforeEach(async () => {
      const [location] = await db('locations')
        .insert(sampleLocation)
        .returning('*');
      locationId = location.id;
    });

    it('should return a specific location', async () => {
      const res = await request(app)
        .get(`/api/locations/${locationId}`)
        .set('x-api-key', API_KEY);

      expect(res.statusCode).toBe(200);
      expect(res.body.county).toBe(sampleLocation.county);
    });
  });

  describe('PUT /api/locations/:id', () => {
    let locationId;

    beforeEach(async () => {
      const [location] = await db('locations')
        .insert(sampleLocation)
        .returning('*');
      locationId = location.id;
    });

    it('should update a location', async () => {
      const updateData = { ward: 'Updated Ward' };
      const res = await request(app)
        .put(`/api/locations/${locationId}`)
        .set('x-api-key', API_KEY)
        .send(updateData);

      expect(res.statusCode).toBe(200);
      expect(res.body.ward).toBe(updateData.ward);
    });
  });

  describe('DELETE /api/locations/:id', () => {
    let locationId;

    beforeEach(async () => {
      const [location] = await db('locations')
        .insert(sampleLocation)
        .returning('*');
      locationId = location.id;
    });

    it('should delete a location', async () => {
      const res = await request(app)
        .delete(`/api/locations/${locationId}`)
        .set('x-api-key', API_KEY);

      expect(res.statusCode).toBe(200);
    });
  });
});