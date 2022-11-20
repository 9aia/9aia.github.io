import mainConfig from "../src/main/mainConfig.js";
import themeConfig from "../src/main/themeConfig.js";

export default {
    srcDir: "src/main/views/",
    outDir: "dist/",
    ...mainConfig,
    themeConfig,
};