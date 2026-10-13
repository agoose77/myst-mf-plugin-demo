// @ts-check
import { defineConfig } from "@rspack/cli";
import { RunScriptWebpackPlugin } from "run-script-webpack-plugin";
import nodeExternals from "webpack-node-externals";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";

export default defineConfig({
  context: import.meta.dirname,
  target: "async-node",
  entry: {
    main:
      process.env.NODE_ENV === "production"
        ? "./src/main.ts"
        : ["@rspack/core/hot/poll?100", "./src/main.ts"],
  },
  output: {
    clean: true,
  },
  resolve: {
    extensions: ["...", ".ts", ".tsx", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|ts)$/,
        exclude: [/node_modules/],
        loader: "builtin:swc-loader",
        options: {
          detectSyntax: "auto",
        },
      },
      {
        test: /\.node$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      experiments: { asyncStartup: true },
      isServer: true,
      name: "myst_typst_plugin",
      library: { type: "commonjs-module" },
      filename: "remoteEntry.js",
      exposes: {
        ".": "./src/main.ts",
      },
      runtimePlugins: [
        require.resolve("@module-federation/node/runtimePlugin"),
      ],
      shared: {
        "myst-to-typst": {
          singleton: true,
          import: false,
        },
      },
    }),
  ],
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
  },
});
