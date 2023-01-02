import type { RollupOptions, ModuleFormat } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import type { RollupNodeResolveOptions } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

import defaults from "files-pipeline/dist/options/index.js";
import deepmerge from "files-pipeline/dist/lib/deepmerge.js";
import type { Options as OptionsBase } from "files-pipeline/dist/options/index.js";

import type { MinifyOptions } from "terser";

export interface Options extends OptionsBase {
  format?: ModuleFormat;
  useTerser?: boolean;
  [key: string]: any;
  rollupOptions?: RollupOptions;
  terserOptions?: MinifyOptions;
}

export default deepmerge(defaults, {
  format: "umd",
  useTerser: false,
  rollupOptions: {
    plugins: [
      // @ts-ignore
      commonjs({
        preferBuiltins: false,
      }),
      nodeResolve({ brower: true } as RollupNodeResolveOptions),
    ],
  } as RollupOptions,
  terserOptions: {} as MinifyOptions,
  pipeline: {
    failed: async (current) =>
      `Error: Cannot process file ${current.inputPath}!`,
    passed: async () => true,
    accomplished: async (current) =>
      `Processed ${current.inputPath} in ${current.outputPath}.`,
    changed: async (pipe) => {
      pipe.info.total =
        (pipe.info.total ? pipe.info.total : 0) +
        (pipe.current.fileSizeBefore - pipe.current.fileSizeAfter);
      return pipe;
    },
  },
} satisfies Options) as Options;
