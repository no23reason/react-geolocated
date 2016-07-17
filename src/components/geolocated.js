import React, {Component, PropTypes} from 'react';

function getDisplayName(WrappedComponent) {
    return `Geolocated(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
}

const geolocated = (config) => (WrappedComponent) => {
    const activeConfig = {
        positionOptions: (config && config.positionOptions) || {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: Infinity,
        },
        geolocationProvider: (config && config.geolocationProvider) || (typeof (navigator) !== 'undefined' && navigator.geolocation),
    };

    let result = class Geolocated extends Component {
        constructor(props) {
            super(props);
            this.state = {
                coords: null,
                isGeolocationAvailable: Boolean(activeConfig.geolocationProvider),
                isGeolocationEnabled: true, // be optimistic
                positionError: null,
            };

            this.onPositionError = this.onPositionError.bind(this);
            this.onPositionSuccess = this.onPositionSuccess.bind(this);
        }

        onPositionError(positionError) {
            this.setState({
                coords: null,
                isGeolocationAvailable: this.state.isGeolocationAvailable,
                isGeolocationEnabled: false,
                positionError,
            });
        }

        onPositionSuccess(position) {
            this.setState({
                coords: position.coords,
                isGeolocationAvailable: this.state.isGeolocationAvailable,
                isGeolocationEnabled: true,
                positionError: null,
            });
        }

        componentDidMount() {
            const {geolocationProvider} = activeConfig;
            if (!geolocationProvider || !geolocationProvider.getCurrentPosition) {
                throw new Error('The provided geolocation provider is invalid');
            }
            geolocationProvider.getCurrentPosition(this.onPositionSuccess, this.onPositionError, activeConfig.positionOptions);
        }

        render() {
            return <WrappedComponent {...this.state} />;
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