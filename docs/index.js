/* eslint-disable global-require, import/no-unresolved, react/no-multi-comp */
import React from "react";
import ReactDOM from "react-dom";
import GithubCorner from "react-github-corner";
import { Catalog, CodeSpecimen, ReactSpecimen, pageLoader } from "catalog";

import "purecss/build/pure.css";
// import './main.css';
// import '../style.css';

// Add your documentation imports here. These are available to
// React specimen. Do NOT pass React here as Catalog does that.
const documentationImports = {};
const pages = [
    {
        path: "/",
        title: "Docs",
        content: pageLoader(() => import("../README.md")),
    },
    {
        path: "/demo",
        title: "Demo",
        content: pageLoader(() => import("../demo/App.jsx")),
    },
];

// Catalog - logoSrc="../images/logo.png"
ReactDOM.render(
    <div>
        <GithubCorner
            bannerColor="#fff"
            direction="right"
            height={80}
            href="https://github.com/no23reason/react-geolocated"
            octoColor="#000"
            width={80}
        />
        <Catalog
            imports={documentationImports}
            pages={pages}
            specimens={{
                javascript: props => (
                    <CodeSpecimen {...props} lang="javascript" />
                ),
                js: props => <CodeSpecimen {...props} lang="javascript" />,
                jsx: props => <ReactSpecimen {...props} />,
            }}
            title="react-geolocated"
        />
    </div>,
    document.getElementById("catalog"),
);
