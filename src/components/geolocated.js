import React, { Component } from 'react';
import PropTypes from 'prop-types';

function getDisplayName(WrappedComponent) {
    return `Geolocated(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
}

const geolocated = ({
    positionOptions = {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity,
    },
    userDecisionTimeout = null,
    geolocationProvider = (typeof (navigator) !== 'undefined' && navigator.geolocation),
} = {}) => (WrappedComponent) => {
    let result = class Geolocated extends Component {
        constructor(props) {
            super(props);
            this.state = {
                coords: null,
                isGeolocationAvailable: Boolean(geolocationProvider),
                isGeolocationEnabled: true, // be optimistic
                positionError: null,
            };

            if (userDecisionTimeout) {
                this.userDecisionTimeoutId = setTimeout(() => {
                    this.onPositionError();
                }, userDecisionTimeout);
            }

            this.onPositionError = this.onPositionError.bind(this);
            this.onPositionSuccess = this.onPositionSuccess.bind(this);
            this.cancelUserDecisionTimeout = this.cancelUserDecisionTimeout.bind(this);
        }

        cancelUserDecisionTimeout() {
            if (this.userDecisionTimeoutId) {
                clearTimeout(this.userDecisionTimeoutId);
            }
        }

        onPositionError(positionError) {
            this.cancelUserDecisionTimeout();
            this.setState({
                coords: null,
                isGeolocationAvailable: this.state.isGeolocationAvailable,
                isGeolocationEnabled: false,
                positionError,
            });
        }

        onPositionSuccess(position) {
            this.cancelUserDecisionTimeout();
            this.setState({
                coords: position.coords,
                isGeolocationAvailable: this.state.isGeolocationAvailable,
                isGeolocationEnabled: true,
                positionError: null,
            });
        }

        componentDidMount() {
            if (!geolocationProvider || !geolocationProvider.getCurrentPosition) {
                throw new Error('The provided geolocation provider is invalid');
            }
            geolocationProvider.getCurrentPosition(this.onPositionSuccess, this.onPositionError, positionOptions);
        }

        componentWillUnmount() {
            this.cancelUserDecisionTimeout();
        }

        render() {
            return <WrappedComponent {...this.state} {...this.props} />;
        }
    };
    result.displayName = getDisplayName(WrappedComponent);
    return result;
};

export default geolocated;

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
};