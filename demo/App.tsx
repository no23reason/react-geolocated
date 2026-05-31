import React from "react";
import GithubCorner from "react-github-corner";

import { DemoPage } from "./DemoPage";

export const App = () => {
    return (
        <main className="main">
            <DemoPage />
            <GithubCorner
                octoColor="#323232"
                bannerColor="#ebebeb"
                href="https://github.com/no23reason/react-geolocated"
            />
        </main>
    );
};
