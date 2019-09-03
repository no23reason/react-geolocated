import React, { useRef } from "react";
import Demo from "./Demo.jsx";

const App = () => {
    const innerRef = useRef();

    const getLocation = () => {
        innerRef.current && innerRef.current.getLocation();
    };

    return (
        <article style={{ textAlign: "center" }}>
            {/* eslint-disable-next-line no-console*/}
            <Demo onError={error => console.log(error)} ref={innerRef} />
            <button
                className="pure-button pure-button-primary"
                onClick={getLocation}
                type="button"
            >
                Get location
            </button>
        </article>
    );
};

export default App;
