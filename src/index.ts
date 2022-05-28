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
     * If set to true, the component does not query the Geolocation API on mount. You must use the getLocation method yourself.
     * @default false
     */
    suppressLocationOnMount?: boolean;
    /**
     * If set to true, the component watches for position changes periodically.
     * @default false
     */
    watchPosition?: boolean;
    /**
     * Allows to set the default value of isGeolocationEnabled.
     * @default true
     */
    isOptimisticGeolocationEnabled?: boolean;
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
        onError,
        onSuccess,
    } = config;

    const userDecisionTimeoutId = useRef(0);
    const isCurrentlyMounted = useRef(true);
    const watchId = useRef<number | void>(0);

    const [isGeolocationEnabled, setIsGeolocationEnabled] = useState(
        isOptimisticGeolocationEnabled,
    );

    const [coords, setCoords] = useState<GeolocationCoordinates | undefined>();
    const [timestamp, setTimestamp] = useState<EpochTimeStamp | undefined>();
    const [positionError, setPositionError] = useState<
        GeolocationPositionError | undefined
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
            !geolocationProvider ||
            !geolocationProvider.getCurrentPosition ||
            !geolocationProvider.watchPosition
        ) {
            throw new Error("The provided geolocation provider is invalid");
        }

        const funcPosition = (
            watchPosition
                ? geolocationProvider.watchPosition
                : geolocationProvider.getCurrentPosition
        ).bind(geolocationProvider);

        if (userDecisionTimeout) {
            userDecisionTimeoutId.current = window.setTimeout(() => {
                handlePositionError();
            }, userDecisionTimeout);
        }

        watchId.current = funcPosition(
            handlePositionSuccess,
            handlePositionError,
            positionOptions,
        );
    }, [
        geolocationProvider,
        watchPosition,
        userDecisionTimeout,
        handlePositionError,
        handlePositionSuccess,
        positionOptions,
    ]);

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
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        getPosition,
        coords,
        timestamp,
        isGeolocationEnabled,
        isGeolocationAvailable: Boolean(geolocationProvider),
        positionError,
    };
}
