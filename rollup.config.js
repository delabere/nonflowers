import { nodeResolve } from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve'

export default [
  {
    input: ["src/app.js"],
    output: [
      {

        dir: "dist",
        format: "iife",
        sourcemap: true
      }
    ],
    plugins: [
      nodeResolve(),
      serve({
        open: true,
        contentBase: ''
      })

    ]
  },
  {
    input: ["src/landscape.js"],
    output: [
      {
        dir: "dist",
        format: "iife",
        sourcemap: true
      }
    ],
    plugins: [nodeResolve()]
  }


];