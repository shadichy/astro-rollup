import { RollupOptions, OutputOptions, rollup } from "rollup";

import type { AstroIntegration } from "astro";

import type { Options } from "./rollup-options.js";
import DefaultOptions from "./rollup-options.js";

import type {
  executions,
  optionPath,
} from "files-pipeline/dist/options/index.js";
import deepmerge from "files-pipeline/dist/lib/deepmerge.js";
import { files } from "files-pipeline";

import terser from "@rollup/plugin-terser";
import type { MinifyOptions } from "terser";

export default (opt: Options = {}): AstroIntegration => {
  const options = deepmerge(DefaultOptions, opt);

  const paths = new Set<optionPath>();

  if (typeof options["path"] !== "undefined") {
    if (options["path"] instanceof Array || options["path"] instanceof Set) {
      for (const path of options["path"]) {
        paths.add(path);
      }
    } else {
      paths.add(options["path"]);
    }
  }

  if (options["useTerser"])
    deepmerge(options["rollupOptions"], {
      // @ts-ignore
      plugins: [terser(options["terserOptions"] as MinifyOptions)],
    });

  return {
    name: "astro-rollup-js",
    hooks: {
      "astro:build:done": async () => {
        for (const path of paths) {
          await (
            await (
              await (
                await new files(options["logger"]).in(path)
              ).by("**/*.{js,mjs,cjs}")
            ).not(options["exclude"])
          ).pipeline(
            deepmerge(DefaultOptions["pipeline"], {
              wrote: async (current) =>
                (
                  await (
                    await rollup(
                      deepmerge(options["rollupOptions"], {
                        input: current.inputPath,
                      }) as RollupOptions
                    )
                  ).generate({
                    // file: file,
                    format: options["format"],
                    exports: "named",
                    // name: filename
                  } as OutputOptions)
                ).output[0].code,
              fulfilled: async (pipe) =>
                pipe.files > 0
                  ? `Successfully processed a total of ${pipe.files} JS ${
                      pipe.files === 1 ? "file" : "files"
                    }}.`
                  : false,
            } satisfies executions)
          );
        }
      },
    },
  };
};
