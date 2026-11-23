import { StoryObj } from '@storybook/angular-vite';
import { readTokens } from '../../../.storybook/read-tokens';
import { Meta } from '@storybook/angular-vite/dist';

const meta: Meta = {
  title: 'Foundations/Dimensioni',
  parameters: {layout: 'padded'},
};
export default meta;

const PREFIX_SPACE = '--rs-space-';
const PREFIX_RADIUS = '--rs-radius-';
const PREFIX_OMBRE = '--rs-shadow-';

const row = 'display: grid; grid-template-columns: 11rem 7rem 1fr; align-items: center; gap: var(--rs-space-4); margin-block: var(--rs-space-2)';

export const Spacing: StoryObj = {
  render: () => ({
    props: {tokens: readTokens(PREFIX_SPACE), row},
    template: `
      @for (t of tokens; track t.name) {
        <div [style]="row">
          <code>{{ t.name }}</code>
          <small>{{ t.declared }}</small>
          <div style="block-size: 1rem; background: var(--rs-color-action-primary); border-radius: var(--rs-radius-xs)"
            [style.inline-size]="'var(' + t.name + ')'"></div>
        </div>
      }
    `,
  }),
};

export const Radius: StoryObj = {
  render: () => ({
    props: {tokens: readTokens(PREFIX_RADIUS)},
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr)); gap: var(--rs-space-4)">
        @for (t of tokens; track t.name) {
          <figure style="margin: 0; text-align: center; align-items: center; display: flex; flex-direction: column">
            <div
              style="inline-size: 5rem; block-size: 5rem; background: var(--rs-color-bg-inverse); border: 1px solid var(--rs-color-border-strong)"
              [style.border-radius]="'var(' + t.name + ')'"
            ></div>
            <code style="display: block; margin-block-start: var(--rs-space-2)">{{ t.name }}</code>
          </figure>
        }
      </div>
    `
  }),
};

export const Ombre: StoryObj = {
  render: () => ({
    props: {tokens: readTokens(PREFIX_OMBRE)},
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: var(--rs-space-8); padding: var(--rs-space-6)">
        @for (t of tokens; track t.name) {
          <figure style="margin: 0; text-align: center">
            <div
              style="inline-size: 8rem; block-size: 5rem; background: var(--rs-color-bg-surface); border-radius: var(--rs-radius-lg)"
              [style.box-shadow]="'var(' + t.name + ')'"
            ></div>
            <code style="display: block; margin-block-start: var(--rs-space-3)">{{ t.name }}</code>
          </figure>
        }
      </div>
    `
  })
}
