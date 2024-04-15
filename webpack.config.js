module.exports = {
    entry: './src/extension-fw.js',
    output: {
        path: __dirname + '/dist',
        filename: 'extension-fw.min.js',
        library: 'ExtensionFw',
        libraryTarget: 'window',
        libraryExport: 'default',
    }
};
