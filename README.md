# [astro-rollup]

This **[Astro integration][astro-integration]** resolves `imports`/`exports` ES6 and above 
for your JavaScript code inside distribution folder.

> **Note**
>
> `astro-rollup` will not process your requests, only your statically
> generated build and pre-rendered routes.

## Installation

There are two ways to add integrations to your project. Let's try the most
convenient option first!

### `astro add` command

Astro includes a CLI tool for adding first party integrations: `astro add`. This
command will:

1. (Optionally) Install all necessary dependencies and peer dependencies
2. (Also optionally) Update your `astro.config.*` file to apply this integration

To install `astro-rollup`, run the following from your project directory and
follow the prompts:

```sh
# Using NPM
npx astro add astro-rollup
# Using Yarn
yarn astro add astro-rollup
# Using PNPM
pnpx astro add astro-rollup
```

### Install dependencies manually

First, install the `astro-rollup` integration like so:

```
npm install -D -E astro-rollup
```

Then, apply this integration to your `astro.config.*` file using the
`integrations` property:

**`astro.config.mjs`**

```js
// ...
import rollup from "astro-rollup";
// ...

export default defineConfig({
	integrations: [rollup()],
	// ...
});
```

## Getting started

The utility will now automatically process all your JavaScript
files in the `dist` folder.

If your path is different than `dist` be sure to update it accordingly:

**`astro.config.mjs`**

```ts
// ...
import rollup from "astro-rollup";
// ...

export default defineConfig({
	outDir: "./build",
	integrations: [
		rollup({
			path: "./build",
		}),
	],
	// ...
});
```

You can add multiple paths to compress by specifying an array as the `path`
variable.

**`astro.config.mjs`**

```ts
// ...
import rollup from "astro-rollup";
// ...

export default defineConfig({
	integrations: [
		rollup({
			path: ["./build", "./dist"],
		}),
	],
	// ...
});
```

You can also provide a map of paths for different input output directories.

**`astro.config.mjs`**

```ts
// ...
import rollup from "astro-rollup";
// ...

export default defineConfig({
	integrations: [
		rollup({
			path: new Map([["./input", "./output"]]),
		}),
	],
	// ...
});
```

Or an array of the two.

**`astro.config.mjs`**

```ts
// ...
import rollup from "astro-rollup";
// ...

export default defineConfig({
	integrations: [
		rollup({
			path: [
				// compress dist
				"./dist",
				// compress dist one more time into a different directory
				new Map([["./dist", "./dist-compressed"]]),
			],
		}),
	],
	// ...
});
```

You can provide a filter to exclude files in your build. A filter can be an
array of regexes or a single match. You can use functions, as well to match on
file names.

**`astro.config.mjs`**

```ts
// ...
import rollup from "astro-rollup";
// ...

export default defineConfig({
	integrations: [
		rollup({
			exclude: [
				"my-awesome.png",
				(file: string) =>
					file === "./dist/img/favicon/safari-pinned-tab.svg",
			],
		}),
	],
	// ...
});
```

This ultility does support `terser`, but disabled by default.
You can enable it using:

**`astro.config.mjs`**

```ts
// ...
import rollup from "astro-rollup";
// ...

export default defineConfig({
	integrations: [
		rollup({
			useTerser: true,
			terserOptions: {
				// pass options to terser
			}
		}),
	],
	// ...
});
```

Set `logger` to `0` if you do not want to see debug messages. Default is `2`.

**`astro.config.mjs`**

```ts
// ...
import rollup from "astro-rollup";
// ...

export default defineConfig({
	integrations: [
		rollup({
			logger: 0,
		}),
	],
	// ...
});
```

[astro-rollup]: https://npmjs.org/astro-rollup
[rollup]: https://npmjs.org/rollup
[terser]: https://npmjs.org/terser

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of changes to this integration.

[![Lightrix logo](https://raw.githubusercontent.com/Lightrix/npm/main/.github/img/favicon.png "Built with Lightrix/npm")](https://github.com/Lightrix/npm)
