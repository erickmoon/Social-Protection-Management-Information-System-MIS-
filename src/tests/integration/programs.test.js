const request = require('supertest');
const app = require('../../server');
const db = require('../../config/database');

describe('Programs API', () => {
  const API_KEY = process.env.API_KEY;

  const sampleProgram = {
    name: 'Test Program',
    description: 'Test Description',
    budget: 100000,
    start_date: '2025-01-01',
    is_active: true
  };

  describe('GET /api/programs', () => {
    beforeEach(async () => {
      await db('programs').insert(sampleProgram);
    });

    it('should return all programs', async () => {
      const res = await request(app)
        .get('/api/programs')
        .set('x-api-key', API_KEY);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body[0].name).toBe(sampleProgram.name);
    });

    it('should return 401 without API key', async () => {
      const res = await request(app).get('/api/programs');
      expect(res.statusCode).toBe(401);
    });
  });

  describe('POST /api/programs', () => {
    it('should create a new program', async () => {
      const res = await request(app)
        .post('/api/programs')
        .set('x-api-key', API_KEY)
        .send(sampleProgram);

      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe(sampleProgram.name);
      expect(res.body.budget).toBe(sampleProgram.budget);
    });

    it('should return 400 for invalid data', async () => {
      const invalidProgram = { description: 'Missing required fields' };
      const res = await request(app)
        .post('/api/programs')
        .set('x-api-key', API_KEY)
        .send(invalidProgram);

      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /api/programs/:id', () => {
    let programId;

    beforeEach(async () => {
      const [program] = await db('programs')
        .insert(sampleProgram)
        .returning('*');
      programId = program.id;
    });

    it('should return a specific program', async () => {
      const res = await request(app)
        .get(`/api/programs/${programId}`)
        .set('x-api-key', API_KEY);

      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe(sampleProgram.name);
    });

    it('should return 404 for non-existent program', async () => {
      const res = await request(app)
        .get('/api/programs/99999')
        .set('x-api-key', API_KEY);

      expect(res.statusCode).toBe(404);
    });
  });

  describe('PUT /api/programs/:id', () => {
    let programId;

    beforeEach(async () => {
      const [program] = await db('programs')
        .insert(sampleProgram)
        .returning('*');
      programId = program.id;
    });

    it('should update a program', async () => {
      const updateData = { name: 'Updated Program Name' };
      const res = await request(app)
        .put(`/api/programs/${programId}`)
        .set('x-api-key', API_KEY)
        .send(updateData);

      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe(updateData.name);
    });
  });

  describe('DELETE /api/programs/:id', () => {
    let programId;

    beforeEach(async () => {
      const [program] = await db('programs')
        .insert(sampleProgram)
        .returning('*');
      programId = program.id;
    });

    it('should delete a program', async () => {
      const res = await request(app)
        .delete(`/api/programs/${programId}`)
        .set('x-api-key', API_KEY);

      expect(res.statusCode).toBe(200);
      
      // Verify deletion
      const program = await db('programs').where({ id: programId }).first();
      expect(program).toBeUndefined();
    });
  });
});