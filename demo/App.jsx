import React from "react";
import GithubCorner from "react-github-corner";

import { DemoPage } from "./DemoPage";

export const App = () => {
    return (
        <main className="bg-slate-900 min-h-screen">
            <DemoPage />
            <GithubCorner
                octoColor="#0f172a"
                bannerColor="#e2e8f0"
                href="https://github.com/no23reason/react-geolocated"
            />
        </main>
    );
};
