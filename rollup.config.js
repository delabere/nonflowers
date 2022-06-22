import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: ["src/app.js"],
    output: [
      {

        dir: "dist",
        format: "iife",
        sourcemap: true
      }
    ],
    plugins: [nodeResolve()]

  };