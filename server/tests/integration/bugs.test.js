const request = require('supertest');
const app = require('../../src/app');

describe('Bug API Endpoints', () => {
  describe('POST /api/bugs', () => {
    it('should create a new bug with valid data', async () => {
      const newBug = {
        title: 'Login button not working',
        description: 'The login button does not respond to clicks',
        priority: 'high'
      };

      const response = await request(app)
        .post('/api/bugs')
        .send(newBug);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(newBug.title);
      expect(response.body.status).toBe('open');
      expect(response.body.history).toHaveLength(1);
    });

    it('should return 400 if title is missing', async () => {
      const invalidBug = {
        description: 'Bug without title',
        priority: 'medium'
      };

      const response = await request(app)
        .post('/api/bugs')
        .send(invalidBug);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 if description is missing', async () => {
      const invalidBug = {
        title: 'Bug without description',
        priority: 'medium'
      };

      const response = await request(app)
        .post('/api/bugs')
        .send(invalidBug);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/bugs', () => {
    beforeEach(() => {
      // Create test bugs
      request(app)
        .post('/api/bugs')
        .send({ title: 'Bug 1', description: 'Desc 1', priority: 'high' });

      request(app)
        .post('/api/bugs')
        .send({ title: 'Bug 2', description: 'Desc 2', priority: 'low' });
    });

    it('should return all bugs', async () => {
      const response = await request(app).get('/api/bugs');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should filter bugs by status', async () => {
      // Create an open bug
      await request(app)
        .post('/api/bugs')
        .send({ title: 'Open Bug', description: 'Test', priority: 'high' });

      const response = await request(app)
        .get('/api/bugs')
        .query({ status: 'open' });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach(bug => {
        expect(bug.status).toBe('open');
      });
    });

    it('should sort bugs in descending order by default', async () => {
      const response = await request(app).get('/api/bugs');

      expect(response.status).toBe(200);
      if (response.body.length > 1) {
        for (let i = 1; i < response.body.length; i++) {
          const prev = new Date(response.body[i - 1].createdAt);
          const curr = new Date(response.body[i].createdAt);
          expect(prev.getTime()).toBeGreaterThanOrEqual(curr.getTime());
        }
      }
    });
  });

  describe('GET /api/bugs/:id', () => {
    it('should return a bug by ID', async () => {
      // Create a bug first
      const createRes = await request(app)
        .post('/api/bugs')
        .send({ title: 'Test Bug', description: 'Test', priority: 'high' });

      const bugId = createRes.body.id;

      const response = await request(app).get(`/api/bugs/${bugId}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(bugId);
      expect(response.body.title).toBe('Test Bug');
    });

    it('should return 404 for non-existent bug', async () => {
      const response = await request(app).get('/api/bugs/999999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('PUT /api/bugs/:id', () => {
    it('should update a bug', async () => {
      // Create a bug
      const createRes = await request(app)
        .post('/api/bugs')
        .send({ title: 'Original', description: 'Test', priority: 'low' });

      const bugId = createRes.body.id;

      const updates = {
        title: 'Updated Title',
        priority: 'high',
        status: 'in-progress'
      };

      const response = await request(app)
        .put(`/api/bugs/${bugId}`)
        .send(updates);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe(updates.title);
      expect(response.body.priority).toBe(updates.priority);
      expect(response.body.status).toBe(updates.status);
      expect(response.body.history.length).toBeGreaterThan(1);
    });

    it('should return 404 for non-existent bug', async () => {
      const response = await request(app)
        .put('/api/bugs/999999')
        .send({ title: 'Updated' });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/bugs/:id', () => {
    it('should delete a bug', async () => {
      // Create a bug
      const createRes = await request(app)
        .post('/api/bugs')
        .send({ title: 'To Delete', description: 'Test', priority: 'low' });

      const bugId = createRes.body.id;

      const response = await request(app).delete(`/api/bugs/${bugId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');

      // Verify it's deleted
      const getRes = await request(app).get(`/api/bugs/${bugId}`);
      expect(getRes.status).toBe(404);
    });

    it('should return 404 for non-existent bug', async () => {
      const response = await request(app).delete('/api/bugs/999999');

      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body.email).toBe(userData.email);
    });

    it('should not register user with missing fields', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ username: 'testuser' });

      expect(response.status).toBe(400);
    });

    it('should not register duplicate email', async () => {
      const userData = {
        username: 'user1',
        email: 'duplicate@example.com',
        password: 'pass123'
      };

      await request(app)
        .post('/api/auth/register')
        .send(userData);

      const response = await request(app)
        .post('/api/auth/register')
        .send({ ...userData, username: 'user2' });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create a user for login tests
      await request(app)
        .post('/api/auth/register')
        .send({
          username: 'logintest',
          email: 'login@example.com',
          password: 'password123'
        });
    });

    it('should login with correct credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.email).toBe('login@example.com');
    });

    it('should not login with incorrect password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
    });

    it('should not login with non-existent email', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/api/health');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('ok');
    });
  });
});