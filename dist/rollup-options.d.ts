import type { RollupOptions, ModuleFormat } from "rollup";
import type { Options as OptionsBase } from "files-pipeline/dist/options/index.js";
import type { MinifyOptions } from "terser";
export interface Options extends OptionsBase {
    format?: ModuleFormat;
    useTerser?: boolean;
    [key: string]: any;
    rollupOptions?: RollupOptions;
    terserOptions?: MinifyOptions;
}
declare const _default: Options;
export default _default;
