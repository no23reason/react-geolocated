import * as React from "react";

/**
 * The configuration options.
 */
interface GeolocatedConfig {
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
     * Allows to set the default value of isGeolocationEnabled
     * @default true
     */
    isOptimisticGeolocationEnabled?: boolean;
}

/**
 * Props injected in the wrapped component.
 */
interface GeolocatedProps {
    /**
     * The Geolocation API's coords object containing latitude, longitude, and accuracy and also optionally containing altitude, altitudeAccuracy, heading and speed.
     */
    coords?: Coordinates;
    /**
     * Flag indicating that the browser supports the Geolocation API.
     */
    isGeolocationAvailable?: boolean;
    /**
     * Flag indicating that the user has allowed the use of the Geolocation API. It optimistically presumes they did until they either explicitly deny it or userDecisionTimeout (if set) has elapsed and they haven't allowed it yet.
     */
    isGeolocationEnabled?: boolean;
    /**
     * The Geolocation API's PositionError object resulting from an error occurring in the API call.
     */
    positionError?: PositionError;
}

/**
 * Additional props the resulting component can take.
 */
interface ExternalProps {
    /**
     * Callback to call when geolocation API invocation fails.
     */
    onError?: (positionError: PositionError) => void;
    /**
     * Callback to call when geolocation API invocation succeeds.
     */
    onSuccess?: (position: Position) => void;
}

type ComponentType<TProps> =
    | React.ComponentClass<TProps>
    | React.StatelessComponent<TProps>;

interface ComponentDecorator {
    <TOriginalProps>(
        component: ComponentType<TOriginalProps & GeolocatedProps>,
    ): React.ComponentClass<TOriginalProps & ExternalProps>;
}

/**
 * The HOC function.
 */
export function geolocated(config?: GeolocatedConfig): ComponentDecorator;

/**
 * React propTypes object.
 */
export const geoPropTypes: React.ValidationMap<any>;
