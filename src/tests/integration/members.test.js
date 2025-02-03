const request = require('supertest');
const app = require('../../server');
const db = require('../../config/database');

describe('Members API', () => {
  const API_KEY = process.env.API_KEY;

  let householdHeadId;
  const sampleMember = {
    full_name: 'Test Member',
    age: 15,
    gender: 'Female',
    relationship: 'Daughter',
    date_of_birth: '2010-01-01',
    is_student: true
  };

  beforeEach(async () => {
    // Create required household head
    const [head] = await db('household_heads')
      .insert({
        full_name: 'Test Head',
        id_number: 'TEST001',
        phone_number: '+254700000001',
        gender: 'Male',
        date_of_birth: '1980-01-01'
      })
      .returning('*');
    householdHeadId = head.id;

    sampleMember.household_head_id = householdHeadId;
  });

  describe('GET /api/members', () => {
    beforeEach(async () => {
      await db('household_members').insert(sampleMember);
    });

    it('should return all members', async () => {
      const res = await request(app)
        .get('/api/members')
        .set('x-api-key', API_KEY);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body[0].full_name).toBe(sampleMember.full_name);
    });
  });

  describe('POST /api/members', () => {
    it('should create a new member', async () => {
      const res = await request(app)
        .post('/api/members')
        .set('x-api-key', API_KEY)
        .send(sampleMember);

      expect(res.statusCode).toBe(201);
      expect(res.body.full_name).toBe(sampleMember.full_name);
    });
  });

  describe('PUT /api/members/:id', () => {
    let memberId;

    beforeEach(async () => {
      const [member] = await db('household_members')
        .insert(sampleMember)
        .returning('*');
      memberId = member.id;
    });

    it('should update a member', async () => {
      const updateData = { age: 16 };
      const res = await request(app)
        .put(`/api/members/${memberId}`)
        .set('x-api-key', API_KEY)
        .send(updateData);

      expect(res.statusCode).toBe(200);
      expect(res.body.age).toBe(updateData.age);
    });
  });
});