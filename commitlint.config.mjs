const scopes = ['token', 'typography', 'theme', 'styles', 'storybook', 'build', 'ci', 'deps', 'release'];

/**@type {import('czg').UserConfig}*/
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', scopes],
  },
  prompt: {
    scopes,
    allowCustomScopes: false,
    allowEmptyScopes: true,
    allowBreakingChanges: ['feat', 'fix', 'refactor'],
  }
}
