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
    });

    return (
        <div className="p-4 m-4 bg-slate-100 rounded-sm max-w-md mx-auto bg-white drop-shadow-lg flex flex-col items-center space-x-4">
            <div className="text-slate-900">
                <div className="m-8 font-bold text-l">
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
                                    , approximately {coords.altitude} meters
                                    above sea level
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
            </div>
            <div className="flex items-center space-x-2">
                <button
                    className="bg-sky-600 hover:bg-sky-800 py-2 px-4 rounded-md"
                    onClick={getPosition}
                    type="button"
                >
                    Get location
                </button>
            </div>
        </div>
    );
};
