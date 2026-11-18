import React from "react";
import { act, render, renderHook } from "@testing-library/react";
import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";

import { useGeolocated, GeolocatedConfig } from "../src";

const Simple = (props: { config: GeolocatedConfig; message?: string }) => {
    const { message = "Location: ", config } = props;
    const { coords, isGeolocationEnabled } = useGeolocated(config);

    if (isGeolocationEnabled) {
        return coords ? (
            <div>
                {message}
                {coords?.latitude}, {coords?.longitude}
            </div>
        ) : (
            <div>Getting geolocation</div>
        );
    } else {
        return <div>Geolocation NOT enabled</div>;
    }
};

const mockRawCoords: Omit<GeolocationPosition["coords"], "toJSON"> = {
    latitude: 50,
    longitude: 20,
    accuracy: 0.5,
    altitude: 200,
    altitudeAccuracy: 10,
    heading: 0,
    speed: 0,
};

const mockPosition: GeolocationPosition = {
    coords: {
        ...mockRawCoords,
        toJSON() {
            return mockRawCoords;
        },
    },
    timestamp: 1234,
    toJSON() {
        return {
            coords: mockRawCoords,
            timestamp: 1234,
        };
    },
};

const mockSuccessfulGeolocationProvider: Geolocation = {
    getCurrentPosition(onSuccess: PositionCallback) {
        return onSuccess(mockPosition);
    },
    watchPosition(onSuccess: PositionCallback) {
        onSuccess(mockPosition);
        return 42;
    },
    clearWatch() {
        return;
    },
};

const mockNoopGeolocationProvider = {
    getCurrentPosition() {
        return;
    },
    watchPosition() {
        return 42;
    },
    clearWatch() {
        return;
    },
};

vi.useFakeTimers();

describe("Geolocated", () => {
    it("clears the previous watch before starting a new one, including watch ID zero", () => {
        let nextId = 0;
        const activeWatches = new Set<number>();
        const provider: Geolocation = {
            getCurrentPosition: vi.fn(),
            watchPosition: vi.fn(() => {
                const id = nextId++;
                activeWatches.add(id);
                return id;
            }),
            clearWatch: vi.fn((id) => {
                activeWatches.delete(id);
            }),
        };
        const { result, unmount } = renderHook(() =>
            useGeolocated({
                geolocationProvider: provider,
                watchPosition: true,
            }),
        );

        expect([...activeWatches]).toEqual([0]);
        act(() => result.current.getPosition());
        expect(provider.clearWatch).toHaveBeenCalledWith(0);
        expect([...activeWatches]).toEqual([1]);
        act(() => result.current.getPosition());
        expect([...activeWatches]).toEqual([2]);
        unmount();
        expect(activeWatches.size).toBe(0);
        expect(provider.clearWatch).toHaveBeenCalledTimes(3);
    });

    it("clears watch ID zero on unmount", () => {
        const clearWatch = vi.fn();
        const { unmount } = renderHook(() =>
            useGeolocated({
                watchPosition: true,
                geolocationProvider: {
                    getCurrentPosition: vi.fn(),
                    watchPosition: () => 0,
                    clearWatch,
                },
            }),
        );
        unmount();
        expect(clearWatch).toHaveBeenCalledWith(0);
    });

    beforeAll(() => {
        vi.useFakeTimers();
    });

    afterAll(() => {
        vi.useRealTimers();
    });

    it("should inject the location", async () => {
        const config = {
            geolocationProvider: mockSuccessfulGeolocationProvider,
        };

        const { findByText } = render(<Simple config={config} />);
        expect(await findByText("Location: 50, 20")).toBeTruthy();
    });

    it("should throw on invalid geolocation provider", () => {
        const config = {
            geolocationProvider: {} as Geolocation,
        };

        expect(() => render(<Simple config={config} />)).toThrow(
            new Error("The provided geolocation provider is invalid"),
        );
    });

    it("should timeout if user decision timeout is specified", async () => {
        const config = {
            userDecisionTimeout: 100,
            geolocationProvider: mockNoopGeolocationProvider,
        };

        const { findByText } = render(<Simple config={config} />);

        expect(await findByText("Getting geolocation")).toBeTruthy();

        act(() => {
            vi.advanceTimersByTime(100);
        });

        expect(await findByText("Geolocation NOT enabled")).toBeTruthy();
    });

    it("should cancel user decision timeout on success", async () => {
        const config = {
            userDecisionTimeout: 100,
            geolocationProvider: mockSuccessfulGeolocationProvider,
        };

        const { findByText } = render(<Simple config={config} />);

        act(() => {
            vi.advanceTimersByTime(200);
        });

        expect(await findByText("Location: 50, 20")).toBeTruthy();
    });
});
