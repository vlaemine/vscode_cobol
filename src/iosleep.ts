/**
 * Central configuration for file I/O sleep delays
 * 
 * This module provides configurable sleep delays after file I/O operations
 * to simulate or throttle file system access.
 */

/**
 * Configuration for I/O sleep delays (in milliseconds)
 */
export const IOSleepConfig = {
    /** Delay after file system operations (default: 0 ms) */
    delayMs: 0,

    /**
     * Set the delay for file I/O operations
     * @param delayMs Delay in milliseconds
     */
    setDelay(delayMs: number): void {
        this.delayMs = Math.max(0, delayMs);
    },

    /**
     * Get the current delay setting
     * @returns Delay in milliseconds
     */
    getDelay(): number {
        return this.delayMs;
    },
};

/**
 * Sleep for the configured delay duration
 * @returns Promise that resolves after the delay
 */
export async function ioSleep(): Promise<void> {
    const delay = IOSleepConfig.getDelay();
    if (delay > 0) {
        return new Promise(resolve => setTimeout(resolve, delay));
    }
}

/**
 * Synchronous sleep for the configured delay duration
 * @returns void
 */
export function ioSleepSync(): void {
    const delay = IOSleepConfig.getDelay();
    if (delay > 0) {
        // For synchronous sleep, we use Atomics.wait as a fallback
        // In most cases, you should use async versions instead
        try {
            Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, delay);
        } catch {
            // If Atomics.wait fails, fall back to busy-wait (less ideal but works)
            const now = Date.now();
            while (Date.now() - now < delay) {
                // busy-wait
            }
        }
    }
}
