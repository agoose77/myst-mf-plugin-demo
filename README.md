# MyST Custom `myst-to-typst` Extension

MyST uses `myst-to-typst` to render mdast into Typst strings before invoking a template to assemble the strings into a document.

This demo shows how a third-party plugin could use dependency injection (Lumino) and code hotloading (Module Federation) to easily define such configuration.
