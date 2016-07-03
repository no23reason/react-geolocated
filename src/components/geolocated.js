import React from 'react';
import merge from 'lodash.merge';

function getDisplayName(WrappedComponent) {
    return `Geolocated(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
}

const geolocated = (config) => (WrappedComponent) => {
    const defaultConfig = {
        positionOptions: {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: Infinity,
        },
    };
    const activeConfig = merge({}, defaultConfig, config);

    let result = class Geolocated extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                coords: null,
                isGeolocationEnabled: false,
                isGeolocationAvailable: Boolean(navigator && navigator.geolocation),
                isGettingPosition: true,
                positionError: null,
            };

            this.onPositionError = this.onPositionError.bind(this);
            this.onPositionSuccess = this.onPositionSuccess.bind(this);
        }

        onPositionError(positionError) {
            this.setState(merge({}, this.state, {
                coords: null,
                isGeolocationEnabled: false,
                isGettingPosition: false,
                positionError,
            }))
        }

        onPositionSuccess(position) {
           this.setState(merge({}, this.state, {
                coords: position.coords,
                isGeolocationEnabled: true,
                isGettingPosition: false,
                positionError: null,
            }));
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
