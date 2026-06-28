import { vi } from "vitest";

// @testing-library detects installed fake timers via a global `jest`.
// Vitest exposes the same API on `vi`, so alias it for fake-timer detection.
(globalThis as unknown as { jest: typeof vi }).jest = vi;
