// Patch to prevent "Cannot set property 'fetch' of #<Window> which has only a getter"
// This can occur in certain sandboxed iframe environments when polyfills
// attempt to assign directly to window.fetch or globalThis.fetch.

try {
  const originalFetch = window.fetch;
  if (originalFetch) {
    // Try to redefine the property to be writable
    Object.defineProperty(window, 'fetch', {
      value: originalFetch,
      writable: true,
      configurable: true,
      enumerable: true
    });
  }
} catch (e) {
  // If redefining fails (e.g. not configurable), define a getter/setter combo on window
  try {
    const originalFetch = window.fetch;
    let currentFetch = originalFetch;
    Object.defineProperty(window, 'fetch', {
      configurable: true,
      enumerable: true,
      get() {
        return currentFetch;
      },
      set(val) {
        currentFetch = val;
      }
    });
  } catch (err) {
    console.warn("Failed to apply robust fetch write patch:", err);
  }
}

// Ensure globalThis.fetch also behaves identically if it is reachable and different
try {
  if (typeof globalThis !== 'undefined' && globalThis !== window) {
    const originalFetch = globalThis.fetch;
    if (originalFetch) {
      Object.defineProperty(globalThis, 'fetch', {
        value: originalFetch,
        writable: true,
        configurable: true,
        enumerable: true
      });
    }
  }
} catch (e) {
  try {
    const originalFetch = globalThis.fetch;
    let currentFetch = originalFetch;
    Object.defineProperty(globalThis, 'fetch', {
      configurable: true,
      enumerable: true,
      get() {
        return currentFetch;
      },
      set(val) {
        currentFetch = val;
      }
    });
  } catch (err) {
    // Silent fail
  }
}

export {};
