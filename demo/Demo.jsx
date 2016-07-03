import React from 'react';
import {geolocated} from '../src/index';

class Demo extends React.Component {
  render() {
    return this.props.isGeolocationEnabled
    ? <table>
      <tbody>
        <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
        <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
      </tbody>
    </table>
    : null;
  }
}

export default geolocated(Demo);