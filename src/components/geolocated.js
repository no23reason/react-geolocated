import React, {PropTypes} from 'react';

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
    };

    let result = class Geolocated extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                coords: null,
                isGeolocationAvailable: Boolean(navigator && navigator.geolocation),
                isGeolocationEnabled: false,
                isGettingPosition: true,
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
                isGettingPosition: false,
                positionError,
            });
        }

        onPositionSuccess(position) {
            this.setState({
                coords: position.coords,
                isGeolocationAvailable: this.state.isGeolocationAvailable,
                isGeolocationEnabled: true,
                isGettingPosition: false,
                positionError: null,
            });
        }

        componentDidMount() {
            navigator.geolocation.getCurrentPosition(this.onPositionSuccess, this.onPositionError, activeConfig.positionOptions);
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
    isGettingPosition: PropTypes.bool,
    positionError: PropTypes.shape({
        code: PropTypes.oneOf([1, 2, 3]),
        message: PropTypes.string,
    }),
};