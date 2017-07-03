### Features
  * Customizable — the configuration exposes all the [options of Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions)
  * Lightweight — the minified version has only 5 kB in size
  * Supports TypeScript — the typings are included in the project

### Browser support
  * Chrome &ge; 5
  * Firefox &ge; 3.5
  * Internet Explorer &ge; 9
  * Opera &ge; 10.60
  * Safari &ge; 5

### How to get it
It's on [npm](https://www.npmjs.com/package/react-geolocated), just do
```js
npm install react-geolocated
```

### How to use it
It is a [React Higher–Order Component](https://facebook.github.io/react/docs/higher-order-components.html) that injects geolocation–related props in any component passed to it.

```js
import React from 'react';
import {geolocated} from 'react-geolocated';

class Demo extends React.Component {
  render() {
    return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ? <table>
            <tbody>
              <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
              <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
              <tr><td>altitude</td><td>{this.props.coords.altitude}</td></tr>
              <tr><td>heading</td><td>{this.props.coords.heading}</td></tr>
              <tr><td>speed</td><td>{this.props.coords.speed}</td></tr>
            </tbody>
          </table>
          : <div>Getting the location data&hellip; </div>;
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Demo);
```
For the complete API documentation and more, please see the [README](https://github.com/no23reason/react-geolocated/blob/master/README.md).
