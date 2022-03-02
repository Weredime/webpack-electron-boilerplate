import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server"
import ELECTRON_PATH from "electron";
import childProcess from "child_process";

/** @type {import("child_process").ChildProcessWithoutNullStreams} */
let electronProcess;

/**
 * Watches a webpack bundle.
 * @param {string} folderName
 * @returns {Promise<void>}
 */
const watchFolder = async (folderName) => {
    const { default: cfg } = await import(`../src/${folderName}/webpack.config.js`);

    const compiler = webpack(cfg);

    if (folderName === "renderer") {
        const server = new WebpackDevServer({ ...cfg.devServer, open: false }, compiler);

        // Run the server
        await server.start();
    } else {
        compiler.watch({}, (err, stats) => {
            console.log(stats.toString({ colors: true }));
            if (folderName === "main") {
                electronProcess && electronProcess.kill("SIGINT");
                electronProcess = childProcess.spawn(String(ELECTRON_PATH), ['.'])
                console.log("Electron process spawned")

                electronProcess.on("exit", (code) => {
                    console.log("Electron process exited with code", code)
                })
            }
        })
    }
}

const main = await watchFolder("main");
const preload = await watchFolder("preload");
const renderer = await watchFolder("renderer");