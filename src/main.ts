import type { ISession } from "myst-cli";
import type { MystPlugin, RoleSpec } from "myst-common";
import type { IPlugin } from "@lumino/coreutils";

type ExtendedSession = {
  registerPlugin(plugin: MystPlugin): void;
};

const role = {
  name: "angus",
  doc: "An example role.",
  body: {
          type: "myst"
  },
  run() {
    return [{ type: "text", value: "It's an angus!!" }];
  },
} satisfies RoleSpec;

const plugin = { name: "My Plugin", roles: [role] };

export default {
  id: "myst-demo:custom-plugin",
  autoStart: true,
  requires: [],
  activate: (app: ISession): void => {
    (app as any as ExtendedSession).registerPlugin(plugin);
  },
} satisfies IPlugin<ISession, void>;
