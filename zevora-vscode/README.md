# Zevora

A modern dark theme for developers.

> **Status:** Prototype. Colors are still evolving; the base surfaces are stable.

## Palette

### Base surfaces

| Token      | Hex       |
| ---------- | --------- |
| Background | `#0B0D10` |
| Editor     | `#0D1014` |
| Sidebar    | `#10141A` |
| Foreground | `#E6EAF0` |

### Purple accents

| Token          | Hex       | Used for                                       |
| -------------- | --------- | ---------------------------------------------- |
| Primary purple | `#A78BFA` | cursor, active line number, borders, attributes |
| Deep purple    | `#8B5CF6` | focus border, buttons, badges, selection overlay |
| Bright purple  | `#C4B5FD` | operators, template expressions, hover accents   |
| Lavender       | `#DDD6FE` | terminal bright magenta                          |

### Syntax

| Element         | Hex       |
| --------------- | --------- |
| Keywords        | `#C4A1FF` |
| Functions       | `#82AAFF` |
| Strings         | `#A8DCA8` |
| Numbers         | `#FFB86C` |
| Types / classes | `#FFD580` |
| Variables       | `#E6EAF0` |
| Constants       | `#F78CBE` |
| Parameters      | `#E0B8FF` |
| Properties      | `#89DDFF` |
| Operators       | `#C4B5FD` |
| Comments        | `#5C677D` |
| HTML tags       | `#F38BA8` |
| Attributes      | `#A78BFA` |
| Decorators      | `#F0A6CA` |
| Errors          | `#E06C75` |
| Warnings        | `#E0AF68` |

The theme uses both TextMate scopes (`tokenColors`) and semantic tokens
(`semanticTokenColors`), with `semanticHighlighting` enabled.

## Try it locally (F5)

1. Open the `zevora-vscode` folder in VS Code.
2. Press `F5` to launch the **Extension Development Host**.
3. In the new window, open the Command Palette and run **Preferences: Color Theme**.
4. Select **Zevora**.

## Package

```bash
npm install -g @vscode/vsce
vsce package
```

This produces `zevora-0.0.1.vsix`.

## Install from .vsix

```bash
code --install-extension zevora-0.0.1.vsix
```

Not published to the Marketplace — local prototype only.
