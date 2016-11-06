import * as React from 'react';
import { GeolocatedProps, geolocated } from 'react-geolocated';

interface IDemoProps extends GeolocatedProps { }

class Demo extends React.Component<IDemoProps, {}> {
  render(): React.ReactElement<{}> {
    return <div>
      latitude: {this.props.coords && this.props.coords.latitude}
      isGeolocationAvailable: {this.props.isGeolocationAvailable}
      isGeolocationEnabled: {this.props.isGeolocationEnabled}
      positionError: {this.props.positionError}
    </div>;
  }
}

export default geolocated({
  userDecisionTimeout: 5000,
  positionOptions: {
    enableHighAccuracy: true,
    maximumAge: 20,
    timeout: 10000,
  }
})(Demo);
