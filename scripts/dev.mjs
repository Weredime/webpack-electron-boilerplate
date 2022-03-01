import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server"
import ELECTRON_PATH from "electron";
import childProcess from "child_process";

/**
 * Watches a webpack bundle.
 * @param {string} folderName
 * @returns {Promise<void>}
 */
const watchFolder = async (folderName) => {
    const { default: cfg } = await import(`../src/${folderName}/webpack.config.js`);

    const compiler = webpack(cfg);

    if (folderName === "renderer") {
        const server = new WebpackDevServer({ ...cfg.devServer, open: true }, compiler);

        // Run the server
        await server.start();

        let electronProcess;
        
        compiler.watch({}, (err, stats) => {
            console.log(stats.toString({ colors: true }));
            
            electronProcess && electronProcess.kill(0);

            electronProcess = childProcess.spawn(String(electronPath), ['.'])

            electronProcess.on("exit", process.exit);
        })
    } else {
        compiler.watch({}, (err, stats) => {
            console.log(stats.toString({ colors: true }));
        })
    }
}

const main = await watchFolder("main");
const preload = await watchFolder("preload");
const renderer = await watchFolder("renderer");