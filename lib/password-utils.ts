/**
 * Password generation and entropy calculation utilities
 * Based on cryptographic research and NIST 800-63B guidelines
 */

export const CHARACTER_SETS = {
    UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    LOWERCASE: 'abcdefghijklmnopqrstuvwxyz',
    NUMBERS: '0123456789',
    SYMBOLS: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  } as const;
  
  export const PASSWORD_CONFIG = {
    MIN_LENGTH: 8,
    MAX_LENGTH: 64,
    DEFAULT_LENGTH: 16,
    SALT_LENGTH: 16,
    MIN_ENTROPY_BITS: 60, // NIST recommendation
  } as const;
  
  export const ENTROPY_THRESHOLDS = {
    WEAK: 30,
    MODERATE: 50,
    STRONG: 70,
  } as const;
  
  export interface PasswordGeneratorOptions {
    length: number;
    includeUppercase: boolean;
    includeLowercase: boolean;
    includeNumbers: boolean;
    includeSymbols: boolean;
  }
  
  export interface PasswordResult {
    password: string;
    entropy: number;
    characterPoolSize: number;
  }
  
  /**
   * Builds character pool based on selected character types
   */
  export function buildCharacterPool(options: PasswordGeneratorOptions): string {
    let pool = '';
  
    if (options.includeUppercase) pool += CHARACTER_SETS.UPPERCASE;
    if (options.includeLowercase) pool += CHARACTER_SETS.LOWERCASE;
    if (options.includeNumbers) pool += CHARACTER_SETS.NUMBERS;
    if (options.includeSymbols) pool += CHARACTER_SETS.SYMBOLS;
  
    return pool;
  }
  
  /**
   * Calculates entropy using Shannon's formula: H = log₂(R^n)
   * Where R is the character pool size and n is password length
   *
   * @param poolSize - Size of character pool
   * @param passwordLength - Length of password
   * @returns Entropy in bits
   */
  export function calculateEntropy(poolSize: number, passwordLength: number): number {
    if (poolSize === 0 || passwordLength === 0) return 0;
    return Math.log2(Math.pow(poolSize, passwordLength));
  }
  
  /**
   * Gets strength label based on entropy bits
   */
  export function getStrengthLabel(entropy: number): string {
    if (entropy < ENTROPY_THRESHOLDS.WEAK) return 'Weak';
    if (entropy < ENTROPY_THRESHOLDS.MODERATE) return 'Moderate';
    if (entropy < ENTROPY_THRESHOLDS.STRONG) return 'Strong';
    return 'Very Strong';
  }
  
  /**
   * Gets color gradient based on entropy level
   */
  export function getEntropyColor(entropy: number): string {
    if (entropy < ENTROPY_THRESHOLDS.WEAK) return 'from-red-500 to-red-600';
    if (entropy < ENTROPY_THRESHOLDS.MODERATE) return 'from-yellow-500 to-yellow-600';
    if (entropy < ENTROPY_THRESHOLDS.STRONG) return 'from-blue-500 to-blue-600';
    return 'from-accent to-green-600';
  }
  
  /**
   * Gets visual percentage for progress bar (capped at 100%)
   */
  export function getEntropyPercentage(entropy: number): number {
    return Math.min((entropy / 100) * 100, 100);
  }
  
  /**
   * Validates password generator options
   */
  export function validatePasswordOptions(options: PasswordGeneratorOptions): { valid: boolean; error?: string } {
    if (options.length < PASSWORD_CONFIG.MIN_LENGTH || options.length > PASSWORD_CONFIG.MAX_LENGTH) {
      return {
        valid: false,
        error: `Password length must be between ${PASSWORD_CONFIG.MIN_LENGTH} and ${PASSWORD_CONFIG.MAX_LENGTH}`,
      };
    }
  
    const hasAtLeastOneType =
      options.includeUppercase ||
      options.includeLowercase ||
      options.includeNumbers ||
      options.includeSymbols;
  
    if (!hasAtLeastOneType) {
      return {
        valid: false,
        error: 'Please select at least one character type',
      };
    }
  
    return { valid: true };
  }
  
  /**
   * Fisher-Yates shuffle algorithm for randomization
   */
  function shuffleArray(array: string[]): string[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  
  /**
   * Generates a strong password with guaranteed character type diversity
   * Uses entropy-based generation following NIST 800-63B principles
   */
  export function generatePassword(options: PasswordGeneratorOptions): PasswordResult {
    // Validate options
    const validation = validatePasswordOptions(options);
    if (!validation.valid) {
      throw new Error(validation.error);
    }
  
    const pool = buildCharacterPool(options);
    const entropy = calculateEntropy(pool.length, options.length);
  
    // Ensure at least one character from each enabled type
    const guaranteedChars: string[] = [];
  
    if (options.includeUppercase) {
      guaranteedChars.push(CHARACTER_SETS.UPPERCASE[Math.floor(Math.random() * CHARACTER_SETS.UPPERCASE.length)]);
    }
    if (options.includeLowercase) {
      guaranteedChars.push(CHARACTER_SETS.LOWERCASE[Math.floor(Math.random() * CHARACTER_SETS.LOWERCASE.length)]);
    }
    if (options.includeNumbers) {
      guaranteedChars.push(CHARACTER_SETS.NUMBERS[Math.floor(Math.random() * CHARACTER_SETS.NUMBERS.length)]);
    }
    if (options.includeSymbols) {
      guaranteedChars.push(CHARACTER_SETS.SYMBOLS[Math.floor(Math.random() * CHARACTER_SETS.SYMBOLS.length)]);
    }
  
    // Fill remaining length with random characters from pool
    const remainingLength = options.length - guaranteedChars.length;
    const randomChars: string[] = Array.from({ length: remainingLength }, () => pool[Math.floor(Math.random() * pool.length)]);
  
    // Combine and shuffle
    const allChars = [...guaranteedChars, ...randomChars];
    const shuffled = shuffleArray(allChars);
    const password = shuffled.join('');
  
    return {
      password,
      entropy,
      characterPoolSize: pool.length,
    };
  }
  
  /**
   * Generates a random salt for additional entropy
   * Used in conjunction with passwords for cryptographic operations
   */
  export function generateSalt(length: number = PASSWORD_CONFIG.SALT_LENGTH): string {
    const charset = CHARACTER_SETS.UPPERCASE + CHARACTER_SETS.LOWERCASE + CHARACTER_SETS.NUMBERS + CHARACTER_SETS.SYMBOLS;
    let salt = '';
  
    for (let i = 0; i < length; i++) {
      salt += charset[Math.floor(Math.random() * charset.length)];
    }
  
    return salt;
  }
  
  /**
   * Validates salt input
   */
  export function validateSalt(salt: string): { valid: boolean; error?: string } {
    if (salt.length === 0) {
      return { valid: true }; // Empty salt is allowed
    }
  
    if (salt.length < 4) {
      return {
        valid: false,
        error: 'Salt should be at least 4 characters',
      };
    }
  
    if (salt.length > 256) {
      return {
        valid: false,
        error: 'Salt should not exceed 256 characters',
      };
    }
  
    return { valid: true };
  }
  