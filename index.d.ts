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
   */
  userDecisionTimeout?: number;
  /**
   * The implementer of the Geolocation API.
   * @default navigator.geolocation
   */
  geolocationProvider?: Geolocation;
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

type ComponentType<TProps> = React.ComponentClass<TProps> | React.StatelessComponent<TProps>;

interface ComponentDecorator {
  <TOriginalProps>(component: ComponentType<TOriginalProps & GeolocatedProps>): React.ComponentClass<TOriginalProps>;
}

/**
 * The HOC function.
 */
export function geolocated(config?: GeolocatedConfig): ComponentDecorator;

/**
 * React propTypes object.
 */
export const geoPropTypes: React.ValidationMap<any>;
