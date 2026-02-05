import { describe, it, expect, beforeEach, vi } from 'vitest';
import { validateRequest, createErrorResponse, createSuccessResponse, formatZodError } from '@/lib/api-utils';
import { z } from 'zod';

describe('API Utils', () => {
  describe('validateRequest', () => {
    const schema = z.object({
      name: z.string().min(1),
      age: z.number().min(0),
    });

    it('should validate correct data', () => {
      const result = validateRequest(schema, { name: 'John', age: 30 });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual({ name: 'John', age: 30 });
      }
    });

    it('should fail validation for invalid data', () => {
      const result = validateRequest(schema, { name: '', age: -1 });
      expect(result.success).toBe(false);
    });
  });

  describe('createErrorResponse', () => {
    it('should create error response with default status', () => {
      const response = createErrorResponse('Test error');
      expect(response.status).toBe(400);
    });

    it('should create error response with custom status', () => {
      const response = createErrorResponse('Not found', 404);
      expect(response.status).toBe(404);
    });
  });

  describe('createSuccessResponse', () => {
    it('should create success response with default status', () => {
      const response = createSuccessResponse({ data: 'test' });
      expect(response.status).toBe(200);
    });

    it('should create success response with custom status', () => {
      const response = createSuccessResponse({ data: 'created' }, 201);
      expect(response.status).toBe(201);
    });
  });

  describe('formatZodError', () => {
    it('should format ZodError correctly', () => {
      const schema = z.object({ name: z.string() });
      const result = schema.safeParse({ name: 123 });
      
      if (!result.success) {
        const formatted = formatZodError(result.error);
        expect(formatted).toHaveLength(1);
        expect(formatted[0].field).toBe('name');
        expect(formatted[0].message).toBeDefined();
      }
    });
  });
});
