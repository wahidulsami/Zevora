const vscode = require('vscode');

const ZEVORA_THEMES = [
  'Zevora Dark',
  'Zevora Midnight',
  'Zevora Emerald',
  'Zevora Ember',
  'Zevora Eclipse',
];

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand('zevora.switchTheme', async () => {
      const config = vscode.workspace.getConfiguration('workbench');
      const current = config.get('colorTheme');

      const pick = await vscode.window.showQuickPick(
        ZEVORA_THEMES.map((label) => ({
          label,
          description: label === current ? 'current' : undefined,
        })),
        {
          title: 'Zevora: Switch Theme',
          placeHolder: `Select a Zevora theme (current: ${current})`,
        }
      );

      if (!pick || pick.label === current) {
        return;
      }

      await config.update(
        'workbench.colorTheme',
        pick.label,
        vscode.ConfigurationTarget.Global
      );
    })
  );
}

function deactivate() {}

module.exports = { activate, deactivate };
