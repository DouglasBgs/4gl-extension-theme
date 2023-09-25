/* eslint-env node */
module.exports = {
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    root: true,
    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        //     "@typescript-eslint/no-unused-vars": "off",
        //     "@typescript-eslint/no-var-requires": "off",
    },
    parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
    },

    overrides: [
        {
            files: ["*.{ts,tsx}"],
            rules: {
                "@typescript-eslint/switch-exhaustiveness-check": "error",
            },
        },
    ],
};
