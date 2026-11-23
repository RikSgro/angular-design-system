import { Meta, StoryObj } from '@storybook/angular-vite';
import { readTokens, Token } from '../../../.storybook/read-tokens';

const PREFIX = '--rs-color'


function groupTokens(layer: 'primitive' | 'semantic') {
  const groups = new Map<string, Token[]>();
  for (const token of readTokens(PREFIX+'-')) {
    const isSemantic = token.declared.startsWith('var(');
    if ((layer === 'semantic') !== isSemantic) continue;
    const group = token.name.slice(PREFIX.length).split('-')[0];
    groups.set(group, [...(groups.get(group) ?? []), token]);
  }
  return Array.from(groups, ([name, tokens]) => ({name, tokens}));
}

const render = (layer: 'primitive' | 'semantic') => () => ({
  props: { groups: groupTokens(layer)},
  template: `
    @for ( group of groups; track group.name) {
      <h3 style="text-transform: capitalize; margin-block: var(--rs-space-6) var(--rs-space-3)">{{ group.name }}</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr)); gap: var(--rs-space-4)">
        @for (token of group.tokens; track token.name) {
          <figure style="margin: 0">
            <div style="block-size: 4rem; border-radius: var(--rs-radius-md); border: 1px solid var(--rs-color-border-default)"
            [style.background]="'var('+token.name + ')'"></div>
            <code style="display: block; margin-block-start: var(--rs-space-2); font-size: var(--rs-font-size-xs)">{{ token.name }}</code>
            <small style="color: var(--rs-color-text-secondary); overflow-wrap: anywhere">{{ token.declared }}</small>
          </figure>
        }
      </div>
    }
  `
});

const meta: Meta = {
  title: 'Foundations/Colori',
  parameters: {layout: 'padded'},
};
export default meta;

export const Primitivi: StoryObj = {render: render('primitive')};
export const Semantici: StoryObj = {render: render('semantic')};
