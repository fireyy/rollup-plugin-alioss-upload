import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import sourcemaps from "rollup-plugin-sourcemaps";

const pkg = require("./package.json");

export default {
	sourcemap: true,

    input: "./src/index.js",
    output:
    [
        { format: "cjs", file: pkg.main },
        { format: "es", file: pkg.jsnext }
    ],

	plugins:
	[
		sourcemaps(),
		nodeResolve({ jsnext: true, main: true, preferBuiltins: true }),
		commonjs({ ignoreGlobal: true, include: "node_modules/**" }),
	],

    banner: "/* eslint-disable */",

    external: [ "ali-oss", "co", "fs", "path", "util" ]
};
