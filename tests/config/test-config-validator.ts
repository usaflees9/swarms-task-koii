import Ajv from 'ajv';
import { TestConfigSchema } from './test-config.types';
import testConfigSchema from './test-config.schema.json';

export class TestConfigValidator {
    private ajv: Ajv;

    constructor() {
        this.ajv = new Ajv({ 
            allErrors: true,
            strict: true
        });
    }

    /**
     * Validates a test configuration against the schema
     * @param config - Test configuration to validate
     * @returns boolean indicating validation status
     * @throws ValidationError if validation fails
     */
    validate(config: TestConfigSchema): boolean {
        const validate = this.ajv.compile(testConfigSchema);
        const isValid = validate(config);

        if (!isValid) {
            const errors = validate.errors?.map(err => 
                `${err.instancePath}: ${err.message}`
            ).join('; ');
            
            throw new Error(`Test configuration validation failed: ${errors}`);
        }

        return true;
    }

    /**
     * Provides detailed validation errors
     * @param config - Test configuration to validate
     * @returns Array of validation error messages
     */
    getValidationErrors(config: TestConfigSchema): string[] {
        const validate = this.ajv.compile(testConfigSchema);
        validate(config);

        return validate.errors?.map(err => 
            `${err.instancePath}: ${err.message}`
        ) || [];
    }
}

export default new TestConfigValidator();