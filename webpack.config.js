var webpack = require('webpack');
module.exports = {
    entry: {
        application: "./app/views/Application.jsx"
    },
    output: {
        path: __dirname + '/public/js',
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loader: 'babel', exclude: /node_modules/ },
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
            { test: /\.css$/, loader: 'style!css' }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ]

};
