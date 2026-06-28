import React from "react";
import { Demo } from "./Demo";

export const DemoPage = () => {
    return (
        <article className="article">
            <h1>react-geolocated</h1>
            <p>
                React.js hook for using{" "}
                <a href="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation">
                    Geolocation API
                </a>
            </p>
            <h2>Elevator pitch</h2>
            <p>
                react-geolocated is a{" "}
                <a href="https://github.com/no23reason/react-geolocated#configuration">
                    configurable
                </a>{" "}
                React Hook that makes using the Geolocation API easy,
                abstracting away some browser-specific quirks (differences on
                how they handle permissions for example).
            </p>
            <h2>Demo</h2>
            <Demo />
            <p>
                The{" "}
                <a href="https://github.com/no23reason/react-geolocated/tree/master/demo">
                    demo source code
                </a>{" "}
                is available on{" "}
                <a href="https://github.com/no23reason/react-geolocated">
                    GitHub
                </a>
                , as well as the{" "}
                <a href="https://github.com/no23reason/react-geolocated/tree/master/demo">
                    README
                </a>{" "}
                with configuration options and other details.
            </p>
        </article>
    );
};
