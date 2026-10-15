const vscode = require('vscode');

const THEME_DATA = [
  {
    label: 'Zevora Dark',
    description: '$(star-full) Signature Charcoal & Neon Purple',
    detail: 'Editor: #0D1014 • Accent: #A78BFA • Keywords: #C4A1FF • Functions: #82AAFF',
  },
  {
    label: 'Zevora Midnight',
    description: '$(color-mode) Deep Ocean Abyss & Electric Cyan',
    detail: 'Editor: #0A0F1C • Accent: #22D3EE • Keywords: #B9A6FF • Functions: #4DAAFF',
  },
  {
    label: 'Zevora Emerald',
    description: '$(symbol-color) Forest Night & Vivid Mint',
    detail: 'Editor: #0A1712 • Accent: #10B981 • Keywords: #6EE7B7 • Functions: #66C7F0',
  },
  {
    label: 'Zevora Ember',
    description: '$(flame) Dark Charcoal & Warm Amber Coral',
    detail: 'Editor: #171312 • Accent: #FFAE57 • Keywords: #FFA94D • Functions: #7EB8F0',
  },
  {
    label: 'Zevora Eclipse',
    description: '$(circle-filled) Obsidian Near-Black & Glowing Orange',
    detail: 'Editor: #0A0A0F • Accent: #FF9E64 • Keywords: #6B9FE8 • Functions: #FF9E64',
  },
];

async function applyTheme(themeName) {
  if (!themeName) return;
  const config = vscode.workspace.getConfiguration('workbench');
  const inspect = config.inspect('colorTheme');

  const updates = [];

  // Update folder setting if present
  if (inspect && inspect.workspaceFolderValue !== undefined) {
    updates.push(
      config.update(
        'workbench.colorTheme',
        themeName,
        vscode.ConfigurationTarget.WorkspaceFolder
      )
    );
  }

  // Update workspace setting if present
  if (inspect && inspect.workspaceValue !== undefined) {
    updates.push(
      config.update(
        'workbench.colorTheme',
        themeName,
        vscode.ConfigurationTarget.Workspace
      )
    );
  }

  // Always persist to Global (User) settings
  updates.push(
    config.update(
      'workbench.colorTheme',
      themeName,
      vscode.ConfigurationTarget.Global
    )
  );

  await Promise.all(updates);
}

function normalizeThemeName(name) {
  if (!name) return 'Zevora Dark';
  if (name === 'Zevora') return 'Zevora Dark';
  return name;
}

function activate(context) {
  const switchThemeDisposable = vscode.commands.registerCommand(
    'zevora.switchTheme',
    async () => {
      const config = vscode.workspace.getConfiguration('workbench');
      const originalTheme = config.get('colorTheme') || 'Zevora Dark';
      const activeOriginalTheme = normalizeThemeName(originalTheme);

      // Build quick pick items
      const items = THEME_DATA.map((t) => {
        const isCurrent = t.label === activeOriginalTheme;
        return {
          label: t.label,
          description: isCurrent ? `${t.description} (current)` : t.description,
          detail: t.detail,
          alwaysShow: true,
        };
      });

      const quickPick = vscode.window.createQuickPick();
      quickPick.title = 'Zevora: Switch Theme';
      quickPick.placeholder =
        'Select a Zevora theme (Use ↑/↓ arrows to live preview, Enter to select)';
      quickPick.matchOnDescription = true;
      quickPick.matchOnDetail = true;
      quickPick.items = items;

      const initialActive =
        items.find((i) => i.label === activeOriginalTheme) || items[0];
      quickPick.activeItems = [initialActive];

      let isConfirmed = false;
      let lastPreviewed = activeOriginalTheme;

      // Live interactive preview as user moves up/down in the list
      quickPick.onDidChangeActive(async (activeItems) => {
        if (activeItems && activeItems.length > 0) {
          const selected = activeItems[0].label;
          if (selected && selected !== lastPreviewed) {
            lastPreviewed = selected;
            await applyTheme(selected);
          }
        }
      });

      // User confirmed selection with Enter or click
      quickPick.onDidAccept(async () => {
        isConfirmed = true;
        const selectedItem =
          quickPick.selectedItems[0] || quickPick.activeItems[0];
        const selectedTheme = selectedItem
          ? selectedItem.label
          : activeOriginalTheme;

        await applyTheme(selectedTheme);
        quickPick.hide();
        vscode.window.setStatusBarMessage(
          `$(paintcan) Zevora: Applied ${selectedTheme}`,
          4000
        );
      });

      // User closed picker (hit Esc, clicked away, or finished)
      quickPick.onDidHide(async () => {
        if (!isConfirmed) {
          // Revert back to original theme if cancelled
          await applyTheme(originalTheme);
        }
        quickPick.dispose();
      });

      quickPick.show();
    }
  );

  context.subscriptions.push(switchThemeDisposable);
}

function deactivate() {}

module.exports = { activate, deactivate };
