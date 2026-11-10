export default [
    {
        files: ["resources/js/**/*.{js,jsx}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                window: "readonly",
                document: "readonly",
                console: "readonly",
                setTimeout: "readonly",
                clearTimeout: "readonly",
                setInterval: "readonly",
                clearInterval: "readonly",
                fetch: "readonly",
                localStorage: "readonly",
                sessionStorage: "readonly",
                FormData: "readonly",
                URL: "readonly",
                URLSearchParams: "readonly",
                route: "readonly",
            },
        },
        rules: {
            "no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
            "no-undef": "warn",
        },
    },
];
