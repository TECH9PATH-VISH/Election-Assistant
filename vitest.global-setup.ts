/**
 * @file vitest.global-setup.ts
 * @description Global setup for Vitest testing environment. 
 * Mocks global objects like Google Maps API to prevent actual network calls during tests.
 */

export function setup() {
  // Mock Google Maps API
  globalThis.google = {
    maps: {
      Animation: {
        DROP: 1,
        BOUNCE: 2,
      },
      // Add other required mock properties/functions here if needed
    } as any,
  } as any;
}

export function teardown() {
  // Clean up global mocks if necessary
  delete (globalThis as any).google;
}
