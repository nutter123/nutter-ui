module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 8,
        "sourceType": "module"
    },
    plugins: [
        "html"
    ],
    "parser": "babel-eslint",
    "rules": {
        "no-undef":0,
        "no-fallthrough": "off",
        "no-console": "off",
        "no-debugger": "off"
    }
};