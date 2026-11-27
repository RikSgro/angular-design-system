import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import * as sass from 'sass';

const srcDir = fileURLToPath(new URL('../src', import.meta.url));

/** Compila uno snippet con l'API pubblica disponibile come `rs`. */
function compile(body) {
  return sass.compileString(`@use 'styles' as rs;\n${body}`, {
    loadPaths: [srcDir],
    style: 'expanded',
  }).css;
}

/** Toglie gli spazi, così le asserzioni non dipendono dalla formattazione. */
const squash = (css) => css.replace(/\s+/g, '');

describe('@use', () => {
  it('non emette CSS da solo', () => {
    assert.equal(compile('').trim(), '');
  });
});

describe('core()', () => {
  const css = squash(compile('@include rs.core();'));

  it('emette i primitivi su :root', () => {
    assert.match(css, /--rs-color-indigo-600:oklch\(/);
    assert.match(css, /--rs-space-4:1rem;/);
    assert.match(css, /--rs-font-size-md:1rem;/);
  });

  it('emette i semantici come riferimenti ai primitivi', () => {
    assert.match(css, /--rs-color-text-primary:var\(--rs-color-neutral-900\);/);
  });

  it('emette il tema scuro sotto data-rs-theme', () => {
    assert.match(
      css,
      /\[data-rs-theme=(['"]?)dark\1\]\{[^}]*--rs-color-text-primary:var\(--rs-color-neutral-50\);/,
    );
  });

  it('emette i valori composti senza apici (ombre, font)', () => {
    assert.match(css, /--rs-font-family-sans:'InterVariable','Inter',system-ui/);
    assert.match(css, /--rs-shadow-md:0[^;]*,0[^;]*;/);
  });

  it('include il reset di default e permette di escluderlo', () => {
    assert.match(css, /box-sizing:border-box/);
    const noReset = squash(compile('@include rs.core($include-reset: false);'));
    assert.doesNotMatch(noReset, /box-sizing:border-box/);
  });
});

describe('token()', () => {
  it('restituisce un riferimento var() per un token esistente', () => {
    const css = squash(compile('.a { color: rs.token(color-text-secondary); }'));
    assert.match(css, /color:var\(--rs-color-text-secondary\)/);
  });

  it('blocca la compilazione per un token inesistente', () => {
    assert.throws(
      () => compile('.a { color: rs.token(color-text-secundary); }'),
      /color-text-secundary/,
    );
  });
});

describe('text()', () => {
  it('applica le proprietà dello stile tramite token', () => {
    const css = squash(compile('.t { @include rs.text(heading-1); }'));
    assert.match(css, /font-size:var\(--rs-font-size-2xl\)/);
    assert.match(css, /font-weight:var\(--rs-font-weight-semibold\)/);
    assert.match(css, /line-height:var\(--rs-line-height-tight\)/);
  });

  it('blocca la compilazione per uno stile inesistente', () => {
    assert.throws(() => compile('.t { @include rs.text(heading-9); }'), /heading-9/);
  });
});

describe('amount()', () => {
  it('usa cifre tabulari e non va a capo', () => {
    const css = squash(compile('.m { @include rs.amount(); }'));
    assert.match(css, /font-variant-numeric:tabular-numslining-nums/);
    assert.match(css, /white-space:nowrap/);
    assert.match(css, /font-size:var\(--rs-font-size-md\)/);
  });
});

describe('utilities()', () => {
  const css = squash(compile('@include rs.utilities();'));

  it('genera una classe per gli stili di testo', () => {
    assert.match(css, /\.rs-text-heading-1\{[^}]*font-size:var\(--rs-font-size-2xl\)/);
    assert.match(css, /\.rs-text-body\{/);
  });

  it('genera rs-numeric e rs-visually-hidden', () => {
    assert.match(css, /\.rs-numeric\{font-variant-numeric:tabular-numslining-nums;?\}/);
    assert.match(css, /\.rs-visually-hidden:not\(:focus\):not\(:active\)\{/);
  });
});
