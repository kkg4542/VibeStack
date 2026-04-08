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
      // Arrange
      const inputData = { name: 'John', age: 30 };
      
      // Act
      const result = validateRequest(schema, inputData);
      
      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(inputData);
      }
    });

    it('should fail validation for invalid data', () => {
      // Arrange
      const invalidData = { name: '', age: -1 };
      
      // Act
      const result = validateRequest(schema, invalidData);
      
      // Assert
      expect(result.success).toBe(false);
    });
  });

  describe('createErrorResponse', () => {
    it('should create error response with default status', () => {
      // Arrange
      const errorMessage = 'Test error';
      
      // Act
      const response = createErrorResponse(errorMessage);
      
      // Assert
      expect(response.status).toBe(400);
    });

    it('should create error response with custom status', () => {
      // Arrange
      const errorMessage = 'Not found';
      const customStatus = 404;
      
      // Act
      const response = createErrorResponse(errorMessage, customStatus);
      
      // Assert
      expect(response.status).toBe(customStatus);
    });
  });

  describe('createSuccessResponse', () => {
    it('should create success response with default status', () => {
      // Arrange
      const responseData = { data: 'test' };
      
      // Act
      const response = createSuccessResponse(responseData);
      
      // Assert
      expect(response.status).toBe(200);
    });

    it('should create success response with custom status', () => {
      // Arrange
      const responseData = { data: 'created' };
      const customStatus = 201;
      
      // Act
      const response = createSuccessResponse(responseData, customStatus);
      
      // Assert
      expect(response.status).toBe(customStatus);
    });
  });

  describe('formatZodError', () => {
    it('should format ZodError correctly', () => {
      // Arrange
      const schema = z.object({ name: z.string() });
      const invalidData = { name: 123 };
      
      // Act
      const result = schema.safeParse(invalidData);
      
      // Assert
      if (!result.success) {
        const formatted = formatZodError(result.error);
        expect(formatted).toHaveLength(1);
        expect(formatted[0].field).toBe('name');
        expect(formatted[0].message).toBeDefined();
      }
    });
  });
});
