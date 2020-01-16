module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        "transform-class-properties",
        ["@babel/transform-runtime", {
            "helpers": true,
            "regenerator": false
        }]
    ]
};

