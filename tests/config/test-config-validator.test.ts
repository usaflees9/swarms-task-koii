import { describe, it, expect } from 'vitest';
import { TestConfigValidator } from './test-config-validator';
import { TestConfigSchema } from './test-config.types';

describe('Test Configuration Validator', () => {
    const validator = new TestConfigValidator();

    const validConfig: TestConfigSchema = {
        testSuite: {
            name: 'Core System Tests',
            description: 'Comprehensive test suite for distributed system',
            version: '1.0.0'
        },
        testTypes: ['unit', 'integration'],
        testEnvironments: {
            development: {
                timeout: 5000
            }
        },
        testCoverage: {
            minCoveragePercent: 85,
            excludePaths: ['tests/*']
        },
        testRunners: [{
            name: 'vitest',
            configuration: {
                watch: false
            }
        }],
        dependencies: {
            mockServices: [{
                name: 'database',
                type: 'mock'
            }],
            requiredServices: ['authentication']
        }
    };

    it('should validate a correct configuration', () => {
        expect(() => validator.validate(validConfig)).not.toThrow();
    });

    it('should require testSuite name', () => {
        const invalidConfig = { ...validConfig, testSuite: {} };
        expect(() => validator.validate(invalidConfig)).toThrow();
    });

    it('should not allow unknown properties', () => {
        const invalidConfig = { 
            ...validConfig, 
            unknownProperty: 'test' 
        } as TestConfigSchema;
        expect(() => validator.validate(invalidConfig)).toThrow();
    });

    it('should validate test types', () => {
        const validTypes: TestConfigSchema = {
            ...validConfig,
            testTypes: ['unit', 'integration', 'e2e', 'performance']
        };
        expect(() => validator.validate(validTypes)).not.toThrow();
    });

    it('should throw on invalid test types', () => {
        const invalidTypes = { 
            ...validConfig, 
            testTypes: ['invalid-type'] 
        } as TestConfigSchema;
        expect(() => validator.validate(invalidTypes)).toThrow();
    });
});