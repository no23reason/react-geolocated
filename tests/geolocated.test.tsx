import React from "react";
import { act, render } from "@testing-library/react";
import "@testing-library/jest-dom";

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

const mockPosition: GeolocationPosition = {
    coords: {
        latitude: 50,
        longitude: 20,
        accuracy: 0.5,
        altitude: 200,
        altitudeAccuracy: 10,
        heading: 0,
        speed: 0,
    },
    timestamp: 1234,
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

jest.useFakeTimers();

describe("Geolocated", () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it("should inject the location", async () => {
        const config = {
            geolocationProvider: mockSuccessfulGeolocationProvider,
        };

        const { findByText } = render(<Simple config={config} />);
        expect(await findByText("Location: 50, 20")).toBeInTheDocument();
    });

    it("should throw on invalid geolocation provider", () => {
        const config = {
            geolocationProvider: {} as Geolocation,
        };

        expect(() => render(<Simple config={config} />)).toThrow();
    });

    it("should timeout if user decision timeout is specified", async () => {
        const config = {
            userDecisionTimeout: 100,
            geolocationProvider: mockNoopGeolocationProvider,
        };

        const { findByText } = render(<Simple config={config} />);

        expect(await findByText("Getting geolocation")).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(100);
        });

        expect(await findByText("Geolocation NOT enabled")).toBeInTheDocument();
    });

    it("should cancel user decision timeout on success", async () => {
        const config = {
            userDecisionTimeout: 100,
            geolocationProvider: mockSuccessfulGeolocationProvider,
        };

        const { findByText } = render(<Simple config={config} />);

        act(() => {
            jest.advanceTimersByTime(200);
        });

        expect(await findByText("Location: 50, 20")).toBeInTheDocument();
    });
});
