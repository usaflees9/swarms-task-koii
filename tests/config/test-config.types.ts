export type TestEnvironmentConfig = {
    [key: string]: any;
};

export type TestRunnerConfig = {
    name: 'jest' | 'pytest' | 'vitest' | 'mocha';
    configuration?: Record<string, any>;
};

export type MockService = {
    name: string;
    type: string;
};

export interface TestConfigSchema {
    testSuite: {
        name: string;
        description?: string;
        version?: string;
    };
    testTypes: Array<'unit' | 'integration' | 'e2e' | 'performance' | 'security' | 'regression'>;
    testEnvironments?: {
        development?: TestEnvironmentConfig;
        staging?: TestEnvironmentConfig;
        production?: TestEnvironmentConfig;
    };
    testCoverage?: {
        minCoveragePercent?: number;
        excludePaths?: string[];
    };
    testRunners?: TestRunnerConfig[];
    dependencies?: {
        mockServices?: MockService[];
        requiredServices?: string[];
    };
}