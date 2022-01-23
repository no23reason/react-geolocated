import React from "react";
import GithubCorner from "react-github-corner";

import { DemoPage } from "./DemoPage";

export const App = () => {
    return (
        <main>
            <DemoPage />
            <GithubCorner href="https://github.com/no23reason/react-geolocated" />
        </main>
    );
};
