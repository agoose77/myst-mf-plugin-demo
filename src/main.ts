// Lumino / extension imports
import type { IPlugin } from "@lumino/coreutils";
import { IApp } from "myst-common";

// Extension-specific imports
import type { Root, Parent } from "myst-spec";
import type { VFile } from "vfile";
import type { TypstResult } from "myst-to-typst";

// Token we're providing
import { IMystToTypst } from "myst-to-typst";

/**
 * Custom plugin!
 *
 * This plugin always returns the same text
 * for any node it tries to convert to Typst
 */
const customMystToTypst = function (this: any) {
  console.log("Running custom typst");
  this.Compiler = (node: Parent, file: VFile) => {
    const result: TypstResult = {
      macros: [],
      commands: {},
      value: `
I'm typst! The content doesn't matter, Typst is always fab.
      `,
    };
    file.result = result;
    return file;
  };

  return (node: Root) => {
    return node;
  };
} as any as IMystToTypst;

/**
 * Expose the custom IMystToTypst implementation as a Lumino extension
 *
 * This allows mystmd to request it, and receive it
 */
export default {
  id: "myst-demo:custom-plugin",
  autoStart: false,
  requires: [],
  provides: IMystToTypst,
  activate: (app: IApp): IMystToTypst => {
    console.log("[myst_typst_plugin] Providing custom IMystToTypst");

    return customMystToTypst;
  },
} satisfies IPlugin<IApp, IMystToTypst>;
