/**
 * JSON Anonymizer for VSCode Extension
 * Pure TypeScript implementation
 */

export interface AnonymizerOptions {
    preserveTypes?: boolean;
    seed?: number;
    preserveKeys?: boolean;
    preserveArrayLength?: boolean;
}

export class JSONAnonymizer {
    private readonly chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    private readonly options: AnonymizerOptions;
    private seedCounter: number = 0;

    constructor(options: AnonymizerOptions = {}) {
        this.options = {
            preserveTypes: true,
            preserveKeys: true,
            preserveArrayLength: true,
            ...options
        };
        
        if (options.seed !== undefined) {
            this.seedCounter = options.seed;
        }
    }

    /**
     * Main entry point to anonymize any JSON value
     */
    public anonymize(value: any): any {
        return this.anonymizeValue(value);
    }

    /**
     * Generate a random character using a simple pseudo-random if seed is set
     */
    private getRandomChar(): string {
        if (this.options.seed !== undefined) {
            // Simple pseudo-random for reproducibility
            this.seedCounter = (this.seedCounter * 1103515245 + 12345) & 0x7fffffff;
            const index = this.seedCounter % this.chars.length;
            return this.chars[index];
        } else {
            // True random
            const index = Math.floor(Math.random() * this.chars.length);
            return this.chars[index];
        }
    }

    /**
     * Generate a random number in range using seed if available
     */
    private getRandomNumber(min: number, max: number): number {
        if (this.options.seed !== undefined) {
            this.seedCounter = (this.seedCounter * 1103515245 + 12345) & 0x7fffffff;
            const normalized = this.seedCounter / 0x7fffffff;
            return Math.floor(normalized * (max - min + 1)) + min;
        } else {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }

    /**
     * Anonymize a string value
     */
    private anonymizeString(value: string): string {
        if (!value) return value;
        
        // Preserve string length and generate random alphanumeric
        return Array.from(value)
            .map(char => {
                // Preserve spaces and special structural characters if needed
                if (char === ' ') return ' ';
                if (char === '-') return '-';
                if (char === '_') return '_';
                if (char === '@') return '@';
                if (char === '.') return '.';
                return this.getRandomChar();
            })
            .join('');
    }

    /**
     * Anonymize a number value
     */
    private anonymizeNumber(value: number): number {
        if (!this.options.preserveTypes) {
            // If not preserving types, this would be converted to string
            // But since we're preserving types by default, handle as number
            return this.anonymizeNumberInternal(value);
        }
        return this.anonymizeNumberInternal(value);
    }

    /**
     * Internal number anonymization logic
     */
    private anonymizeNumberInternal(value: number): number {
        if (value === 0) return 0;
        
        if (Number.isInteger(value)) {
            // For integers, generate random number with same number of digits
            const str = Math.abs(value).toString();
            const numDigits = str.length;
            const min = Math.pow(10, numDigits - 1);
            const max = Math.pow(10, numDigits) - 1;
            const randomNum = this.getRandomNumber(min, max);
            return value < 0 ? -randomNum : randomNum;
        } else {
            // For floats, randomize but keep similar magnitude
            const sign = value < 0 ? -1 : 1;
            const absValue = Math.abs(value);
            const magnitude = Math.pow(10, Math.floor(Math.log10(absValue)));
            
            // Generate random float in similar range
            if (this.options.seed !== undefined) {
                const normalized = this.getRandomNumber(100, 999) / 100;
                return sign * magnitude * normalized;
            } else {
                return sign * magnitude * (Math.random() * 10);
            }
        }
    }

    /**
     * Anonymize a boolean value
     */
    private anonymizeBoolean(): boolean {
        if (this.options.seed !== undefined) {
            return this.getRandomNumber(0, 1) === 1;
        }
        return Math.random() > 0.5;
    }

    /**
     * Recursively anonymize any value
     */
    private anonymizeValue(value: any): any {
        // Handle null
        if (value === null) {
            return null;
        }

        // Handle undefined
        if (value === undefined) {
            return undefined;
        }

        // Handle booleans
        if (typeof value === 'boolean') {
            return this.anonymizeBoolean();
        }

        // Handle strings
        if (typeof value === 'string') {
            return this.anonymizeString(value);
        }

        // Handle numbers
        if (typeof value === 'number') {
            return this.anonymizeNumber(value);
        }

        // Handle arrays
        if (Array.isArray(value)) {
            if (this.options.preserveArrayLength) {
                // Keep same array length, anonymize each element
                return value.map(item => this.anonymizeValue(item));
            } else {
                // Optionally change array length (not implemented in original)
                return value.map(item => this.anonymizeValue(item));
            }
        }

        // Handle objects
        if (typeof value === 'object' && value !== null) {
            const result: any = {};
            
            for (const key in value) {
                if (value.hasOwnProperty(key)) {
                    // Preserve keys by default, only anonymize values
                    const newKey = this.options.preserveKeys ? key : this.anonymizeString(key);
                    result[newKey] = this.anonymizeValue(value[key]);
                }
            }
            
            return result;
        }

        // Fallback for any other types
        return value;
    }

    /**
     * Validate JSON string before processing
     */
    public static validateJSON(jsonString: string): { valid: boolean; error?: string } {
        try {
            JSON.parse(jsonString);
            return { valid: true };
        } catch (error: any) {
            return { 
                valid: false, 
                error: error.message 
            };
        }
    }

    /**
     * Anonymize JSON string and return formatted string
     */
    public anonymizeJSON(jsonString: string, indent: number = 2): string {
        const data = JSON.parse(jsonString);
        const anonymized = this.anonymize(data);
        return JSON.stringify(anonymized, null, indent);
    }
}

// Export a factory function for convenient use
export function createAnonymizer(options?: AnonymizerOptions): JSONAnonymizer {
    return new JSONAnonymizer(options);
}
