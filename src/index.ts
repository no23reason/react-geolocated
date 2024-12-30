import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The configuration options.
 */
export interface GeolocatedConfig {
    /**
     * The Geolocation API's positionOptions configuration object.
     */
    positionOptions?: PositionOptions;
    /**
     * Time we give to the user to allow the use of Geolocation API before presuming they denied it.
     * @default undefined
     */
    userDecisionTimeout?: number;
    /**
     * The implementer of the Geolocation API.
     * @default navigator.geolocation
     */
    geolocationProvider?: Geolocation;
    /**
     * If set to true, the hook does not query the Geolocation API on mount. You must use the getLocation method yourself.
     * @default false
     */
    suppressLocationOnMount?: boolean;
    /**
     * If set to true, the hook watches for position changes periodically.
     * @default false
     */
    watchPosition?: boolean;
    /**
     * Allows to set the default value of isGeolocationEnabled.
     * @default true
     */
    isOptimisticGeolocationEnabled?: boolean;
    /**
     * If set to true, the hook watches for location permission changes.
     * @default false
     */
    watchLocationPermissionChange?: boolean;
    /**
     * Callback to call when geolocation API invocation fails. Called with undefined when the user decision times out.
     */
    onError?: (positionError?: GeolocationPositionError) => void;
    /**
     * Callback to call when geolocation API invocation succeeds.
     */
    onSuccess?: (position: GeolocationPosition) => void;
}

/**
 * Result of the hook.
 */
export interface GeolocatedResult {
    /**
     * The Geolocation API's coords object containing latitude, longitude, and accuracy and also optionally containing altitude, altitudeAccuracy, heading and speed.
     */
    coords: GeolocationCoordinates | undefined;
    /**
     * The Geolocation API's timestamp value representing the time at which the location was retrieved.
     */
    timestamp: EpochTimeStamp | undefined;
    /**
     * Flag indicating that the browser supports the Geolocation API.
     */
    isGeolocationAvailable: boolean;
    /**
     * Flag indicating that the user has allowed the use of the Geolocation API. It optimistically presumes they did until they either explicitly deny it or userDecisionTimeout (if set) has elapsed and they haven't allowed it yet.
     */
    isGeolocationEnabled: boolean;
    /**
     * The Geolocation API's PositionError object resulting from an error occurring in the API call.
     */
    positionError: GeolocationPositionError | undefined;
    /**
     * Callback you can use to manually trigger the position query.
     */
    getPosition: () => void;
}

/**
 * Hook abstracting away the interaction with the Geolocation API.
 * @param config - the configuration to use
 */
export function useGeolocated(config: GeolocatedConfig = {}): GeolocatedResult {
    const {
        positionOptions = {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: Infinity,
        },
        isOptimisticGeolocationEnabled = true,
        userDecisionTimeout = undefined,
        suppressLocationOnMount = false,
        watchPosition = false,
        geolocationProvider = typeof navigator !== "undefined"
            ? navigator.geolocation
            : undefined,
        watchLocationPermissionChange = false,
        onError,
        onSuccess,
    } = config;

    const userDecisionTimeoutId = useRef(0);
    const isCurrentlyMounted = useRef(true);
    const watchId = useRef<number>(0);

    const [isGeolocationEnabled, setIsGeolocationEnabled] = useState(
        isOptimisticGeolocationEnabled,
    );

    const [coords, setCoords] = useState<GeolocationCoordinates | undefined>();
    const [timestamp, setTimestamp] = useState<EpochTimeStamp | undefined>();
    const [positionError, setPositionError] = useState<
        GeolocationPositionError | undefined
    >();
    const [permissionState, setPermissionState] = useState<
        PermissionState | undefined
    >();

    const cancelUserDecisionTimeout = useCallback(() => {
        if (userDecisionTimeoutId.current) {
            window.clearTimeout(userDecisionTimeoutId.current);
        }
    }, []);

    const handlePositionError = useCallback(
        (error?: GeolocationPositionError) => {
            cancelUserDecisionTimeout();
            if (isCurrentlyMounted.current) {
                setCoords(() => undefined);
                setIsGeolocationEnabled(false);
                setPositionError(error);
            }
            onError?.(error);
        },
        [onError, cancelUserDecisionTimeout],
    );

    const handlePositionSuccess = useCallback(
        (position: GeolocationPosition) => {
            cancelUserDecisionTimeout();
            if (isCurrentlyMounted.current) {
                setCoords(position.coords);
                setTimestamp(position.timestamp);
                setIsGeolocationEnabled(true);
                setPositionError(() => undefined);
            }
            onSuccess?.(position);
        },
        [onSuccess, cancelUserDecisionTimeout],
    );

    const getPosition = useCallback(() => {
        if (
            !geolocationProvider?.getCurrentPosition ||
            // we really want to check if the watchPosition is available
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            !geolocationProvider.watchPosition
        ) {
            throw new Error("The provided geolocation provider is invalid");
        }

        if (userDecisionTimeout) {
            userDecisionTimeoutId.current = window.setTimeout(() => {
                handlePositionError();
            }, userDecisionTimeout);
        }

        if (watchPosition) {
            watchId.current = geolocationProvider.watchPosition(
                handlePositionSuccess,
                handlePositionError,
                positionOptions,
            );
        } else {
            geolocationProvider.getCurrentPosition(
                handlePositionSuccess,
                handlePositionError,
                positionOptions,
            );
        }
    }, [
        geolocationProvider,
        watchPosition,
        userDecisionTimeout,
        handlePositionError,
        handlePositionSuccess,
        positionOptions,
    ]);

    useEffect(() => {
        let permission: PermissionStatus | undefined = undefined;

        if (
            watchLocationPermissionChange &&
            geolocationProvider &&
            "permissions" in navigator
        ) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then((result) => {
                    permission = result;
                    permission.onchange = () => {
                        if (permission) {
                            setPermissionState(permission.state);
                        }
                    };
                })
                .catch((e: unknown) => {
                    console.error("Error updating the permissions", e);
                });
        }

        return () => {
            if (permission) {
                permission.onchange = null;
            }
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!suppressLocationOnMount) {
            getPosition();
        }

        return () => {
            cancelUserDecisionTimeout();
            if (watchPosition && watchId.current) {
                geolocationProvider?.clearWatch(watchId.current);
            }
        };
    }, [permissionState]); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        getPosition,
        coords,
        timestamp,
        isGeolocationEnabled,
        isGeolocationAvailable: Boolean(geolocationProvider),
        positionError,
    };
}
