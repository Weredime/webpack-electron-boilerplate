/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
*/
const config = {
    directories: {
        output: "build",
        buildResources: "buildResources",
    },
    files: [
        "dist/**"
    ],
    extraMetadata: {
        version: process.env.APP_VERSION
    },
    target: "nsis",
    nsis: {
        oneClick: false,
        artifactName: "webpack-electron-boilerplate Installer"
    }
}

module.exports = config;