import React = require("react");

interface GeolocatedConfig {
  positionOptions?: PositionOptions;
  userDecisionTimeout?: number;
  geolocationProvider?: Geolocation;
}

interface GeolocatedProps {
  coords?: Coordinates;
  isGeolocationAvailable?: boolean;
  isGeolocationEnabled?: boolean;
  positionError?: PositionError;
}

declare class ElementClass extends React.Component<GeolocatedProps, any> { }
declare interface ClassDecorator {
  <T extends (typeof ElementClass)>(component: T): T;
}

export function geolocated(config?: GeolocatedConfig): ClassDecorator;
export const geoPropTypes: any;
