import React, { useRef } from "react";
import { Demo } from "./Demo.jsx";

export const DemoPage = () => {
    const innerRef = useRef();

    const getLocation = () => {
        innerRef.current && innerRef.current.getLocation();
    };

    return (
        <article className="p-8 bg-slate-800 min-h-screen text-slate-200 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold my-4">react-geolocated</h1>
            <p>
                React.js Higher-Order Component for using{" "}
                <a
                    className="text-sky-400 hover:underline"
                    href="https://developer.mozilla.org/en-US/docs/Web/API/Geolocation"
                >
                    Geolocation API
                </a>
            </p>
            <h2 className="text-xl font-bold my-3 mt-4">Elevator pitch</h2>
            <p>
                react-geolocated is a{" "}
                <a
                    className="text-sky-400 hover:underline"
                    href="https://github.com/no23reason/react-geolocated#configuration"
                >
                    configurable
                </a>{" "}
                Higher-Order Component that makes using the Geolocation API
                easy, abstracting away some browser-specific quirks (differences
                on how they handle permissions for example).
            </p>
            <h2 className="text-xl font-bold my-3 mt-4">Demo</h2>
            <div className="p-4 m-4 bg-slate-100 rounded-sm max-w-md mx-auto bg-white drop-shadow-lg flex flex-col items-center space-x-4">
                <div className="text-slate-900">
                    <Demo
                        onError={(error) => console.log(error)}
                        ref={innerRef}
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        className="bg-sky-600 hover:bg-sky-800 py-2 px-4 rounded-md"
                        onClick={getLocation}
                        type="button"
                    >
                        Get location
                    </button>
                </div>
            </div>
            <p>
                The{" "}
                <a
                    className="text-sky-400 hover:underline"
                    href="https://github.com/no23reason/react-geolocated/tree/master/demo"
                >
                    demo source code
                </a>{" "}
                is available on{" "}
                <a
                    className="text-sky-400 hover:underline"
                    href="https://github.com/no23reason/react-geolocated"
                >
                    GitHub
                </a>
                , as well as the{" "}
                <a
                    className="text-sky-400 hover:underline"
                    href="https://github.com/no23reason/react-geolocated/tree/master/demo"
                >
                    README
                </a>{" "}
                with configuration options and other details.
            </p>
        </article>
    );
};
