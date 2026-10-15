# Zevora

**Zevora** is a family of four dark color themes for VS Code (and VS Code
forks such as Antigravity IDE), with a built-in quick-switch command. Every
variant ships complete workbench styling, TextMate syntax colors, semantic
token colors, and a full 16-color terminal palette.

## Themes

| Label           | File                                       | Character                                            |
| --------------- | ------------------------------------------ | ---------------------------------------------------- |
| **Zevora Dark** | `themes/zevora-color-theme.json`           | Charcoal surfaces, purple accent system              |
| **Zevora Midnight** | `themes/zevora-midnight-color-theme.json` | Deep navy, electric blue & cyan, lavender keywords |
| **Zevora Emerald** | `themes/zevora-emerald-color-theme.json`  | Deep forest green, emerald & mint, warm yellow types |
| **Zevora Ember** | `themes/zevora-ember-color-theme.json`     | Dark charcoal, amber & coral, warm peach strings     |

### Palette at a glance

| Variant          | Editor background | Cursor / accent | Keywords  | Functions | Strings   | Types     |
| ---------------- | ----------------- | --------------- | --------- | --------- | --------- | --------- |
| Zevora Dark      | `#0D1014`         | `#A78BFA`       | `#C4A1FF` | `#82AAFF` | `#A8DCA8` | `#FFD580` |
| Zevora Midnight  | `#0A0F1C`         | `#22D3EE`       | `#B9A6FF` | `#4DAAFF` | `#82D9A6` | `#7FE0E8` |
| Zevora Emerald   | `#0A1712`         | `#10B981`       | `#6EE7B7` | `#66C7F0` | `#A5D98A` | `#FFD98A` |
| Zevora Ember     | `#171312`         | `#FFAE57`       | `#FFA94D` | `#7EB8F0` | `#A8C98A` | `#FFD97A` |

All four variants use the same syntax structure (keywords, functions, strings,
numbers, types, constants, parameters, properties, operators, comments,
decorators, HTML tags/attributes, CSS selectors, diff colors, and more), so
switching variants keeps everything familiar — only the mood changes.

## Zevora: Switch Theme command

1. Open the Command Palette (`Ctrl+Shift+P`).
2. Run **Zevora: Switch Theme**.
3. Pick one of the four Zevora themes from the Quick Pick.

Selecting a theme applies it immediately via `workbench.colorTheme` — the same
mechanism as the built-in picker, which keeps working unchanged. The extension
activates only when the command is run: never at startup, and it never changes
your theme without an explicit selection.

## Installation

### From VSIX (recommended)

```bash
code --install-extension zevora-0.0.1.vsix
```

> **Using a VS Code fork (Antigravity IDE, Cursor, VSCodium…)?** The `code`
> CLI installs into regular VS Code's extension folder. For your fork, use its
> own UI: **Extensions panel → ⋯ menu → Install from VSIX…**, or its own CLI
> binary with the same flag. After installing, run **Developer: Reload
> Window** so the theme registry picks up all four variants.

### From source (development)

1. Open this folder in VS Code.
2. Press `F5` to launch the **Extension Development Host**.
3. In the new window: `Ctrl+Shift+P` → **Zevora: Switch Theme** (or
   **Preferences: Color Theme**) and try all four variants.

## Packaging

```bash
npm install -g @vscode/vsce
vsce package
```

Produces `zevora-0.0.1.vsix`.

## Troubleshooting

- **Only one theme ("Zevora") appears in the picker** — the installed copy is
  stale. Reinstall the current `.vsix` through your editor's own
  *Install from VSIX* flow and reload the window. Remember that `code
  --install-extension` only updates regular VS Code, not forks.
- **Themes all look the same** — a global `workbench.colorCustomizations`
  block in your user `settings.json` overrides theme colors. Remove it to let
  each theme control its own UI.
- **`workbench.colorTheme: "Zevora"` stopped resolving** — the primary theme
  is now labeled `Zevora Dark`; re-pick it once from the theme picker.

## Notes

- Local prototype — not published to any marketplace.
- No runtime dependencies; the only code is the switch-theme command
  (`extension.js`).
