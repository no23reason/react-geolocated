import React from 'react';

function getDisplayName(WrappedComponent) {
    return `Geolocated(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
}

const geolocated = (WrappedComponent) => {
    let result = class Geolocated extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                coords: null,
                isGeolocationEnabled: false,
                isGettingPosition: true,
                locationError: null,
            };

            this.onPositionError = this.onPositionError.bind(this);
            this.onPositionSuccess = this.onPositionSuccess.bind(this);
        }

        onPositionError(locationError) {
            this.setState({
                coords: {},
                isGeolocationEnabled: false,
                isGettingPosition: false,
                locationError,
            })
        }

        onPositionSuccess(position) {
            this.setState({
                coords: position.coords,
                isGeolocationEnabled: true,
                isGettingPosition: false,
            });
        }

        componentDidMount() {
            navigator.geolocation.getCurrentPosition(this.onPositionSuccess, this.onPositionError);
        }

        render() {
            return <WrappedComponent {...this.state} />;
        }
    };
    result.displayName = getDisplayName(WrappedComponent);
    return result;
};

export default geolocated;
