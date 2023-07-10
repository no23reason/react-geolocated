![Node.js CI](https://github.com/no23reason/react-geolocated/workflows/Node.js%20CI/badge.svg) [![npm version](https://img.shields.io/npm/v/react-geolocated.svg)](https://www.npmjs.com/package/react-geolocated) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# react-geolocated - React hook for using [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation)

## Demo

Basic demo can be found at the [demo page](https://no23reason.github.io/react-geolocated/).

## HOC version

This package used to be a HOC, not a hook. If you want to use the HOC version, please stick with versions < 4.

## Basic Usage

Install using `npm`:

```bash
npm install react-geolocated --save
```

Then use in your application like this:

```jsx
import React from "react";
import { useGeolocated } from "react-geolocated";

const Demo = () => {
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    return !isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
    ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
    ) : coords ? (
        <table>
            <tbody>
                <tr>
                    <td>latitude</td>
                    <td>{coords.latitude}</td>
                </tr>
                <tr>
                    <td>longitude</td>
                    <td>{coords.longitude}</td>
                </tr>
                <tr>
                    <td>altitude</td>
                    <td>{coords.altitude}</td>
                </tr>
                <tr>
                    <td>heading</td>
                    <td>{coords.heading}</td>
                </tr>
                <tr>
                    <td>speed</td>
                    <td>{coords.speed}</td>
                </tr>
            </tbody>
        </table>
    ) : (
        <div>Getting the location data&hellip; </div>
    );
};

export default Demo;
```

## Hook return value

The values returned from the hook are:

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
    timestamp, // timestamp of when the last position was retrieved
    isGeolocationAvailable, // boolean flag indicating that the browser supports the Geolocation API
    isGeolocationEnabled, // boolean flag indicating that the user has allowed the use of the Geolocation API
    positionError, // object with the error returned from the Geolocation API call
    getPosition, // a callback you can use to trigger the location query manually
}
```

The `coords` value is equivalent to the [Coordinates](https://developer.mozilla.org/en-US/docs/Web/API/Coordinates) object and the `positionError` is equivalent to the [PositionError](https://developer.mozilla.org/en-US/docs/Web/API/PositionError).

## Configuration

The `useGeolocated` hook takes optional configuration parameter:

```js
{
    positionOptions: {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity,
    },
    watchPosition: false,
    userDecisionTimeout: null,
    suppressLocationOnMount: false,
    geolocationProvider: navigator.geolocation,
    isOptimisticGeolocationEnabled: true,
    watchLocationPermissionChange: false,
    onError,
    onSuccess,
}
```

The `positionOptions` object corresponds to the [PositionOptions](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions) of the Geolocation API.

By default the component only sets position once. To watch the user's position and provide live updates to position, set `watchPosition = true`. The geolocation event handler is unregistered when the component unmounts.

If set, the `userDecisionTimeout` determines how much time (in milliseconds) we give the user to make the decision whether to allow to share their location or not. In Firefox, if the user declines to use their location, the Geolocation API call does not end with an error. Therefore we want to fallback to the error state if the user declines and the API does not tell us.

The location is obtained when the component mounts by default. If you want to prevent this and get the location later, set the `suppressLocationOnMount` to `true` and use the `getPosition` function returned by the hook to trigger the geolocation query manually.

The `geolocationProvider` allows to specify alternative source of the geolocation API. This was added mainly for testing purposes, however feel free to use it if need be.

The `isOptimisticGeolocationEnabled` allows you to set the default value of `isGeolocationEnabled`. By default it is `true`, which means `isGeolocationEnabled` will be `true` on first render. There may be cases where you don't want to assume that the user will give permission, ie you want the first value to for `isGeolocationEnabled` to be `false`. In that case, you can set `isOptimisticGeolocationEnabled` to `false`.

The `watchLocationPermissionChange` allows you to watch for changes in the geolocation permissions on browsers that support the permissions API. When set to `true`, the hook will set a watch on the geolocation permission so that when this permission changes, the location will be obtained again unless the `suppressLocationOnMount` is also set to `true`.

The `onError` callback is called when the geolocation query fails or when the time for the user decision passes.
The `onSuccess` is called when the geolocation query succeeds.

## Browser support

The package supports all the browsers with ES6 support (i.e. any modern browser). If you need to support IE11, stick to version < 4 of this package.

## Acknowledgements

Many thanks belong to [@mcumpl](https://github.com/mcumpl) for the original idea for this as well as many suggestions and comments.

This project uses the [react-component-boilerplate](https://github.com/survivejs/react-component-boilerplate).

## License

_react-geolocated_ is available under MIT. See [LICENSE](https://github.com/no23reason/react-geolocated/tree/master/LICENSE) for more details.
