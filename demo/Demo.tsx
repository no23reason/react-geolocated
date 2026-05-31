import React from "react";
import { useGeolocated } from "../src";

const getDirection = (degrees: number, isLongitude: boolean) =>
    degrees > 0 ? (isLongitude ? "E" : "N") : isLongitude ? "W" : "S";

// adapted from http://stackoverflow.com/a/5786281/2546338
const formatDegrees = (degrees: number, isLongitude: boolean) =>
    `${0 | degrees}° ${
        0 | (((degrees < 0 ? (degrees = -degrees) : degrees) % 1) * 60)
    }' ${0 | (((degrees * 60) % 1) * 60)}" ${getDirection(
        degrees,
        isLongitude,
    )}`;

export const Demo = () => {
    const {
        coords,
        getPosition,
        isGeolocationAvailable,
        isGeolocationEnabled,
        positionError,
    } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
        watchLocationPermissionChange: true,
    });

    return (
        <div className="demo">
            <div className="demo-data shantell-sans-bold">
                {!isGeolocationAvailable ? (
                    <div>Your browser does not support Geolocation.</div>
                ) : !isGeolocationEnabled ? (
                    <div>Geolocation is not enabled.</div>
                ) : coords ? (
                    <div>
                        You are at{" "}
                        <span className="coordinate">
                            {formatDegrees(coords.latitude, false)}
                        </span>
                        ,{" "}
                        <span className="coordinate">
                            {formatDegrees(coords.longitude, true)}
                        </span>
                        {coords.altitude ? (
                            <span>
                                , approximately {coords.altitude} meters above
                                sea level
                            </span>
                        ) : null}
                        .
                    </div>
                ) : (
                    <div>Getting the location data&hellip;</div>
                )}
                {!!positionError && (
                    <div>
                        <br />
                        Last position error:
                        <pre>{JSON.stringify(positionError)}</pre>
                    </div>
                )}
            </div>
            <button
                className="get-position"
                onClick={getPosition}
                type="button"
            >
                Get location
            </button>
        </div>
    );
};
