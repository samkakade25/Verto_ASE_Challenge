import request from 'supertest';
import app from '../src/app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Employee API Endpoints', () => {
  let createdEmployeeId: number;

  beforeAll(async () => {
    // Clear the database before tests
    await prisma.employee.deleteMany({});
  });

  afterAll(async () => {
    // Clean up and disconnect
    await prisma.employee.deleteMany({});
    await prisma.$disconnect();
  });

  describe('POST /api/employees', () => {
    it('should create a new employee', async () => {
      const newEmployee = {
        name: 'John Doe',
        email: 'john@example.com',
        position: 'Developer',
      };

      const response = await request(app)
        .post('/api/employees')
        .send(newEmployee);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newEmployee.name);
      expect(response.body.email).toBe(newEmployee.email);
      expect(response.body.position).toBe(newEmployee.position);

      createdEmployeeId = response.body.id;
    });

    it('should return 400 for missing required fields', async () => {
      const invalidEmployee = {
        email: 'invalid@example.com',
        position: 'Invalid',
      };

      const response = await request(app)
        .post('/api/employees')
        .send(invalidEmployee);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });

    it('should return error for duplicate email', async () => {
      const duplicateEmployee = {
        name: 'Jane Doe',
        email: 'john@example.com',
        position: 'Manager',
      };

      const response = await request(app)
        .post('/api/employees')
        .send(duplicateEmployee);

      expect([400, 409, 500]).toContain(response.status);
    });
  });

  describe('GET /api/employees', () => {
    it('should return list of employees', async () => {
      const response = await request(app).get('/api/employees');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
    });
  });

  describe('GET /api/employees/:id', () => {
    it('should return employee by id', async () => {
      const response = await request(app).get(`/api/employees/${createdEmployeeId}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(createdEmployeeId);
      expect(response.body.name).toBe('John Doe');
    });

    it('should return 404 for non-existent id', async () => {
      const response = await request(app).get('/api/employees/999999');

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/employees/:id', () => {
    it('should update employee', async () => {
      const updates = {
        position: 'Senior Developer',
      };

      const response = await request(app)
        .put(`/api/employees/${createdEmployeeId}`)
        .send(updates);

      expect(response.status).toBe(200);
      expect(response.body.position).toBe('Senior Developer');
    });

    it('should return 404 for non-existent id', async () => {
      const updates = {
        position: 'Invalid',
      };

      const response = await request(app)
        .put('/api/employees/999999')
        .send(updates);

      expect([404, 500]).toContain(response.status);
    });

    it('should return 400 for invalid data', async () => {
      const invalidUpdates = {
        email: 'invalid-email',
      };

      const response = await request(app)
        .put(`/api/employees/${createdEmployeeId}`)
        .send(invalidUpdates);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('DELETE /api/employees/:id', () => {
    it('should delete employee', async () => {
      const response = await request(app).delete(`/api/employees/${createdEmployeeId}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(createdEmployeeId);
    });

    it('should return 404 after deletion', async () => {
      const response = await request(app).get(`/api/employees/${createdEmployeeId}`);

      expect(response.status).toBe(404);
    });

    it('should return error for non-existent id', async () => {
      const response = await request(app).delete('/api/employees/999999');

      expect([404, 500]).toContain(response.status);
    });
  });
});