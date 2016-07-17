[![build status](https://secure.travis-ci.org/no23reason/react-geolocated.svg)](http://travis-ci.org/no23reason/react-geolocated)
[![npm version](https://img.shields.io/npm/v/react-geolocated.svg)](https://www.npmjs.com/package/react-geolocated)
[![bitHound Score](https://www.bithound.io/github/no23reason/react-geolocated/badges/score.svg)](https://www.bithound.io/github/no23reason/react-geolocated)
[![Dependency Status](https://david-dm.org/no23reason/react-geolocated.svg)](https://david-dm.org/no23reason/react-geolocated)
# react-geolocated - React.js Higher-Order Component for using [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation)

## Demo
Basic demo can be found at the [demo page](https://no23reason.github.io/react-geolocated/).

## Basic Usage

Install using `npm`:
```bash
npm install react-geolocated --save
```

Then using in your application like this:

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
})(Demo);
```

## Props
The props passed to the wrapped component are:
```js
{
    coords: {
        latitude,
        longitude,
        altitude,
        accuracy,
        altitudeAccuracy,
        heading,
        speed,
    },
    isGeolocationAvailable, // boolean flag indicating that the browser supports the Geolocation API
    isGeolocationEnabled, // boolean flag indicating that the user has allowed the use of the Geolocation API
    positionError, // object with the error returned from the Geolocation API call
}
```
The `coords` prop is equivalent to the [Coordinates](https://developer.mozilla.org/en-US/docs/Web/API/Coordinates) object and the `positionError` is equivalent to the [PositionError](https://developer.mozilla.org/en-US/docs/Web/API/PositionError).

### PropTypes
Unfortunately, the `geolocated` HOC cannot add the prop types to the wrapped component directly, as the ESLint will not pick that up.  For this reason, prop types are exported as the `geoPropTypes` object.
Using them is simple with [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
(or if you already depend on it, lodash [`merge`](https://lodash.com/docs#merge) function is useful as well),
or, if your environment supports it, using the [object spread syntax](https://developer.mozilla.org/cs/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment):
```js
import React from 'react';
import {geolocated, geoPropTypes} from 'react-geolocated';

class Demo extends React.Component {
  // Same as the basic example
}

// Using Object.assign
Demo.propTypes = Object.assign({}, Demo.propTypes, geoPropTypes);
// Using ES6 object spread syntax
Demo.propTypes = {...Demo.propTypes, ...geoPropTypes};

export default geolocated()(Demo);
```

## Configuration
The `geolocated` function takes optional configuration parameter:
```js
{
    positionOptions: {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity,
    },
}
```
The `positionOptions` object corresponds to the [PositionOptions](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions) of the Geolocation API. 

## Acknowledgements

This project uses the [react-component-boilerplate](https://github.com/survivejs/react-component-boilerplate).

## License

*react-geolocated* is available under MIT. See LICENSE for more details.
