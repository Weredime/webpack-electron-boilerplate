import webpack from "webpack";
import builder from "electron-builder";

/**
 * Builds a webpack bundle.
 * @param {string} folderName
 * @returns {Promise<void>}
 */
const buildFolder = async (folderName) => {
    const { default: cfg } = await import(`../src/${folderName}/webpack.config.js`);

    const compiler = webpack(cfg);

    let resolve;
    const runCompiler = new Promise(res => (resolve = res));

    compiler.run((err, stats) => {
        if (err instanceof Error) {
            console.log(`Something when wrong when building ${folderName}:`, err)
        } else {
            // No error; Log stats
            console.log(`Hash: ${stats.hash}`)
            console.log(`${stats.toString({ colors: true })}`)
        }
        compiler.close((err) => {
            if (err instanceof Error) {
                console.log(`Something when wrong when building ${folderName}:`, err)
            }
            resolve()
        })
    });

    await runCompiler;
}

const main = await buildFolder("main");
const preload = await buildFolder("preload");
const renderer = await buildFolder("renderer");