const commonExtends = [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
];

module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: commonExtends,
    overrides: [
        {
            files: ["./src/**/*.ts", "./src/**/*.tsx"],
            parserOptions: {
                project: ["./tsconfig.json"],
            },
            extends: [
                ...commonExtends,
                "plugin:@typescript-eslint/recommended-type-checked",
                "plugin:@typescript-eslint/strict",
            ],
        },
    ],
    settings: {
        react: {
            version: "detect",
        },
    },
    ignorePatterns: "demo",
};
