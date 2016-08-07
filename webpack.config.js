var path = require('path');

module.exports = {
    entry: "./src/helloworld.ts",
    output: {
        filename: "./dist/bundle.js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"]
    },

    module: {
        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ],

        loaders: [
            // All files with a '.ts' extension will be handled by 'ts-loader'.
            { test: /\.ts$/, loader: "ts-loader" },
            // Pixi apparently needs to read its package.json file, so we tell webpack
            // how to load these.
            { test: /\.json$/, loader: "json" }
        ],

        // Pixi expects people to be using Browserify. We're not, but we still can use
        // its brfs module to deal with pixi code using "fs". 
        postLoaders: [
          { include: path.resolve(__dirname, "node_modules/pixi.js"), loader: "transform?brfs" }
        ]
    },
};
