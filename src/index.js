import React, { Component } from "react";
import PropTypes from "prop-types";

const getDisplayName = (WrappedComponent) =>
    `Geolocated(${
        WrappedComponent.displayName || WrappedComponent.name || "Component"
    })`;

export const geolocated = ({
    positionOptions = {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity,
    },
    isOptimisticGeolocationEnabled = true,
    userDecisionTimeout = null,
    suppressLocationOnMount = false,
    watchPosition = false,
    geolocationProvider = typeof navigator !== "undefined" &&
        navigator.geolocation,
} = {}) => (WrappedComponent) => {
    let result = class Geolocated extends Component {
        isCurrentlyMounted = false;

        constructor(props) {
            super(props);
            this.state = {
                coords: null,
                isGeolocationAvailable: Boolean(geolocationProvider),
                isGeolocationEnabled: isOptimisticGeolocationEnabled,
                positionError: null,
            };
        }

        cancelUserDecisionTimeout = () => {
            if (this.userDecisionTimeoutId) {
                clearTimeout(this.userDecisionTimeoutId);
            }
        };

        onPositionError = (positionError) => {
            this.cancelUserDecisionTimeout();
            if (this.isCurrentlyMounted) {
                this.setState({
                    coords: null,
                    isGeolocationEnabled: false,
                    positionError,
                });
            }
            if (this.props.onError) {
                this.props.onError(positionError);
            }
        };

        onPositionSuccess = (position) => {
            this.cancelUserDecisionTimeout();
            if (this.isCurrentlyMounted) {
                this.setState({
                    coords: position.coords,
                    isGeolocationEnabled: true,
                    positionError: null,
                });
            }
            if (this.props.onSuccess) {
                this.props.onSuccess(position);
            }
        };

        getLocation = () => {
            if (
                !geolocationProvider ||
                !geolocationProvider.getCurrentPosition ||
                !geolocationProvider.watchPosition
            ) {
                throw new Error("The provided geolocation provider is invalid");
            }

            const funcPosition = (watchPosition
                ? geolocationProvider.watchPosition
                : geolocationProvider.getCurrentPosition
            ).bind(geolocationProvider);

            if (userDecisionTimeout) {
                this.userDecisionTimeoutId = setTimeout(() => {
                    this.onPositionError();
                }, userDecisionTimeout);
            }

            this.watchId = funcPosition(
                this.onPositionSuccess,
                this.onPositionError,
                positionOptions,
            );
        };

        componentDidMount() {
            this.isCurrentlyMounted = true;
            if (!suppressLocationOnMount) {
                this.getLocation();
            }
        }

        componentWillUnmount() {
            this.isCurrentlyMounted = false;
            this.cancelUserDecisionTimeout();
            if (watchPosition) {
                geolocationProvider.clearWatch(this.watchId);
            }
        }

        render() {
            return <WrappedComponent {...this.state} {...this.props} />;
        }
    };
    result.displayName = getDisplayName(WrappedComponent);
    result.propTypes = {
        onError: PropTypes.func,
        onSuccess: PropTypes.func,
    };
    return result;
};

export const geoPropTypes = {
    coords: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        altitude: PropTypes.number,
        accuracy: PropTypes.number,
        altitudeAccuracy: PropTypes.number,
        heading: PropTypes.number,
        speed: PropTypes.number,
    }),
    isGeolocationAvailable: PropTypes.bool,
    isGeolocationEnabled: PropTypes.bool,
    positionError: PropTypes.shape({
        code: PropTypes.oneOf([1, 2, 3]),
        message: PropTypes.string,
    }),
    watchPosition: PropTypes.bool,
};
