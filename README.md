# MyST Custom `myst-to-typst` Extension

MyST uses `myst-to-typst` to render mdast into Typst strings before invoking a template to assemble the strings into a document.

This demo shows how a third-party plugin could use dependency injection (Lumino) and code hotloading (Module Federation) to easily define such configuration.

**Before**  
<img width="706" height="363" alt="image" src="https://github.com/user-attachments/assets/13e3a480-f251-46aa-aa64-3ed6cf72384e" />

**After**  
<img width="706" height="363" alt="image" src="https://github.com/user-attachments/assets/20d0114a-344d-4257-916b-4911347cb4fe" />


### How to use this
> [!Important]
> Requires https://github.com/jupyter-book/mystmd/pull/3086 for mystmd

1. Link the `myst-common` and `myst-to-typst` packages to the current workspace by editing `pnpm-workspace.yaml`.
2. Run `pnpm install`.
3. Run `pnpm dev`
4. In `content/` run the following in a new terminal
```bash
alias custom-myst='<PATH-TO-MYSTMD-BINARY>'
MYSTMD_REMOTES="myst_typst_plugin@http://localhost:3000/remoteEntry.js" custom-myst build --pdf main.md
```
