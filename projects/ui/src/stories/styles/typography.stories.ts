import { Meta, StoryObj } from '@storybook/angular-vite';
import { readClasses, readTokens } from '../../../.storybook/read-tokens';

const PREFIX_TEXT = 'rs-text-';
const PREFIX_FONT_SIZE = '--rs-font-size-';

const meta: Meta = {
  title: 'Foundations/Tipografia',
  parameters: {layout: 'padded'}
};
export default meta;

export const StiliDiTesto: StoryObj = {
  name: 'Stili di testo',
  render: () => ({
    props: {classes: readClasses('.'+PREFIX_TEXT)},
    template: `
      @for (cls of classes; track cls) {
        <div style="margin-block: var(--rs-space-5)">
          <code style="color: var(--rs-color-text-secondary)">{{ cls.replace('${PREFIX_TEXT}', '') }}</code>
          <p [class]="cls">Testo di prova</p>
        </div>
      }
    `
  })
}

export const Scala: StoryObj = {
  render: () => ({
    props: {tokens: readTokens(PREFIX_FONT_SIZE)},
    template: `
      @for (t of tokens; track t.name) {
        <div style="display: grid; grid-template-columns: 11rem 7rem 1fr; align-items: baseline; gap: var(--rs-pace-4)">
          <code>{{ t.name }}</code>
          <small>{{ t.declared }}</small>
          <span [style.font-size]="'var(' + t.name + ')'">Aa</span>
        </div>
      }
    `
  })
}
