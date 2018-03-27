import React from "react";
import Demo from "./Demo.jsx";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.getInnerRef = this.getInnerRef.bind(this);
        this.getLocation = this.getLocation.bind(this);
    }

    innerRef;
    getInnerRef(ref) {
        this.innerRef = ref;
    }

    getLocation() {
        this.innerRef && this.innerRef.getLocation();
    }

    render() {
        const { getInnerRef, getLocation } = this;
        return (
            <article style={{ textAlign: "center" }}>
                <Demo ref={getInnerRef} />
                <button
                    className="pure-button pure-button-primary"
                    onClick={getLocation}
                    type="button"
                >
                    Get location
                </button>
            </article>
        );
    }
}
